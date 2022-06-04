import NavbarLayout from '../layouts/NavbarLayout';

const Home: NextPageWithLayout = () => {
    return (
        <div className="w-1/2 h-full bg-zinc-300">

        </div>
    );
};

Home.getLayout = function getLayout(page: JSX.Element) {
    return <NavbarLayout>{page}</NavbarLayout>;
};

export default Home;
