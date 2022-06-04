package resource

import (
	"github.com/gofiber/fiber/v2"
	"mangacollector/errorhandler"
	"mangacollector/model"
	"os"
)

type AuthResource struct{}

type AuthBody struct {
	Password string `json:"password"`
}

func (resource AuthResource) Init(app *fiber.App) {

	envPassword := os.Getenv("PASSWORD")

	router := app.Group("/auth")
	router.Post("/login", func(ctx *fiber.Ctx) error {
		body := &AuthBody{}
		err := ctx.BodyParser(body)
		errorhandler.Handle(err)

		if body.Password == envPassword {
			return ctx.JSON(body)
		}
		return ctx.Status(401).JSON(model.ErrorResponse{
			Code:    401,
			Message: "Not authorized",
		})
	})
}
