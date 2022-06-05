package resource

import (
	"github.com/gofiber/fiber/v2"
	"mangacollector/config"
	"mangacollector/model"
)

func Auth(ctx *fiber.Ctx) error {
	if config.GetContainer().Password == "" {
		return ctx.Next()
	}
	header := ctx.GetReqHeaders()["Authorization"]
	if header == config.GetContainer().Password {
		return ctx.Next()
	}
	return ctx.Status(401).JSON(model.ErrorResponse{
		Code:    401,
		Message: "Not authorized",
	})
}
