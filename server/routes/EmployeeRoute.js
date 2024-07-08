import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/employee_login', (req, res) => {
    const sql = "SELECT * FROM employees WHERE email = ?";
    con.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: 'query Error' });
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, response) => {
                if (err) return res.json({ loginStatus: false, Error: 'wrong password' });
                if (response) {
                    const email = result[0].email;
                    const token = jwt.sign(
                        { role: 'employee', email: email, id: result[0].id },
                        'jwt_secret_key',
                        { expiresIn: '1d' }
                    );
                    res.cookie('employee_token', token, {httpOnly:true, sameSite:'None', secure:true});
                    return res.json({ loginStatus: true, id: result[0].id });
                } else {
                    return res.json({ loginStatus: false, Error: 'wrong password' });
                }
            });
        } else {
            return res.json({ loginStatus: false, Error: 'wrong email or password' });
        }
    });
});

router.get('/employee_detail/:id', (req, res) => {
    const id = req.params.id;
    // console.log(id)
    const sql = 'SELECT * FROM employees WHERE id = ?';
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status:false, Error:'query Error'})
        return res.json({Status:true, Result:result});
    })
})

router.get('/employee_logout', (req, res) => {
    res.clearCookie('employee_token', {httpOnly:true, sameSite:'None', secure:true});
    return res.json({ Status: true });
})

router.put('/employee_punch_in/:id', (req, res) => {
    const id = req.params.id;
    // console.log(id)
    const sql = `UPDATE employees SET punched_in = ? WHERE id = ?`;
    con.query(sql, [true, id], (err, result) =>{
        if (err) return res.json({Status:false, Error:'query Error'});
        res.json({Status:true})
    })
})

router.put('/employee_punch_out/:id', (req, res) => {
    const id = req.params.id;
    // console.log(id)
    const sql = `UPDATE employees SET punched_in = ? WHERE id = ?`;
    con.query(sql, [false, id], (err, result) =>{
        if (err) return res.json({Status:false, Error:'query Error'});
        res.json({Status:true})
    })
})

export {router as employeeRouter};