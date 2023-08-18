/* Необходимо получить список всех пользователей с помощью бесплатного API (https://jsonplaceholder.typicode.com/users) 
и отобразить их на странице. 
Пользователь должен иметь возможность удалить любого пользователя из списка. 
Данные при получении необходимо сохранить в локальное хранилище браузера localStorage. 
При удалении пользователь должен удаляться не только со страницы, но и из локального хранилища localStorage */

const url = "https://jsonplaceholder.typicode.com/users";
const div = document.querySelector(".user");

const getData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

try {
  const data = await getData(url);
  console.log(data);
  const dataLength = data.length;
  // console.log(dataLength);

  // очистка localSt
  // localStorage.clear();

  let count = 0;
  data.forEach((element) => {
    count = count + 1;
    let key = JSON.stringify(count);
    let string = JSON.stringify(element);
    localStorage.setItem(key, string);
  });

  for (let index = 1; index <= dataLength; index++) {
    let key = JSON.stringify(index);
    const user = JSON.parse(localStorage.getItem(key));
    const address = user.address;
    const company = user.company;
    console.log(company);
    div.insertAdjacentHTML('beforeend',
    `
    <figure id="${key}">
      <img src="img/person.svg" alt="Elephant at sunset" />
      <h2>Имя: ${user.name}</h2>
      <h2>Ник: ${user.username}</h2>
      <h2>Город: ${address.city}</h2>
      <h2>Улица: ${address.street}</h2>
      <h2>Дом: ${address.suite}</h2>
      <h2>Телефон: ${user.phone}</h2>
      <h2 class="link">Сайт: <a href="${user.website}">${user.website}</a></h2>
      <h2 class="link">email: <a href="${user.email}">${user.email}</a></h2>
      <button class="button">Удалить</button>
    </figure>
    `);  
  }

  const btns = document.querySelectorAll('button')
  btns.forEach((btn, index) => {
    btn.addEventListener('click', ()=>{
      localStorage.removeItem(index+1);
      const elem = document.getElementById(index+1);
      elem.remove();


    })
    
  });
} catch (error) {
  console.error("что-то не так! ");
}

// <figure>
// <img src="img/person.svg" alt="Elephant at sunset" />
// <h2>Имя: ${user.name}</h2>
// <h2>Ник: ${user.username}</h2>
// <h2>email: ${user.email}</h2>
// <h2>Телефон: ${user.phone}</h2>
// <h2>Сайт: ${user.website}</h2>
// </figure>
//   `

// for (let index = 1; index <= dataLength; index++) {

//   let key = JSON.stringify(index);
//   const user = JSON.parse(localStorage.getItem(key));
//   div.insertAdjacentHTML(
//     'beforeend',
//   `
//   <figure>
//   <img src="/media/cc0-images/elephant-660-480.jpg" alt="Elephant at sunset" />
//   <figcaption>An elephant at sunset</figcaption>
// </figure>

//   `);

// };