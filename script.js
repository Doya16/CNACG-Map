
fetch('shops.json')
  .then(response => response.json())
  .then(shops => {
    const map = new AMap.Map('map', {
      zoom: 5,
      center: [105.5, 35.5]
    });
    shops.forEach(shop => {
      const marker = new AMap.Marker({
        position: [shop.lng, shop.lat],
        title: shop.name
      });
      marker.setMap(map);
      marker.on('click', () => {
        alert(`名称：${shop.name}\n地址：${shop.address}\n提交人：${shop.submitter}\n点赞：${shop.likes}`);
      });
    });
  });
