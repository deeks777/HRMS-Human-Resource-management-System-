import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';


const router = express.Router();

router.post('/adminlogin', (req, res) => {
    const sql = 'SELECT * FROM admin WHERE email = ? and password = ?';
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: 'query error' });
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
                { role: 'admin', email: email, id: result[0].id },
                'jwt_secret_key',
                {expiresIn:'1d'}
            );
            // console.log('token: ',token)
            res.cookie('admin_token', token, {httpOnly:true, sameSite:'None', secure:'true'} );
            return res.json({ loginStatus: true,id: result[0].id });
        } else {
            return res.json({ loginStatus: false, Error: 'wrong email or password' });
        }
    });
});


router.get('/departments', (req, res)=>{
    const sql = "SELECT * FROM departments"
    con.query(sql, (err, result) =>{
        if(err) {
            console.error('Get Departments Query Error:', err);
            return res.json({Status:false, Error:'query error'})
        }
        return res.json({Status:true, Result:result})
    })
})

router.post('/Add_department',(req,res) => {
    const sql = "INSERT INTO departments (name) VALUES (?)";
    con.query(sql, [req.body.department], (error, result) =>{
        if(error) return res.json({AddingStatus:false, Error:'query error'})
        return res.json({AddingStatus:true, Result:result})
    })
})


//image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/images')
    },
    filename: (req, file, cb) =>{
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage:storage
})


router.post('/add_employee',upload.single('imageFile'), (req, res) =>{
    // if (!req.file) {
    //        return res.status(400).json({ error: 'Image file is required' });
    // }
    const sql =` 
            INSERT INTO employees 
            (fname, lname, email, password, address, salary, department_id, image) 
            VALUES (?)`;
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if(err) {
            console.error('Password Hashing Error:', err);
            return res.json({Status:false, Error:'query error'})}
            const values = [
                            req.body.fname,
                            req.body.lname,
                            req.body.email,
                            hash,
                            req.body.address,
                            req.body.salary,
                            req.body.department_id,
                            req.file.filename,
            ]
            con.query(sql, [values], (err, result) =>{
                if(err) {
                    console.error('Insert Employee Query Error:', err);
                    return res.json({Status:false, Error:'query error'})}   
                return res.json({Status:true, Result:result})
            })
    })
})

router.get('/employee', (req, res)=>{
    const sql = `
        SELECT employees.id, employees.fname, employees.lname, employees.email, employees.address, employees.salary, employees.image,employees.punched_in, departments.name AS department_name
        FROM employees
        JOIN departments ON employees.department_id = departments.id;
    `;
    con.query(sql, (err, result) =>{
        if(err) {
            console.error('Get employees Query Error:', err);
            return res.json({Status:false, Error:'query error'});
        }
        return res.json({Status:true, Result:result});
    })
})


router.get('/employee/:id', (req, res) =>{
    const id = req.params.id;
    const sql = "SELECT * FROM employees WHERE id = ?";
    con.query(sql, [id], (err, result) =>{
        if(err) return res.json({Status:false, Error:'query Error'});
            return res.json({Status:true, Result:result});
    })
})

router.put('/edit_employee/:id', (req, res) =>{
    const id = req.params.id;
    const sql = `UPDATE employees set 
                    fname = ?,lname = ?, email = ?, address = ?,
                    salary = ?, department_id = ? WHERE id = ?
                `;
        const values = [
            req.body.fname,
            req.body.lname,
            req.body.email,
            req.body.address,
            req.body.salary,
            req.body.department_id,
        ]
    con.query(sql, [...values, id], (err, result) => {
        if(err) return res.json({Status: false, Error:"query Error" +err});
        else return res.json({Status:true, Result:result})
    })

})

router.delete('/delete_employee/:id', (req, res) =>{
    const id  = req.params.id;
    const sql = `DELETE FROM employees WHERE id = ?`;
    con.query(sql, [id], (err, result) =>{
        if(err) return res.json({Status:false, Error:'query error'})
        else return res.json({Status:true, Result:result});
    })
})

router.get('/employee_by_salary', (req, res) => {
    const sql = `
        SELECT employees.id, employees.fname, employees.lname, employees.email, employees.address, employees.salary, employees.image, departments.name AS department_name
        FROM employees
        JOIN departments ON employees.department_id = departments.id
        ORDER BY employees.salary DESC
    `;
    con.query(sql, (err, result) => {
        if(err) return res.json({Status:false, Error:'query Error'})
        return res.json({Status:true, Result:result});
    })
})

router.get('/employee_by_department/:departmentId', (req, res) => {
    const departmentId = req.params.departmentId;
    const sql = `
        SELECT employees.id, employees.fname, employees.lname, employees.email, employees.address, employees.salary, employees.image, departments.name AS department_name
        FROM employees
        JOIN departments ON employees.department_id = departments.id
        WHERE employees.department_id = ?
        ORDER BY employees.fname
    `;
    con.query(sql, [departmentId], (err, result) => {
        if (err) {
            console.error('Get Employees by Department Query Error:', err); // Log the error for debugging
            return res.json({ Status: false, Error: 'query Error' });
        }
        return res.json({ Status: true, Result: result });
    });
});


router.get('/admin_count', (req, res) => {
    const sql = 'SELECT count(id) as count FROM admin';
    con.query(sql, (err, result) => {
        if(err) return res.json({Status:false, Error:'query error'})
        else return res.json({Status:true, Result:result});
    })
})

router.get('/employee_count', (req, res) => {
    const sql = 'SELECT count(id) as count FROM employees';
    con.query(sql, (err, result) => {
        if(err) return res.json({Status:false, Error:'query error'})
        else return res.json({Status:true, Result:result});
    })
})

router.get('/salary_count', (req, res) => {
    const sql = 'SELECT sum(salary) as total_salary FROM employees';
    con.query(sql, (err, result) => {
        if(err) return res.json({Status:false, Error:'query error'})
        else return res.json({Status:true, Result:result});
    })
})

router.get('/admin', (req, res) => {
    const sql = 'SELECT * from admin';
    con.query(sql, (err, result) => {
        if(err) return res.json({Status:false, Error:'query error'})
        else return res.json({Status:true, Result:result});
    })
})

router.get('/edit_admin/:id', (req, res) => {
    const id = req.params.id
    const sql = 'SELECT * from admin';
    con.query(sql, (err, result) => {
        if(err) return res.json({Status:false, Error:'query error'})
        else return res.json({Status:true, Result:result});
    })
})

router.put('/edit_admin_confirm/:id', (req, res) => {
    const id = req.params.id;
    // console.log(id);
    const sql = `UPDATE admin set 
                    email = ?, password = ? WHERE id = ?
                `;
    const values = [req.body.email,
                    req.body.password
                    ]
    con.query(sql,[...values, id ], (err, result) => {
        if(err) return res.json({Status:false, Error:'query error'})
        else return res.json({Status:true, Result:result});
    })
})

router.delete('/admin_delete/:id', (req, res) => {
    const id = req.params.id;
    // console.log(id);
    const sql = 'DELETE FROM admin WHERE id = ?';
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status:false, Error:'query error'})
        else return res.json({Status:true, Result:result});
    })
})

router.get('/admin_logout', (req, res) => {
    res.clearCookie('admin_token', {httpOnly:true, sameSite:'None', secure:'true'});
    return res.json({ Status: true });
});

export {router as adminRouter}