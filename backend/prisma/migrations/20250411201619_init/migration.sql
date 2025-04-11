-- DropForeignKey
ALTER TABLE `aichat` DROP FOREIGN KEY `AiChat_ai_conversation_id_fkey`;

-- DropForeignKey
ALTER TABLE `aiconversation` DROP FOREIGN KEY `AiConversation_owner_id_fkey`;

-- DropForeignKey
ALTER TABLE `mindfulsessions` DROP FOREIGN KEY `MindfulSessions_owner_id_fkey`;

-- DropForeignKey
ALTER TABLE `moodsubmission` DROP FOREIGN KEY `MoodSubmission_owner_id_fkey`;

-- DropForeignKey
ALTER TABLE `resetpasswordtoken` DROP FOREIGN KEY `ResetPasswordToken_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `thread` DROP FOREIGN KEY `Thread_owner_id_fkey`;

-- DropForeignKey
ALTER TABLE `threadcomment` DROP FOREIGN KEY `ThreadComment_owner_id_fkey`;

-- DropForeignKey
ALTER TABLE `threadcomment` DROP FOREIGN KEY `ThreadComment_thread_id_fkey`;

-- DropForeignKey
ALTER TABLE `threadcommentreply` DROP FOREIGN KEY `ThreadCommentReply_comment_id_fkey`;

-- DropForeignKey
ALTER TABLE `threadcommentreply` DROP FOREIGN KEY `ThreadCommentReply_owner_id_fkey`;

-- DropForeignKey
ALTER TABLE `todos` DROP FOREIGN KEY `Todos_owner_id_fkey`;

-- DropForeignKey
ALTER TABLE `verificationtoken` DROP FOREIGN KEY `VerificationToken_user_id_fkey`;

-- DropIndex
DROP INDEX `AiChat_ai_conversation_id_fkey` ON `aichat`;

-- DropIndex
DROP INDEX `AiConversation_owner_id_fkey` ON `aiconversation`;

-- DropIndex
DROP INDEX `MindfulSessions_owner_id_fkey` ON `mindfulsessions`;

-- DropIndex
DROP INDEX `MoodSubmission_owner_id_fkey` ON `moodsubmission`;

-- DropIndex
DROP INDEX `ResetPasswordToken_user_id_fkey` ON `resetpasswordtoken`;

-- DropIndex
DROP INDEX `Thread_owner_id_fkey` ON `thread`;

-- DropIndex
DROP INDEX `ThreadComment_owner_id_fkey` ON `threadcomment`;

-- DropIndex
DROP INDEX `ThreadComment_thread_id_fkey` ON `threadcomment`;

-- DropIndex
DROP INDEX `ThreadCommentReply_comment_id_fkey` ON `threadcommentreply`;

-- DropIndex
DROP INDEX `ThreadCommentReply_owner_id_fkey` ON `threadcommentreply`;

-- DropIndex
DROP INDEX `Todos_owner_id_fkey` ON `todos`;

-- DropIndex
DROP INDEX `VerificationToken_user_id_fkey` ON `verificationtoken`;

-- AddForeignKey
ALTER TABLE `MoodSubmission` ADD CONSTRAINT `MoodSubmission_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Todos` ADD CONSTRAINT `Todos_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MindfulSessions` ADD CONSTRAINT `MindfulSessions_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VerificationToken` ADD CONSTRAINT `VerificationToken_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResetPasswordToken` ADD CONSTRAINT `ResetPasswordToken_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AiConversation` ADD CONSTRAINT `AiConversation_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AiChat` ADD CONSTRAINT `AiChat_ai_conversation_id_fkey` FOREIGN KEY (`ai_conversation_id`) REFERENCES `AiConversation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Thread` ADD CONSTRAINT `Thread_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ThreadComment` ADD CONSTRAINT `ThreadComment_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ThreadComment` ADD CONSTRAINT `ThreadComment_thread_id_fkey` FOREIGN KEY (`thread_id`) REFERENCES `Thread`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ThreadCommentReply` ADD CONSTRAINT `ThreadCommentReply_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ThreadCommentReply` ADD CONSTRAINT `ThreadCommentReply_comment_id_fkey` FOREIGN KEY (`comment_id`) REFERENCES `ThreadComment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
