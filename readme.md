# CMSS Scrape

Script ini dibuat untuk kebutuhan scraping data CMSS. Mohon untuk menggunakan script ini dengan bijak. Jika ada kesalahan silahkan hubungi pembuat script ini

- Author: Satriyo Unggul Wicaksono
- Email: mail@satrio.dev

**Thanks to:**

- My Daughter
- My Wife
- My Parent
- BMKG Cilacap

### Cara Menggunakan

1. Dibutuhkan docker & docker compose (install terlebih dahulu jika belum ada)
2. Silahkan clone repository ini dengan cara `git clone https://github.com/satrijo/cmss_scrape.git`
3. Kemudian pindah ke direktori cmss_scrape
4. Jalankan perintah `docker compose up -d`
5. Buka browser dan buka alamat `http://localhost:3113` alamat api ada di `http://localhost:3113/api/cmss?type=AAXX&cccc=WIIL&sum=2`
6. Menggunakan authorization di header dengan value: `AbjadIndonesia`

### Feature

- [x] Api Extract Data
- [ ] Api Input sandi
- [ ] Api Data Monitoring
- [ ] Gui Extract Data
- [ ] Gui Input Sandi
- [ ] Gui Data Monitoring
