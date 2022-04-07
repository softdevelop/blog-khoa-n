const express = require('express');
const router = express.Router();
const UserController = require("../controllers/UserController.js");

router.put('/edit/:id', (req, res,next)=>{
    UserController.updateUser(req,res,next);
})

router.delete('/delete/:id', (req, res,next)=>{
    UserController.deleteUser(req,res,next);
})

router.get('/:id', (req, res,next)=>{
    UserController.findById(req, res,next);
})

router.get('/', (req, res,next)=>{
    UserController.getAllUsers(req,res,next);
})


// router.post('/add', (req, res,next)=>{
//     ItemController.newItem(req,res,next);
// })

module.exports = router;
