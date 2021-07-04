package store

import "github.com/jmoiron/sqlx"

type Repo struct {
	db *sqlx.DB
}

func New(db *sqlx.DB) *Repo {
	return &Repo{db: db}
}

func (r *Repo) GetAllItems() ([]Item, error) {
	var items []Item
	err := r.db.Select(&items, `SELECT * FROM "Items" ORDER BY created_at`)
	if err != nil {
		return nil, err
	}
	return items, nil
}

func (r *Repo) AddItem(name string) (Item, error) {
	item := Item{}
	err := r.db.QueryRow(`INSERT INTO "Items" (name) VALUES ($1) RETURNING *`, name).Scan(&item.Id, &item.Name, &item.CreatedAt)
	return item, err
}
