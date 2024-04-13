-- AlterTable
ALTER TABLE `GiftCard` ADD COLUMN `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Notification` ADD COLUMN `fromUserId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_fromUserId_fkey` FOREIGN KEY (`fromUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
