import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Analytics() {

    const { ticketList, loadingTickets } = useContext(AppContext);

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

    const closedTickets = ticketList.filter(
        (ticket) => ticket.status === "Closed"
    ).length;

    const resolutionRate =
        totalTickets === 0
            ? 0
            : Math.round(
                ((resolvedTickets + closedTickets) / totalTickets) * 100
            );

    const getPercentage = (value) => {
        if (totalTickets === 0) {
            return 0;
        }

        return Math.round((value / totalTickets) * 100);
    };

    if (loadingTickets) {
        return (
            <main>
                <h1>Analytics</h1>
                <p>Loading analytics...</p>
            </main>
        );
    }

    return (
        <main>
            <div className="page-header">
                <div>
                    <h1>Analytics</h1>
                    <p>Track support ticket performance.</p>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Tickets</h3>
                    <h2>{totalTickets}</h2>
                </div>

                <div className="stat-card">
                    <h3>Open</h3>
                    <h2>{openTickets}</h2>
                </div>

                <div className="stat-card">
                    <h3>Pending</h3>
                    <h2>{pendingTickets}</h2>
                </div>

                <div className="stat-card">
                    <h3>Resolved</h3>
                    <h2>{resolvedTickets}</h2>
                </div>
            </div>

            <section className="analytics-section">
                <h2>Ticket Status</h2>

                <div className="analytics-item">
                    <div className="analytics-label">
                        <span>Open</span>
                        <span>{getPercentage(openTickets)}%</span>
                    </div>

                    <div className="analytics-bar">
                        <div
                            className="analytics-fill"
                            style={{
                                width: `${getPercentage(openTickets)}%`
                            }}
                        ></div>
                    </div>
                </div>

                <div className="analytics-item">
                    <div className="analytics-label">
                        <span>Pending</span>
                        <span>{getPercentage(pendingTickets)}%</span>
                    </div>

                    <div className="analytics-bar">
                        <div
                            className="analytics-fill"
                            style={{
                                width: `${getPercentage(pendingTickets)}%`
                            }}
                        ></div>
                    </div>
                </div>

                <div className="analytics-item">
                    <div className="analytics-label">
                        <span>Resolved</span>
                        <span>{getPercentage(resolvedTickets)}%</span>
                    </div>

                    <div className="analytics-bar">
                        <div
                            className="analytics-fill"
                            style={{
                                width: `${getPercentage(resolvedTickets)}%`
                            }}
                        ></div>
                    </div>
                </div>

                <div className="analytics-item">
                    <div className="analytics-label">
                        <span>Closed</span>
                        <span>{getPercentage(closedTickets)}%</span>
                    </div>

                    <div className="analytics-bar">
                        <div
                            className="analytics-fill"
                            style={{
                                width: `${getPercentage(closedTickets)}%`
                            }}
                        ></div>
                    </div>
                </div>
            </section>

            <section className="analytics-section">
                <h2>Resolution Rate</h2>

                <div className="resolution-rate">
                    <h1>{resolutionRate}%</h1>
                    <p>
                        Resolved or closed tickets out of total tickets
                    </p>
                </div>
            </section>
        </main>
    );
}

export default Analytics;