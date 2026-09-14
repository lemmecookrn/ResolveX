import { useState } from "react";

function createTicket({ onClose, onCreate}){
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        customer: "",
        email: "",
        category: "Payment",
        priority: "Medium",
        assignedTo: "Amit"
    })

    const [error, setError] = useState("");

    function handleChange(event){
        const {name, value} = event.target;

        setFormData({
            ...formData, [name]: value
        });
    }

    function handleSubmit(event){
        event.preventDefault();
    

        if (!formData.title || !formData.description || !formData.customer || !formData.email){
            setError("Please fill in all the required fields.");
            return;
        }

        const newTicket = {
            ...formData, 
            status: "Open"
        };

        onCreate(newTicket);
    }

    return (
        <div className="modal-overlay">
            <div className="create-ticket-modal">
                <h2>Create New Ticket</h2>

                {error && (
                    <p className="form-error">{error}</p>
                )}

                <form onSubmit={handleSubmit}>
                    <label>Title *</label>
                    <input 
                    type="text" 
                    name="title" 
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter ticket title"
                    />

                    <label>Description *</label>
                    <textarea 
                    name="description" 
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your issue"
                    rows="4"
                    />

                    <label>Customer *</label>
                    <input 
                    type="text" 
                    name="customer" 
                    value={formData.customer}
                    onChange={handleChange}
                    placeholder="Customer name"
                    />

                    <label>Email *</label>
                    <input 
                    type="text" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Customer Email"
                    />

                    <label>Category *</label>
                    <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    >
                        <option value="Payment">Payment</option>
                        <option value="Account">Account</option>
                        <option value="Refund">Refund</option>
                        <option value="Order">Order</option>
                        <option value="Delivery">Delivery</option>
                    </select>

                    <label>Priority</label>
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>

                    <label>Assigned To</label>
                    <select
                        name="assignedTo"
                        value={formData.assignedTo}
                        onChange={handleChange}
                    >
                        <option value="Amit">Amit</option>
                        <option value="Neha">Neha</option>
                        <option value="Rahul">Rahul</option>
                        <option value="Priya">Priya</option>
                    </select>

                    <div className="form-buttons">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit">Create Ticket</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default createTicket;