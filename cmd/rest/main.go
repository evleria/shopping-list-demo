package main

import (
	"github.com/evleria/shopping-list-demo/pkg/api"
	"github.com/go-chi/chi/v5"
	"net/http"
)

func main() {
	r := chi.NewRouter()
	r.Mount("/api", api.Handler())

	_ = http.ListenAndServe(":3000", r)
}
