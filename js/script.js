let tombolHamburger = document.getElementById('tombol-hamburger');
let navigasiUtama = document.querySelector('header');

if (tombolHamburger != null && navigasiUtama != null) {
    tombolHamburger.textContent = '☰';
    tombolHamburger.addEventListener('click', () => {
        navigasiUtama.classList.toggle('header-menu-terbuka');
    });
}

let statusLoginUser = localStorage.getItem('statusLogin');
let emailUserAktif = localStorage.getItem('emailLoginAktif');
let tombolLoginHeader = document.getElementById('tombol-login-header');

if (tombolLoginHeader != null) {
    if (statusLoginUser === 'sudah_masuk') {
        let namaPengguna = "Admin";
        if (emailUserAktif !== 'admin@westerhome.com') {
            let daftarAkunTersimpan = JSON.parse(localStorage.getItem('daftarAkunUser')) || [];
            for (let i = 0; i < daftarAkunTersimpan.length; i++) {
                if (daftarAkunTersimpan[i].email === emailUserAktif) {
                    namaPengguna = daftarAkunTersimpan[i].nama;
                    break;
                }
            }
        }

        let wadahInfoUser = document.createElement('div');
        wadahInfoUser.className = 'info-user-header';
        
        let elemenTeksNama = document.createElement('span');
        elemenTeksNama.textContent = "Halo, " + namaPengguna;
        elemenTeksNama.className = "teks-nama-user";
        
        tombolLoginHeader.parentNode.insertBefore(wadahInfoUser, tombolLoginHeader);
        wadahInfoUser.appendChild(elemenTeksNama);
        wadahInfoUser.appendChild(tombolLoginHeader);

        tombolLoginHeader.textContent = "Keluar";
        tombolLoginHeader.href = "#";
        tombolLoginHeader.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('statusLogin');
            localStorage.removeItem('emailLoginAktif');
            window.location.href = "../index.html";
        });
    } else {
        tombolLoginHeader.textContent = "Masuk";
    }
}

if (emailUserAktif === 'admin@westerhome.com' && statusLoginUser === 'sudah_masuk') {
    let headerMenuNav = document.querySelector('header nav');
    let apakahDiDalamHalamanAdmin = window.location.pathname.includes('admin.html');
    if (headerMenuNav != null && !document.getElementById('tautan-menu-admin') && !apakahDiDalamHalamanAdmin) {
        let tautanAdmin = document.createElement('a');
        tautanAdmin.id = 'tautan-menu-admin';
        tautanAdmin.href = window.location.pathname.includes('/html/') ? './admin.html' : './html/admin.html';
        tautanAdmin.textContent = "Kelola Adopsi";
        headerMenuNav.appendChild(tautanAdmin);
    }
}

let wadahFormMasuk = document.getElementById('wadah-form-masuk');
let wadahFormRegistrasi = document.getElementById('wadah-form-registrasi');
let tautanKeRegistrasi = document.getElementById('tautan-ke-registrasi');
let tautanKeMasuk = document.getElementById('tautan-ke-masuk');

if (tautanKeRegistrasi != null && tautanKeMasuk != null) {
    tautanKeRegistrasi.addEventListener('click', (e) => {
        e.preventDefault(); 
        wadahFormMasuk.classList.add("hilangkan-elemen"); 
        wadahFormMasuk.classList.remove("tampilkan-elemen"); 
        wadahFormRegistrasi.classList.add("tampilkan-elemen"); 
        wadahFormRegistrasi.classList.remove("hilangkan-elemen"); 
    });

    tautanKeMasuk.addEventListener('click', (e) => {
        e.preventDefault();
        wadahFormRegistrasi.classList.add("hilangkan-elemen"); 
        wadahFormRegistrasi.classList.remove("tampilkan-elemen"); 
        wadahFormMasuk.classList.add("tampilkan-elemen"); 
        wadahFormMasuk.classList.remove("hilangkan-elemen"); 
    });
}

let inputNamaRegistrasi = document.getElementById('input-nama-registrasi');
if (inputNamaRegistrasi != null) {
    inputNamaRegistrasi.addEventListener('input', (e) => {
        if (e.target.value.startsWith(' ')) {
            e.target.value = e.target.value.trimStart();
        }
    });
}

