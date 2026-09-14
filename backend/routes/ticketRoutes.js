const express = require("express");

const { getTickets, getTicketById, createTicket, updateTicket, deleteTicket } = require("../controllers/ticketControllers");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getTickets);
router.get("/:id", protect, getTicketById);
router.post("/", protect, createTicket);
router.put("/:id", protect, updateTicket);
router.delete("/:id", protect, deleteTicket);

module.exports = router;