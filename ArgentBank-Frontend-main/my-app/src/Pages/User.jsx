import Dashboard from "../components/Dashboard.jsx";
import EdithName from "../components/EditName.jsx";
import "../assets/DashboardCSS/dashboard.css";

export default function User() {
  return (
  <>
  <main className="main bg-dark">
    <EdithName />
   <Dashboard />;
  </main>
  </>);
}