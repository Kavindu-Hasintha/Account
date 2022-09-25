const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'account',
    database: 'accounting',
    password: 'account'
});

// Check database connection
db.connect(err => {
    if(err) {
        console.log(err);
    }else {
        console.log('Database connected!');
    }
});

app.get('/getData', (req, res) => {
    res.json({
        "statusCode":200,
        "statusMessage":"SUCCESS"
    });
});

// Login
app.post('/login', (req, res) => {
    console.log(req.body, 'backend');

    let q = "select u_id, count(*) as 'c' from users where email = ? and pword = ?";

    db.query(q, [req.body.Email, req.body.Password], (err, result) => {
        if(err) {
            console.log(err);
        }
        else {
            res.send({
                message: 'login success',
                data: result
            });
        }
    });
});

// Signup
app.post('/signup', (req, res) => {
    console.log(req.body, 'backend-signup');

    let q = "select count(*) as 'c' from users where email = ?";

    db.query(q, [req.body.Email], (err, result) => {
        if(err) {
            console.log(err);
        }
        else {
            let r = result[0].c;
            console.log(r, 'returned value');
            if(r == 0) {
                let name = req.body.Username;
                let email = req.body.Email;
                let pw = req.body.Password;
                let birth = req.body.DoB;
                let se = req.body.Sex;
                
                var val = [
                    [name, email, pw, birth, se]
                ];
                let s = "insert into users(username, email, pword, dob, sex) values ?";

                db.query(s, [val], (err1, result1) => {
                    if(err1) {
                        throw err1;
                    }
                    res.send({
                        message: 'data inserted',
                        data: r
                    });
                }) ;
            }
            else {
                res.send({
                    message: 'Signup Failed',
                    data: r
                });
            }
        }
    });
});

// Add data to P&L
app.post('/addPLValues', (req, res) => {
    console.log("Backend P&L values => " + req.body);
    let uid = req.body[0];
    let ye = req.body[1];
    let ta = req.body[2];
    let na = req.body[3];
    let va = req.body[4];

    let plv = [
        [uid, ye, na, va]
    ];

    if(uid == null) {
        console.log('-1');
        res.send({
            message: 'Uesr ID is undefined!',
            data: -1
        });
    }
    else {
        let q;
        let r;
        let s;
        if(ta == 'sales') {
            q = "select count(*) as 'c' from sales where user_id = ? and year = ? and namevalue = ?;";
            r = "update sales set valu = ? where user_id = ? and year = ? and namevalue = ?;";
            s = "insert into sales (user_id, year, namevalue, valu) values ?";
        }
        else if(ta == 'costofsales') {
            q = "select count(*) as 'c' from costofsales where user_id = ? and year = ? and namevalue = ?;";
            r = "update costofsales set valu = ? where user_id = ? and year = ? and namevalue = ?;";
            s = "insert into costofsales (user_id, year, namevalue, valu) values ?";
        }
        else if(ta == 'otherincome') {
            q = "select count(*) as 'c' from otherincome where user_id = ? and year = ? and namevalue = ?;";
            r = "update otherincome set valu = ? where user_id = ? and year = ? and namevalue = ?;";
            s = "insert into otherincome (user_id, year, namevalue, valu) values ?";
        }
        else if(ta == 'administrativeexpenses') {
            q = "select count(*) as 'c' from administrativeexpenses where user_id = ? and year = ? and namevalue = ?;";
            r = "update administrativeexpenses set valu = ? where user_id = ? and year = ? and namevalue = ?;";
            s = "insert into administrativeexpenses (user_id, year, namevalue, valu) values ?";
        }
        else if(ta == 'salesexpenses') {
            q = "select count(*) as 'c' from salesexpenses where user_id = ? and year = ? and namevalue = ?;";
            r = "update salesexpenses set valu = ? where user_id = ? and year = ? and namevalue = ?;";
            s = "insert into salesexpenses (user_id, year, namevalue, valu) values ?";
        }
        else if(ta == 'financialexpenses') {
            q = "select count(*) as 'c' from financialexpenses where user_id = ? and year = ? and namevalue = ?;";
            r = "update financialexpenses set valu = ? where user_id = ? and year = ? and namevalue = ?;";
            s = "insert into financialexpenses (user_id, year, namevalue, valu) values ?";
        }

        db.query(q, [uid, ye, na], (err, result) => {
            if(err) throw err;
            console.log(result[0].c, ' Count in P&L');

            if(result[0].c == 1) {
                db.query(r, [va, uid, ye, na], (err1, result1) => {
                    if(err1) throw err1;
                    res.send({
                        message: 'data updated',
                        data: 0
                    });
                });
            }
            else if(result[0].c != 1) {
                db.query(s, [plv], (err2, result2) => {
                    if(err2) {
                        throw err2;
                    }
                    res.send({
                        message: 'data inserted',
                        data: 1
                    });
                });
            }
        });
    }
});

