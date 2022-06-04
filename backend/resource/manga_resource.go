package resource

import (
	"github.com/gofiber/fiber/v2"
	"mangacollector/model"
	"mangacollector/repository"
)

type MangaResource struct{}

func (resource MangaResource) Init(app *fiber.App) {

	repository := repository.NewMongoRepository()

	router := app.Group("/mangas")

	router.Get("/", Auth, func(ctx *fiber.Ctx) error {
		return ctx.JSON(repository.List())
	})

	router.Get("/:id", Auth, func(ctx *fiber.Ctx) error {
		id := ctx.Params("id")
		result := repository.FindById(id)

		if result == nil {
			return ctx.Status(404).JSON(model.ErrorResponse{
				Code:    404,
				Message: "Manga not found",
			})
		}
		return ctx.JSON(result)
	})

}
