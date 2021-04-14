
const API_KEY = '21047738-7361f21c2cc8047304301260e';
const BASE_URL = 'https://pixabay.com/api';

export default class apiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }


    fetchArticles() {
        console.log(this);
        
      return  fetch(`${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&per_page=12&image_type=photo&orientation=horizontal`)
          .then(response => {
              if (!response.ok) {
                   throw new Error(`HTTP error! status: ${response.status}`)
                
              }
             return response.json() 
          })

            .then(({hits}) => {
                this.incrementPage()
                return hits;
            })
            
         
    }

    incrementPage() {
           this.page += 1
    }

    resetPage() {
        this.page = 1;
    }


    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}