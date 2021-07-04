package store

import "time"

type Item struct {
	Id        int `json:"id"`
	Name      string `json:"name"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
}
