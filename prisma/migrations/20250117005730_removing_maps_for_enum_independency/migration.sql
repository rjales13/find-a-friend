/*
  Warnings:

  - The values [Baixo (precisa de companhia sempre),Médio (nem sempre precisa de companhia),Alto (nunca precisa de companhia)] on the enum `Independency` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Independency_new" AS ENUM ('Baixo', 'Médio', 'Alto');
ALTER TABLE "pets" ALTER COLUMN "independency" TYPE "Independency_new" USING ("independency"::text::"Independency_new");
ALTER TYPE "Independency" RENAME TO "Independency_old";
ALTER TYPE "Independency_new" RENAME TO "Independency";
DROP TYPE "Independency_old";
COMMIT;
