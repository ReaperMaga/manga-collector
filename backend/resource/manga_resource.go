package resource

import (
	"fmt"
	"github.com/PuerkitoBio/goquery"
	"github.com/gofiber/fiber/v2"
	"mangacollector/errorhandler"
	"mangacollector/model"
	"mangacollector/repository"
	"net/http"
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

	router.Delete("/:id", Auth, func(ctx *fiber.Ctx) error {
		id := ctx.Params("id")
		result := repository.FindById(id)

		if result == nil {
			return ctx.Status(404).JSON(model.ErrorResponse{
				Code:    404,
				Message: "Manga not found",
			})
		}
		repository.DeleteById(id)
		return ctx.JSON(result)
	})

	router.Put("/", Auth, func(ctx *fiber.Ctx) error {
		body := &model.Manga{}
		err := ctx.BodyParser(body)
		errorhandler.Handle(err)

		if repository.ExistsById(body.ID) {
			repository.Update(body)
			fmt.Println("Updated")
		} else {
			repository.Create(body)
		}
		return ctx.JSON(body)
	})

	router.Post("/", Auth, func(ctx *fiber.Ctx) error {
		body := &model.Manga{}
		err := ctx.BodyParser(body)
		errorhandler.Handle(err)

		if repository.ExistsById(body.ID) {
			return ctx.Status(403).JSON(model.ErrorResponse{
				Code:    403,
				Message: "Manga already exists",
			})
		}
		body.Poster = retrievePoster(body.Url)
		repository.Create(body)
		return ctx.JSON(body)
	})

}

func retrievePoster(url string) string {
	resp, err := http.Get(url)
	if err != nil {
		return url
	}
	errorhandler.Handle(err)
	doc, err := goquery.NewDocumentFromReader(resp.Body)
	if err != nil {
		return url
	}
	errorhandler.Handle(err)
	attr, exists := doc.Find("meta[property='og:image']").Attr("content")
	if !exists {
		return url
	}
	return attr
}
