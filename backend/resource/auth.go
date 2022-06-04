package resource

import (
	"github.com/gofiber/fiber/v2"
	"mangacollector/model"
	"os"
)

var password = os.Getenv("PASSWORD")

func Auth(ctx *fiber.Ctx) error {
	if password == "" {
		return ctx.Next()
	}
	header := ctx.GetReqHeaders()["Authorization"]
	if header == password {
		return ctx.Next()
	}
	ctx.Status(401)
	return ctx.JSON(model.ErrorResponse{
		Code:    401,
		Message: "Not authorized",
	})
}
