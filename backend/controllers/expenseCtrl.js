const Expense = require("../modals/expenseTabel");

exports.addExpense = (req, res, next) => {
  if (req.body.id) {
    let UpdateEexpense = req.body.expenseName;
    let UpdatePrice = req.body.price;
    Expense.findByPk(req.body.id).then((expense) => {
      (expense.expenseName = UpdateEexpense), (expense.price = UpdatePrice);
      return expense.save();
    }).then((result) => {
      console.log("Created the expense");
      res.status(201).json({ data: result });
    }).catch(err=>{
      res.status(500).json({
        error: err,
      });
    })
  } else {
    let expense = req.body.expenseName;
    let price = req.body.price;
    try {
      Expense.create({
        expenseName: expense,
        price: price,
      }).then((result) => {
        console.log("Created the expense");
        res.status(201).json({ data: result });
      });
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  }
};

exports.getExpense = (req, res, next) => {
  Expense.findAll()
    .then((response) => {
      res.status(200).json({ expenseList: response });
    })
    .catch((err) => {
      console.log(
        "Get expense is failing to fetch data from the database:" +
          JSON.stringify(err)
      );
      res.status(200).json({ error: err });
    });
};

exports.deleteExpense = async (req, res, next) => {
  try {
    if (!req.params.expenseId) {
      console.log("Id is missing");
      return res.status(400).json({ error: "Must need Id " });
    }
    const EId = req.params.expenseId;
    await Expense.destroy({ where: { id: EId } });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
