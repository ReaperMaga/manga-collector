package resource

import (
	"github.com/PuerkitoBio/goquery"
	"github.com/gofiber/fiber/v2"
	"mangacollector/errorhandler"
	"mangacollector/model"
	"mangacollector/repository"
	"net/http"
	"strconv"
	"time"
)

type MangaResource struct{}

func (resource MangaResource) Init(app *fiber.App) {

	repository := repository.NewMongoRepository()

	router := app.Group("/mangas")

	router.Get("/", Auth, func(ctx *fiber.Ctx) error {
		pageStr, limitStr := ctx.Query("page"), ctx.Query("limit")
		if pageStr != "" && limitStr != "" {
			page, err := strconv.ParseInt(pageStr, 10, 32)
			if err != nil {
				page = 1
			}
			limit, err := strconv.ParseInt(limitStr, 10, 32)
			if err != nil {
				limit = 16
			}
			return ctx.JSON(repository.ListPaged(int(page), int(limit)))
		}
		return ctx.JSON(repository.List())
	})

	router.Get("/count", Auth, func(ctx *fiber.Ctx) error {
		return ctx.JSON(repository.Count())
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
		body.Poster = RetrievePoster(body.Url)
		body.CreatedAt = time.Now().Unix()
		repository.Create(body)
		return ctx.JSON(body)
	})

	router.Post("/search", Auth, func(ctx *fiber.Ctx) error {
		body := &model.MangaSearch{}
		err := ctx.BodyParser(body)
		errorhandler.Handle(err)
		return ctx.JSON(repository.Search(body.Title))
	})

}

func RetrievePoster(url string) string {
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
