import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                setLoading(false);
                return;
            }

            alert("Account created sucessfully!");

            navigate("/login");
        }
        catch (error) {
            setError("Unable to connect to the server.");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <main className="auth-page">
            <div className="auth-card register-card">

                <div className="auth-panel">
                    <div>
                        <h2>Welcome to ResolveX</h2>
                        <p>
                            Create your account and start managing
                            support tickets efficiently.
                        </p>
                    </div>
                </div>

                <div className="auth-content">

                    <div className="auth-logo">
                        ResolveX
                    </div>

                    <h1>Create Account</h1>

                    <p className="auth-subtitle">
                        Create your ResolveX account.
                    </p>

                    {error && (
                        <p className="form-error">
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleSubmit}>

                        <label>Name</label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                        />

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                        />

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />

                        <label>Confirm Password</label>

                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                        />

                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating Account"
                                : "Create Account"}
                        </button>

                    </form>

                    <p className="auth-switch">
                        Already have an account?{" "}
                        <Link to="/login">
                            Login
                        </Link>
                    </p>

                </div>

            </div>
        </main>
    );
}

export default Register;