document.addEventListener("DOMContentLoaded", function () {

  if (document.getElementById("nameModal")) {
    const welcomeMessage = document.getElementById("welcome-message");
    const nameModalEl = document.getElementById("nameModal");
    const inputName = document.getElementById("inputName");
    const submitBtn = document.getElementById("submitName");
    const nameToastEl = document.getElementById("nameToast");

    const nameModal = new bootstrap.Modal(nameModalEl);
    const nameToast = nameToastEl ? new bootstrap.Toast(nameToastEl) : null;

    const savedName = localStorage.getItem("userName");
    if (savedName) {
      welcomeMessage.textContent = `Hi, ${savedName}! Welcome to our page!`;
    } else {
      nameModal.show();
    }

    submitBtn.addEventListener("click", function () {
      const name = inputName.value.trim();
      if (!name) {
        nameToast?.show();
      } else {
        localStorage.setItem("userName", name);
        welcomeMessage.textContent = `Hi, ${name}! Welcome to our page!`;
        nameModal.hide();
      }
    });
  }

  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nama = document.getElementById("nama").value.trim();
      const email = document.getElementById("email").value.trim();
      const hp = document.getElementById("hp").value.trim();
      const alamat = document.getElementById("alamat").value.trim();
      const paketInput = document.getElementById("paket");
      const paket = paketInput.value;
      const tanggalInput = document.getElementById("tanggal").value;

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(tanggalInput);

      if (!nama) return showToast("Siapa nih yang mau order donat lucu kita? Tulis namanya ya!");
      if (!paket) return showToast("Pilih paket donat kesukaanmu dulu yuk!");
      if (!tanggalInput || selectedDate < today) return showToast("Oops! Tanggalnya nggak boleh sebelum hari ini, dong~");
      if (!alamat) return showToast("Alamat lengkapnya belum diisi nih~");

      const tanggalFormatted = selectedDate.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });

      const now = new Date();
      const createdAt = now.toLocaleString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      });

      const orderData = {
        nama,
        email: email || "-",
        hp,
        alamat,
        paket: paketInput.options[paketInput.selectedIndex].text,
        tanggal: tanggalFormatted,
        waktu: createdAt
      };
      localStorage.setItem("lastOrder", JSON.stringify(orderData));

      tampilkanRingkasan(orderData);

      const hasilModal = new bootstrap.Modal(document.getElementById("hasilModal"));
      document.getElementById("namaOutput").textContent = nama;
      document.getElementById("jadwalOutput").textContent = tanggalFormatted;
      hasilModal.show();

      this.reset();
    });

    const savedOrder = localStorage.getItem("lastOrder");
    if (savedOrder) {
      tampilkanRingkasan(JSON.parse(savedOrder));
    }

    const clearBtn = document.getElementById("clearOrder");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        localStorage.removeItem("lastOrder");
        document.getElementById("orderSummary").classList.add("d-none");
        clearBtn.classList.add("d-none");
      });
    }
  }
});

function showToast(message) {
  const toastEl = document.getElementById("toastError");
  const toastMsg = document.getElementById("toastMsg");

  if (!toastEl || !toastMsg) return;

  toastMsg.textContent = message;
  const toast = bootstrap.Toast.getOrCreateInstance(toastEl);
  toast.show();
}

function tampilkanRingkasan(data) {
  document.getElementById("summaryNama").textContent = data.nama;
  document.getElementById("summaryEmail").textContent = data.email;
  document.getElementById("summaryHP").textContent = data.hp;
  document.getElementById("summaryAlamat").textContent = data.alamat;
  document.getElementById("summaryPaket").textContent = data.paket;
  document.getElementById("summaryTanggal").textContent = data.tanggal;
  document.getElementById("summaryWaktu").textContent = data.waktu;

  const ringkasan = document.getElementById("orderSummary");
  const clearBtn = document.getElementById("clearOrder");

  ringkasan.classList.remove("d-none");
  if (clearBtn) clearBtn.classList.remove("d-none");
}

const flavorModal = document.getElementById('flavorModal');
if (flavorModal) {
  flavorModal.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget;
    const name = button.getAttribute('data-flavor');
    const desc = button.getAttribute('data-desc');

    flavorModal.querySelector('.modal-title').textContent = `🍩 ${name}`;
    flavorModal.querySelector('#flavorDesc').textContent = desc;
  });
}
