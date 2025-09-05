import { Outlet } from "react-router-dom";
import {Header, Footer,} from './components/Index';

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}