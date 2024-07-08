import mysql from 'mysql';

const con = mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'',
    database:'HRMS'
})

con.connect(function(error){
    if(error){
        console.log("error")
    }else{
        console.log("connected to db");
    }
})

export default con;