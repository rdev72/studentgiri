const express = require('express');
const isLoggedIn = require('../models/isLoggedIn');
const userSchema = require('../models/userSchema');
const taskSchema = require('../models/taskSchema');

const router = express.Router();

///user register
router.get('/register', (req, res) => {
  userSchema
    .create(req.body)
    .then(user => res.status(201).json(user))
    .catch(err => console.error(err));
});

//user login
router.post('/login', (req, res) => {
  userSchema
    .findOne({ email: req.body.email })
    .lean()
    .then(user => {
      if (user) {
        if (req.body.password == user.password) {
          delete user.password;
          res.json(user);
        } else res.status(402).json({ msg: 'Icorrect password' });
      } else res.status(404).json({ msg: 'User not found' });
    })
    .catch(err => console.error(err));
});

// user Edit
router.put('/edit', isLoggedIn, async (req, res) => {
  try {
    const user = await userSchema.findByIdAndUpdate(req.userId, req.body, { new: true }).lean();
    res.status(202).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
});

//Delete user with all task (by Admin or user itself)
router.delete('/', isLoggedIn, async (req, res) => {
  try {
    await taskSchema.deleteMany({ user: req.userId });
    await userSchema.findByIdAndRemove(req.userId);
    res.status(200).json({ msg: 'User Deleted and Data Cleared' });
  } catch (error) {
      console.error(error);
  }
});

module.exports = router;
