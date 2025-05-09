document.addEventListener("DOMContentLoaded", function () {
  // Harita ekranı açıldığında haritayı başlat
  if (document.getElementById("map")) {
    let map = L.map('map').setView([41.0082, 28.9784], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Yeşil alan (daire)
    L.circle([41.015, 28.98], {
      color: 'green',
      fillColor: 'green',
      fillOpacity: 1,
      radius: 200
    }).addTo(map).bindPopup('Yeşil Alan');

    // Boş alan (kırmızı marker)
    L.marker([41.02, 28.99], {
      title: "Boş Alan"
    }).addTo(map).bindPopup('Boş Alan (Ağaç Dikilebilir)');

    // Konum butonu
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
