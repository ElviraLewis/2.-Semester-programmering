if (!localStorage.getItem('user')) {
  location.href = '/login';
}
document.addEventListener('DOMContentLoaded', function () {
  let submit = document.getElementById('submit');

  submit.addEventListener('click', (e) => {
    e.preventDefault();

    let product_id = document.getElementById('productid').value;

    fetch(`http://localhost:3333/products/${product_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },

      body: localStorage.getItem('user'),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          console.log(data);
          alert(data.text + 'din varer er nu Slettet'); //"Sletning lykkedes," sendes over fra controlleren
        }
      })
      .catch((err) => {
        alert('Error:', err);
      });
  });
});
