package config

import (
	"os"
)

type container struct {
	MongoDBURI string
	Password   string
}

var Container *container

func InitConfiguration() *container {
	Container = &container{
		MongoDBURI: os.Getenv("MONGODB_URI"),
		Password:   os.Getenv("PASSWORD"),
	}
	return Container
}

func GetContainer() *container {
	return Container
}
