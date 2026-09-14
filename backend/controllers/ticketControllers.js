const Ticket = require("../models/Ticket");


async function getTickets(req, res) {
    try {
        const tickets = await Ticket.find()
            .sort({ createdAt: -1 });

        res.status(200).json(tickets);

    } catch (error) {
        console.error("Get tickets error:", error.message);

        res.status(500).json({
            message: "Server error while fetching tickets."
        });
    }
}

async function getTicketById(req, res) {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found."
            });
        }

        res.status(200).json(ticket);

    } catch (error) {
        console.error("Get ticket error:", error.message);

        res.status(500).json({
            message: "Server error while fetching ticket."
        });
    }
}

async function createTicket(req, res) {
    try {
        const { title, description, customer, email, category, priority, status, assignedTo } = req.body;

        if (!title || !description || !customer || !email) {
            return res.status(400).json({
                message: "Please fill in all required fields."
            });
        }

        const ticket = await Ticket.create({
            title,
            description,
            customer,
            email,
            category,
            priority,
            status,
            assignedTo,
            createdBy: req.user.userId
        });

        res.status(201).json({
            message: "Ticket created successfully!",
            ticket
        });

    } catch (error) {
        console.error("Create ticket error:", error.message);

        res.status(500).json({
            message: "Server error while creating ticket."
        });
    }
}

async function updateTicket(req, res) {
    try {
        const { status, priority, assignedTo } = req.body;

        const updateData = {};

        if (status !== undefined) {
            updateData.status = status;
        }

        if (priority !== undefined) {
            updateData.priority = priority;
        }

        if (assignedTo !== undefined) {
            updateData.assignedTo = assignedTo;
        }

        const ticket = await Ticket.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found."
            });
        }

        res.status(200).json({
            message: "Ticket updated successfully!",
            ticket
        });

    } catch (error) {
        console.error(
            "Update ticket error:",
            error.message
        );

        res.status(500).json({
            message: "Server error while updating ticket."
        });
    }
}

async function deleteTicket(req, res) {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found."
            });
        }

        res.status(200).json({
            message: "Ticket deleted successfully!"
        });

    } catch (error) {
        console.error("Delete ticket error:", error.message);

        res.status(500).json({
            message: "Server error while deleting ticket."
        });
    }
}


module.exports = {
    getTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket
};