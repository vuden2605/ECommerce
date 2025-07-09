const API_URL = 'http://localhost:3000';

export const fetchCart = async () => {
  const res = await fetch(`${API_URL}/cart`, {
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
  });
  return res.json();
};

export const deleteItem = async (id) => {
  return fetch(`${API_URL}/cart/${id}`, {
    method: 'DELETE',
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
  });
};

export const increaseItem = async (id) => {
  return fetch(`${API_URL}/cart/${id}/increase`, {
    method: 'PATCH',
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
  });
};

export const decreaseItem = async (id) => {
  return fetch(`${API_URL}/cart/${id}/decrease`, {
    method: 'PATCH',
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
  });
};

export const payCod = async ({ products, shipping_info, total_price }) => {
  return fetch(`${API_URL}/invoice/payCod`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({
      products,
      shipping_info,
      total_price
    })
  });
};

