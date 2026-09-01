let tombolMenu = document.getElementById('tombol-menu');
let navHeader = document.querySelector('header nav');

if (tombolMenu != null && navHeader != null) {
    tombolMenu.addEventListener('click', () => {
        navHeader.classList.toggle('nav-muncul');
    });
}

let isLoggedIn = localStorage.getItem('statusLogin');
let emailLoginAktif = localStorage.getItem('emailLoginAktif');
let tombolNavLogin = document.getElementById('tombol');

if (tombolNavLogin != null) {
    if (isLoggedIn === 'sudah_masuk') {
        tombolNavLogin.textContent = "Keluar";
        tombolNavLogin.href = "#";
        tombolNavLogin.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('statusLogin');
            localStorage.removeItem('emailLoginAktif');
            window.location.href = "../index.html";
        });
    } else {
        tombolNavLogin.textContent = "Masuk";
    }
}

if (emailLoginAktif === 'admin@westerhome.com' && isLoggedIn === 'sudah_masuk') {
    if (navHeader != null && !document.getElementById('menu-admin')) {
        let linkAdmin = document.createElement('a');
        linkAdmin.id = 'menu-admin';
        linkAdmin.href = window.location.pathname.includes('/html/') ? './admin.html' : './html/admin.html';
        navHeader.appendChild(linkAdmin);
    }
}

let wadahFormLogin = document.getElementById('wadah-form-login');
let wadahFormDaftar = document.getElementById('wadah-form-daftar');
let linkKeDaftar = document.getElementById('link-ke-daftar');
let linkKeLogin = document.getElementById('link-ke-login');

if (linkKeDaftar != null && linkKeLogin != null) {
    linkKeDaftar.addEventListener('click', (e) => {
        e.preventDefault(); 
        wadahFormLogin.classList.add("sembunyi"); 
        wadahFormLogin.classList.remove("tampil"); 
        wadahFormDaftar.classList.add("tampil"); 
        wadahFormDaftar.classList.remove("sembunyi"); 
    });

    linkKeLogin.addEventListener('click', (e) => {
        e.preventDefault();
        wadahFormDaftar.classList.add("sembunyi"); 
        wadahFormDaftar.classList.remove("tampil"); 
        wadahFormLogin.classList.add("tampil"); 
        wadahFormLogin.classList.remove("sembunyi"); 
    });
}

let formDaftar = document.getElementById('form-daftar');
if (formDaftar != null) {
    formDaftar.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        let emailBaru = document.getElementById('email-daftar').value.trim();
        let passBaru = document.getElementById('password-daftar').value;
        let namaBaru = document.getElementById('nama-daftar').value.trim();
        
        if (namaBaru.length <= 5) {
            alert("Maaf, Nama Lengkap harus lebih dari 5 huruf!");
            return;
        }

        if (passBaru.length <= 5) {
            alert("Maaf, Kata Sandi harus lebih dari 5 karakter!");
            return;
        }

        if (emailBaru === 'admin@westerhome.com') {
            alert("Email ini tidak dapat digunakan karena merupakan akun khusus admin.");
            return;
        }

        if (!emailBaru.endsWith('@gmail.com')) {
            alert("Maaf, pendaftaran harus menggunakan email dengan domain @gmail.com!");
            return;
        }

        let namaEmail = emailBaru.replace('@gmail.com', '');
        if (namaEmail.length <= 5) {
            alert("Maaf, nama email (sebelum @gmail.com) harus lebih dari 5 huruf!");
            return;
        }

        let daftarAkun = JSON.parse(localStorage.getItem('daftarAkunUser')) || [];
        
        let emailSudahAda = false;
        for (let i = 0; i < daftarAkun.length; i++) {
            if (daftarAkun[i].email === emailBaru) {
                emailSudahAda = true;
                break;
            }
        }

        if (emailSudahAda) {
            alert("Maaf, email tersebut sudah terdaftar! Silakan gunakan email lain atau langsung masuk.");
            return; 
        }

        daftarAkun.push({
            nama: namaBaru,
            email: emailBaru,
            password: passBaru
        });

        localStorage.setItem('daftarAkunUser', JSON.stringify(daftarAkun));
        
        alert("Akun berhasil dibuat! Silakan masuk menggunakan email dan kata sandi barumu.");
        
        wadahFormDaftar.classList.add("sembunyi");
        wadahFormDaftar.classList.remove("tampil");
        wadahFormLogin.classList.add("tampil");
        wadahFormLogin.classList.remove("sembunyi");
        
        formDaftar.reset(); 
    });
}

