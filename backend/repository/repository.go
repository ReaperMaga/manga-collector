package repository

import "mangacollector/model"

type Repository interface {
	Create(manga *model.Manga)
	DeleteById(id string)
	FindById(id string) *model.Manga
	ExistsById(id string) bool
	Update(manga *model.Manga)
	List() []model.Manga
	ListPaged(page int, limit int) []model.Manga
	Count() int64
}