let formRegistrasiAkun = document.getElementById('form-registrasi-akun');
if (formRegistrasiAkun != null) {
    formRegistrasiAkun.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        let emailBaruInput = document.getElementById('input-email-registrasi').value.trim();
        let passwordBaruInput = document.getElementById('input-password-registrasi').value;
        let namaBaruInput = document.getElementById('input-nama-registrasi').value.trim();
        
        if (namaBaruInput.length <= 5) {
            alert("Maaf, Nama Lengkap harus lebih dari 5 huruf!");
            return;
        }

        if (passwordBaruInput.length <= 5) {
            alert("Maaf, Kata Sandi harus lebih dari 5 karakter!");
            return;
        }

        if (emailBaruInput === 'admin@westerhome.com') {
            alert("Email ini tidak dapat digunakan karena merupakan akun khusus admin.");
            return;
        }

        if (!emailBaruInput.endsWith('@gmail.com')) {
            alert("Maaf, pendaftaran harus menggunakan email dengan domain @gmail.com!");
            return;
        }

        let namaSebelumDomain = emailBaruInput.replace('@gmail.com', '');
        if (namaSebelumDomain.length <= 5) {
            alert("Maaf, nama email (sebelum @gmail.com) harus lebih dari 5 huruf!");
            return;
        }

        let daftarAkunTersimpan = JSON.parse(localStorage.getItem('daftarAkunUser')) || [];
        
        let apakahEmailTerdaftar = false;
        for (let i = 0; i < daftarAkunTersimpan.length; i++) {
            if (daftarAkunTersimpan[i].email === emailBaruInput) {
                apakahEmailTerdaftar = true;
                break;
            }
        }

        if (apakahEmailTerdaftar) {
            alert("Maaf, email tersebut sudah terdaftar! Silakan gunakan email lain atau langsung masuk.");
            return; 
        }

        daftarAkunTersimpan.push({
            nama: namaBaruInput,
            email: emailBaruInput,
            password: passwordBaruInput
        });

        localStorage.setItem('daftarAkunUser', JSON.stringify(daftarAkunTersimpan));
        
        alert("Akun berhasil dibuat! Silakan masuk menggunakan email dan kata sandi barumu.");
        
        wadahFormRegistrasi.classList.add("hilangkan-elemen");
        wadahFormRegistrasi.classList.remove("tampilkan-elemen");
        wadahFormMasuk.classList.add("tampilkan-elemen");
        wadahFormMasuk.classList.remove("hilangkan-elemen");
        
        formRegistrasiAkun.reset(); 
    });
}

let formMasukAkun = document.getElementById('form-masuk-akun');
if (formMasukAkun != null) {
    formMasukAkun.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        let emailMasukInput = document.getElementById('input-email-masuk').value.trim();
        let passwordMasukInput = document.getElementById('input-password-masuk').value;
        
        if (emailMasukInput === 'admin@westerhome.com' && passwordMasukInput === 'admin123') {
            localStorage.setItem('statusLogin', 'sudah_masuk');
            localStorage.setItem('emailLoginAktif', 'admin@westerhome.com');
            alert("Berhasil masuk sebagai Admin!");
            window.location.href = "./admin.html";
            return;
        }
        
        let daftarAkunTersimpan = JSON.parse(localStorage.getItem('daftarAkunUser')) || [];
        let dataAkunCocok = null;

        for (let i = 0; i < daftarAkunTersimpan.length; i++) {
            if (daftarAkunTersimpan[i].email === emailMasukInput && daftarAkunTersimpan[i].password === passwordMasukInput) {
                dataAkunCocok = daftarAkunTersimpan[i];
                break;
            }
        }
        
        if (dataAkunCocok != null) {
            localStorage.setItem('statusLogin', 'sudah_masuk');
            localStorage.setItem('emailLoginAktif', dataAkunCocok.email);
            alert(`Berhasil masuk! Selamat datang kembali, ${dataAkunCocok.nama}.`);
            window.location.href = "../index.html"; 
        } else {
            alert("Oops! Email atau kata sandi kamu salah. Silakan periksa kembali.");
        }
    });
}

let dataHewanApi = [];
const urlApiHewan = 'https://rifqi-api.vercel.app/rifqi/api';

