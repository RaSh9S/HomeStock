const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BudgetPortalSchema = new Schema({
    startDate: {
        type: Date,
        required: [true, 'Start date is required'],
        validate: {
            validator: function (value) {
                return value instanceof Date && !isNaN(value);
            },
            message: 'Start date must be a valid date'
        }
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required'],
        validate: {
            validator: function (value) {
                return value instanceof Date && !isNaN(value);
            },
            message: 'End date must be a valid date'
        }
    },
    budgetLimit: {
        type: String,
        required: [true, 'Budget limit is required'],
        min: [1, 'Budget limit must be at least 1'],
        max: [1000000, 'Budget limit cannot exceed 1,000,000']
    },
    extraNote: {
        type: String,
        required: [true, 'Extra note is required'],
        trim: true,
        minlength: [3, 'Extra note must be at least 3 characters long'],
        maxlength: [100, 'Extra note must be less than 100 characters long']
    }
});

// Pre-save validation to ensure endDate is after startDate
BudgetPortalSchema.pre('save', function (next) {
    if (this.startDate >= this.endDate) {
        return next(new Error('End date must be after the start date'));
    }
    next();
});

const BudgetPortal = mongoose.model("BudgetPortal", BudgetPortalSchema);
module.exports = BudgetPortal;

