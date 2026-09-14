import { useState, useContext} from "react";
import TicketCard from "../components/TicketCard";
import CreateTicket from "../components/createTicket";
import { AppContext } from "../context/AppContext";
import agents from "../data/agents";

const categories = [
  "Payment",
  "Account",
  "Refund",
  "Order",
  "Delivery"
];

function Tickets() {
  const {ticketList, addTicket, loadingTickets} = useContext(AppContext);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [agentFilter, setAgentFilter] = useState("All");
  const [showCreateForm, setShowCreateForm] = useState(false);

  async function handleCreateTicket(newTicket) {
    const success = await addTicket(newTicket);

    if (success) {
        setShowCreateForm(false);
    }
  }

  const filteredTickets = ticketList.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(search.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      ticket.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" ||
      ticket.priority === priorityFilter;

    const matchesCategory = 
    categoryFilter === "All" ||
    ticket.category === categoryFilter;

    const matchesAgent = 
    agentFilter === "All" ||
    ticket.assignedTo === agentFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesAgent;
  });

  return (
    <main>
      <div className="page-header">
        <div>
          <h1>Tickets</h1>
          <p>Manage customer support tickets.</p>
        </div>

        <button className="create-ticket-button" onClick={() => setShowCreateForm(true)}>Create Ticket</button>
      </div>

      <div className="ticket-filters">
        <input
          type="text"
          placeholder="Search tickets..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Open">Open</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
        >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
        </select>

        <select
            value={agentFilter}
            onChange={(event) => setAgentFilter(event.target.value)}
        >
            <option value="All">All Agents</option>
            {agents.map((agent) => (
              <option key={agent.id} value={agent.name}>{agent.name}</option>
            ))}
        </select>
      </div>

      <div className="ticket-list">
        {loadingTickets ? (
          <p>Loading tickets...</p>
        ) : filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <TicketCard
              key={ticket._id}
              ticket={{
                ...ticket,
                id: ticket._id
              }}
            />
          ))
        ) : (
          <p>No tickets found.</p>
        )}
      </div>
        {showCreateForm && (
          <CreateTicket 
            onClose={() => setShowCreateForm(false)}
            onCreate={handleCreateTicket}
          />
        )}

    </main>
  );
}

export default Tickets;