fetch(urlApiHewan)
.then((res) => res.json())
.then((tampil) => {
    dataHewanApi = tampil;

    let daftarHewanDiadopsiLokal = JSON.parse(localStorage.getItem('daftarHewanDiadopsi')) || [];
    
    for (let i = 0; i < dataHewanApi.length; i++) {
        if (daftarHewanDiadopsiLokal.includes(dataHewanApi[i].nama)) {
            dataHewanApi[i].status = "Sudah Diadopsi";
        }
    }

    let elemenTotalHewan = document.getElementById('angka-total-hewan');
    if(elemenTotalHewan != null) elemenTotalHewan.textContent = dataHewanApi.length;

    let hitungJumlahStatus = (file,status) =>{
        let temp = 0;
        for(let i = 0 ; i < file.length ; i++){
            if(file[i].status == status) temp = temp +1;
        }
        return temp;
    }

    let elemenSiapAdopsi = document.getElementById('angka-siap-adopsi');
    if(elemenSiapAdopsi != null) elemenSiapAdopsi.textContent = hitungJumlahStatus(dataHewanApi,"Tersedia");

    let elemenSudahAdopsi = document.getElementById('angka-sudah-adopsi');
    if(elemenSudahAdopsi != null) elemenSudahAdopsi.textContent = hitungJumlahStatus(dataHewanApi,"Sudah Diadopsi");

    let hitungJenisBerbeda = (file) => {
        let kumpulanJenisUnik = [];
        for(let i = 0; i < file.length; i++){
            let apakahJenisSudahAda = false;
            for(let j = 0; j < kumpulanJenisUnik.length; j++){
                if(kumpulanJenisUnik[j] == file[i].jenis) apakahJenisSudahAda = true;
            }
            if(apakahJenisSudahAda == false) kumpulanJenisUnik.push(file[i].jenis);
        }
        return kumpulanJenisUnik.length;
    }

    let elemenJenisHewan = document.getElementById('angka-jenis-hewan');
    if(elemenJenisHewan != null) elemenJenisHewan.textContent = hitungJenisBerbeda(dataHewanApi);

    let tampilkanModalDetail = (hewan) => {
        let elemenPopupLama = document.getElementById('popup-detail-hewan');
        if (elemenPopupLama != null) elemenPopupLama.remove();

        let lapisanLatarPopup = document.createElement('div');
        lapisanLatarPopup.id = "popup-detail-hewan";
        lapisanLatarPopup.className = "latar-popup-detail";

        document.documentElement.classList.add('kunci-scroll-halaman');
        document.body.classList.add('kunci-scroll-halaman');

        let wadahKontenPopup = document.createElement('div');
        wadahKontenPopup.className = "wadah-popup-detail";

        let tombolTutupModal = document.createElement('span');
        tombolTutupModal.textContent = "×"; 
        tombolTutupModal.className = "tombol-tutup-popup";
        tombolTutupModal.addEventListener('click', () => { 
            lapisanLatarPopup.remove(); 
            document.documentElement.classList.remove('kunci-scroll-halaman');
            document.body.classList.remove('kunci-scroll-halaman');
        });

        let gambarHewanPopup = document.createElement('img');
        gambarHewanPopup.src = hewan.gambar;
        gambarHewanPopup.alt = hewan.nama;
        gambarHewanPopup.className = "gambar-popup-detail";

        let wadahTeksPopup = document.createElement('div');
        wadahTeksPopup.className = "wadah-info-popup";
        wadahTeksPopup.id = "konten-info-popup";

        let elemenJudulPopup = document.createElement('h2');
        elemenJudulPopup.className = "judul-nama-popup";
        elemenJudulPopup.textContent = `Detail Lengkap ${hewan.nama}`;
        
        wadahTeksPopup.appendChild(elemenJudulPopup);

        for (let kunci in hewan) {
            if (kunci !== "gambar") { 
                let paragrafKeterangan = document.createElement('p');
                let labelKeterangan = document.createElement('strong');
                
                let teksLabelKapital = kunci.charAt(0).toUpperCase() + kunci.slice(1);
                labelKeterangan.textContent = `${teksLabelKapital}: `;
                
                paragrafKeterangan.appendChild(labelKeterangan);
                paragrafKeterangan.appendChild(document.createTextNode(hewan[kunci]));
                wadahTeksPopup.appendChild(paragrafKeterangan);
            }
        }

        let tombolAksiAdopsi = document.createElement('a');
        tombolAksiAdopsi.href = "#";
        tombolAksiAdopsi.className = "tombol-adopsi-popup";
        
        if (hewan.status === "Sudah Diadopsi") {
            tombolAksiAdopsi.textContent = `Telah Diadopsi`;
            tombolAksiAdopsi.className = "tombol-adopsi-popup tombol-adopsi-nonaktif";
            tombolAksiAdopsi.addEventListener('click', (e) => {
                e.preventDefault();
                alert(`Maaf, ${hewan.nama} sudah menemukan keluarga baru.`);
            });
        } else {
            tombolAksiAdopsi.textContent = `Adopsi ${hewan.nama} Sekarang!`;
            tombolAksiAdopsi.addEventListener('click', (e) => {
                e.preventDefault();
                if (localStorage.getItem('statusLogin') === 'sudah_masuk') {
                    if (localStorage.getItem('emailLoginAktif') === 'admin@westerhome.com') {
                        alert("Akun Admin tidak dapat mengajukan adopsi hewan.");
                        return;
                    }
                    localStorage.setItem('hewanDipilihAdopsi', JSON.stringify(hewan));
                    let apakahDiDalamFolderHtml = window.location.pathname.includes('/html/');
                    window.location.href = apakahDiDalamFolderHtml ? "./form-adopsi.html" : "./html/form-adopsi.html";
                } else {
                    alert("Oops! Kamu harus masuk (login) terlebih dahulu sebelum bisa mengadopsi.");
                    let apakahDiDalamFolderHtml = window.location.pathname.includes('/html/');
                    window.location.href = apakahDiDalamFolderHtml ? "./login.html" : "./html/login.html";
                }
            });
        }
        
        wadahTeksPopup.appendChild(tombolAksiAdopsi);

        wadahKontenPopup.appendChild(tombolTutupModal);
        wadahKontenPopup.appendChild(gambarHewanPopup);
        wadahKontenPopup.appendChild(wadahTeksPopup);
        
        lapisanLatarPopup.appendChild(wadahKontenPopup);
        document.body.appendChild(lapisanLatarPopup);
    }

    let buatElemenKartu = (hewan) => {
        let elemenKartuUtama = document.createElement('article');
        elemenKartuUtama.className = "kartu-item-hewan";

        let bagianAtasKartu = document.createElement('div');
        bagianAtasKartu.className = "wadah-gambar-kartu";

        let elemenGambarKartu = document.createElement('img');
        elemenGambarKartu.src = hewan.gambar;
        elemenGambarKartu.alt = hewan.nama;
        elemenGambarKartu.className = "gambar-kartu";

        let elemenBadgeStatus = document.createElement('div');
        elemenBadgeStatus.className = "badge-status-hewan";
        if (hewan.status.toUpperCase() !== "TERSEDIA") {
            elemenBadgeStatus.classList.add("badge-status-diadopsi");
        }
        elemenBadgeStatus.textContent = hewan.status.toUpperCase(); 

        bagianAtasKartu.appendChild(elemenGambarKartu);
        bagianAtasKartu.appendChild(elemenBadgeStatus);

        let bagianBawahKartu = document.createElement('div');
        bagianBawahKartu.className = "wadah-info-kartu";

        let elemenNamaKartu = document.createElement('div');
        elemenNamaKartu.className = "nama-hewan-kartu";
        elemenNamaKartu.textContent = hewan.nama;

        let elemenDetailKartu = document.createElement('div');
        elemenDetailKartu.className = "deskripsi-hewan-kartu";
        elemenDetailKartu.textContent = hewan.jenis + " • " + hewan.ras + " • " + hewan.umur;

        let tombolLihatKartu = document.createElement('a');
        tombolLihatKartu.className = "tombol-detail-kartu";
        tombolLihatKartu.href = "#"; 
        tombolLihatKartu.textContent = "Lihat Detail";
        
        tombolLihatKartu.addEventListener('click', (event) => {
            event.preventDefault();
            tampilkanModalDetail(hewan);
        });

        bagianBawahKartu.appendChild(elemenNamaKartu);
        bagianBawahKartu.appendChild(elemenDetailKartu);
        bagianBawahKartu.appendChild(tombolLihatKartu);

        elemenKartuUtama.appendChild(bagianAtasKartu);
        elemenKartuUtama.appendChild(bagianBawahKartu);
        
        return elemenKartuUtama;
    }

    let wadahGridBeranda = document.getElementById('grid-hewan-beranda');
    let wadahGridSemuaHewan = document.getElementById('grid-semua-hewan');
    let elemenInputCariRas = document.getElementById('input-cari-ras');
    let elemenWadahFilter = document.getElementById('wadah-tombol-filter');
    let filterJenisAktif = "Semua";
    let teksCariRas = "";

    let daftarHewanTersedia = [];
    for(let i = 0; i < dataHewanApi.length; i++){
        if(dataHewanApi[i].status !== "Sudah Diadopsi") {
            daftarHewanTersedia.push(dataHewanApi[i]);
        }
    }

    if(wadahGridBeranda != null) {
        wadahGridBeranda.textContent = ""; 
        if (daftarHewanTersedia.length > 0) {
            let waktuSaatIni = new Date();
            let nomorMingguSaatIni = Math.floor(waktuSaatIni.getTime() / (1000 * 60 * 60 * 24 * 7));
            let indeksMulaiRotasi = nomorMingguSaatIni % daftarHewanTersedia.length;
            let jumlahHewanTampil = 0;

            for(let i = 0; i < daftarHewanTersedia.length; i++){
                let indeksKartuRotasi = (indeksMulaiRotasi + i) % daftarHewanTersedia.length;
                if(jumlahHewanTampil < 4){
                    wadahGridBeranda.appendChild(buatElemenKartu(daftarHewanTersedia[indeksKartuRotasi]));
                    jumlahHewanTampil = jumlahHewanTampil + 1;
                }
            }
        } else {
            let elemenPesanKosong = document.createElement('p');
            elemenPesanKosong.className = "teks-pesan-kosong-tengah";
            elemenPesanKosong.textContent = "Semua hewan minggu ini sudah menemukan keluarga baru!";
            wadahGridBeranda.appendChild(elemenPesanKosong);
        }
    }

    let buatTombolFilter = () => {
        if (elemenWadahFilter != null) {
            elemenWadahFilter.textContent = "";
            let kumpulanJenisUnik = ["Semua"];
            for (let i = 0; i < dataHewanApi.length; i++) {
                let apakahJenisSudahAda = false;
                for (let j = 0; j < kumpulanJenisUnik.length; j++) {
                    if (kumpulanJenisUnik[j] === dataHewanApi[i].jenis) apakahJenisSudahAda = true;
                }
                if (apakahJenisSudahAda === false) kumpulanJenisUnik.push(dataHewanApi[i].jenis);
            }

            for (let i = 0; i < kumpulanJenisUnik.length; i++) {
                let tombolKategori = document.createElement('button');
                tombolKategori.className = "tombol-filter-kategori";
                if (kumpulanJenisUnik[i] === filterJenisAktif) {
                    tombolKategori.classList.add("filter-kategori-aktif");
                }
                tombolKategori.textContent = kumpulanJenisUnik[i];
                tombolKategori.addEventListener('click', () => {
                    filterJenisAktif = kumpulanJenisUnik[i];
                    buatTombolFilter();
                    tampilkanSemuaHewanTersaring();
                });
                elemenWadahFilter.appendChild(tombolKategori);
            }
        }
    };

    let tampilkanSemuaHewanTersaring = () => {
        if (wadahGridSemuaHewan != null) {
            wadahGridSemuaHewan.textContent = "";
            let daftarHewanHasilFilter = [];

            for (let i = 0; i < dataHewanApi.length; i++) {
                let apakahJenisCocok = false;
                if (filterJenisAktif === "Semua" || dataHewanApi[i].jenis === filterJenisAktif) {
                    apakahJenisCocok = true;
                }

                let apakahRasCocok = true;
                if (teksCariRas.trim() !== "") {
                    let teksPencarianKecil = teksCariRas.toLowerCase();
                    if (!dataHewanApi[i].ras.toLowerCase().includes(teksPencarianKecil)) {
                        apakahRasCocok = false;
                    }
                }

                if (apakahJenisCocok && apakahRasCocok) {
                    daftarHewanHasilFilter.push(dataHewanApi[i]);
                }
            }

            if (daftarHewanHasilFilter.length > 0) {
                for (let i = 0; i < daftarHewanHasilFilter.length; i++) {
                    wadahGridSemuaHewan.appendChild(buatElemenKartu(daftarHewanHasilFilter[i]));
                }
            } else {
                let elemenPesanKosong = document.createElement('p');
                elemenPesanKosong.className = "teks-pesan-kosong-tengah";
                elemenPesanKosong.textContent = "Pencarian tidak ditemukan.";
                wadahGridSemuaHewan.appendChild(elemenPesanKosong);
            }
        }
    };
    
    if (wadahGridSemuaHewan != null) {
        buatTombolFilter();
        tampilkanSemuaHewanTersaring();
    }

    if (elemenInputCariRas != null) {
        elemenInputCariRas.addEventListener('input', (e) => {
            teksCariRas = e.target.value;
            tampilkanSemuaHewanTersaring();
        });
    }

})
.catch((err) => {
    console.error(err);
});

