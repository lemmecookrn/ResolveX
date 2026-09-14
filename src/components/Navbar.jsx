import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function Navbar() {
    const { logout } = useContext(AppContext);
    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "true"
    );

    const buttonRef = useRef(null);
    const transitioningRef = useRef(false);

    const storedUser = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {
        document.body.classList.toggle("dark-mode", darkMode);
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    function handleThemeChange() {
        const button = buttonRef.current;

        if (!button || transitioningRef.current) {
            return;
        }

        const newDarkMode = !darkMode;

        const width = window.innerWidth;
        const height = window.innerHeight;

        const rect = button.getBoundingClientRect();

        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const maxRadius = Math.hypot(
            Math.max(x, width - x),
            Math.max(y, height - y)
        );

        function changeTheme() {
            document.body.classList.toggle(
                "dark-mode",
                newDarkMode
            );

            setDarkMode(newDarkMode);
            localStorage.setItem(
                "darkMode",
                newDarkMode
            );
        }

        // Browser does not support View Transitions
        if (!document.startViewTransition) {
            changeTheme();
            return;
        }

        transitioningRef.current = true;

        document.documentElement.style.setProperty(
            "--theme-x",
            `${(x / width) * 100}%`
        );

        document.documentElement.style.setProperty(
            "--theme-y",
            `${(y / height) * 100}%`
        );

        document.documentElement.style.setProperty(
            "--theme-radius",
            `${maxRadius}px`
        );

        const transition =
            document.startViewTransition(() => {
                changeTheme();
            });

        transition.finished
            .catch(() => {})
            .finally(() => {
                transitioningRef.current = false;
            });
    }

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <nav>
            <h2>ResolveX</h2>

            <input
                type="text"
                placeholder="Search..."
            />

            <button>🔔</button>

            <button
                ref={buttonRef}
                className="theme-button"
                onClick={handleThemeChange}
            >
                {darkMode ? "☀️" : "🌙"}
            </button>

            <span>
                {storedUser?.name || "Admin"}
            </span>

            <button onClick={handleLogout}>
                Logout
            </button>
        </nav>
    );
}

export default Navbar;