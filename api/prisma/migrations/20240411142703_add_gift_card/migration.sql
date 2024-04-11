/*
  Warnings:

  - You are about to drop the column `img` on the `Gift` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Gift` DROP COLUMN `img`;

-- CreateTable
CREATE TABLE `GiftCard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `img` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `giftId` INTEGER NOT NULL,

    UNIQUE INDEX `GiftCard_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GiftCard` ADD CONSTRAINT `GiftCard_giftId_fkey` FOREIGN KEY (`giftId`) REFERENCES `Gift`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
