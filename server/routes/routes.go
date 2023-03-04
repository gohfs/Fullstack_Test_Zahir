package routes

import (
	"github.com/gorilla/mux"
)

func RouteInit(r *mux.Router) {
	AuthRoutes(r)
	CompanyRoutes(r)
	VariantRoutes(r)
}