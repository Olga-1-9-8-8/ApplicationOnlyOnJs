//
const imageProductCardEl = findImageProductCard();

let formEl = findForm();
let inputsFormEl = findFormInputs(formEl);
let textareaFormEl = findFormTextarea(formEl);
let submitFormEl = findFormSubmit(formEl);

let buttonReviewEl = findButtonReviw();
let buttonResetEl = findButtonReset();
let newReviewEl = findNewReview();
let listMessages = findReviewList();

let ratingTotalEl = findTotalRatingEl();    


let arrRating = [];
let counterEl = findCounter();
let counterTextEl = findCountText();
let counter = 0;

let buttonSortData = findButtonSortData();
let buttonSortRating = findButtonSortData();
let messagesWrapper = findMessagesWrapper();

zoomImage(imageProductCardEl);

floatingLabelColorChange(inputsFormEl);

bindButtonReview(buttonReviewEl,newReviewEl,formEl,inputsFormEl);

bindButtonReset(buttonReviewEl,buttonResetEl,newReviewEl,inputsFormEl);

bindButtonFormSubmit(formEl);




function findImageProductCard(){
    return document.querySelector('.product-card__image');
}

function findForm(){
    return document.forms.review;
}

function findFormInputs(form){
 return form.querySelectorAll('.reviews__input');
}

function findFormTextarea(form){
    return form.elements.textarea;
}

function findFormSubmit(form){
    return form.elements.submit;
}
    
function findButtonReviw(){
    return document.querySelector('.reviews__button');
}

function findButtonReset(){
    return document.querySelector('.reviews__button-reset');
}

function findNewReview(){
    return document.querySelector('.reviews__form-wrapper');
}

function findReviewList(){
    return document.querySelector('.reviews__listMessages');
}

function findTotalRatingEl(){
    return document.getElementById('starsInner');
}

function findCounter(){
    return document.querySelector('.card__counter-result');
}

function findCountText(){
    return document.querySelector('.card__counter-text');
}

function findButtonSortData(){
    return document.querySelector('.reviews__sortData');
}

function findButtonSortRating(){
    return document.querySelector('.reviews__sortRating');
}

function findMessagesWrapper(){
    return document.querySelector('.reviews__listMessages');
}


function zoomImage(img){
  
    img.addEventListener('mousemove',function(e){
        // find size of the image
        let width = img.offsetWidth;
        let height = img.offsetHeight;
        // find mouse-coords relative to block(product-card__image)
        let mouseX = e.offsetX;
        let mouseY = e.offsetY;
        //find mouse-coords in % relative to block
        // number/total *100 = %
        let positionX = (mouseX/width * 100);
        let positionY = (mouseY/height * 100);
        img.style.backgroundPosition = `${positionX}% ${positionY}%`
    })
    img.addEventListener('mouseleave',function(){
        img.style.backgroundPosition = 'center';
    })
}




//Change input label color
function floatingLabelColorChange(elements){
    for(let elem of elements){
        elem.onblur = function(){
            if(elem.value){
                elem.nextElementSibling.style.color = 'white';
            }else{
                elem.nextElementSibling.style.color = '';
            }
        }
    }  
}


// open/close review
function bindButtonReview(buttonReview,newReview,form,inputs){ 
    buttonReview.addEventListener('click',function(){
        newReview.hidden = !newReview.hidden;
        form.reset();
        showFloatLabeles(inputs);
        changeTextInButtonReview(buttonReview);
    })
}

//clear and close review form
function bindButtonReset(buttonReview,buttonResetEl,newReview,inputs){
    buttonResetEl.addEventListener('click',function(){
        showFloatLabeles(inputs);
        newReview.hidden = !newReview.hidden;
        changeTextInButtonReview(buttonReview);
    })
}


function changeTextInButtonReview(buttonReview){
    if(buttonReview.innerHTML =='Написать Отзыв'){
        buttonReview.innerHTML = "Закрыть Отзыв"
    } else {
        buttonReview.innerHTML = "Написать Отзыв"
    }
}

//Show Float labeles
function showFloatLabeles(inputs){
    for(let input of inputs){
        input.nextElementSibling.style.color = '';
    }
}


//Send review on Server
function bindButtonFormSubmit(form){
    
    form.addEventListener('submit',async function(event){
        event.preventDefault();
        let newDate = formatDate(new Date())
        let formData = new FormData(this);
        formData.append('date',newDate);
        formData.append('dateMillisecondes', Date.now())
        let response = await fetch('https://review-app-6ea6e-default-rtdb.firebaseio.com/listEl.json',{
            method:'POST',
            body: JSON.stringify(Object.fromEntries(formData))
        });
        form.reset();
        buttonReviewEl.dispatchEvent(new Event("click"));
    })
}  



function formatDate(date){
    let months =["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля","Августа","Сентября","Октября","Ноября","Декабря"];
    let day = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();
    return `${day} ${month} ${year}   ${hours}:${minutes}`
} 




function getTotalRating(arrRating){
   let sumArr = arrRating.reduce((sum,current) => sum + current,0);
   let totalNum = sumArr/arrRating.length
   return +totalNum.toFixed(1);
}


function publishRating(ratingAvarageNumber,ratingEl){
    let starsTotal = 5;
    let starPercentage = (ratingAvarageNumber/starsTotal) *100;
    let starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`
    ratingEl.style.width = starPercentageRounded;
}


function publishCounter(counter,counterEl){
    counterEl.innerHTML = counter;
}


function changeCounterText(counterTextElem,counterEl){
    if(counterEl.innerHTML == 1 || counterEl.innerHTML == 21 || counterEl.innerHTML == 31 || counterEl.innerHTML == 41 || counterEl.innerHTML == 51){
        counterTextElem.innerHTML = "Отзыв"
    }else if(counterEl.innerHTML == 2 || counterEl.innerHTML == 3 || counterEl.innerHTML == 4 || counterEl.innerHTML == 22 || counterEl.innerHTML == 23 || counterEl.innerHTML == 24){
        counterTextElem.innerHTML = "Отзыва"
    }
}


