package main

import (
	"github.com/evleria/shopping-list-demo/pkg/api"
	"github.com/evleria/shopping-list-demo/pkg/store"
	"github.com/go-chi/chi/v5"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"log"
	"net/http"
)

func main() {
	db, err := sqlx.Connect("postgres", "postgres://postgres@localhost:5432/postgres?sslmode=disable")
	if err != nil {
		log.Fatalln(err)
	}

	r := chi.NewRouter()
	r.Mount("/api", api.Handler(store.New(db)))

	_ = http.ListenAndServe(":3000", r)
}
