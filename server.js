const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Set EJS sebagai view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware untuk akses file statis dari folder "public"
app.use(express.static(path.join(__dirname, 'public')));

// Route halaman utama
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Portofolio Saya'
  });
});

// Route halaman "Tentang Saya"
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Tentang Saya'
  });
});

// Route halaman Galeri
app.get('/gallery', (req, res) => {
  res.render('gallery', {
    title: 'Galeri'
  });
});

// ✅ Route halaman Galeri Album (harus ada file views/gallery-album.ejs)
app.get('/gallery-album', (req, res) => {
  res.render('gallery-album', {
    title: 'Galeri Album'
  });
});

// Route halaman Kontak
app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Kontak Saya'
  });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
