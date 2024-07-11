-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('manager', 'professional');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRoles" NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "salt" TEXT NOT NULL,
    "confirmationToken" TEXT,
    "recoverToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
