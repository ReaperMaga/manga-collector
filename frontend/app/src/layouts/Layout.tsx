import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col items-center w-screen h-screen bg-zinc-900">
            {children}
        </div>
    );
};

export default Layout;
