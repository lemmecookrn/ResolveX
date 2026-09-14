const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        customer: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        category: {
            type: String,
            required: true,
            default: "Payment"
        },

        priority: {
            type: String,
            required: true,
            default: "Medium"
        },

        status: {
            type: String,
            required: true,
            default: "Open"
        },

        assignedTo: {
            type: String,
            default: "Unassigned"
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;