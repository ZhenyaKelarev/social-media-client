/*
  Warnings:

  - You are about to drop the column `giftId` on the `GiftCard` table. All the data in the column will be lost.
  - Added the required column `giftCardId` to the `Gift` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `GiftCard` DROP FOREIGN KEY `GiftCard_giftId_fkey`;

-- AlterTable
ALTER TABLE `Gift` ADD COLUMN `giftCardId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `GiftCard` DROP COLUMN `giftId`;

-- AddForeignKey
ALTER TABLE `Gift` ADD CONSTRAINT `Gift_giftCardId_fkey` FOREIGN KEY (`giftCardId`) REFERENCES `GiftCard`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
