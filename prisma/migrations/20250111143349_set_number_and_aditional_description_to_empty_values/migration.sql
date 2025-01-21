/*
  Warnings:

  - Made the column `number` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `aditional_description` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "number" SET NOT NULL,
ALTER COLUMN "number" SET DEFAULT '',
ALTER COLUMN "aditional_description" SET NOT NULL,
ALTER COLUMN "aditional_description" SET DEFAULT '';
