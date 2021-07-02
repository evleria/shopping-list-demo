package api

import (
	"encoding/json"
	"github.com/evleria/shopping-list-demo/pkg/store"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/render"
	"net/http"
)

func Handler(repo *store.Repo) http.Handler {
	r := chi.NewRouter()
	r.Use(middleware.Recoverer)
	r.Use(middleware.NoCache)
	r.Use(middleware.Logger)
	r.Use(render.SetContentType(render.ContentTypeJSON))
	r.Route("/", func(r chi.Router) {
		r.Get("/", getItems(repo))
	})

	return r
}

func getItems(repo *store.Repo) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		items, err := repo.GetAllItems()
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		_ = writeAsJson(w, items)
	}
}

func writeAsJson(w http.ResponseWriter, data interface{}) error {
	w.Header().Set("Content-Type", "application/json")
	return json.NewEncoder(w).Encode(data)
}
