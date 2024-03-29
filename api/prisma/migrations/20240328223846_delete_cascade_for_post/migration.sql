-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_postId_fkey`;

-- DropForeignKey
ALTER TABLE `Like` DROP FOREIGN KEY `Like_postId_fkey`;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
