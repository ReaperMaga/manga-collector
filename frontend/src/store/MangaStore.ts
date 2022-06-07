import { makeAutoObservable } from "mobx";
import { mangasGetAllPaged } from "../core/mangas";

const pageLimit = 16;

class MangaStore {
    count = 0;

    mangas: Manga[] = [];

    page = 1;

    constructor() {
        makeAutoObservable(this);
    }

    resetMangas() {
        this.page = 1;
        mangasGetAllPaged(1, pageLimit).then(request => {
            this.mangas = request.data;
        });
    }
}

const mangaStore = new MangaStore();

export { pageLimit };
export default mangaStore;
