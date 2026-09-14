import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function Customers() {
    const { ticketList, loadingTickets } = useContext(AppContext);

    const customerMap = {};

    ticketList.forEach((ticket) => {
        const email = ticket.email?.trim().toLowerCase();

        if (!email) {
            return;
        }

        if (!customerMap[email]) {
            customerMap[email] = {
                id: email,
                name: ticket.customer,
                email: ticket.email,
                tickets: 0,
                status: "Active"
            };
        }

        customerMap[email].tickets += 1;
    });

    const customers = Object.values(customerMap);

    if (loadingTickets) {
        return (
            <main>
                <h1>Customers</h1>
                <p>Loading customers...</p>
            </main>
        );
    }

    return (
        <main>
            <div className="page-header">
                <div>
                    <h1>Customers</h1>
                    <p>
                        Manage customer information and support activity.
                    </p>
                </div>
            </div>

            <div className="customer-list">
                {customers.length > 0 ? (
                    customers.map((customer) => (
                        <div
                            className="customer-card"
                            key={customer.id}
                        >
                            <div className="customer-info">
                                <h2>{customer.name}</h2>
                                <p>{customer.email}</p>
                            </div>

                            <div className="customer-stats">
                                <div>
                                    <strong>{customer.tickets}</strong>
                                    <span>Tickets</span>
                                </div>

                                <div>
                                    <strong>{customer.status}</strong>
                                    <span>Status</span>
                                </div>
                            </div>

                            <Link
                                to={`/customers/${encodeURIComponent(customer.email)}`}
                                className="view-button"
                            >
                                View Details
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No customers found.</p>
                )}
            </div>
        </main>
    );
}

export default Customers;