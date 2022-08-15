const mongoose = require('mongoose')
const Produkte = require('../models/products')
const express = require('express')
const router = express.Router();

/*const {
    getallProducts,
    newProduct,
    deleteProduct,
    updateProduct,
} = require("../models/products");
const Produkte = require('../models/products');*/

const postProduct =  router.post('/new-produkt',async(req,res)=>{
    const produkt = req.body
    const newProduct = new Produkte(produkt)
    try{
        await newProduct.save()
        res.status(200).json(newProduct)
    }catch(er){
        res.status(400).json(er)
    }
    
})


const getProduct =  router.get('/all-produkt',async(req,res)=>{
        
    try{
        const allProducts = await Produkte.find({}).populate("categoryId")
        res.status(200).json(allProducts)
    }catch(er){
        res.status(400).json(er)
    }
    
})

const updateProduct =  router.put('/update-produkt/:id',async(req,res)=>{
    const id = req.params.id
    const produkt = req.body
    try{
        const updateProduct = await Produkte.findByIdAndUpdate(id,produkt)
        res.status(200).json(updateProduct)
    }catch(er){
        res.status(400).json(er)
    }
    
})

const deleteProduct =  router.delete('/delete-produkt/:id',async(req,res)=>{
        const id = req.params.id;
    try{
        const d = await Produkte.findByIdAndDelete(id)
        res.status(200).json(d)
    }catch(er){
        res.status(400).json(er)
    }
})

module.exports = router;