// Add SFP values
app.post('/addsfpvalues', (req, res) => {
    console.log("Backend SFP values => " + req.body);
    let uid = req.body[0];
    let ye = req.body[1];
    let ta = req.body[2];
    let na = req.body[3];
    let va = req.body[4];

    let sfpv = [
        [uid, ye, na, va]
    ];

    if(uid == null) {
        console.log('-1');
        res.send({
            message: 'Uesr ID is undefined!',
            data: -1
        });
    }
    else {
        let q;
        let r;
        let s;
        if(ta == 'noncurrentassets') {
            q = "select count(*) as 'c' from noncurrentassets where user_id = ? and year = ? and namevalue = ?;";
            r = "update noncurrentassets set valu = ? where user_id = ? and year = ? and namevalue = ?;";
            s = "insert into noncurrentassets (user_id, year, namevalue, valu) values ?";
        }
        else if(ta == 'currentassets') {
            q = "select count(*) as 'c' from currentassets where user_id = ? and year = ? and namevalue = ?;";
            r = "update currentassets set valu = ? where user_id = ? and year = ? and namevalue = ?;";
            s = "insert into currentassets (user_id, year, namevalue, valu) values ?";
        }
        else if(ta == 'equity') {
            q = "select count(*) as 'c' from equity where user_id = ? and year = ? and namevalue = ?;";
            r = "update equity set valu = ? where user_id = ? and year = ? and namevalue = ?;";
            s = "insert into equity (user_id, year, namevalue, valu) values ?";
        }
        else if(ta == 'noncurrentliabilities') {
            q = "select count(*) as 'c' from noncurrentliabilities where user_id = ? and year = ? and namevalue = ?;";
            r = "update noncurrentliabilities set valu = ? where user_id = ? and year = ? and namevalue = ?;";
            s = "insert into noncurrentliabilities (user_id, year, namevalue, valu) values ?";
        }
        else if(ta == 'currentliabilities') {
            q = "select count(*) as 'c' from currentliabilities where user_id = ? and year = ? and namevalue = ?;";
            r = "update currentliabilities set valu = ? where user_id = ? and year = ? and namevalue = ?;";
            s = "insert into currentliabilities (user_id, year, namevalue, valu) values ?";
        }

        db.query(q, [uid, ye, na], (err, result) => {
            if(err) throw err;
            console.log(result[0].c, ' Count in SFP');

            if(result[0].c == 1) {
                db.query(r, [va, uid, ye, na], (err1, result1) => {
                    if(err1) throw err1;
                    res.send({
                        message: 'data updated',
                        data: 0
                    });
                });
            }
            else if(result[0].c != 1) {
                db.query(s, [sfpv], (err2, result2) => {
                    if(err2) {
                        throw err2;
                    }
                    res.send({
                        message: 'data inserted',
                        data: 1
                    });
                });
            }
        });
    }
});

