const tickets = [
  {
    id: 1001,
    title: "Payment was deducted but order failed",
    description: "Customer was charged but the order was not created.",
    customer: "Rahul Sharma",
    email: "rahul@example.com",
    category: "Payment",
    priority: "High",
    status: "Open",
    assignedTo: "Amit",
    createdAt: "2026-09-05"
  },
  {
    id: 1002,
    title: "Unable to reset password",
    description: "Customer cannot reset their account password.",
    customer: "Priya Singh",
    email: "priya@example.com",
    category: "Account",
    priority: "Medium",
    status: "Pending",
    assignedTo: "Neha",
    createdAt: "2026-09-04"
  },
  {
    id: 1003,
    title: "Refund has not arrived",
    description: "Customer is waiting for a processed refund.",
    customer: "Aman Verma",
    email: "aman@example.com",
    category: "Refund",
    priority: "High",
    status: "Resolved",
    assignedTo: "Amit",
    createdAt: "2026-09-03"
  },
  {
    id: 1004,
    title: "Unable to update profile",
    description: "Customer cannot change their profile information.",
    customer: "Neha Das",
    email: "neha@example.com",
    category: "Account",
    priority: "Low",
    status: "Open",
    assignedTo: "Rahul",
    createdAt: "2026-09-02"
  },
  {
    id: 1005,
    title: "Wrong item received",
    description: "Customer received an item different from the one ordered.",
    customer: "Riya Sen",
    email: "riya@example.com",
    category: "Order",
    priority: "High",
    status: "Open",
    assignedTo: "Neha",
    createdAt: "2026-09-01"
  },
  {
    id: 1006,
    title: "Delivery is delayed",
    description: "Customer's order has not arrived on the expected date.",
    customer: "Arjun Roy",
    email: "arjun@example.com",
    category: "Delivery",
    priority: "Medium",
    status: "Pending",
    assignedTo: "Amit",
    createdAt: "2026-08-31"
  }
];

export default tickets;