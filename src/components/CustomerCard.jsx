import { Link } from "react-router-dom";

function CustomerCard({customer}){
    return(
        <Link to={`/customers/${customer.id}`} className="customer-card">
            <div>
                <h3>{customer.name}</h3>
                <p>{customer.email}</p>
            </div>

            <p>Tickets: {customer.tickets} Tickets</p>
            <p>Status: {customer.status}</p>

        </Link>
    );
}

export default CustomerCard;