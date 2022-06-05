import api from "./api";

export async function mangasCreate(manga: NewMangaResponse) {
  return api.post("/mangas", manga);
}

export async function mangasGetAll() {
  return api.get("/mangas");
}

export async function mangasDelete(id: string) {
  return api.delete(`/mangas/${id}`);
}

export async function mangasUpdate(manga: Manga) {
  return api.put(`/mangas`, manga);
}