let formLogin = document.getElementById('form-login');
if (formLogin != null) {
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        let emailMasuk = document.getElementById('email').value.trim();
        let passMasuk = document.getElementById('password').value;
        
        if (emailMasuk === 'admin@westerhome.com' && passMasuk === 'admin123') {
            localStorage.setItem('statusLogin', 'sudah_masuk');
            localStorage.setItem('emailLoginAktif', 'admin@westerhome.com');
            alert("Berhasil masuk sebagai Admin!");
            window.location.href = "./admin.html";
            return;
        }
        
        let daftarAkun = JSON.parse(localStorage.getItem('daftarAkunUser')) || [];
        let akunDitemukan = null;

        for (let i = 0; i < daftarAkun.length; i++) {
            if (daftarAkun[i].email === emailMasuk && daftarAkun[i].password === passMasuk) {
                akunDitemukan = daftarAkun[i];
                break;
            }
        }
        
        if (akunDitemukan != null) {
            localStorage.setItem('statusLogin', 'sudah_masuk');
            localStorage.setItem('emailLoginAktif', akunDitemukan.email);
            alert(`Berhasil masuk! Selamat datang kembali, ${akunDitemukan.nama}.`);
            window.location.href = "../index.html"; 
        } else {
            alert("Oops! Email atau kata sandi kamu salah. Silakan periksa kembali.");
        }
    });
}

let data = [];
const url_api = 'https://rifqi-api.vercel.app/rifqi/api';

