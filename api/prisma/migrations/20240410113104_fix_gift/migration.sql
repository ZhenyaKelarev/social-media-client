/*
  Warnings:

  - Added the required column `gifterId` to the `Gift` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Gift` ADD COLUMN `gifterId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Gift` ADD CONSTRAINT `Gift_gifterId_fkey` FOREIGN KEY (`gifterId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
