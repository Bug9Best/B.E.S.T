/*
  Warnings:

  - You are about to drop the column `content` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `courseContentId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `mimetype` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `userReceiver` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `userSender` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Notify` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ChatUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Forum` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ForumComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NotifyUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `course_content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `course_instructor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `course_user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `creatorId` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseCode` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Notify` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ChatUser" DROP CONSTRAINT "ChatUser_chatId_fkey";

-- DropForeignKey
ALTER TABLE "ChatUser" DROP CONSTRAINT "ChatUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_authorId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_courseContentId_fkey";

-- DropForeignKey
ALTER TABLE "Forum" DROP CONSTRAINT "Forum_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Forum" DROP CONSTRAINT "Forum_courseId_fkey";

-- DropForeignKey
ALTER TABLE "ForumComment" DROP CONSTRAINT "ForumComment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "ForumComment" DROP CONSTRAINT "ForumComment_forumId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_userReceiver_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_userSender_fkey";

-- DropForeignKey
ALTER TABLE "NotifyUser" DROP CONSTRAINT "NotifyUser_notifyId_fkey";

-- DropForeignKey
ALTER TABLE "NotifyUser" DROP CONSTRAINT "NotifyUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "course_content" DROP CONSTRAINT "course_content_courseId_fkey";

-- DropForeignKey
ALTER TABLE "course_instructor" DROP CONSTRAINT "course_instructor_courseId_fkey";

-- DropForeignKey
ALTER TABLE "course_instructor" DROP CONSTRAINT "course_instructor_userId_fkey";

-- DropForeignKey
ALTER TABLE "course_user" DROP CONSTRAINT "course_user_courseId_fkey";

-- DropForeignKey
ALTER TABLE "course_user" DROP CONSTRAINT "course_user_userId_fkey";

-- DropIndex
DROP INDEX "Course_courseId_key";

-- DropIndex
DROP INDEX "Course_title_key";

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "content",
DROP COLUMN "updatedAt",
ADD COLUMN     "creatorId" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "updatedAt",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "authorId",
DROP COLUMN "courseId",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "courseCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "File" DROP COLUMN "courseContentId",
DROP COLUMN "mimetype",
DROP COLUMN "size",
DROP COLUMN "type",
DROP COLUMN "url",
ADD COLUMN     "courseId" INTEGER,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "path" TEXT NOT NULL,
ADD COLUMN     "postId" INTEGER;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "message",
DROP COLUMN "updatedAt",
DROP COLUMN "userReceiver",
DROP COLUMN "userSender",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "receiverId" INTEGER NOT NULL,
ADD COLUMN     "senderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Notify" DROP COLUMN "updatedAt",
ADD COLUMN     "status" "NotifyStatus" NOT NULL DEFAULT 'UNREAD',
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "updatedAt",
ADD COLUMN     "fname" TEXT NOT NULL,
ADD COLUMN     "lname" TEXT NOT NULL;

-- DropTable
DROP TABLE "ChatUser";

-- DropTable
DROP TABLE "Forum";

-- DropTable
DROP TABLE "ForumComment";

-- DropTable
DROP TABLE "NotifyUser";

-- DropTable
DROP TABLE "course_content";

-- DropTable
DROP TABLE "course_instructor";

-- DropTable
DROP TABLE "course_user";

-- DropEnum
DROP TYPE "FileType";

-- CreateTable
CREATE TABLE "OwnerCourse" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "OwnerCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToChat" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToChat_AB_unique" ON "_UserToChat"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToChat_B_index" ON "_UserToChat"("B");

-- AddForeignKey
ALTER TABLE "OwnerCourse" ADD CONSTRAINT "OwnerCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnerCourse" ADD CONSTRAINT "OwnerCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notify" ADD CONSTRAINT "Notify_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToChat" ADD CONSTRAINT "_UserToChat_A_fkey" FOREIGN KEY ("A") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToChat" ADD CONSTRAINT "_UserToChat_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
