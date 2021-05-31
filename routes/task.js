const express = require('express');
const userSchema = require('../models/userSchema');
const taskSchema = require('../models/taskSchema');
const isLoggedIn = require('../models/isLoggedIn')
const router = express.Router();

//creat task
router.post('/create',isLoggedIn, async (req, res) => {
  try {
    const task = await taskSchema.create({
        heading:req.body.heading,
        body:req.body.body,
        user:req.userId
    });
    res.status(202).json(task);
  } catch (error) {
    res.status(404).json(error);
  }
});

//Read all task
router.get('/read/all',isLoggedIn,async(req,res)=>{
    try {
        const tasks = await taskSchema.find({user:req.userId})
        res.json(tasks)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

//read single task
router.get('/read/:id',isLoggedIn,async(req,res)=>{
    try {
        const task = await taskSchema.findOne({_id:req.params.id})
        res.json(task)
    } catch (error) {
        res.status(404).json(error);
    }
})


//update task
router.put('/edit/:id', isLoggedIn, async (req, res) => {
    try {
      const task = await taskSchema.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
      res.status(202).json(task);
    } catch (error) {
      res.status(404).json(error);
    }
  });
//deleted task
router.delete('/delete/:id', isLoggedIn, async (req, res) => {
    try {
      const task = await taskSchema.findByIdAndDelete(req.params.id)
      res.status(202).json(task);
    } catch (error) {
      res.status(404).json(error);
    }
  });


module.exports = router;
