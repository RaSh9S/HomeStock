const router = require("express").Router();
const { body, validationResult, param } = require("express-validator");
const BudgetPortal = require("../models/BudgetPortal");

// POST /Budgetlimitadd - Add a Budget Limit
router.post("/Budgetlimitadd", [
    body('startDate').isISO8601().toDate().withMessage('Starting Date must be a valid date'),
    body('endDate').isISO8601().toDate().withMessage('Ending Date must be a valid date'),
    body('budgetLimit').trim().not().isEmpty().withMessage('budgetLimit is required'),
    body('extraNote').trim().not().isEmpty().withMessage('extraNote is required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation Errors:", errors.array()); // Log errors
        return res.status(400).json({ errors: errors.array() });
    }


    try {
        const { startDate, endDate, budgetLimit, extraNote } = req.body;

        const newBudgetPortal = new BudgetPortal({
            startDate,
            endDate,
            budgetLimit,
            extraNote
        });

        await newBudgetPortal.save();
        res.json({ message: "Budget Portal Added Successfully.!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.get("/Budgetlimit", (req, res) => {
    BudgetPortal.find()
        .then(budgetportal => res.json(budgetportal))
        .catch(err => res.status(400).json('Error: ' + err));
});

// PUT /update/:id - Update a specific Budget Limit
router.put("/Budgetlimitupdate/:id", [
    param('id').isMongoId().withMessage('Invalid user ID'),
    body('startDate').optional().isISO8601().toDate(),
    body('endDate').optional().isISO8601().toDate(),
    body('budgetLimit').optional().trim(),
    body('extraNote').optional().trim()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let userId = req.params.id;
    const updateBudgetPortal = req.body;

    BudgetPortal.findByIdAndUpdate(userId, updateBudgetPortal, { new: true })
        .then(() => res.status(200).json({ status: "Budget Portal updated.!" }))
        .catch(err => res.status(500).json({ status: "Error updating Budget Portal", error: err.message }));
});


// DELETE /delete/:id - Delete a specific Budget Limit
router.delete("/Budgetlimitdelete/:id", [
    param('id').isMongoId().withMessage('Invalid user ID')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let userId = req.params.id;
    BudgetPortal.findByIdAndDelete(userId)
        .then(() => res.status(200).json({ status: "Budget Portal delete Successfully.! " }))
        .catch(err => res.status(500).json({ status: "Error deleting Budget Portal", error: err.message }));
});

// GET /get/:id - Get a specific Budget Portal
router.get("/Budgetlimitget/:id", [
    param('id').isMongoId().withMessage('Invalid user ID')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let userId = req.params.id;
    BudgetPortal.findById(userId)
        .then(budgetportal => res.status(200).json(budgetportal))
        .catch(err => res.status(500).json({ status: "Error fetching Budget Portal.", error: err.message }));
});


// Update Budget Portal status route
module.exports = router;
router.put("/BudgetlimitupdateStatus/:id", async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
  
    try {
      const updatedBudgetPortal = await BudgetPortal.findByIdAndUpdate(id, { Status: status }, { new: true });
      if (!updatedBudgetPortal) {
        return res.status(404).json({ status: "Error", error: "Budget Portal not found" });
      }
      res.status(200).json({ status: "Success", message: "Budget Portal status updated.!", BudgetPortal: updatedBudgetPortal });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "Error", error: "Failed to update Budget Portal status" });
    }

  }); 

  //Monthly Report
  router.get("/Reportsmonthly", async (req, res) => {
    try {
      const { month, year } = req.query;
      const parsedMonth = parseInt(month);
      const parsedYear = parseInt(year || new Date().getFullYear());
  
      if (isNaN(parsedMonth)) {
        return res.status(400).json({ error: "Invalid month" });
      }
  
      // Create date range for the selected month
      const startDate = new Date(parsedYear, parsedMonth - 1, 1);
      const endDate = new Date(parsedYear, parsedMonth, 0);
  
      const monthlyReport = await BudgetPortal.find({
        startDate: { $gte: startDate, $lte: endDate }
      }).sort({ startDate: 1 });
  
      res.json(monthlyReport);
    } catch (error) {
      console.error('Monthly report error:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get("/Reportsweekly", async (req, res) => {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
  
      const weeklyReport = await BudgetPortal.find({
        startDate: { $gte: startDate, $lte: endDate }
      }).sort({ startDate: 1 });
  
      res.json(weeklyReport);
    } catch (error) {
      console.error('Weekly report error:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router; 




