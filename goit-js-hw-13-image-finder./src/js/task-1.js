import '@pnotify/core/dist/BrightTheme.css'
import '@pnotify/core/dist/PNotify.css';
import refsList from './refs.js';
import ApiService from './apiService.js'
import cardImgTpl from '../templates/card-img.hbs'
const debounce = require('lodash.debounce');
import LoadMoreBtn from './components/load-more-btn.js';
import * as basicLightbox from 'basiclightbox';
import '../styles.css';

const basicLightbox1 = require('basiclightbox');



const refs = refsList();
 const { alert, notice, info, success, error } = require('@pnotify/core');


const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more" ]',
    hidden: true,
});
const apiService = new ApiService();


refs.searchForm.addEventListener('input', debounce(onSearch, 500))
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

let scrollСoordinates = 0;


function onSearch(e) {
    const form = e.target;
    apiService.query = form.value;
   
    if (apiService.query !== '') {
       
        
        apiService.resetPage();
        clearImagesContainer();
        fetchImages();
        resetScroll();
        loadMoreBtn.show();
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
             loadMoreBtn.hide();
           return error ("Sorry, we couldn't find anything");
        }
        removeLogoPixabay();
        appendImagesMarkup(images);
        loadMoreBtn.enable();
        
        })
        .then(scrollDownContainer => {
              window.scrollTo({
              top: scrollСoordinates,
              behavior: 'smooth',
       });

       scrollСoordinates = refs.bodyRef.scrollHeight - 60;
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


function removeLogoPixabay() {
  refs.logoImg.classList.add('is-hidden');
}

function resetScroll() {
  scrollСoordinates = 0;
}

