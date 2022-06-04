package resource

import (
	"github.com/gofiber/fiber/v2"
	"mangacollector/repository"
)

type MangaResource struct{}

func (resource MangaResource) Init(app *fiber.App) {

	repository := repository.NewMongoRepository()

	router := app.Group("/mangas")
	router.Get("/", func(ctx *fiber.Ctx) error {
		return ctx.JSON(repository.List())
	})
}
