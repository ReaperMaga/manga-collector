package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"mangacollector/config"
	"mangacollector/database"
	"mangacollector/resource"
)

func main() {
	config.InitConfiguration()
	database.Connect()
	app := fiber.New()
	app.Use(cors.New())
	resources := loadResources()
	for _, element := range resources {
		element.Init(app)
	}
	app.Listen(":8991")
}

func loadResources() []resource.Resource {
	var resources []resource.Resource
	resources = append(resources, resource.MangaResource{}, resource.AuthResource{})
	return resources
}
