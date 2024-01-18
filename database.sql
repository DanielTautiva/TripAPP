CREATE TABLE "User" (
  "id" SERIAL PRIMARY KEY,
  "email" TEXT UNIQUE NOT NULL,
  "fullname" TEXT,
  "phone_number" TEXT UNIQUE NOT NULL,
  "photo" TEXT,
  "password" TEXT,
  "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3),
  "status" BOOLEAN
);

CREATE TABLE "Cards" (
  "id_card" SERIAL PRIMARY KEY,
  "id_user" INT,
  "token" TEXT NOT NULL,
  FOREIGN KEY ("id_user") REFERENCES "User" ("id")
);

CREATE TABLE "TripStatus" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT,
  "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3)
);

CREATE TABLE "Trip" (
  "id" SERIAL PRIMARY KEY,
  "id_user" INT,
  "id_driver" INT,
  "start_location" TEXT,
  "end_location" TEXT,
  "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  "complete_at" TIMESTAMP(3),
  "status" INT DEFAULT 1,
  FOREIGN KEY ("id_user") REFERENCES "User" ("id"),
  FOREIGN KEY ("id_driver") REFERENCES "User" ("id"),
  FOREIGN KEY ("status") REFERENCES "TripStatus" ("id")
);

CREATE TABLE "Transaction" (
  "id" SERIAL PRIMARY KEY,
  "id_trip" INT,
  "id_wompi" TEXT UNIQUE NOT NULL,
  "reference" TEXT UNIQUE NOT NULL,
  "total_amount" DOUBLE PRECISION,
  "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3),
  FOREIGN KEY ("id_trip") REFERENCES "Trip" ("id")
);

CREATE TABLE "Roles" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT,
  "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3)
);

CREATE TABLE "RolesByUser" (
  "id" SERIAL PRIMARY KEY,
  "id_user" INT,
  "id_role" INT,
  FOREIGN KEY ("id_user") REFERENCES "User" ("id"),
  FOREIGN KEY ("id_role") REFERENCES "Roles" ("id")
);


