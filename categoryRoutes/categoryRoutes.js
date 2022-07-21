const mongoose = require('mongoose')
const express = require('express')
const Category = require("../models/category")
const router = express.Router();


const {
    getAllCategories,
    getCategoryById,
    newCategory,
    deleteCategory,
} = require("../models/category")
/*const router = express.Router();*/

router.get("/allCategories", async (req, res) => {
    try {
      const allCategories = await Category.find({});
      res.status(200).json(allCategories);
    } catch (err) {
      res.status(400).json(err);
    }
  });
router.get("/getCategoryById/:id", async(req,res)=>{
    const id = req.params.id;
    try {
        const singleCategory = await Category.find({ id });
        res.status(200).json(singleCategory);
      } catch (err) {
        res.status(400).json(err);
      }
    });

router.post("/newCategory", async (req, res) => {
    const category = req.body;
    const newCategory = new Category(category);
  
    try {
      await newCategory.save();
      res.status(200).json(newCategory);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
router.delete("/deleteCategory/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const deletedCategory = await Category.findByIdAndDelete(id);
      res.status(200).json(deletedCategory);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router;