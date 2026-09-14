import { useState } from "react";

function Settings() {
    const storedUser = JSON.parse(
        localStorage.getItem("user")
    );

    const [emailNotifications, setEmailNotifications] = useState(true);
    const [ticketNotifications, setTicketNotifications] = useState(true);

    return (
        <main>
            <h1>Settings</h1>
            <p>Manage your ResolveX preferences.</p>

            <section className="settings-section">
                <h2>Profile</h2>

                <div className="setting-item">
                    <label>Name</label>
                    <input
                        type="text"
                        value={storedUser?.name || "Admin"}
                        readOnly
                    />
                </div>

                <div className="setting-item">
                    <label>Email</label>
                    <input
                        type="email"
                        value={
                            storedUser?.email ||
                            "admin@supportdesk.com"
                        }
                        readOnly
                    />
                </div>
            </section>

            <section className="settings-section">
                <h2>Notifications</h2>

                <div className="setting-item">
                    <span>Email notifications</span>

                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={emailNotifications}
                            onChange={(event) =>
                                setEmailNotifications(
                                    event.target.checked
                                )
                            }
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                <div className="setting-item">
                    <span>Ticket notifications</span>

                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={ticketNotifications}
                            onChange={(event) =>
                                setTicketNotifications(
                                    event.target.checked
                                )
                            }
                        />
                        <span className="slider"></span>
                    </label>
                </div>
            </section>
        </main>
    );
}

export default Settings;