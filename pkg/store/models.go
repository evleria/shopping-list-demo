package store

import "time"

type Item struct {
	Id        int
	Name      string
	CreatedAt time.Time `db:"created_at"`
}
