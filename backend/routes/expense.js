const express = require("express");

const router = express.Router();

const expenseController = require("../controllers/expenseCtrl");

// expense/add-expense => POST
router.post("/add-expense", expenseController.addExpense);

// expense/get-expense => GET
router.get("/get-expense", expenseController.getExpense);

// expense/delete-expense => DELETE
router.delete("/delete-expense/:expenseId", expenseController.deleteExpense);

module.exports = router;