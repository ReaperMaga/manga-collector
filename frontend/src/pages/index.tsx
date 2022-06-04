import NavbarLayout from '../layouts/NavbarLayout';

const Home: NextPageWithLayout = () => {
    return <div className="text-lg" />;
};

Home.getLayout = function getLayout(page: JSX.Element) {
    return <NavbarLayout>{page}</NavbarLayout>;
};

export default Home;
