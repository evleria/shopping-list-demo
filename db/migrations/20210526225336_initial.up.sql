CREATE TABLE "Items" (
    "id" SERIAL PRIMARY KEY,
    "name" varchar,
    "created_at" timestamp default now()
);
