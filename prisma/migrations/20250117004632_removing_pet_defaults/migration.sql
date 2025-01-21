/*
  Warnings:

  - You are about to drop the column `enviroment` on the `pets` table. All the data in the column will be lost.
  - Added the required column `environment` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Environment" AS ENUM ('Amplo', 'Pequeno', 'Médio', 'Externo', 'Interno');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "enviroment",
ADD COLUMN     "environment" "Environment" NOT NULL,
ALTER COLUMN "age" DROP DEFAULT,
ALTER COLUMN "size" DROP DEFAULT,
ALTER COLUMN "energy" DROP DEFAULT,
ALTER COLUMN "independency" DROP DEFAULT;

-- DropEnum
DROP TYPE "Enviroment";