fetch(url_api)
.then((res) => res.json())
.then((tampil) => {
    data = tampil;

    let hewanDiadopsiLokal = JSON.parse(localStorage.getItem('daftarHewanDiadopsi')) || [];
    
    for (let i = 0; i < data.length; i++) {
        if (hewanDiadopsiLokal.includes(data[i].nama)) {
            data[i].status = "Sudah Diadopsi";
        }
    }

    let total = document.getElementById('total-hewan');
    if(total != null) total.textContent = data.length;

    let hitung = (file,status) =>{
        let temp = 0;
        for(let i = 0 ; i < file.length ; i++){
            if(file[i].status == status) temp = temp +1;
        }
        return temp;
    }

    let adopsi = document.getElementById('siap-adopsi');
    if(adopsi != null) adopsi.textContent = hitung(data,"Tersedia");

    let sudah_diadopsi = document.getElementById('sudah-adopsi');
    if(sudah_diadopsi != null) sudah_diadopsi.textContent = hitung(data,"Sudah Diadopsi");

    let jumlahJenis = (file) => {
        let daftarJenis = [];
        for(let i = 0; i < file.length; i++){
            let sudahAda = false;
            for(let j = 0; j < daftarJenis.length; j++){
                if(daftarJenis[j] == file[i].jenis) sudahAda = true;
            }
            if(sudahAda == false) daftarJenis.push(file[i].jenis);
        }
        return daftarJenis.length;
    }

    let jenis = document.getElementById('jenis-hewan');
    if(jenis != null) jenis.textContent = jumlahJenis(data);

    let tampilkanPopupDetail = (hewan) => {
        let popupLama = document.getElementById('popup-detail-hewan');
        if (popupLama != null) popupLama.remove();

        let overlay = document.createElement('div');
        overlay.id = "popup-detail-hewan";
        overlay.className = "popup-overlay";

        let kotakPopup = document.createElement('div');
        kotakPopup.className = "popup-kotak";

        let tombolTutup = document.createElement('span');
        tombolTutup.textContent = "×"; 
        tombolTutup.className = "popup-tutup";
        tombolTutup.addEventListener('click', () => { overlay.remove(); });

        let imgPopup = document.createElement('img');
        imgPopup.src = hewan.gambar;
        imgPopup.alt = hewan.nama;
        imgPopup.className = "popup-gambar";

        let popupInfo = document.createElement('div');
        popupInfo.className = "popup-info";
        popupInfo.id = "info-popup-id";

        let judulDetail = document.createElement('h2');
        judulDetail.className = "judul-detail-popup";
        judulDetail.textContent = `Detail Lengkap ${hewan.nama}`;
        
        popupInfo.appendChild(judulDetail);

        for (let kunci in hewan) {
            if (kunci !== "gambar") { 
                let pKeterangan = document.createElement('p');
                let strongTeks = document.createElement('strong');
                
                let namaKunci = kunci.charAt(0).toUpperCase() + kunci.slice(1);
                strongTeks.textContent = `${namaKunci}: `;
                
                pKeterangan.appendChild(strongTeks);
                pKeterangan.appendChild(document.createTextNode(hewan[kunci]));
                popupInfo.appendChild(pKeterangan);
            }
        }

        let tombolAdopsi = document.createElement('a');
        tombolAdopsi.href = "#";
        tombolAdopsi.className = "tombol-adopsi";
        
        if (hewan.status === "Sudah Diadopsi") {
            tombolAdopsi.textContent = `Telah Diadopsi`;
            tombolAdopsi.className = "tombol-adopsi tombol-adopsi-disabled";
            tombolAdopsi.addEventListener('click', (e) => {
                e.preventDefault();
                alert(`Maaf, ${hewan.nama} sudah menemukan keluarga baru.`);
            });
        } else {
            tombolAdopsi.textContent = `Adopsi ${hewan.nama} Sekarang!`;
            tombolAdopsi.addEventListener('click', (e) => {
                e.preventDefault();
                if (localStorage.getItem('statusLogin') === 'sudah_masuk') {
                    if (localStorage.getItem('emailLoginAktif') === 'admin@westerhome.com') {
                        alert("Akun Admin tidak dapat mengajukan adopsi hewan.");
                        return;
                    }
                    localStorage.setItem('hewanDipilihAdopsi', JSON.stringify(hewan));
                    let isDalamFolderHtml = window.location.pathname.includes('/html/');
                    window.location.href = isDalamFolderHtml ? "./form-adopsi.html" : "./html/form-adopsi.html";
                } else {
                    alert("Oops! Kamu harus masuk (login) terlebih dahulu sebelum bisa mengadopsi.");
                    let isDalamFolderHtml = window.location.pathname.includes('/html/');
                    window.location.href = isDalamFolderHtml ? "./login.html" : "./html/login.html";
                }
            });
        }
        
        popupInfo.appendChild(tombolAdopsi);

        kotakPopup.appendChild(tombolTutup);
        kotakPopup.appendChild(imgPopup);
        kotakPopup.appendChild(popupInfo);
        
        overlay.appendChild(kotakPopup);
        document.body.appendChild(overlay);
    }

    let buatKartu = (hewan) => {
        let kartu = document.createElement('article');
        kartu.className = "kartu-hewan";

        let wadahAtas = document.createElement('div');
        wadahAtas.className = "wadah-atas-kartu";

        let gambar = document.createElement('img');
        gambar.src = hewan.gambar;
        gambar.alt = hewan.nama;
        gambar.className = "gambar-hewan";

        let badge = document.createElement('div');
        badge.className = "badge-status";
        if (hewan.status.toUpperCase() !== "TERSEDIA") {
            badge.classList.add("badge-status-abu");
        }
        badge.textContent = hewan.status.toUpperCase(); 

        wadahAtas.appendChild(gambar);
        wadahAtas.appendChild(badge);

        let wadahBawah = document.createElement('div');
        wadahBawah.className = "wadah-bawah-kartu";

        let nama = document.createElement('div');
        nama.className = "nama-hewan";
        nama.textContent = hewan.nama;

        let detail = document.createElement('div');
        detail.className = "detail-hewan";
        detail.textContent = hewan.jenis + " • " + hewan.ras + " • " + hewan.umur;

        let tombolDetail = document.createElement('a');
        tombolDetail.className = "tombol-detail";
        tombolDetail.href = "#"; 
        tombolDetail.textContent = "Lihat Detail";
        
        tombolDetail.addEventListener('click', (event) => {
            event.preventDefault();
            tampilkanPopupDetail(hewan);
        });

        wadahBawah.appendChild(nama);
        wadahBawah.appendChild(detail);
        wadahBawah.appendChild(tombolDetail);

        kartu.appendChild(wadahAtas);
        kartu.appendChild(wadahBawah);
        
        return kartu;
    }

    let wadahBeranda = document.getElementById('daftar-hewan');
    let wadahSemua = document.getElementById('semua-hewan');
    let inputPencarian = document.getElementById('input-pencarian');
    let wadahFilter = document.getElementById('wadah-filter');
    let jenisAktif = "Semua";
    let rasPencarian = "";

    let hewanTersedia = [];
    for(let i = 0; i < data.length; i++){
        if(data[i].status !== "Sudah Diadopsi") {
            hewanTersedia.push(data[i]);
        }
    }

    if(wadahBeranda != null) {
        wadahBeranda.textContent = ""; 
        if (hewanTersedia.length > 0) {
            let sekarang = new Date();
            let mingguKe = Math.floor(sekarang.getTime() / (1000 * 60 * 60 * 24 * 7));
            let indexMulai = mingguKe % hewanTersedia.length;
            let jumlahDitampilkan = 0;

            for(let i = 0; i < hewanTersedia.length; i++){
                let indexRotasi = (indexMulai + i) % hewanTersedia.length;
                if(jumlahDitampilkan < 4){
                    wadahBeranda.appendChild(buatKartu(hewanTersedia[indexRotasi]));
                    jumlahDitampilkan = jumlahDitampilkan + 1;
                }
            }
        } else {
            let pKosong = document.createElement('p');
            pKosong.className = "pesan-kosong-tengah";
            pKosong.textContent = "Semua hewan minggu ini sudah menemukan keluarga baru!";
            wadahBeranda.appendChild(pKosong);
        }
    }

    let renderFilter = () => {
        if (wadahFilter != null) {
            wadahFilter.textContent = "";
            let daftarJenis = ["Semua"];
            for (let i = 0; i < data.length; i++) {
                let sudahAda = false;
                for (let j = 0; j < daftarJenis.length; j++) {
                    if (daftarJenis[j] === data[i].jenis) sudahAda = true;
                }
                if (sudahAda === false) daftarJenis.push(data[i].jenis);
            }

            for (let i = 0; i < daftarJenis.length; i++) {
                let btn = document.createElement('button');
                btn.className = "tombol-filter";
                if (daftarJenis[i] === jenisAktif) {
                    btn.classList.add("tombol-filter-aktif");
                }
                btn.textContent = daftarJenis[i];
                btn.addEventListener('click', () => {
                    jenisAktif = daftarJenis[i];
                    renderFilter();
                    renderSemuaHewan();
                });
                wadahFilter.appendChild(btn);
            }
        }
    };

    let renderSemuaHewan = () => {
        if (wadahSemua != null) {
            wadahSemua.textContent = "";
            let dataDisaring = [];

            for (let i = 0; i < data.length; i++) {
                let matchJenis = false;
                if (jenisAktif === "Semua" || data[i].jenis === jenisAktif) {
                    matchJenis = true;
                }

                let matchRas = true;
                if (rasPencarian.trim() !== "") {
                    let teksKecil = rasPencarian.toLowerCase();
                    if (!data[i].ras.toLowerCase().includes(teksKecil)) {
                        matchRas = false;
                    }
                }

                if (matchJenis && matchRas) {
                    dataDisaring.push(data[i]);
                }
            }

            if (dataDisaring.length > 0) {
                for (let i = 0; i < dataDisaring.length; i++) {
                    wadahSemua.appendChild(buatKartu(dataDisaring[i]));
                }
            } else {
                let pKosong = document.createElement('p');
                pKosong.className = "pesan-kosong-tengah";
                pKosong.textContent = "Pencarian tidak ditemukan.";
                wadahSemua.appendChild(pKosong);
            }
        }
    };
    
    if (wadahSemua != null) {
        renderFilter();
        renderSemuaHewan();
    }

    if (inputPencarian != null) {
        inputPencarian.addEventListener('input', (e) => {
            rasPencarian = e.target.value;
            renderSemuaHewan();
        });
    }

})
.catch((err) => {
    console.error(err);
});

