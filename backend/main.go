package main

import (
	"github.com/gofiber/fiber/v2"
	"mangacollector/database"
	"mangacollector/resource"
)

func main() {

	database.Connect()

	app := fiber.New()

	resources := loadResources()

	for _, element := range resources {
		element.Init(app)
	}

	app.Listen(":8991")
}

func loadResources() []resource.Resource {
	var resources []resource.Resource

	resources = append(resources, resource.MangaResource{})

	return resources
}
