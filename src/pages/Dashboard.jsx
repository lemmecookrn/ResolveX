import StatCard from "../components/StatCard";
import TicketCard from "../components/TicketCard";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Dashboard(){
    const {ticketList, loadingTickets} = useContext(AppContext);

    const totalTickets = ticketList.length;
    
    const openTickets = ticketList.filter(
        (ticket) => ticket.status === "Open"
    ).length;

    const pendingTickets = ticketList.filter(
        (ticket) => ticket.status === "Pending"
    ).length;

    const resolvedTickets = ticketList.filter(
        (ticket) => ticket.status === "Resolved"
    ).length;


    const resolutionRate =
        totalTickets === 0
            ? 0
            : Math.round((resolvedTickets / totalTickets) * 100);

    if (loadingTickets) {
        return (
            <main>
                <h1>Dashboard</h1>
                <p>Loading dashboard...</p>
            </main>
        );
    }

    return (
        <main>
            <div className="page-header">
                <div>
                    <h1>Dashboard</h1>
                    <p>Overview of your support operations.</p>
                </div>
            </div>

            <div className="stats-grid">
                <StatCard
                    title="Total Tickets"
                    value={totalTickets}
                />

                <StatCard
                    title="Open Tickets"
                    value={openTickets}
                />

                <StatCard
                    title="Pending Tickets"
                    value={pendingTickets}
                />

                <StatCard
                    title="Resolved Tickets"
                    value={resolvedTickets}
                />
            </div>

            <section className="dashboard-section">
                <h2>Resolution Rate</h2>

                <div className="resolution-rate">
                    <h1>{resolutionRate}%</h1>
                    <p>
                        {resolvedTickets} of {totalTickets} tickets resolved
                    </p>
                </div>
            </section>
        </main>
    );
}

export default Dashboard;