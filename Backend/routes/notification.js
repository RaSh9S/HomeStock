const router = require("express").Router();
const Notification = require("../models/Notification");
const BudgetPortal = require("../models/BudgetPortal");
const mongoose = require('mongoose');


// Get all notifications
router.get("/", async (req, res) => {
    try {
        const notifications = await Notification.find()
            .populate('budgetId')
            .sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mark notification as read
router.put("/:id/read", async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );
        res.json(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Check for expiring budgets and create notifications
router.get("/check-expiring", async (req, res) => {
    try {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        // Find budgets expiring tomorrow
        const expiringBudgets = await BudgetPortal.find({
            endDate: {
                $gte: new Date(),
                $lte: tomorrow
            }
        });

        // Create notifications for each expiring budget
        const notifications = await Promise.all(
            expiringBudgets.map(async budget => {
                const existingNotification = await Notification.findOne({
                    budgetId: budget._id,
                    isRead: false
                });

                if (!existingNotification) {
                    return Notification.create({
                        budgetId: budget._id,
                        message: `Budget limit of   ${budget.budgetLimit}   will expire tomorrow!`
                    });
                }
            })
        );

        res.json(notifications.filter(Boolean));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

    

});

    // Add this route with your existing routes
router.delete("/:id", async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);
        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;