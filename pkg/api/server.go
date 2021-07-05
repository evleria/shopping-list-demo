package api

import (
	"encoding/json"
	"github.com/evleria/shopping-list-demo/pkg/store"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/render"
	"log"
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
		r.Post("/", addItem(repo))
		r.Delete("/", deleteItem(repo))
	})

	return r
}

func getItems(repo *store.Repo) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		items, err := repo.GetAllItems()
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		_ = writeAsJson(w, items)
	}
}

func addItem(repo *store.Repo) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var request AddItemRequest
		err := json.NewDecoder(r.Body).Decode(&request)
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		item, err := repo.AddItem(request.Name)
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		_ = writeAsJson(w, item)
	}
}

func deleteItem(repo *store.Repo) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var request DeleteItemRequest
		err := json.NewDecoder(r.Body).Decode(&request)
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		err = repo.DeleteItem(request.Id)
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusNoContent)
	}
}

func writeAsJson(w http.ResponseWriter, data interface{}) error {
	w.Header().Set("Content-Type", "application/json")
	return json.NewEncoder(w).Encode(data)
}
