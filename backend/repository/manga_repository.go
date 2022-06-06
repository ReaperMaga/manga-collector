package repository

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"mangacollector/database"
	"mangacollector/errorhandler"
	"mangacollector/model"
)

var mangaCollection *mongo.Collection

func NewMongoRepository() *MangaRepository {
	collection := database.MongoDatabase.Collection("mangas")

	index := mongo.IndexModel{
		Keys:    bson.D{{"title", "text"}},
		Options: nil,
	}
	collection.Indexes().CreateOne(context.TODO(), index)

	repo := &MangaRepository{
		Collection: collection,
	}
	return repo
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
	repo.Collection.ReplaceOne(context.TODO(), bson.D{{"id", manga.ID}}, manga)
}

func (repo MangaRepository) List() []model.Manga {
	var models []model.Manga
	cursor, err := repo.Collection.Find(context.TODO(), bson.D{{}})
	errorhandler.Handle(err)
	cursor.All(context.TODO(), &models)
	if models == nil {
		return []model.Manga{}
	}
	return models
}

func (repo MangaRepository) ListPaged(page int, limit int) []model.Manga {

	opt := &options.FindOptions{}
	opt.SetSort(bson.D{{"createdAt", -1}})

	opt.SetSkip(int64((page - 1) * limit))
	opt.SetLimit(int64(limit))

	var models []model.Manga
	cursor, err := repo.Collection.Find(context.TODO(), bson.D{{}}, opt)
	errorhandler.Handle(err)
	cursor.All(context.TODO(), &models)
	if models == nil {
		return []model.Manga{}
	}
	return models
}

func (repo MangaRepository) Search(text string) []model.Manga {
	var models []model.Manga
	cursor, err := repo.Collection.Find(context.TODO(), bson.M{
		"$text": bson.M{
			"$search": text,
		}})
	errorhandler.Handle(err)
	cursor.All(context.TODO(), &models)
	return models
}

func (repo MangaRepository) Count() int64 {
	cursor, err := repo.Collection.CountDocuments(context.TODO(), bson.D{{}})
	if err != nil {
		return 0
	}
	return cursor
}
