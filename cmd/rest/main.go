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
	dbConn, port := os.Getenv("DB_CONNECTION"), os.Getenv("PORT")
	log.Printf("Connecting to %q", dbConn)
	db, err := sqlx.Connect("postgres", dbConn)
	if err != nil {
		log.Fatalln(err)
	}

	r := chi.NewRouter()
	r.Mount("/api", api.Handler(store.New(db)))

	log.Fatalln(http.ListenAndServe(port, r))
}