let elemenFormAdopsi = document.getElementById('form-pengajuan-adopsi');
let elemenInputNamaAdopsi = document.getElementById('input-nama-hewan-adopsi');

let dataHewanDipilih = JSON.parse(localStorage.getItem('hewanDipilihAdopsi'));
if (elemenInputNamaAdopsi != null && dataHewanDipilih != null) {
    elemenInputNamaAdopsi.value = dataHewanDipilih.nama;
}

if (elemenFormAdopsi != null) {
    elemenFormAdopsi.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let alamatPengajuInput = document.getElementById('input-alamat-pengaju').value.trim();
        let alasanPengajuInput = document.getElementById('input-alasan-pengaju').value.trim();
        let emailPenggunaLogin = localStorage.getItem('emailLoginAktif');

        if (alamatPengajuInput.length <= 5) {
            alert("Maaf, Alamat Lengkap harus lebih dari 5 huruf!");
            return;
        }

        if (alasanPengajuInput.length <= 5) {
            alert("Maaf, Alasan Ingin Mengadopsi harus lebih dari 5 huruf!");
            return;
        }

        if (dataHewanDipilih != null) {
            alert(`Pengajuan adopsi untuk ${dataHewanDipilih.nama} berhasil dikirim! Menunggu konfirmasi Admin.`);

            let daftarSemuaRiwayat = JSON.parse(localStorage.getItem('riwayatAdopsi')) || [];
            let waktuPengajuan = new Date().toLocaleDateString('id-ID');
            
            daftarSemuaRiwayat.push({
                idPengajuan: 'req_' + new Date().getTime() + Math.floor(Math.random() * 1000),
                userEmail: emailPenggunaLogin,
                nama: dataHewanDipilih.nama,
                jenis: dataHewanDipilih.jenis,
                gambar: dataHewanDipilih.gambar,
                alamat: alamatPengajuInput,
                alasan: alasanPengajuInput,
                tanggal: waktuPengajuan,
                statusAdmin: 'Diproses'
            });
            
            localStorage.setItem('riwayatAdopsi', JSON.stringify(daftarSemuaRiwayat));
            localStorage.removeItem('hewanDipilihAdopsi');
            window.location.href = "./riwayat.html";
        }
    });
}

