import { ReactNode } from 'react';
import ToastWrapper from '../components/ToastWrapper';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col items-center w-screen h-screen bg-zinc-900">
            <ToastWrapper />
            {children}
        </div>
    );
};

export default Layout;