let formAdopsiDetail = document.getElementById('form-adopsi-detail');
let inputNamaHewanForm = document.getElementById('nama-hewan-form');

let hewanTerpilih = JSON.parse(localStorage.getItem('hewanDipilihAdopsi'));
if (inputNamaHewanForm != null && hewanTerpilih != null) {
    inputNamaHewanForm.value = hewanTerpilih.nama;
}

if (formAdopsiDetail != null) {
    formAdopsiDetail.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let alamatAdopsi = document.getElementById('alamat-adopsi').value.trim();
        let alasanAdopsi = document.getElementById('alasan-adopsi').value.trim();
        let akunEmailAktif = localStorage.getItem('emailLoginAktif');

        if (alamatAdopsi.length <= 5) {
            alert("Maaf, Alamat Lengkap harus lebih dari 5 huruf!");
            return;
        }

        if (alasanAdopsi.length <= 5) {
            alert("Maaf, Alasan Ingin Mengadopsi harus lebih dari 5 huruf!");
            return;
        }

        if (hewanTerpilih != null) {
            alert(`Pengajuan adopsi untuk ${hewanTerpilih.nama} berhasil dikirim! Menunggu konfirmasi Admin.`);

            let semuaRiwayat = JSON.parse(localStorage.getItem('riwayatAdopsi')) || [];
            let tanggalSekarang = new Date().toLocaleDateString('id-ID');
            
            semuaRiwayat.push({
                idPengajuan: 'req_' + new Date().getTime() + Math.floor(Math.random() * 1000),
                userEmail: akunEmailAktif,
                nama: hewanTerpilih.nama,
                jenis: hewanTerpilih.jenis,
                gambar: hewanTerpilih.gambar,
                alamat: alamatAdopsi,
                alasan: alasanAdopsi,
                tanggal: tanggalSekarang,
                statusAdmin: 'Diproses'
            });
            
            localStorage.setItem('riwayatAdopsi', JSON.stringify(semuaRiwayat));
            localStorage.removeItem('hewanDipilihAdopsi');
            window.location.href = "./riwayat.html";
        }
    });
}

