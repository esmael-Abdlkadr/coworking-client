import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../sections/Footer";
import { Outlet, useNavigate } from "react-router-dom";
interface LayoutProps {
  children?: React.ReactNode;
}
function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar
        navs={["Home", "Services", "Events", "Blogs", "Pricing", "About Us"]}
        showButton={true}
        buttonTitle="Book Now"
        title="Coworking"
        buttonOnClick={() => navigate("/dashboard/booking/new")}
      />
      <div>{children || <Outlet />}</div>
      <Footer />
    </div>
  );
}

export default Layout;
