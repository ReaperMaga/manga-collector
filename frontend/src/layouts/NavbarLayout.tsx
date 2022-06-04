import { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Layout from './Layout';

const NavbarLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Layout>
            <Navbar />
            {children}

        </Layout>
    );
};

export default NavbarLayout;
