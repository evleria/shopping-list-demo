postgres:
	docker run --name shopping-list-db --network shopping-list-nw -e POSTGRES_HOST_AUTH_METHOD=trust -p 5432:5432 --mount source=shopping-list-demo_pg-data,target=/var/lib/postgresql/data -d --rm postgres:13-alpine
migrate-up:
	migrate -source "file://db/migrations/" -database "postgres://postgres@localhost:5432/postgres?sslmode=disable" up
migrate-down:
	migrate -source "file://db/migrations/" -database "postgres://postgres@localhost:5432/postgres?sslmode=disable" down
build-image:
	docker build -t shopping-list .
run-backend-container:
	docker container run -d -p 8080:3000 --name shopping-list-backend --network shopping-list-nw -e STATIC_PATH=out/build -e DATABASE_URL="postgres://postgres@shopping-list-db:5432/postgres?sslmode=disable" shopping-list


.PHONY: postgres, migrate-up, migrate-down, build-image, run-backend-container