let wadahAdmin = document.getElementById('daftar-pengajuan-admin');
if (wadahAdmin != null) {
    wadahAdmin.textContent = ""; 

    if (emailLoginAktif !== 'admin@westerhome.com' || isLoggedIn !== 'sudah_masuk') {
        let pesanTolak = document.createElement('p');
        pesanTolak.className = "pesan-kosong pesan-tolak";
        pesanTolak.textContent = "Akses ditolak! Halaman ini khusus untuk Admin.";
        wadahAdmin.appendChild(pesanTolak);
    } else {
        let semuaRiwayat = JSON.parse(localStorage.getItem('riwayatAdopsi')) || [];

        if (semuaRiwayat.length === 0) {
            let pesanKosong = document.createElement('p');
            pesanKosong.className = "pesan-kosong";
            pesanKosong.textContent = "Belum ada pengajuan adopsi dari user.";
            wadahAdmin.appendChild(pesanKosong);
        } else {
            for (let i = 0; i < semuaRiwayat.length; i++) {
                let req = semuaRiwayat[i];
                
                let kotakAdmin = document.createElement('div');
                kotakAdmin.className = "item-riwayat";

                let sudahDiputuskan = (req.statusAdmin === 'Disetujui' || req.statusAdmin === 'Ditolak');
                
                let imgAdmin = document.createElement('img');
                imgAdmin.src = req.gambar;
                imgAdmin.alt = req.nama;
                imgAdmin.className = "gambar-riwayat";

                let infoRiwayat = document.createElement('div');
                infoRiwayat.className = "info-riwayat info-riwayat-flex";

                let judulHewan = document.createElement('h3');
                judulHewan.textContent = `Hewan: ${req.nama} (${req.jenis})`;
                infoRiwayat.appendChild(judulHewan);

                let dataInfo = [
                    { label: "Pengaju", value: req.userEmail },
                    { label: "Alamat", value: req.alamat },
                    { label: "Alasan", value: req.alasan },
                    { label: "Tanggal", value: req.tanggal }
                ];

                for (let data of dataInfo) {
                    let p = document.createElement('p');
                    let strong = document.createElement('strong');
                    strong.textContent = `${data.label}: `;
                    p.appendChild(strong);
                    p.appendChild(document.createTextNode(data.value));
                    infoRiwayat.appendChild(p);
                }

                let pStatus = document.createElement('p');
                if (req.statusAdmin === 'Disetujui') {
                    pStatus.className = "status-disetujui";
                } else if (req.statusAdmin === 'Ditolak') {
                    pStatus.className = "status-ditolak";
                } else {
                    pStatus.className = "status-diproses";
                }
                pStatus.textContent = `Status: ${req.statusAdmin}`;
                infoRiwayat.appendChild(pStatus);

                let bungkusTombol = document.createElement('div');
                bungkusTombol.className = "bungkus-tombol-admin";

                let tombolSetuju = document.createElement('button');
                tombolSetuju.setAttribute('data-id', req.idPengajuan);
                tombolSetuju.textContent = "Terima";

                let tombolTolak = document.createElement('button');
                tombolTolak.setAttribute('data-id', req.idPengajuan);
                tombolTolak.textContent = "Tolak";

                if (sudahDiputuskan) {
                    tombolSetuju.disabled = true;
                    tombolSetuju.className = "tombol-setuju tombol-admin-disabled";
                    
                    tombolTolak.disabled = true;
                    tombolTolak.className = "tombol-tolak tombol-admin-disabled";
                } else {
                    tombolSetuju.className = "tombol-setuju tombol-admin-terima";
                    tombolTolak.className = "tombol-tolak tombol-admin-tolak";
                }

                bungkusTombol.appendChild(tombolSetuju);
                bungkusTombol.appendChild(tombolTolak);

                kotakAdmin.appendChild(imgAdmin);
                kotakAdmin.appendChild(infoRiwayat);
                kotakAdmin.appendChild(bungkusTombol);

                wadahAdmin.appendChild(kotakAdmin);
            }

            let tombolSetuju = document.querySelectorAll('.tombol-setuju');
            for (let i = 0; i < tombolSetuju.length; i++) {
                tombolSetuju[i].addEventListener('click', function() {
                    let idTarget = this.getAttribute('data-id');
                    let riwayatData = JSON.parse(localStorage.getItem('riwayatAdopsi')) || [];
                    let hewanDisetujuiNama = "";

                    for (let j = 0; j < riwayatData.length; j++) {
                        if (riwayatData[j].idPengajuan === idTarget) {
                            if (riwayatData[j].statusAdmin !== 'Diproses') return; 
                            riwayatData[j].statusAdmin = 'Disetujui';
                            hewanDisetujuiNama = riwayatData[j].nama;
                        }
                    }

                    for (let j = 0; j < riwayatData.length; j++) {
                        if (riwayatData[j].nama === hewanDisetujuiNama && riwayatData[j].idPengajuan !== idTarget) {
                            riwayatData[j].statusAdmin = 'Ditolak';
                        }
                    }

                    localStorage.setItem('riwayatAdopsi', JSON.stringify(riwayatData));

                    let daftarAdopsiLokal = JSON.parse(localStorage.getItem('daftarHewanDiadopsi')) || [];
                    if (!daftarAdopsiLokal.includes(hewanDisetujuiNama)) {
                        daftarAdopsiLokal.push(hewanDisetujuiNama);
                        localStorage.setItem('daftarHewanDiadopsi', JSON.stringify(daftarAdopsiLokal));
                    }

                    alert("Pengajuan adopsi disetujui! Pengajuan ini kini terkunci dan pengajuan lain untuk hewan yang sama otomatis ditolak.");
                    window.location.reload();
                });
            }

            let tombolTolak = document.querySelectorAll('.tombol-tolak');
            for (let i = 0; i < tombolTolak.length; i++) {
                tombolTolak[i].addEventListener('click', function() {
                    let idTarget = this.getAttribute('data-id');
                    let riwayatData = JSON.parse(localStorage.getItem('riwayatAdopsi')) || [];

                    for (let j = 0; j < riwayatData.length; j++) {
                        if (riwayatData[j].idPengajuan === idTarget) {
                            if (riwayatData[j].statusAdmin !== 'Diproses') return; 
                            riwayatData[j].statusAdmin = 'Ditolak';
                        }
                    }

                    localStorage.setItem('riwayatAdopsi', JSON.stringify(riwayatData));
                    alert("Pengajuan adopsi telah ditolak dan statusnya kini terkunci.");
                    window.location.reload();
                });
            }
        }
    }
}

