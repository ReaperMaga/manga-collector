package main

import (
	"github.com/gofiber/fiber/v2"
	"mangacollector/resource"
)

func main() {
	app := fiber.New()

	resources := loadResources()

	for _, element := range resources {
		element.Init(app)
	}

	app.Listen(":3000")
}

func loadResources() []resource.Resource {
	var resources []resource.Resource

	resources = append(resources, resource.MangaResource{})

	return resources
}
