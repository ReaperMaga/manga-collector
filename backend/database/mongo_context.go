package database

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"log"
	"mangacollector/config"
	"mangacollector/errorhandler"
)

var MongoDatabase *mongo.Database

func Connect() {
	ctx := context.Background()
	uri := config.GetContainer().MongoDBURI
	if uri == "" {
		uri = "mongodb://localhost:27017"
	}
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	//defer client.Disconnect(ctx)
	errorhandler.Handle(err)
	err = client.Ping(ctx, readpref.Primary())
	errorhandler.Handle(err)
	MongoDatabase = client.Database("manga_collector")
	log.Println("Connected to mongo database")

}
