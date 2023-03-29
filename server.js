import express from "express";
import bcrypt from "bcrypt-nodejs"; //used to encrypt passwords
import cors from 'cors'; //middleware used in express for removing connection errors
import dotenv from 'dotenv';

const server= express();

server.use(express.json());
server.use(cors())
dotenv.config();

import {ClarifaiStub, grpc} from "clarifai-nodejs-grpc";
const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", `Key ${process.env.CLARIFAI_KEY}`);

server.get("/", (req, res) => {
    res.send(database.users)
})

server.post("/signin", (req, res) => {
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
            res.json(database.users[0]);
        }else{
            res.status(400).json("fail")
        }
})

server.post('/register', (req,res) => {
    const {email, password, name}= req.body;
    // bcrypt.hash(password, null, null, (err, hash) => {
    // console.log(hash);
    // });
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users.at(-1))
})

// the below code can be used to add a feature where the user can recieve his details when the id
// is passed through the url. The details can then be updated and sent back to server as post request 

// server.put('/profile/:id', (req, res) => {  // e.g., localhost:3000/profile/43443422
//     const {id}= req.params;
//     let found= false;
//     database.users.forEach((user) => {
//         if (user.id === id){
//             found= true;
//             return res.json(user);
//         } 
//     })
//     if(!found){
//         res.status(400).json("Not found")
//     }
// })

server.post("/api", (req, res) => {
    const {inputUrl}= req.body
    stub.PostModelOutputs(
        {
            user_app_id: {
                "user_id": "emvk09",
                "app_id": "app1"
            },
            model_id: "face-detection",
            // version_id: MODEL_VERSION_ID,
            inputs: [{data: {image: {url: inputUrl}}}]
        },
        metadata,
        (err, response) => {
            if (err) {
                console.log("Error: " + err);
                return;
            }
    
            if (response.status.code !== 10000) {
                console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
                return;
            }
    
            res.send(response);
        }
    );
})


server.put("/imageentries", (req, res) => { // each time a correct response is obtained from an api client, this PUT request for updating the no. of entries will be executed
    const {id}= req.body;
    let found= false;
    database.users.forEach((user) => {
        if (user.id === id){
            found= true;
            user.entries++;
            // the number of entries is send as response to the frontend
            return res.json(user.entries); // this return statement stops the loop since we donot have any break statments to end the loop
        } 
    })
    if(!found){
        res.status(400).json("Not found")
    }
})


// bcrypt.hash("bacon", null, null, function(err, hash) {
//     console.log(hash);
// });
// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

const database= {
    users: [
        {
            id: '123',
            name: 'Edwin',
            password: "emvk09",
            email: 'edwinmoncy@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            password: "sally09",
            email: 'sally@gmail.com',
            entries: 0,
            joined: new Date()
        }
    ]
}

server.listen(3000, () =>{
    console.log("Server is runnning on port 3000")
});