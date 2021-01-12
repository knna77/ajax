const BASE_URL = 'https://reqres.in/api/users/';
const POSTMAN_URL = 'https://httpbin.org/post';

//Código principal dentro del evento load
// para asegurar la carga de los componentes
window.addEventListener('load', (ev) => {
  let numsecs = document.getElementById('numsecs');
  let user = document.getElementById('user');
  let boton = document.querySelector('button');

  boton.addEventListener('click', (ev) => {
    ev.preventDefault();
    clearFields();
    procesarFetch(numsecs.value, user.value);
  });
});

function clearFields() {
  document.querySelectorAll('span').forEach((element) => {
    element.innerHTML = '';
    console.log(element);
  });
}
function contruUrl(url, parameters) {
  let values = '?';
  for (i in parameters) {
    values += i + '=' + parameters[i];
    values += '&';
  }
  values = values.slice(0, -1);
  url += values;
  console.log('url => ' + url);
  return url;
}
function JsonPost(data, url, handler) {
  $.post(url, data, handler);
}
function procesarFetch(numsecs, user) {
  setTimeout(function () {
    let parameters = { id: user };

    const options = {
      method: 'GET',
    };
    fetch(contruUrl(BASE_URL, parameters), options)
      .then((response) => {
        if (response.ok) {
          document.getElementById('status').innerHTML = response.status;
          return response.text();
        } else {
          throw new Error(response.status);
        }
      })
      .then((data) => {
        let response = JSON.parse(data);
        let usuari = response.data;
        console.log('------' + data);
        document.getElementById('id').innerHTML = usuari.id;
        document.getElementById('email').innerHTML = usuari.email;
        document.getElementById('name').innerHTML = usuari.first_name;
        //document.getElementById('status').innerHTML = response.status;
      })
      .catch((err) => {
        document.getElementById('status').innerHTML = err.messag;
        console.error('ERROR: ', err.message);
      });
  }, numsecs * 1000);
}
