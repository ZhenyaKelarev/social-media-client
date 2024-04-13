/*
  Warnings:

  - Made the column `description` on table `GiftCard` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `GiftCard` MODIFY `description` VARCHAR(191) NOT NULL;
