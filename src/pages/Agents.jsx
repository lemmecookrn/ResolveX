import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import agents from "../data/agents";

function Agents() {
    const { ticketList, loadingTickets } = useContext(AppContext);

    const updatedAgents = agents.map((agent) => {
        const assignedTickets = ticketList.filter(
            (ticket) => ticket.assignedTo === agent.name
        );

        const resolvedTickets = assignedTickets.filter(
            (ticket) =>
                ticket.status === "Resolved" ||
                ticket.status === "Closed"
        );

        return {
            ...agent,
            assignedTickets: assignedTickets.length,
            resolvedTickets: resolvedTickets.length
        };
    });

    if (loadingTickets) {
        return (
            <main>
                <h1>Agents</h1>
                <p>Loading agents...</p>
            </main>
        );
    }

    return (
        <main>
            <div className="page-header">
                <div>
                    <h1>Agents</h1>
                    <p>Manage support agents and ticket assignments.</p>
                </div>
            </div>

            <div className="agent-list">
                {updatedAgents.map((agent) => (
                    <div
                        className="agent-card"
                        key={agent.id}
                    >
                        <div className="agent-info">
                            <h2>{agent.name}</h2>
                            <p>{agent.email}</p>
                        </div>

                        <div className="agent-stats">
                            <div>
                                <strong>{agent.assignedTickets}</strong>
                                <span>Assigned</span>
                            </div>

                            <div>
                                <strong>{agent.resolvedTickets}</strong>
                                <span>Resolved</span>
                            </div>

                            <div>
                                <strong>{agent.status}</strong>
                                <span>Status</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Agents;