/*
  Warnings:

  - You are about to drop the `Notify` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notify" DROP CONSTRAINT "Notify_userId_fkey";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "lectureId" INTEGER;

-- DropTable
DROP TABLE "Notify";

-- DropEnum
DROP TYPE "NotifyStatus";

-- CreateTable
CREATE TABLE "Lecture" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lecture_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lecture" ADD CONSTRAINT "Lecture_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE SET NULL ON UPDATE CASCADE;
