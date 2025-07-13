if (!sessionStorage.getItem("keranjang")) {
  sessionStorage.setItem("keranjang", JSON.stringify([]));
}
let keranjang = JSON.parse(sessionStorage.getItem("keranjang"));

function tambahItem(namaProduk, kategori, harga, size, warna) {
  const index = keranjang.findIndex(
    item => item.namaProduk === namaProduk && item.size === size && item.warna === warna
  );
  if (index >= 0) {
    keranjang[index].jumlah += 1;
  } else {
    keranjang.push({ namaProduk, kategori, harga, size, warna, jumlah: 1 });
  }
  sessionStorage.setItem("keranjang", JSON.stringify(keranjang));
  updateJumlahKeranjang();
}

function tambahKeKeranjang(namaProduk, kategori, harga) {
  const size = prompt("Pilih size (contoh: 28–40, S/M/L):");
  const warna = prompt("Pilih warna (contoh: Biru, Hitam, Light Blue):");
  if (!size || !warna) return alert("❗ Lengkapi size dan warna.");
  tambahItem(namaProduk, kategori, harga, size, warna);
  alert("✅ Produk ditambahkan ke keranjang.");
}

function beliSekarang(namaProduk, kategori, harga) {
  const size = prompt("Pilih size (contoh: 28–40, S/M/L):");
  const warna = prompt("Pilih warna (contoh: Biru, Hitam, Light Blue):");
  if (!size || !warna) return alert("❗ Lengkapi size dan warna.");
  tambahItem(namaProduk, kategori, harga, size, warna);
  bukaCheckout();
}

function updateJumlahKeranjang() {
  keranjang = JSON.parse(sessionStorage.getItem("keranjang"));
  let totalJumlah = 0;
  keranjang.forEach(item => {
    totalJumlah += item.jumlah;
  });
  document.querySelectorAll("#jumlahKeranjang").forEach(el => el.textContent = totalJumlah);
}

function bukaKeranjang() {
  const modal = document.getElementById("modalKeranjang");
  const daftar = document.getElementById("daftarKeranjang");
  daftar.innerHTML = "";
  let total = 0;

  keranjang.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.namaProduk} (Size ${item.size}, Warna ${item.warna})<br>
      Jumlah: 
      <button onclick="ubahJumlah(${index}, -1)">–</button> 
      <strong>${item.jumlah}</strong> 
      <button onclick="ubahJumlah(${index}, 1)">+</button><br>
      Subtotal: Rp ${(item.harga * item.jumlah).toLocaleString()}
      <hr style="margin: 0.5rem 0">
    `;
    daftar.appendChild(li);
    total += item.harga * item.jumlah;
  });

  document.getElementById("totalKeranjang").textContent = "Total: Rp " + total.toLocaleString();
  modal.style.display = "flex";
}

function ubahJumlah(index, perubahan) {
  keranjang[index].jumlah += perubahan;
  if (keranjang[index].jumlah <= 0) {
    keranjang.splice(index, 1); // hapus produk kalau 0
  }
  sessionStorage.setItem("keranjang", JSON.stringify(keranjang));
  updateJumlahKeranjang();
  bukaKeranjang();
}

function tutupKeranjang() {
  document.getElementById("modalKeranjang").style.display = "none";
}

function bukaCheckout() {
  document.getElementById("modalKeranjang").style.display = "none";
  document.getElementById("modalCheckout").style.display = "flex";
}

function tutupCheckout() {
  document.getElementById("modalCheckout").style.display = "none";
}

function lihatDeskripsi(judul, isi, dada, bahuPanjang, paha, pinggang) {
  document.getElementById("judulDeskripsi").textContent = judul;
  document.getElementById("isiDeskripsi").textContent = isi;
  const detail = `
    <hr>
    <strong>Ukuran Produk:</strong><br>
    - Lingkar Dada: ${dada}<br>
    - Lebar Bahu / Panjang Lengan: ${bahuPanjang}<br>
    - Lingkar Paha: ${paha}<br>
    - Lingkar Pinggang: ${pinggang}
  `;
  document.getElementById("detailUkuran").innerHTML = detail;
  document.getElementById("modalDeskripsi").style.display = "flex";
}

function tutupDeskripsi() {
  document.getElementById("modalDeskripsi").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  updateJumlahKeranjang();

  const form = document.getElementById("checkoutForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const nama = document.getElementById("namaPembeli").value;
      const alamat = document.getElementById("alamatPembeli").value;
      const kontak = document.getElementById("kontakPembeli").value;
      const metode = document.getElementById("metodePembayaran").value;

      if (!nama || !alamat || !kontak || !metode) {
        alert("⚠ Lengkapi semua data sebelum checkout!");
        return;
      }

      alert("✅ Checkout berhasil!\nTerima kasih sudah berbelanja di JEANSYOU, " + nama + "!");
      keranjang = [];
      sessionStorage.setItem("keranjang", JSON.stringify(keranjang));
      updateJumlahKeranjang();
      tutupCheckout();
    });
  }
});

function filterHarga(value) {
  const cards = document.querySelectorAll(".product-card");
  cards.forEach(card => {
    const harga = parseInt(card.getAttribute("data-harga"));
    if (value === "all") {
      card.style.display = "block";
    } else if (value === "150" && harga < 150000) {
      card.style.display = "block";
    } else if (value === "180" && harga >= 150000 && harga <= 180000) {
      card.style.display = "block";
    } else if (value === "200" && harga > 180000) {
      card.style.display = "block";
    } else if (value === "100" && harga < 100000) {
      card.style.display = "block";
    } else if (value === "115" && harga >= 100000 && harga <= 115000) {
      card.style.display = "block";
    } else if (value === "120" && harga > 115000) {
      card.style.display = "block";
    } else if (value === "210" && harga >= 180000 && harga <= 210000) {
      card.style.display = "block";
    } else if (value === "220" && harga > 210000) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}