let wadahDaftarRiwayatAdmin = document.getElementById('wadah-riwayat-admin');
if (wadahDaftarRiwayatAdmin != null) {
    wadahDaftarRiwayatAdmin.textContent = ""; 

    if (emailUserAktif !== 'admin@westerhome.com' || statusLoginUser !== 'sudah_masuk') {
        let elemenPesanTolakAkses = document.createElement('p');
        elemenPesanTolakAkses.className = "teks-pesan-kosong teks-pesan-ditolak";
        elemenPesanTolakAkses.textContent = "Akses ditolak! Halaman ini khusus untuk Admin.";
        wadahDaftarRiwayatAdmin.appendChild(elemenPesanTolakAkses);
    } else {
        let daftarSemuaRiwayat = JSON.parse(localStorage.getItem('riwayatAdopsi')) || [];

        if (daftarSemuaRiwayat.length === 0) {
            let elemenPesanTanpaData = document.createElement('p');
            elemenPesanTanpaData.className = "teks-pesan-kosong";
            elemenPesanTanpaData.textContent = "Belum ada pengajuan adopsi dari user.";
            wadahDaftarRiwayatAdmin.appendChild(elemenPesanTanpaData);
        } else {
            for (let i = 0; i < daftarSemuaRiwayat.length; i++) {
                let dataPengajuan = daftarSemuaRiwayat[i];
                
                let elemenKartuAdmin = document.createElement('div');
                elemenKartuAdmin.className = "kartu-item-riwayat";

                let apakahSudahAdaKeputusan = (dataPengajuan.statusAdmin === 'Disetujui' || dataPengajuan.statusAdmin === 'Ditolak');
                
                let elemenGambarAdmin = document.createElement('img');
                elemenGambarAdmin.src = dataPengajuan.gambar;
                elemenGambarAdmin.alt = dataPengajuan.nama;
                elemenGambarAdmin.className = "gambar-hewan-riwayat";

                let elemenInfoRiwayat = document.createElement('div');
                elemenInfoRiwayat.className = "wadah-info-riwayat info-riwayat-melebar";

                let judulNamaHewanRiwayat = document.createElement('h3');
                judulNamaHewanRiwayat.textContent = `Hewan: ${dataPengajuan.nama} (${dataPengajuan.jenis})`;
                elemenInfoRiwayat.appendChild(judulNamaHewanRiwayat);

                let kumpulanLabelInformasi = [
                    { label: "Pengaju", value: dataPengajuan.userEmail },
                    { label: "Alamat", value: dataPengajuan.alamat },
                    { label: "Alasan", value: dataPengajuan.alasan },
                    { label: "Tanggal", value: dataPengajuan.tanggal }
                ];

                for (let data of kumpulanLabelInformasi) {
                    let paragrafDetailRiwayat = document.createElement('p');
                    let teksTebalLabel = document.createElement('strong');
                    teksTebalLabel.textContent = `${data.label}: `;
                    paragrafDetailRiwayat.appendChild(teksTebalLabel);
                    paragrafDetailRiwayat.appendChild(document.createTextNode(data.value));
                    elemenInfoRiwayat.appendChild(paragrafDetailRiwayat);
                }

                let paragrafStatusRiwayat = document.createElement('p');
                if (dataPengajuan.statusAdmin === 'Disetujui') {
                    paragrafStatusRiwayat.className = "teks-status-hijau";
                } else if (dataPengajuan.statusAdmin === 'Ditolak') {
                    paragrafStatusRiwayat.className = "teks-status-merah";
                } else {
                    paragrafStatusRiwayat.className = "teks-status-kuning";
                }
                paragrafStatusRiwayat.textContent = `Status: ${dataPengajuan.statusAdmin}`;
                elemenInfoRiwayat.appendChild(paragrafStatusRiwayat);

                let wadahTombolAksiAdmin = document.createElement('div');
                wadahTombolAksiAdmin.className = "wadah-aksi-admin";

                let elemenTombolTerima = document.createElement('button');
                elemenTombolTerima.setAttribute('data-id', dataPengajuan.idPengajuan);
                elemenTombolTerima.textContent = "Terima";

                let elemenTombolTolak = document.createElement('button');
                elemenTombolTolak.setAttribute('data-id', dataPengajuan.idPengajuan);
                elemenTombolTolak.textContent = "Tolak";

                if (apakahSudahAdaKeputusan) {
                    elemenTombolTerima.disabled = true;
                    elemenTombolTerima.className = "tombol-setuju-admin tombol-aksi-nonaktif";
                    
                    elemenTombolTolak.disabled = true;
                    elemenTombolTolak.className = "tombol-tolak-admin tombol-aksi-nonaktif";
                } else {
                    elemenTombolTerima.className = "tombol-setuju-admin";
                    elemenTombolTolak.className = "tombol-tolak-admin";
                }

                wadahTombolAksiAdmin.appendChild(elemenTombolTerima);
                wadahTombolAksiAdmin.appendChild(elemenTombolTolak);

                elemenKartuAdmin.appendChild(elemenGambarAdmin);
                elemenKartuAdmin.appendChild(elemenInfoRiwayat);
                elemenKartuAdmin.appendChild(wadahTombolAksiAdmin);

                wadahDaftarRiwayatAdmin.appendChild(elemenKartuAdmin);
            }

            let kumpulanTombolSetuju = document.querySelectorAll('.tombol-setuju-admin');
            for (let i = 0; i < kumpulanTombolSetuju.length; i++) {
                if (!kumpulanTombolSetuju[i].disabled) {
                    kumpulanTombolSetuju[i].addEventListener('click', function() {
                        let idPengajuanTarget = this.getAttribute('data-id');
                        let dataRiwayatPenyimpanan = JSON.parse(localStorage.getItem('riwayatAdopsi')) || [];
                        let namaHewanDiacc = "";

                        for (let j = 0; j < dataRiwayatPenyimpanan.length; j++) {
                            if (dataRiwayatPenyimpanan[j].idPengajuan === idPengajuanTarget) {
                                if (dataRiwayatPenyimpanan[j].statusAdmin !== 'Diproses') return; 
                                dataRiwayatPenyimpanan[j].statusAdmin = 'Disetujui';
                                namaHewanDiacc = dataRiwayatPenyimpanan[j].nama;
                            }
                        }

                        for (let j = 0; j < dataRiwayatPenyimpanan.length; j++) {
                            if (dataRiwayatPenyimpanan[j].nama === namaHewanDiacc && dataRiwayatPenyimpanan[j].idPengajuan !== idPengajuanTarget) {
                                dataRiwayatPenyimpanan[j].statusAdmin = 'Ditolak';
                            }
                        }

                        localStorage.setItem('riwayatAdopsi', JSON.stringify(dataRiwayatPenyimpanan));

                        let daftarHewanTelahDiadopsi = JSON.parse(localStorage.getItem('daftarHewanDiadopsi')) || [];
                        if (!daftarHewanTelahDiadopsi.includes(namaHewanDiacc)) {
                            daftarHewanTelahDiadopsi.push(namaHewanDiacc);
                            localStorage.setItem('daftarHewanDiadopsi', JSON.stringify(daftarHewanTelahDiadopsi));
                        }

                        alert("Pengajuan adopsi disetujui! Pengajuan ini kini terkunci dan pengajuan lain untuk hewan yang sama otomatis ditolak.");
                        window.location.reload();
                    });
                }
            }

            let kumpulanTombolTolak = document.querySelectorAll('.tombol-tolak-admin');
            for (let i = 0; i < kumpulanTombolTolak.length; i++) {
                if (!kumpulanTombolTolak[i].disabled) {
                    kumpulanTombolTolak[i].addEventListener('click', function() {
                        let idPengajuanTarget = this.getAttribute('data-id');
                        let dataRiwayatPenyimpanan = JSON.parse(localStorage.getItem('riwayatAdopsi')) || [];

                        for (let j = 0; j < dataRiwayatPenyimpanan.length; j++) {
                            if (dataRiwayatPenyimpanan[j].idPengajuan === idPengajuanTarget) {
                                if (dataRiwayatPenyimpanan[j].statusAdmin !== 'Diproses') return; 
                                dataRiwayatPenyimpanan[j].statusAdmin = 'Ditolak';
                            }
                        }

                        localStorage.setItem('riwayatAdopsi', JSON.stringify(dataRiwayatPenyimpanan));
                        alert("Pengajuan adopsi telah ditolak dan statusnya kini terkunci.");
                        window.location.reload();
                    });
                }
            }
        }
    }
}

