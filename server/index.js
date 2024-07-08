import express from "express";
import cors from 'cors';
import { adminRouter } from "./routes/AdminRoute.js";
import { employeeRouter } from "./routes/EmployeeRoute.js";
import Jwt from 'jsonwebtoken';  
import cookieParser from "cookie-parser";



const app = express();
app.use(cors({
    origin:'http://127.0.0.1:5173',
    methods:['GET',"POST","PUT","DELETE"],
    credentials:true
}));
app.use(express.json());
app.use(cookieParser()); 
app.use('/auth', adminRouter);
app.use('/employee', employeeRouter);
app.use(express.static('public'));

const verifyUser = (req, res, next) => {
    const empToken = req.cookies.employee_token;
    const adminToken = req.cookies.admin_token;
    console.log('Employee Token:', empToken);
    console.log('Admin Token:', adminToken);

    if (empToken) {
        Jwt.verify(empToken, 'jwt_secret_key', (err, decoded) => {
            console.error('Error verifying employee token:', err);
            if (err) return res.json({ Status: false, Error: 'wrong token' });
            req.id = decoded.id;
            req.role = decoded.role;
            console.log('Decoded Employee Token:', decoded);
            next();
        });
    } else if (adminToken) {
        Jwt.verify(adminToken, 'jwt_secret_key', (err, decoded) => {
            if (err) return res.json({ Status: false, Error: 'wrong token' });
            req.id = decoded.id;
            req.role = decoded.role;
            console.log('Decoded Admin Token:', decoded);
            next();
        });
    } else {
        return res.json({ Status: false, Error: 'Logged Out' });
    }
}

app.get('/verify', verifyUser, (req, res) => {
    return res.json({ Status: true, role: req.role, id: req.id });
});

app.listen(3000, ()=>{
    console.log('server is running in port 3000')
})
