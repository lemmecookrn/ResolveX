function AgentCard({agent}){
    return (
        <div className="agent-card">
            <div>
                <h3>{agent.name}</h3>
                <p>{agent.email}</p>
            </div>

            <div>
                <strong>{agent.assignedTickets}</strong>
                <p>Assigned</p>
            </div>

            <div>
                <strong>{agent.resolvedTickets}</strong>
                <p>Resolved</p>
            </div>

            <span>{agent.status}</span>
        </div>
    );
}

export default AgentCard;