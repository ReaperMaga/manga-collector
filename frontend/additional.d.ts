// custom NextJS Types
type NextPageWithLayout = import('NextPage').NextPage & {
    getLayout?: (page: import('react').ReactElement) => import('react').ReactNode;
};

type AppPropsWithLayout = import('next/app').AppProps & {
    Component: NextPageWithLayout;
};

/* 
    add your custom types below here.
    you can then reference them inside your Project
*/
