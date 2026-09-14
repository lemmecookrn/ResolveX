const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Ticket = require("./models/Ticket");
const User = require("./models/User");

dotenv.config();

const tickets = [
    {
        title: "Payment was deducted but order failed",
        description: "Customer was charged but the order was not created.",
        customer: "Rahul Sharma",
        email: "rahul@example.com",
        category: "Payment",
        priority: "High",
        status: "Open",
        assignedTo: "Amit"
    },
    {
        title: "Unable to reset password",
        description: "Customer cannot reset their account password.",
        customer: "Priya Singh",
        email: "priya@example.com",
        category: "Account",
        priority: "Medium",
        status: "Pending",
        assignedTo: "Neha"
    },
    {
        title: "Refund has not arrived",
        description: "Customer is waiting for a processed refund.",
        customer: "Aman Verma",
        email: "aman@example.com",
        category: "Refund",
        priority: "High",
        status: "Resolved",
        assignedTo: "Amit"
    },
    {
        title: "Unable to update profile",
        description: "Customer cannot change their profile information.",
        customer: "Neha Das",
        email: "neha@example.com",
        category: "Account",
        priority: "Low",
        status: "Open",
        assignedTo: "Rahul"
    },
    {
        title: "Wrong item received",
        description: "Customer received an item different from the one ordered.",
        customer: "Riya Sen",
        email: "riya@example.com",
        category: "Order",
        priority: "High",
        status: "Open",
        assignedTo: "Neha"
    },
    {
        title: "Delivery is delayed",
        description: "Customer's order has not arrived on the expected date.",
        customer: "Arjun Roy",
        email: "arjun@example.com",
        category: "Delivery",
        priority: "Medium",
        status: "Pending",
        assignedTo: "Amit"
    }
];

async function seedTickets() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected.");

        const user = await User.findOne();

        if (!user) {
            console.log("No user found. Please register an account first.");
            process.exit(1);
        }

        const existingTickets = await Ticket.find({
            createdBy: user._id
        });

        if (existingTickets.length > 0) {
            console.log("Tickets already exist for this user.");
            console.log("No tickets were added.");
            process.exit(0);
        }

        const ticketsWithUser = tickets.map((ticket) => ({
            ...ticket,
            createdBy: user._id
        }));

        await Ticket.insertMany(ticketsWithUser);

        console.log("6 tickets added successfully!");

        process.exit(0);

    } catch (error) {
        console.error("Seed error:", error.message);
        process.exit(1);
    }
}

seedTickets();