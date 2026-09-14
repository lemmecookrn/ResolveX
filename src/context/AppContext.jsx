import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

function AppContextProvider({children}) {
    const [ticketList, setTicketList] = useState([]);
    const [loadingTickets, setLoadingTickets] = useState(true);

    async function fetchTickets() {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/tickets`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                console.error("Failed to fetch tickets:", data.message);
                return;
            }

            setTicketList(data);

        } catch (error) {
            console.error("Error fetching tickets:", error);
        } finally {
            setLoadingTickets(false);
        }
    }

    useEffect(() => {
        fetchTickets();
    }, []);

    async function addTicket(newTicket) {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/tickets`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newTicket)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Failed to create ticket:", data.message);
            return false;
        }

        setTicketList((currentTickets) => [
            data.ticket,
            ...currentTickets
        ]);

        return true;

        } catch (error) {
            console.error("Error creating ticket:", error);
            return false;
        }
    }

    async function updateTicket(ticketId, updatedData) {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/tickets/${ticketId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(updatedData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                console.error(
                    "Failed to update ticket:",
                    data.message
                );
                return false;
            }

            setTicketList((currentTickets) => {
                return currentTickets.map((ticket) => {
                    if (ticket._id === ticketId) {
                        return data.ticket;
                    }

                    return ticket;
                });
            });

            return true;

        } catch (error) {
            console.error("Error updating ticket:", error);
            return false;
        }
    }

    async function deleteTicket(ticketId) {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/tickets/${ticketId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error(
                "Failed to delete ticket:",
                data.message
            );
            return false;
        }

        setTicketList((currentTickets) => {
            return currentTickets.filter(
                (ticket) => ticket._id !== ticketId
            );
        });

        return true;

        } catch (error) {
            console.error("Error deleting ticket:", error);
            return false;
        }
    }

    function logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    return (
        <AppContext.Provider value={{ticketList, addTicket, updateTicket, deleteTicket, loadingTickets, fetchTickets, logout}}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;