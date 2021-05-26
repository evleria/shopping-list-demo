postgres:
	docker run --name shopping-list-db -e POSTGRES_HOST_AUTH_METHOD=trust -p 5432:5432 -d --rm postgres:13-alpine
migrate-up:
	migrate -source "file://db/migrations/" -database "postgres://postgres@localhost:5432/postgres?sslmode=disable" up
migrate-down:
	migrate -source "file://db/migrations/" -database "postgres://postgres@localhost:5432/postgres?sslmode=disable" down

.PHONY: postgres, migrate-up, migrate-down