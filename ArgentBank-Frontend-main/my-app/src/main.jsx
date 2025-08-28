import { Outlet } from "react-router-dom";
import Footer from "./assets/components/Footer";
import Header from "./assets/components/Header";
import "./assets/HeaderCSS/header.css";
import "./assets/FooterCSS/footer.css";

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}