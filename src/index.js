require('dotenv').config();
const voca = require('voca')

const txtSearch = document.querySelector('#txtSearch')
const form = document.querySelector('#form')

form.addEventListener('submit', e => {

    e.preventDefault()

    const query = txtSearch.value

    searchBooks(query)

});


const makeBook = (volume) => {

    let book = document.createElement('li')
    book.classList.add('book')

    const makeAuthor = author => {
        return `<li class="author">
                    <a href="">${author}</a>
                </li>`;
    };

    book.innerHTML = `<img src="${volume.thumbnail}" alt="Portada" class="thumbnail"/>
                      <h2 class="title">${volume.title}</h2>
                      <p class="description">${volume.description}</p>
                      <ul class="authors">
                        ${volume.authors.map(makeAuthor).join('')}
                      </ul>
                    `

    return book
}

const searchBooks = (query) => {

    const {google } = require('googleapis')

    const resultsSection = document.querySelector('#results')

    const books = google.books({
        version: 'v1',
        auth: process.env.GOOGLE_API_KEY
    })

    resultsSection.innerHTML = ''

    if(typeof query !== 'undefined' && query !== ''){
        books.volumes.list({
            q: query,
            maxResults: 40
        })
        .then(response => {
        
            let fragment = document.createDocumentFragment()
            Array.from(response.data.items).forEach(x => {
                
                console.log(x)

                let volume = {
                    title: x.volumeInfo.title || '',
                    description:  x.volumeInfo.description ? voca.truncate(x.volumeInfo.description, 300) : '',
                    authors: x.volumeInfo.authors || [],
                    thumbnail: x.volumeInfo.imageLinks && x.volumeInfo.imageLinks.thumbnail ? x.volumeInfo.imageLinks.thumbnail : __dirname+'/assets/defaultBook.jpg'
                }
    
                fragment.appendChild(makeBook(volume))
    
            })
    
            resultsSection.appendChild(fragment)
            
        })
        .catch(err => {
            console.log(err);
        })
    }
}
