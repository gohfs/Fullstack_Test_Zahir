package routes

import (
	"zahir/handlers"
	"zahir/pkg/middleware"
	"zahir/pkg/mysql"
	"zahir/repositories"

	"github.com/gorilla/mux"
)

func AuthRoutes(r *mux.Router) {
	authRepository := repositories.RepositoryAuth(mysql.DB)
	h := handlers.HandlerAuth(authRepository)

	r.HandleFunc("/registrations", h.Register).Methods("POST")
	r.HandleFunc("/login", h.Login).Methods("POST")
	r.HandleFunc("/check-auth", middleware.Auth(h.CheckAuth)).Methods("GET")
}