let wadahRiwayatUser = document.getElementById('wadah-riwayat-user');
if (wadahRiwayatUser != null) {
    wadahRiwayatUser.textContent = ""; 
    
    if (localStorage.getItem('statusLogin') !== 'sudah_masuk') {
        let elemenPesanTanpaData = document.createElement('p');
        elemenPesanTanpaData.className = "teks-pesan-kosong";
        elemenPesanTanpaData.textContent = "Silakan masuk (login) terlebih dahulu untuk melihat riwayat adopsi kamu.";
        wadahRiwayatUser.appendChild(elemenPesanTanpaData);
    } else {
        let emailPenggunaLogin = localStorage.getItem('emailLoginAktif');
        let daftarSemuaRiwayat = JSON.parse(localStorage.getItem('riwayatAdopsi')) || [];
        
        let riwayatKhususAkun = [];
        for(let i = 0; i < daftarSemuaRiwayat.length; i++) {
            if(daftarSemuaRiwayat[i].userEmail === emailPenggunaLogin) {
                riwayatKhususAkun.push(daftarSemuaRiwayat[i]);
            }
        }
        
        if (riwayatKhususAkun.length === 0) {
            let elemenPesanTanpaData = document.createElement('p');
            elemenPesanTanpaData.className = "teks-pesan-kosong";
            elemenPesanTanpaData.textContent = "Kamu belum memiliki riwayat pengajuan adopsi. Yuk mulai cari sahabat barumu!";
            wadahRiwayatUser.appendChild(elemenPesanTanpaData);
        } else {
            for(let i = 0; i < riwayatKhususAkun.length; i++) {
                let dataRiwayatSatuan = riwayatKhususAkun[i];
                let elemenKartuRiwayatUser = document.createElement('div');
                elemenKartuRiwayatUser.className = "kartu-item-riwayat";
                
                let teksStatusUntukUser = "Pengajuan Diproses";
                
                if (dataRiwayatSatuan.statusAdmin === 'Disetujui') {
                    teksStatusUntukUser = "Disetujui (Selamat! Hewan siap diambil)";
                } else if (dataRiwayatSatuan.statusAdmin === 'Ditolak') {
                    teksStatusUntukUser = "Ditolak (Maaf, pengajuan tidak dapat diterima)";
                }
                
                let elemenGambarRiwayatUser = document.createElement('img');
                elemenGambarRiwayatUser.src = dataRiwayatSatuan.gambar;
                elemenGambarRiwayatUser.alt = dataRiwayatSatuan.nama;
                elemenGambarRiwayatUser.className = "gambar-hewan-riwayat";

                let elemenInfoRiwayat = document.createElement('div');
                elemenInfoRiwayat.className = "wadah-info-riwayat";

                let judulNamaHewanUser = document.createElement('h3');
                judulNamaHewanUser.textContent = dataRiwayatSatuan.nama;
                elemenInfoRiwayat.appendChild(judulNamaHewanUser);

                let kumpulanLabelInformasi = [
                    { label: "Jenis", value: dataRiwayatSatuan.jenis },
                    { label: "Alamat", value: dataRiwayatSatuan.alamat },
                    { label: "Alasan", value: dataRiwayatSatuan.alasan },
                    { label: "Tanggal Pengajuan", value: dataRiwayatSatuan.tanggal }
                ];

                for (let data of kumpulanLabelInformasi) {
                    let paragrafDetailRiwayat = document.createElement('p');
                    paragrafDetailRiwayat.textContent = `${data.label}: ${data.value}`;
                    elemenInfoRiwayat.appendChild(paragrafDetailRiwayat);
                }

                let paragrafStatusRiwayat = document.createElement('p');
                if (dataRiwayatSatuan.statusAdmin === 'Disetujui') {
                    paragrafStatusRiwayat.className = "teks-status-hijau";
                } else if (dataRiwayatSatuan.statusAdmin === 'Ditolak') {
                    paragrafStatusRiwayat.className = "teks-status-merah";
                } else {
                    paragrafStatusRiwayat.className = "teks-status-kuning";
                }
                paragrafStatusRiwayat.textContent = `Status: ${teksStatusUntukUser}`;
                elemenInfoRiwayat.appendChild(paragrafStatusRiwayat);

                elemenKartuRiwayatUser.appendChild(elemenGambarRiwayatUser);
                elemenKartuRiwayatUser.appendChild(elemenInfoRiwayat);
                wadahRiwayatUser.appendChild(elemenKartuRiwayatUser);
            }
        }
    }
}

let tombolScrollKeAtas = document.getElementById("tombol-scroll-atas");
if (tombolScrollKeAtas != null) {
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            tombolScrollKeAtas.style.display = "block";
        } else {
            tombolScrollKeAtas.style.display = "none";
        }
    });
    tombolScrollKeAtas.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}