document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const namaInput = document.getElementById("nama");
  const tanggalInput = document.getElementById("tanggal");
  const namaOutput = document.getElementById("namaOutput");
  const jadwalOutput = document.getElementById("jadwalOutput");
  const toastEl = document.getElementById("toastError");
  const toastMsg = document.getElementById("toastMsg");
  const hasilModalEl = document.getElementById("hasilModal");

  const hasilModal = new bootstrap.Modal(hasilModalEl);
  const toast = new bootstrap.Toast(toastEl, { delay: 3000 });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = namaInput.value.trim();
    const tanggalVal = tanggalInput.value;
    const today = new Date();
    const selected = new Date(tanggalVal);
    today.setHours(0, 0, 0, 0);

    if (!nama) {
      toastMsg.textContent = "Nama tidak boleh kosong.";
      toast.show();
      return;
    }

    if (!tanggalVal || selected < today) {
      toastMsg.textContent = "Tanggal pemesanan tidak boleh sebelum hari ini.";
      toast.show();
      return;
    }

    const formatted = selected.toLocaleDateString("id-ID", {
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric"
    });

    namaOutput.textContent = nama;
    jadwalOutput.textContent = formatted;

    hasilModal.show();
    form.reset();
  });
});
