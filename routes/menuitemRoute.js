const express = require('express');
const routes = express.Router();
const menuitem = require("../models/menuitem.model");


routes.post('/menu',async (req,res)=>{
    try {
        const body = req.body;
        // console.log(body);

        const newmenuitem = await new menuitem(body);

         const response = await newmenuitem.save();
         console.log('menuitem saved sucessfully !!!');
         res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error : "Internal server error"})
    }
} )

.get('/',async (req,res)=>{
  try {
    const result = await menuitem.find();
    console.log(result);
    res.status(200).json({ message: 'Fetch data successfully.', result: result });
  } catch (error) { 
    console.log(error);
    res.status(500).json({error : "internal Server Error"})
  }
})

module.exports= routes;