const express = require('express');
const routes = express.Router();
const Person = require("../models/person.model");
const {generateToken,JWTMiddleware} = require("../jwt")

routes
.post('/signup',async (req,res)=>{
    try {   const body = req.body;
       console.log('Request Body:', body);
   
       const newPerson = await new Person(body);
   
       const response = await newPerson.save();
       console.log('data saved sucessfully !!!');

       const payload = {
        username : body.username
       }

       const token = generateToken(payload);
       console.log("token",token)
       res.status(200).json({response:response,token:token});

   }
       catch (error) {
           console.log(error);
           res.status(500).json({error : "Internal server error"})
   }
   }).get('/', JWTMiddleware,  async (req, res) => {
       try {
           const result = await Person.find();
           console.log(result);
           res.status(200).json({ message: 'Fetch data successfully.', result: result });
       } catch (error) {
        // const result = await Person.find();
           console.log(error);
           res.status(500).json({ error: "Internal server error" });
       }
   })
   .post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await Person.findOne({ username: username });
  
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

const payload = {
    username : user.username
}
const token = generateToken(payload);

      res.status(200).json({ token : token});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })
  .get('/:worktype',async (req,res)=>{
   try{
       const worktype = req.params.worktype;
       const result = await Person.find({work : worktype});
       console.log(result);
           res.status(200).json({ message: 'Fetch data successfully.', result: result });
   }
   catch(error){
       console.log(error);
           res.status(500).json({ error: "Internal server error" });
   }
   })
   .get('/id/:id',async (req,res)=>{
    try {
        const id = req.params.id;
        console.log("Requested ID:", id);
        const result = await Person.findById(id);
        console.log(result);
            res.status(200).json({ message: 'Fetch data successfully.', result: result });

        
    } catch (error) {
            console.log(error);
           res.status(500).json({ error: "Internal server error" });
    }
   })

routes
.put('/:id',async (req,res)=>{
    try {
        const id = req.params.id;
        const updatedId = req.body;
        console.log("id",id);
        console.log(updatedId);


        const result = await Person.findByIdAndUpdate(id,updatedId,{
            new : true,
            runValidators : true
        });

        if(!result){
            res.status(400).json({error : "Person not Found"});
        }

        console.log("data updated !!!");
        res.status(200).json(result);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
})
.delete('/:id',async (req,res)=>{
    try {
        const id = req.params.id;
        console.log("id",id);

        const result = await Person.findOneAndDelete(id);

        if(!result){
            res.status(400).json({error : "Person not Found"});
        }

        console.log("data deleted !!!");
        res.status(200).json(result);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

module.exports= routes;
