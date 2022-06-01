package resource

import "github.com/gofiber/fiber/v2"

type Resource interface {
	Init(app *fiber.App)
}