// Get sales
app.post('/getSales', (req, res) => {
    let uid = req.body[0];
    let ye = req.body[1];

    let q = "select namevalue, valu from sales where user_id = ? and year = ?;";
    db.query(q, [uid, ye], (err, result) => {
        if(err) throw err;
        console.log("Sales Data => ", result);
        res.send({
            data: result
        });
    });
});

// Get cost of sales
app.post('/getCostOfSales', (req, res) => {
    let uid = req.body[0];
    let ye = req.body[1];

    let q = "select namevalue, valu from costofsales where user_id = ? and year = ?;";
    db.query(q, [uid, ye], (err, result) => {
        if(err) throw err;
        res.send({
            data: result
        });
    });
});

// Get other income
app.post('/getOtherIncome', (req, res) => {
    let uid = req.body[0];
    let ye = req.body[1];

    let q = "select namevalue, valu from otherincome where user_id = ? and year = ?;";
    db.query(q, [uid, ye], (err, result) => {
        if(err) throw err;
        res.send({
            data: result
        });
    });
});

// Get administrative expenses
app.post('/getAdministrative', (req, res) => {
    let uid = req.body[0];
    let ye = req.body[1];

    let q = "select namevalue, valu from administrativeexpenses where user_id = ? and year = ?;";
    db.query(q, [uid, ye], (err, result) => {
        if(err) throw err;
        res.send({
            data: result
        });
    });
});

// Get sales and distribution expenses
app.post('/getSalesDis', (req, res) => {
    let uid = req.body[0];
    let ye = req.body[1];

    let q = "select namevalue, valu from salesexpenses where user_id = ? and year = ?;";
    db.query(q, [uid, ye], (err, result) => {
        if(err) throw err;
        res.send({
            data: result
        });
    });
});

// Get financial expenses
app.post('/getFinancial', (req, res) => {
    let uid = req.body[0];
    let ye = req.body[1];

    let q = "select namevalue, valu from financialexpenses where user_id = ? and year = ?;";
    db.query(q, [uid, ye], (err, result) => {
        if(err) throw err;
        res.send({
            data: result
        });
    });
});

// Get Non current Assets
app.post('/getNCA', (req, res) => {
    let uid = req.body[0];
    let ye = req.body[1];

    let q = "select namevalue, valu from noncurrentassets where user_id = ? and year = ?;";
    db.query(q, [uid, ye], (err, result) => {
        if(err) throw err;
        res.send({
            data: result
        });
    });
});

// Get current assets
app.post('/getCA', (req, res) => {
    let uid = req.body[0];
    let ye = req.body[1];

    let q = "select namevalue, valu from currentassets where user_id = ? and year = ?;";
    db.query(q, [uid, ye], (err, result) => {
        if(err) throw err;
        res.send({
            data: result
        });
    });
});

// Get equity
app.post('/getE', (req, res) => {
    let uid = req.body[0];
    let ye = req.body[1];

    let q = "select namevalue, valu from equity where user_id = ? and year = ?;";
    db.query(q, [uid, ye], (err, result) => {
        if(err) throw err;
        res.send({
            data: result
        });
    });
});

// Get non current liabilities
app.post('/getNCL', (req, res) => {
    let uid = req.body[0];
    let ye = req.body[1];

    let q = "select namevalue, valu from noncurrentliabilities where user_id = ? and year = ?;";
    db.query(q, [uid, ye], (err, result) => {
        if(err) throw err;
        res.send({
            data: result
        });
    });
});

// Get current liabilities
app.post('/getCL', (req, res) => {
    let uid = req.body[0];
    let ye = req.body[1];

    let q = "select namevalue, valu from currentliabilities where user_id = ? and year = ?;";
    db.query(q, [uid, ye], (err, result) => {
        if(err) throw err;
        res.send({
            data: result
        });
    });
});

app.listen(3010, (req, res) => {
    console.log('3010 port is running...');
});