let wadahRiwayat = document.getElementById('daftar-riwayat');
if (wadahRiwayat != null) {
    wadahRiwayat.textContent = ""; 
    
    if (localStorage.getItem('statusLogin') !== 'sudah_masuk') {
        let pesanKosong = document.createElement('p');
        pesanKosong.className = "pesan-kosong";
        pesanKosong.textContent = "Silakan masuk (login) terlebih dahulu untuk melihat riwayat adopsi kamu.";
        wadahRiwayat.appendChild(pesanKosong);
    } else {
        let akunEmailAktif = localStorage.getItem('emailLoginAktif');
        let semuaRiwayat = JSON.parse(localStorage.getItem('riwayatAdopsi')) || [];
        
        let riwayatAkunIni = [];
        for(let i = 0; i < semuaRiwayat.length; i++) {
            if(semuaRiwayat[i].userEmail === akunEmailAktif) {
                riwayatAkunIni.push(semuaRiwayat[i]);
            }
        }
        
        if (riwayatAkunIni.length === 0) {
            let pesanKosong = document.createElement('p');
            pesanKosong.className = "pesan-kosong";
            pesanKosong.textContent = "Kamu belum memiliki riwayat pengajuan adopsi. Yuk mulai cari sahabat barumu!";
            wadahRiwayat.appendChild(pesanKosong);
        } else {
            for(let i = 0; i < riwayatAkunIni.length; i++) {
                let item = riwayatAkunIni[i];
                let kotakBungkus = document.createElement('div');
                kotakBungkus.className = "item-riwayat";
                
                let statusTampil = "Pengajuan Diproses";
                
                if (item.statusAdmin === 'Disetujui') {
                    statusTampil = "Disetujui (Selamat! Hewan siap diambil)";
                } else if (item.statusAdmin === 'Ditolak') {
                    statusTampil = "Ditolak (Maaf, pengajuan tidak dapat diterima)";
                }
                
                let imgRiwayat = document.createElement('img');
                imgRiwayat.src = item.gambar;
                imgRiwayat.alt = item.nama;
                imgRiwayat.className = "gambar-riwayat";

                let infoRiwayat = document.createElement('div');
                infoRiwayat.className = "info-riwayat";

                let namaHewan = document.createElement('h3');
                namaHewan.textContent = item.nama;
                infoRiwayat.appendChild(namaHewan);

                let dataInfo = [
                    { label: "Jenis", value: item.jenis },
                    { label: "Alamat", value: item.alamat },
                    { label: "Alasan", value: item.alasan },
                    { label: "Tanggal Pengajuan", value: item.tanggal }
                ];

                for (let data of dataInfo) {
                    let p = document.createElement('p');
                    p.textContent = `${data.label}: ${data.value}`;
                    infoRiwayat.appendChild(p);
                }

                let pStatus = document.createElement('p');
                if (item.statusAdmin === 'Disetujui') {
                    pStatus.className = "status-disetujui";
                } else if (item.statusAdmin === 'Ditolak') {
                    pStatus.className = "status-ditolak";
                } else {
                    pStatus.className = "status-diproses";
                }
                pStatus.textContent = `Status: ${statusTampil}`;
                infoRiwayat.appendChild(pStatus);

                kotakBungkus.appendChild(imgRiwayat);
                kotakBungkus.appendChild(infoRiwayat);
                wadahRiwayat.appendChild(kotakBungkus);
            }
        }
    }
}