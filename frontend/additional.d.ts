declare module "reoverlay";

// custom NextJS Types
type NextPageWithLayout = import("NextPage").NextPage & {
    getLayout?: (page: import("react").ReactElement) => import("react").ReactNode;
};

type AppPropsWithLayout = import("next/app").AppProps & {
    Component: NextPageWithLayout;
};

interface Manga {
    id: string;
    title: string;
    url: string;
    poster: string;
    chapter: string;
    createdAt: number;
}

interface NewMangaResponse {
    id: string;
    title: string;
    url: string;
    chapter: string;
}

interface MangaSearch {
    title: string;
}
