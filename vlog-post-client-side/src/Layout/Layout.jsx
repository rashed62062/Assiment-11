import { Outlet } from "react-router-dom";
import Navar from "../Companet/Navar/Navar";
import Footer from "../Companet/Navar/Footer/Footer";


const Layout = () => {
    return (
        <div>
      {/* Navbar */}
      <Navar />

      {/* Main content */}
      <div className="min-h-[calc(100vh-222px)]">
        {/* Ensures content fills space between navbar and footer */}
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
    );
};

export default Layout;
