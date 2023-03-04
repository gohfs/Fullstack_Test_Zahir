package main

import (
	"fmt"
	"net/http"
	"zahir/database"
	"zahir/pkg/mysql"
	"zahir/routes"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	mysql.DatabaseInit()
	database.RunMigration()

	app := mux.NewRouter()

	var AllowedHeaders = handlers.AllowedHeaders([]string{"X-Requested-Width", "Content-Type", "Authorization"})
	var AllowedMethods = handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS", "DELETE"})
	var AllowedOrigins = handlers.AllowedOrigins([]string{"*"})

	routes.RouteInit(app.PathPrefix("/api").Subrouter())

	fmt.Println("Server is running at: 5000")
	http.ListenAndServe("localhost:5000", handlers.CORS(AllowedHeaders, AllowedMethods, AllowedOrigins)(app))

}
