import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import StatusBadge from "../components/StatusBadge";
import PriorityBadge from "../components/PriorityBadge";

function TicketDetails(){
    const { id } = useParams();
    const {ticketList, updateTicket, deleteTicket, loadingTickets} = useContext(AppContext);

    const ticket = ticketList.find(
        (ticket) => ticket._id === id
    );

    if (loadingTickets) {
        return (
            <main>
                <p>Loading ticket...</p>
            </main>
        );
    }

    if(!ticket){
        return (
            <main>
                <h1>Ticket not found!</h1>
                <p>The ticket you are looking for does not exist.</p>
                <Link to="/tickets" className="back-button">
                ← Back to Tickets
                </Link>
            </main>
        );
    }

    function handleStatusChange(event) {
        updateTicket(ticket._id, {
        status: event.target.value
        });
    }

    function handlePriorityChange(event) {
        updateTicket(ticket._id, {
            priority: event.target.value
        });
    }

    function handleAgentChange(event){
        updateTicket(ticket._id, {
            assignedTo: event.target.value
        });
    }

    async function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to delete this ticket?"
        );

        if (!confirmed) {
            return;
        }

        const success = await deleteTicket(ticket._id);

        if (success) {
            alert("Ticket deleted successfully!");
            navigate("/tickets");
        }
    }

    return (
        <main>
            <Link to="/tickets" className="back-button">
                ← Back to Tickets
            </Link>

            <div className="ticket-details">
                <div className="ticket-details-header">
                    <div>
                        <p>Ticket #{ticket._id}</p>
                        <h1>{ticket.title}</h1>
                    </div>

                    <div className="ticket-badges">
                        <StatusBadge status={ticket.status} />
                        <PriorityBadge priority={ticket.priority} />
                    </div>
                </div>

                <div className="ticket-info">
                    <div>
                        <h3>Customer</h3>
                        <p>{ticket.customer}</p>
                        <p>{ticket.email}</p>
                    </div>

                    <div>
                        <h3>Category</h3>
                        <p>{ticket.category}</p>
                    </div>

                    <div>
                        <h3>Assigned To</h3>
                        <p>{ticket.assignedTo}</p>
                    </div>

                    <div>
                        <h3>Created At</h3>
                        <p>{new Date(ticket.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="ticket-description">
                    <h2>Description</h2>
                    <p>{ticket.description}</p>
                </div>
                <div className="ticket-status-control">
                    <h3>Update Status</h3>

                    <select
                        value={ticket.status}
                        onChange={handleStatusChange}
                    >
                        <option value="Open">Open</option>
                        <option value="Pending">Pending</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>
                <div className="ticket-priority-control">
                    <h3>Update Priority</h3>

                    <select
                        value={ticket.priority}
                        onChange={handlePriorityChange}
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <div className="ticket-agent-control">
                    <h3>Assign Agent</h3>

                    <select
                        value={ticket.assignedTo}
                        onChange={handleAgentChange}
                    >
                        <option value="Amit">Amit</option>
                        <option value="Neha">Neha</option>
                        <option value="Rahul">Rahul</option>
                        <option value="Priya">Priya</option>
                    </select>
                </div>

                <div className="ticket-delete-section">
                    <button
                        className="delete-ticket-button"
                        onClick={handleDelete}
                    >
                        Delete Ticket
                    </button>
                </div>
            </div>
        </main>
    );
}

export default TicketDetails;