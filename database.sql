CREATE TABLE "User" (
  "id" UUID PRIMARY KEY,
  "email" Text UNIQUE NOT NULL,
  "fullname" Text,
  "phone_number" text UNIQUE NOT NULL,
  "photo" Text,
  "password" Text,
  "created_at" Timestamp(3) DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" Timestamp(3),
  "status" Boolean
);

CREATE TABLE "Cards" (
  "id_card" UUID PRIMARY KEY,
  "id_user" int,
  "token" text NOT NULL
);

CREATE TABLE "Trip" (
  "id" UUID PRIMARY KEY,
  "id_user" int,
  "id_driver" int,
  "start_location" text,
  "end_location" text,
  "created_at" Timestamp(3) DEFAULT (CURRENT_TIMESTAMP),
  "complete_at" Timestamp(3),
  "status" int DEFAULT 1
);

CREATE TABLE "TripStatus" (
  "id" UUID PRIMARY KEY,
  "name" text,
  "created_at" Timestamp(3) DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" Timestamp(3)
);

CREATE TABLE "Transaction" (
  "id" UUID PRIMARY KEY,
  "id_trip" int,
  "id_wompi" Text UNIQUE NOT NULL,
  "reference" Text UNIQUE NOT NULL,
  "total_amount" Double,
  "created_at" Timestamp(3) DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" Timestamp(3)
);

CREATE TABLE "RolesByUser" (
  "id" UUID PRIMARY KEY,
  "id_user" int,
  "id_role" int
);

CREATE TABLE "Roles" (
  "id" UUID PRIMARY KEY,
  "name" text,
  "created_at" Timestamp(3) DEFAULT (CURRENT_TIMESTAMP),
  "updated_at" Timestamp(3)
);

ALTER TABLE "Cards" ADD FOREIGN KEY ("id_user") REFERENCES "User" ("id");

ALTER TABLE "Trip" ADD FOREIGN KEY ("id_user") REFERENCES "User" ("id");

ALTER TABLE "Trip" ADD FOREIGN KEY ("id_driver") REFERENCES "User" ("id");

ALTER TABLE "Trip" ADD FOREIGN KEY ("status") REFERENCES "TripStatus" ("id");

ALTER TABLE "Transaction" ADD FOREIGN KEY ("id_trip") REFERENCES "Trip" ("id");

ALTER TABLE "RolesByUser" ADD FOREIGN KEY ("id_user") REFERENCES "User" ("id");

ALTER TABLE "RolesByUser" ADD FOREIGN KEY ("id_role") REFERENCES "Roles" ("id");
