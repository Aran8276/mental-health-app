/*
  Warnings:

  - Added the required column `body` to the `AiChat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `AiConversation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `aichat` ADD COLUMN `body` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `aiconversation` ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `thread` MODIFY `body` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `threadcomment` MODIFY `body` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `threadcommentreply` MODIFY `body` TEXT NOT NULL;

-- CreateTable
CREATE TABLE `UserData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `bio` LONGTEXT NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
