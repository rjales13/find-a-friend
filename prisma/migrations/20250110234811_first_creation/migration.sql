-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ORG', 'MEMBER');

-- CreateEnum
CREATE TYPE "Age" AS ENUM ('Filhote', 'Adulto', 'Idoso');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('Pequenino', 'Médio', 'Grande');

-- CreateEnum
CREATE TYPE "Energy" AS ENUM ('Baixa', 'Média', 'Alta');

-- CreateEnum
CREATE TYPE "Independency" AS ENUM ('Baixo (precisa de companhia sempre)', 'Médio (nem sempre precisa de companhia)', 'Alto (nunca precisa de companhia)');

-- CreateEnum
CREATE TYPE "Enviroment" AS ENUM ('Amplo', 'Pequeno', 'Médio', 'Externo', 'Interno');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" TEXT,
    "aditional_description" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ORG',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "age" "Age" NOT NULL DEFAULT 'Filhote',
    "size" "Size" NOT NULL DEFAULT 'Pequenino',
    "energy" "Energy" NOT NULL DEFAULT 'Baixa',
    "independency" "Independency" NOT NULL DEFAULT 'Baixo (precisa de companhia sempre)',
    "enviroment" "Enviroment" NOT NULL DEFAULT 'Amplo',
    "user_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requirements" (
    "id" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "requirements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_whatsapp_key" ON "users"("whatsapp");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requirements" ADD CONSTRAINT "requirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
