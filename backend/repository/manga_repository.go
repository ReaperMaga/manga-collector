package repository

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"mangacollector/database"
	"mangacollector/errorhandler"
	"mangacollector/model"
)

var mangaCollection *mongo.Collection

func NewMongoRepository() *MangaRepository {
	collection := database.MongoDatabase.Collection("mangas")
	obj := &MangaRepository{
		Collection: collection,
	}
	return obj
}

type MangaRepository struct {
	Collection *mongo.Collection
}

func (repo MangaRepository) Create(manga *model.Manga) {
	if repo.ExistsById(manga.ID) {
		return
	}
	_, err := repo.Collection.InsertOne(context.TODO(), manga)
	errorhandler.Handle(err)
}

func (repo MangaRepository) ExistsById(id string) bool {
	return repo.FindById(id) != nil
}

func (repo MangaRepository) FindById(id string) *model.Manga {
	var result model.Manga
	err := repo.Collection.FindOne(context.TODO(), bson.D{{"id", id}}).Decode(&result)
	if err != nil {
		return nil
	}
	if err == mongo.ErrNoDocuments {
		return nil
	}
	return &result
}

func (repo MangaRepository) DeleteById(id string) {
	repo.Collection.DeleteOne(context.TODO(), bson.D{{"id", id}})
}

func (repo MangaRepository) Update(manga *model.Manga) {
	repo.Collection.UpdateOne(context.TODO(), bson.D{{"id", manga.ID}}, manga)
}

func (repo MangaRepository) List() []model.Manga {
	var models []model.Manga
	cursor, err := repo.Collection.Find(context.TODO(), bson.D{{}})
	errorhandler.Handle(err)
	cursor.All(context.TODO(), &models)
	return models
}
