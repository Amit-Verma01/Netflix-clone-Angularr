const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
var cors = require('cors')

const app = express()
app.use(cors())

const port = process.env.PORT || 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// MySQL
const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'demo'
})

    // for signup page
    app.post('/signup', (req, res) => {
        console.log(req.body,'sending....');
            pool.getConnection((err, connection) => {
                if(err) throw err
                
                const params = req.body
                connection.query('INSERT INTO users SET ?', params, (err, rows) => {
                connection.release() // return the connection to pool
                if (!err) {
                    res.json({ message: 'Student added successfully', status: 'Success' });
                } else {
                    res.status(200).json({ message: 'Somthing error', status: 'failed' });
                }
                
                console.log('The data from beer table are:11 \n', rows)
        
                })
            })
        });
    
    // for login page
app.post('/login', (req, res) => {
    const {email , password} = req.body;
console.log(req.body,'request----');
        pool.getConnection((err, connection) => {
            if(err) throw err
            connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, rows) => {
                connection.release() // return the connection to pool
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ message: 'Internal Server Error', status: 'Error' });
              }
        
              if (rows.length >0 ) {
                res.json({ message: 'Login successfull', data: rows, status: 'Success' });
              } else {
                // If no matching user is found
                res.status(200).json({ message: 'Invalid Username or Password', status: 'Error' });
              }
            })
        })
    });


                     
// employee list
        app.get('/enrollist', (req, res) => {
            const {name , passwrd} = req.body;
            console.log(req.body,'usercall');
        console.log(req.body,'requess');
                pool.getConnection((err, connection) => {
                    if(err) throw err
                    const params = req.body
                    connection.query('select * from enroll ', (err, rows) => {
                    connection.release() // return the connection to pool
                    if (!err) {
                        res.json({ message: 'Data found', data: rows ,status:'Success'});
                    } else {
                        console.log(err)
                    }
                    
                    console.log('The data from beer table are:11 \n', rows)
            
                    })
                })
            });

// add data
            app.post('/enroll', (req, res) => {
              console.log(req.body,'Coursedata----');
              const {fullName,email,course,session,fees,id}=req.body;
              const updatedBy=new Date();
                  pool.getConnection((err, connection) => {
                      if(err) throw err
                        const params = req.body
                        connection.query('INSERT INTO enroll SET ?', params, (err, rows) => {
                          connection.release() // return the connection to pool
                          if (!err) {
                              res.json({ message: 'Data added successfully', status: 'Success' });
                          } else {
                              res.status(200).json({ message: 'Somthing error', status: 'failed' });
                          }
                          console.log('The data from beer table are:12 \n', rows)        
                           })
                          
                      // } 
                  })
              });      

//for patch and edit
            app.put('/enroll/:id', (req, res) => {
              console.log(req.body,'updaet');
              const {fullName,email,course,session,fees,id}=req.body;
              const updatedBy=new Date();
              pool.getConnection((err, connection) => {              
                    console.log(id);
                    const query = `UPDATE enroll SET fullName = ?,email = ?,course = ?,session = ?,fees = ? WHERE id = ?`;
                    connection.query(query, [fullName,email,course,session,fees,id], (error, results) => {
                      connection.release()
                    if (error) throw error;
                    res.send({ message:'Record updated successfully', status: 'Success' });
                  }); 
              });
            });



//delete 
            app.delete('/enroll/:id', (req, res) => {
               const enrollid = req.params.id;
                pool.getConnection((err, connection) => {
                  if (err) throw err;
                  // Delete employee record from the database
                  connection.query('DELETE FROM enroll WHERE id = ?', [enrollid], (err, result) => {
                    connection.release(); 
              
                    if (!err) {
                      if (result.affectedRows > 0) {
                        res.json({ message: 'Employee deleted successfully', status: 'Success' });
                      } else {
                        res.status(404).json({ message: 'Employee not found', status: 'Failed' });
                      }
                    } else {
                      res.status(500).json({ message: 'Something went wrong', status: 'Failed' });
                    }
                  });
                });
              });
 

            
 app.listen(port, () => console.log(`Listening on port ${port}`))