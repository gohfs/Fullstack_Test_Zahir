package routes

import (
	"zahir/handlers"
	"zahir/pkg/middleware"
	"zahir/pkg/mysql"
	"zahir/repositories"

	"github.com/gorilla/mux"
)

func CompanyRoutes(r *mux.Router) {
	companyRepository := repositories.RepositoryAuth(mysql.DB)
	h := handlers.HandlerCompany(companyRepository)

	r.HandleFunc("/companies", h.GetCompanies).Methods("GET")
	r.HandleFunc("/subscribes", middleware.Auth(h.Subscribe)).Methods("POST")
}
