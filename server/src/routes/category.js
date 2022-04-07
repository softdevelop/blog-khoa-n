const express = require('express');
const router = express.Router();
const CategoryController = require("../controllers/CategoryController.js");

router.get("/", async (req, res) => {
    CategoryController.getAllCategory(req, res);
})

router.post("/create", async (req, res) => {
    CategoryController.save(req, res);
})

router.delete("/:id", async (req, res) => {
    CategoryController.delete(req, res);
})

module.exports = router;
