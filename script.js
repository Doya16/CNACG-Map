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
        // 构建图片展示 HTML（限制宽高 + 轮播式堆叠）
        const imagesHtml = shop.images.map(img =>
          `<img src="${img}" alt="图片" style="width: 100%; max-height: 150px; object-fit: cover; border-radius: 8px; margin: 5px 0;">`
        ).join('');

        // 构建信息窗体内容 HTML
        const infoHtml = `
          <div style="max-width: 300px; max-height: 300px; overflow-y: auto; font-size: 14px; line-height: 1.5;">
            <h3 style="margin: 0 0 5px;">${shop.name}</h3>
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
