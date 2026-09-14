import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import StatusBadge from "../components/StatusBadge";
import PriorityBadge from "../components/PriorityBadge";

function CustomerDetails() {
    const { id } = useParams();
    const { ticketList, loadingTickets } = useContext(AppContext);

    const customerEmail = decodeURIComponent(id).toLowerCase();

    const customerTickets = ticketList.filter(
        (ticket) =>
            ticket.email?.trim().toLowerCase() === customerEmail
    );

    if (loadingTickets) {
        return (
            <main>
                <p>Loading customer...</p>
            </main>
        );
    }

    if (customerTickets.length === 0) {
        return (
            <main>
                <h1>Customer not found!</h1>

                <Link
                    to="/customers"
                    className="back-button"
                >
                    ← Back to Customers
                </Link>
            </main>
        );
    }

    const customer = customerTickets[0];

    const resolvedTickets = customerTickets.filter(
        (ticket) =>
            ticket.status === "Resolved" ||
            ticket.status === "Closed"
    ).length;

    return (
        <main>
            <Link
                to="/customers"
                className="back-button"
            >
                ← Back to Customers
            </Link>

            <div className="customer-details">

                <div className="customer-details-header">
                    <div>
                        <h1>{customer.customer}</h1>
                        <p>{customer.email}</p>
                    </div>

                    <span className="customer-status">
                        Active
                    </span>
                </div>

                <div className="customer-detail-stats">

                    <div className="stat-card">
                        <h3>Total Tickets</h3>
                        <h2>{customerTickets.length}</h2>
                    </div>

                    <div className="stat-card">
                        <h3>Resolved</h3>
                        <h2>{resolvedTickets}</h2>
                    </div>

                </div>

                <section className="customer-ticket-section">
                    <h2>Customer Tickets</h2>

                    {customerTickets.map((ticket) => (
                        <Link
                            key={ticket._id}
                            to={`/tickets/${ticket._id}`}
                            className="ticket-row"
                        >
                            <div className="ticket-main-info">
                                <p className="ticket-id">
                                    #{ticket._id}
                                </p>

                                <h3>{ticket.title}</h3>

                                <p>{ticket.category}</p>
                            </div>

                            <div className="ticket-meta">
                                <span>
                                    Agent: {ticket.assignedTo}
                                </span>
                            </div>

                            <StatusBadge
                                status={ticket.status}
                            />

                            <PriorityBadge
                                priority={ticket.priority}
                            />
                        </Link>
                    ))}
                </section>

            </div>
        </main>
    );
}

export default CustomerDetails;