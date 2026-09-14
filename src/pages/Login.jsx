import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                }
            );

            const data = await response.json();
            console.log("LOGIN RESPONSE:", data);

            if (!response.ok) {
                setError(data.message);
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Login successfull!");

            navigate("/dashboard");
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
            <div className="auth-card login-card">

                <div className="auth-content">

                    <div className="auth-logo">
                        ResolveX
                    </div>

                    <h1>Welcome Back</h1>

                    <p className="auth-subtitle">
                        Login to manage your support operations.
                    </p>

                    {error && (
                        <p className="form-error">
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleSubmit}>

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
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />

                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Logging in" : "Login"}
                        </button>

                    </form>

                    <p className="auth-switch">
                        Don't have an account?{" "}
                        <Link to="/register">
                            Create an account
                        </Link>
                    </p>

                </div>

                <div className="auth-panel">
                    <div>
                        <h2>ResolveX</h2>
                        <p>
                            Manage tickets, customers and support
                            operations in one place.
                        </p>
                    </div>
                </div>

            </div>
        </main>
    );
}

export default Login;