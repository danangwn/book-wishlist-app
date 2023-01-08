-- CreateTable
CREATE TABLE "wishlist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "book_id" TEXT NOT NULL,
    "added_date" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "wishlist_id_key" ON "wishlist"("id");
