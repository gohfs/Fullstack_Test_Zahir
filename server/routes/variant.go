package routes

import (
	"zahir/handlers"

	"zahir/pkg/mysql"
	"zahir/repositories"

	"github.com/gorilla/mux"
)

func VariantRoutes(r *mux.Router) {
	variantRepository := repositories.RepositoryVariant(mysql.DB)
	h := handlers.HandlerVariant(variantRepository)

	r.HandleFunc("/variants", h.GetVariants).Methods("GET")
}
