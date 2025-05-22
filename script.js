
let map, markers = [], shopsData = [];

fetch('shops.json')
  .then(response => response.json())
  .then(shops => {
    shopsData = shops;
    map = new AMap.Map('map', {
      zoom: 5,
      center: [105.5, 35.5]
    });

    shops.forEach(shop => {
      const marker = new AMap.Marker({
        position: [shop.lng, shop.lat],
        title: shop.name
      });
      marker.setMap(map);
      markers.push(marker);

      marker.on('click', () => {
        const imagesHtml = shop.images.map(img =>
          `<img src="\${img}" alt="图片" style="width: 100%; max-height: 150px; object-fit: cover; border-radius: 8px; margin: 5px 0;">`
        ).join('');

        const infoHtml = `
          <div>
            <h3>${shop.name}</h3>
            <p><strong>地址：</strong>${shop.address}</p>
            <p><strong>提交人：</strong>${shop.submitter}</p>
            <p><strong>点赞：</strong>${shop.likes}</p>
            ${imagesHtml}
          </div>
        `;


        const infoWindow = new AMap.InfoWindow({
          content: infoHtml,
          offset: new AMap.Pixel(0, -30)
        });
        infoWindow.open(map, marker.getPosition());
      });
    });
  });

function handleSearch() {
  const keyword = document.getElementById('searchInput').value.trim();
  if (!keyword) return;

  const result = shopsData.find(shop =>
    shop.name.includes(keyword) ||
    shop.city.includes(keyword) ||
    shop.district.includes(keyword)
  );

  if (result) {
    map.setZoom(15);
    map.setCenter([result.lng, result.lat]);
  } else {
    alert("未找到匹配的商店，请尝试其他关键词！");
  }
}
