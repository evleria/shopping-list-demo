package main

import (
	"fmt"
	"github.com/evleria/shopping-list-demo/pkg/api"
	"github.com/evleria/shopping-list-demo/pkg/static"
	"github.com/evleria/shopping-list-demo/pkg/store"
	"github.com/go-chi/chi/v5"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"log"
	"net/http"
	"os"
)

func main() {
	printEnv()

	var (
		dbConn     = os.Getenv("DATABASE_URL")
		port       = getEnvVar("PORT", "3000")
		staticPath = getEnvVar("STATIC_PATH", "out/build")
	)

	db, err := sqlx.Connect("postgres", dbConn)
	if err != nil {
		log.Fatalln(err)
	}
	defer log.Fatalln(db.Close())

	r := chi.NewRouter()
	r.Mount("/api", api.Handler(store.New(db)))
	r.Mount("/", static.Handler(staticPath))

	log.Fatalln(http.ListenAndServe(fmt.Sprintf(":%s", port), r))
}

func printEnv() {
	fmt.Println("Environment variables:")
	fmt.Println(os.Environ())
}

func getEnvVar(key, defaultValue string) string {
	if result, ok := os.LookupEnv(key); ok {
		return result
	}
	return defaultValue
}
