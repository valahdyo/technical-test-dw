-- Membuat database dan menggunakannya
CREATE DATABASE  IF NOT EXISTS perpustakaan;
USE perpustakaan;

-- Membuat tabel categories
CREATE TABLE if NOT EXISTS categories (
  categoryID int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  PRIMARY KEY (categoryID)
);

-- Input data ke tabel categories
INSERT INTO categories (name)
VALUES ("Aljabar"),
("Komputer"),
("Statistika");

-- Membuat tabel daftar buku
CREATE TABLE if NOT EXISTS books (
 bookID int not NULL AUTO_INCREMENT,
 name varchar(255) NOT NULL,
 stok int,
 image BLOB,
 deskripsi varchar(255),
 category_id int,
 PRIMARY KEY (bookID),
 FOREIGN KEY (category_id) REFERENCES categories (categoryID)
  );

-- Input buku-buku ke tabel books
INSERT INTO books (name, stok, deskripsi, category_id)
VALUES ("Menguasai Pemrograman Berorientasi Objek + CD", 3, "Konsep dari buku Menguasai Pemrograman Berorientasi Objek atau dikenal sebagai Object Programming (OOP)", 2),
("Matlab Untuk Pembelajaran Dan Riset Sinyal Digital+Cd", 1, "Buku ini menjadi jawaban atas kebutuhan para mahasiswa, dosen, maupun periset yang ingin terjun langsung dalam memahami pemrosesan sinyal digital.", 2),
("ALJABAR LINEAR DASAR BERBASIS IT (SCILAB, GeoGebra dan Microsoft Mathematics)", 4, "Aljabar berasal dari bahasa arab al-jabr yang berarti pengumpulan bagian yang rusak. Aljabar adalah cabang matematika yang mempelajari struktur, hubungan dan kuantitas", 1),
("Mudah Dan Menyenangkan Mengolah Data Dengan Spss Statistika 26", 2, "Banyak dari pengolah data penelitian (user) yang mengolah datanya tanpa bisa membacanya. Buku ini memberikan pemahaman dengan mudah tentang konsep sederhana statistika dan aplikasi dengan SPSS pada tiap bahasannya", 3);


-- Menampilkan semua buku
SELECT * FROM books

-- Menampilkan buku per kategori, dengan field yang ditampilkan adalah nama kategori, nama buku, stock
SELECT categories.name, books.name, books.stok 
FROM books
INNER JOIN categories ON books.category_id = categories.categoryID;

-- Menampilkan detail buku berdasarkan id (contoh id = 1)
SELECT * FROM books WHERE bookID = 1;

-- Menambahkan kategori ke tabel categories
INSERT INTO categories (name)
VALUES ("Coffee");

-- Menambahkan buku ke tabel books
INSERT INTO books (name, stok, deskripsi, category_id)
VALUES ("The Essentials Of Coffee Brewing", 1, "The Essentials of Coffee Brewing berisikan berbagai hal penting tentang proses penyeduhan kopi dengan metode manual.", 4);


