import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">ResolveX</h2>

      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/tickets"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        Tickets
      </NavLink>

      <NavLink
        to="/customers"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        Customers
      </NavLink>

      <NavLink
        to="/agents"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        Agents
      </NavLink>

      <NavLink
        to="/analytics"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        Analytics
      </NavLink>

      <NavLink
        to="/settings"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        Settings
      </NavLink>
    </div>
  );
}

export default Sidebar;