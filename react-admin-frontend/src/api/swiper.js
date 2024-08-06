export function updateSwiper(data) {
  const jsonData = JSON.stringify(data);
  return fetch('/product/updateProduct', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch(error => {
    console.error('Error updating swiper:', error);
    throw error;
  });
}

export function getSwipers() {
  return fetch('/product/getRecommendedProductList', {
    method: 'GET',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch(error => console.error('There was a problem with your fetch operation:', error));
}