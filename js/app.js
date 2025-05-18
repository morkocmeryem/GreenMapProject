document.addEventListener("DOMContentLoaded", function () {
  const kesfetBtn = document.getElementById("kesfetBtn");

  // Sadece index.html'deysen KEŞFET butonuna tıklanınca menüye yönlendir
  if (kesfetBtn) {
    kesfetBtn.onclick = function () {
      window.location.href = "menu.html";
    };
  }

  // Eğer harita sayfasındaysan (harita.html), haritayı başlat
  if (document.getElementById("map")) {
    initMap();
  }

  // Harita başlatma fonksiyonu
  function initMap() {
    let map = L.map('map').setView([41.0082, 28.9784], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.circle([41.015, 28.98], {
      color: 'green',
      fillColor: 'green',
      fillOpacity: 1,
      radius: 200
    }).addTo(map).bindPopup('Yeşil Alan');

    L.marker([41.02, 28.99], {
      title: "Boş Alan"
    }).addTo(map).bindPopup('Boş Alan (Ağaç Dikilebilir)');

    const konumBtn = document.getElementById("konumBtn");
    if (konumBtn) {
      konumBtn.onclick = function () {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((pos) => {
            const userPos = [pos.coords.latitude, pos.coords.longitude];
            map.setView(userPos, 15);
            L.marker(userPos).addTo(map).bindPopup("Benim Konumum").openPopup();
          });
        } else {
          alert("Konum bilgisi alınamıyor.");
        }
      };
    }
  }
});
