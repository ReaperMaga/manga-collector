import { ReactNode } from "react";
import Navbar from "../components/navbar/Navbar";
import Layout from "./Layout";

const NavbarLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Layout>
      <div className="w-full xl:w-7/12 2xl:w-1/2 transform">
        <Navbar />
        {children}
      </div>
    </Layout>
  );
};

export default NavbarLayout;
