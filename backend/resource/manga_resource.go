package resource

import (
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

	router.Put("/", Auth, func(ctx *fiber.Ctx) error {
		body := &model.Manga{}
		err := ctx.BodyParser(body)
		errorhandler.Handle(err)

		if repository.ExistsById(body.ID) {
			repository.Update(body)
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
	errorhandler.Handle(err)
	doc, err := goquery.NewDocumentFromReader(resp.Body)
	errorhandler.Handle(err)
	attr, _ := doc.Find("meta[property='og:image']").Attr("content")
	return attr
}
