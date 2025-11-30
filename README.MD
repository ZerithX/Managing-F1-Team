SISTEM INFORMASI MANAJEMEN DRIVER DAN TEAM PRINCIPAL F1

Program ini merupakan Final Project Backend sederhana bertema Sistem Manajemen Driver dan Team Principal Formula 1.
Pengguna dapat melihat daftar driver dan team principal, menambah data baru, memperbarui, dan menghapus data.
Program dibuat menggunakan Node.js dan Express, serta tidak menggunakan database (data disimpan dalam file data.js menggunakan array).

Isi Program

1. Manajemen Driver
Setiap driver memiliki atribut:
ID
Nama
Team
Nomor
Points

Fitur:
READ : Menampilkan seluruh daftar driver
READ : Menampilkan driver berdasarkan ID
CREATE : Menambahkan driver baru
UPDATE : Mengubah team / nomor driver
PARTIAL UPDATE : Menambah atau mengurangi poin driver
DELETE : Menghapus data driver

2. Manajemen Team Principal
Setiap team principal memiliki atribut:
ID
Nama
Team
Negara

Fitur:
READ : Menampilkan seluruh daftar team principal
READ : Menampilkan team principal berdasarkan ID
CREATE : Menambahkan team principal baru
UPDATE : Mengubah team atau negara
DELETE : Menghapus team principal

Untuk menjalankan program, buka terminal pada visual studio code. Lalu menjalankan command:
"npm install" untuk menginstall dependencies. Setelah itu,
"npm start" untuk menjalankan server. Lalu,
Server berjalan di: http://localhost:3000
Lalu menggunakan aplikasi Postman untuk Mengetes Endpoint

Daftar Endpoint API

Driver
GET /drivers → Menampilkan driver dengan filtering & sorting
GET /drivers/all → Menampilkan semua driver
GET /drivers/:id → Menampilkan driver berdasarkan ID
POST /drivers → Menambahkan driver baru
PATCH /drivers/:id → Mengupdate team atau nomor driver
PATCH /drivers/:id/points/add → Menambah poin driver
PATCH /drivers/:id/points/subtract → Mengurangi poin driver
DELETE /drivers/:id → Menghapus driver

Team Principal
GET /teamprincipals → Menampilkan team principal dengan filtering & sorting
GET /teamprincipals/all → Menampilkan semua team principal
GET /teamprincipals/:id → Menampilkan team principal berdasarkan ID
POST /teamprincipals → Menambahkan team principal baru
PATCH /teamprincipals/:id → Mengupdate team atau negara
DELETE /teamprincipals/:id → Menghapus team principal