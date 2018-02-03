const form = document.querySelector('.card');
const search = document.querySelector('#search');
const results = document.querySelector('.results');

function createCards(data) {
  // clear all child elements
  results.innerHTML = '';
  console.log(data);
  data.forEach(result => {
    const url = encodeURI(`https://en.wikipedia.org/wiki/${data.title}`);
    results.insertAdjacentHTML(
      'beforeend',
      `<div class='card'>
        <a href ="${url}" target='_blank'>
          <h2> ${result.title} </h2>
        </a>
        <p>${result.snippet}</p>
      </div>
    `
    );
  });
}

function fetchResults(query) {
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${
    query
  }`;

  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      // console.log(data.query.search);
      createCards(data.query.search);
    })
    .catch(err => {
      console.log(err);
    });
}

function runQuery(e) {
  // prevent page from reloading when form is submitted
  e.preventDefault();
  const query = search.value;
  // remove whitespace before getting value
  const searchVal = query.trim();
  search.value = '';

  fetchResults(searchVal);
}

form.addEventListener('submit', runQuery);
