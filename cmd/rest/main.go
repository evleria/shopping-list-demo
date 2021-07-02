package main

import (
	"github.com/evleria/shopping-list-demo/pkg/api"
	"github.com/evleria/shopping-list-demo/pkg/store"
	"github.com/go-chi/chi/v5"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"log"
	"net/http"
	"os"
)

func main() {
	//"postgres://postgres@localhost:5432/postgres?sslmode=disable"
	//"postgres://postgres@shopping-list-db:5432/postgres?sslmode=disable"

	dbConn := os.Getenv("DB_CONNECTION")
	log.Printf("Connecting to %q", dbConn)
	db, err := sqlx.Connect("postgres", dbConn)
	if err != nil {
		log.Fatalln(err)
	}

	r := chi.NewRouter()
	r.Mount("/api", api.Handler(store.New(db)))

	log.Fatalln(http.ListenAndServe(":3000", r))
}
