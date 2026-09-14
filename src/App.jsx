import Sidebar from "./components/sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import Tickets from "./pages/Tickets";
import Customers from "./pages/Customers";
import Agents from "./pages/Agents";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import TicketDetails from "./pages/TicketDetails";
import AppContextProvider from "./context/AppContext";
import CustomerDetails from "./pages/CustomerDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App(){
  return(
    <BrowserRouter>
      <AppContextProvider>
        <Routes>
          {/* Authentication pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard pages */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="app">
                  <Sidebar />

                  <div className="main-section">
                    <Navbar />

                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/tickets" element={<Tickets />} />
                      <Route path="/tickets/:id" element={<TicketDetails />} />
                      <Route path="/customers" element={<Customers />} />
                      <Route path="/customers/:id" element={<CustomerDetails />} />
                      <Route path="/agents" element={<Agents />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;