# Kelompok 4 - FSW1

| Nama Anggota                      |
| --------------------------------- |
| _Ananda Ias Falah Surya Gemilang_ |
| _Muhammad Suryandoko_             |
| _Nadilla Izzati Abhinaya_         |
| _Naufal Ady Saputro_              |
| _Zhafira Amanda_                  |
|                                   |

F-FSW24001086 - Imam Taufiq Hermawan

<hr>

# API CRUD Restaurant

Proyek ini bertujuan untuk mengelola pesanan makanan dalam sebuah restoran atau layanan pengiriman makanan. Dalam proyek ini, terdapat beberapa jenis relasi antara entitas yang berbeda, seperti makanan, kategori makanan, pengguna, pesanan, dan restoran.

## Skema Relasi

1. **Kategori Makanan (Category) dan Makanan (Foods)**:

   - Setiap makanan memiliki kategori yang terkait dengannya.
   - Satu kategori dapat memiliki banyak makanan, tetapi satu makanan hanya terkait dengan satu kategori.

2. **Pesanan (Orders) dan Makanan (Foods)**:

   - Setiap pesanan terdiri dari beberapa makanan.
   - Satu makanan bisa termasuk dalam banyak pesanan yang berbeda.

3. **Pesanan (Orders) dan Pengguna (User)**:

   - Setiap pesanan terkait dengan satu pengguna yang melakukan pesanan tersebut.
   - Satu pengguna dapat memiliki banyak pesanan, tetapi satu pesanan hanya terkait dengan satu pengguna.

4. **Makanan (Foods) dan Restoran (Restaurant)**:
   - Setiap makanan berasal dari satu restoran.
   - Satu restoran dapat memiliki banyak makanan, tetapi satu makanan hanya berasal dari satu restoran.

## Penggunaan

1. Pastikan MongoDB berjalan di latar belakang.
2. Jalankan `npm start` untuk memulai server.
3. API akan berjalan di http://localhost:8000/ secara default.
4. Gunakan aplikasi seperti Postman untuk mengakses dan menguji endpoint-endpoint API.

## Endpoint API

### Endpoint Auth

| Method | Endpoint  | Deskripsi                  |
| ------ | --------- | -------------------------- |
| POST   | /register | Mendaftarkan pengguna baru |
| POST   | /login    | Masuk ke akun pengguna     |

### Endpoint user

| Method | Endpoint        | Deskripsi                       |
| ------ | --------------- | ------------------------------- |
| GET    | /getUser        | Mendapatkan informasi pengguna  |
| PUT    | /updateUser     | Memperbarui profil pengguna     |
| POST   | /updatePassword | Memperbarui kata sandi pengguna |
| POST   | /resetPassword  | Mereset kata sandi pengguna     |
| DELETE | /deleteUser/:id | Menghapus profil pengguna       |

### Endpoint category

| Method | Endpoint    | Deskripsi                     |
| ------ | ----------- | ----------------------------- |
| POST   | /create     | Membuat kategori baru         |
| GET    | /getAll     | Mendapatkan semua kategori    |
| PUT    | /update/:id | Memperbarui kategori yang ada |
| DELETE | /delete/:id | Menghapus kategori yang ada   |

### Endpoint food

| Method | Endpoint             | Deskripsi                                           |
| ------ | -------------------- | --------------------------------------------------- |
| POST   | /create              | Membuat makanan baru                                |
| GET    | /getAll              | Mendapatkan semua makanan                           |
| GET    | /get/:id             | Mendapatkan makanan berdasarkan ID                  |
| GET    | /getByRestaurant/:id | Mendapatkan makanan berdasarkan restoran            |
| PUT    | /update/:id          | Memperbarui makanan                                 |
| DELETE | /delete/:id          | Menghapus makanan                                   |
| POST   | /placeorder          | Menempatkan pesanan                                 |
| POST   | /orderStatus/:id     | Mengubah status pesanan (memerlukan otorisasi role) |

### Endpoint restaurant

| Method | Endpoint    | Deskripsi                           |
| ------ | ----------- | ----------------------------------- |
| POST   | /create     | Membuat restoran baru               |
| GET    | /getAll     | Mendapatkan semua restoran          |
| GET    | /get/:id    | Mendapatkan restoran berdasarkan ID |
| DELETE | /delete/:id | Menghapus restoran                  |

### Catatan Penting

1. **Pemakaian Postman**: Pastikan untuk menggunakan aplikasi seperti Postman untuk mengakses dan menguji endpoint-endpoint API. Pastikan untuk menyertakan token otentikasi yang diperlukan dalam header saat mengakses endpoint yang memerlukan otorisasi.

2. **Memperhatikan Endpoint**: Perhatikan dengan baik alamat endpoint yang disediakan untuk setiap fitur API. Pastikan menggunakan endpoint yang sesuai dengan tindakan yang ingin di lakukan.

3. **Perhatikan Otorisasi**: Beberapa endpoint memerlukan otentikasi pengguna atau otorisasi khusus (misalnya, peran tertentu). Pastikan untuk menyertakan token otentikasi yang valid dan memeriksa peran pengguna saat mengakses endpoint yang memerlukan otorisasi.

```javascript
// Route untuk URL root
app.use("/auth", require("./server/routes/auth"));
app.use("/users", require("./server/routes/user"));
app.use("/rest", require("./server/routes/restaurant"));
app.use("/foods", require("./server/routes/food"));
app.use("/cat", require("./server/routes/category"));
```

Pastikan untuk menyesuaikan versi API dan rute yang digunakan sesuai dengan kebutuhan
