document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const date = document.getElementById("date").value;
  const variant = document.getElementById("variant").value;
  const quantity = document.getElementById("quantity").value;
  const message = document.getElementById("message").value;

  // Ganti sapaan di banner
  document.getElementById("welcome-message").textContent = `Hi, ${name}! Welcome to our page!`;

  // Isi konten di modal
  const output = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Variant:</strong> ${variant}</p>
    <p><strong>Quantity:</strong> ${quantity}</p>
    <p><strong>Note:</strong> ${message || '-'}</p>
  `;
  document.getElementById("orderSummaryBody").innerHTML = output;

  // Tampilkan modal hasil order
  const modal = new bootstrap.Modal(document.getElementById('orderSummaryModal'));
  modal.show();

  // Reset form (opsional)
  // e.target.reset();
});

