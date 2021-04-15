
// import '@pnotify/core/dist/PNotify.css';
import refsList from './refs.js';
import ApiService from './apiService.js'
import cardImgTpl from '../templates/card-img.hbs'
const debounce = require('lodash.debounce');
import LoadMoreBtn from './components/load-more-btn.js';

const refs = refsList();
// const { alert, notice, info, success, error } = require('@pnotify/core');


const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more" ]',
    hidden: true,
});


const apiService = new ApiService();


refs.searchForm.addEventListener('input', debounce(onSearch, 500))
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

    

const arrowUpBtnRef = document.querySelector('.arrow-up-btn').onclick = () => {
    window.scrollTo(pageYOffset, 0);
};
arrowUpBtnRef();
// под вопросом 
//   window.addEventListener('scroll', function() {
//       arrowTop.hidden = (pageYOffset < document.documentElement.clientHeight);
//     });


function onSearch(e) {
    const form = e.target;
    apiService.query = form.value;
   
    if (apiService.query !== '') {
       
        loadMoreBtn.show();
        apiService.resetPage();
        clearImagesContainer();
        fetchImages();
      
         
        return;
    }
    clearImagesContainer();
     loadMoreBtn.hide();
};



function fetchImages() {
    loadMoreBtn.disable();
   
    apiService
        .fetchArticles()
        .then(images => {
        if (images.length === 0) {
           return error;
        }
        removeLogo();
            appendImagesMarkup(images);
        loadMoreBtn.enable();
        
        })
        .catch(error => {
         loadMoreBtn.hide();
          console.log('There has been a problem with your fetch operation: ' + error.message)
       
    })
    
};

 

function appendImagesMarkup(images) {
    
    refs.galleryContainer.insertAdjacentHTML('beforeend', cardImgTpl(images));
    
    };


function clearImagesContainer() {
    refs.galleryContainer.innerHTML = ''
};


function removeLogo() {
  refs.logoImg.classList.add('is-hidden');
}

