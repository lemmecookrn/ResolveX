import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

function TicketCard({ ticket }) {
  return (
    <Link to={`/tickets/${ticket.id}`} className="ticket-row">
      <div className="ticket-main-info">
        <p className="ticket-id">#{ticket.id}</p>
        <h3>{ticket.title}</h3>
        <p>{ticket.customer}</p>
      </div>
      <div className="ticket-meta">
        <span>{ticket.category}</span>
        <span>Agent: {ticket.assignedTo}</span>
      </div>

      <StatusBadge status={ticket.status} />
      <PriorityBadge priority={ticket.priority} />
    </Link>
  );
}

export default TicketCard;