import api from "./api";

export async function mangasSearch(manga: MangaSearch) {
  return api.post("/mangas/search", manga);
}

export async function mangasCreate(manga: NewMangaResponse) {
  return api.post("/mangas", manga);
}

export async function mangasGetAll() {
  return api.get("/mangas");
}

export async function mangasGetAllPaged(page: number, limit: number) {
  return api.get(`/mangas?page=${page}&limit=${limit}`);
}

export async function mangasCount() {
  return api.get(`/mangas/count`);
}

export async function mangasDelete(id: string) {
  return api.delete(`/mangas/${id}`);
}

export async function mangasUpdate(manga: Manga) {
  return api.put(`/mangas`, manga);
}
