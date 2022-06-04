package database

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"log"
	"mangacollector/errorhandler"
	"os"
)

var MongoDatabase *mongo.Database

func Connect() {
	ctx := context.Background()

	uri, success := os.LookupEnv("MONGODB_URI")
	if !success {
		uri = "mongodb://localhost:27017"
	}
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	errorhandler.Handle(err)
	err = client.Ping(ctx, readpref.Primary())
	errorhandler.Handle(err)
	MongoDatabase = client.Database("manga_collector")
	log.Println("Connected to mongo database")
}

func OnClose(ctx context.Context, client *mongo.Client) {
	err := client.Disconnect(ctx)
	errorhandler.Handle(err)
}
