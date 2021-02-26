//
const imageProductCardEl = findImageProductCard();

let formEl = findForm();
let inputsFormEl = findFormInputs(formEl);
let textareaFormEl = findFormTextarea(formEl);
let submitFormEl = findFormSubmit(formEl);

let buttonReviewEl = findButtonReviw();
let newReviewEl = findNewReview();
let listMessages = findReviewList();

    

zoomImage(imageProductCardEl);

floatingLabelColorChange(inputsFormEl);

bindButtonReview(buttonReviewEl,newReviewEl);

bindButtonFormSubmit(formEl);





//Функции которые находят элементы на странице

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
    return document.querySelector('.reviews__button')
}

function findNewReview(){
    return document.querySelector('.reviews__form-wrapper')
}

function findReviewList(){
    return document.querySelector('.reviews__listMessages')
}



// Функция увеличения картинки
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




//Функция изменения цвета лейбла флоата
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


//Закрыть-открыть форму отзыва
function bindButtonReview(buttonReview,newReview){ 
    buttonReview.addEventListener('click',function(){
        newReview.hidden = !newReview.hidden;
        if(buttonReview.innerHTML =='Написать Отзыв'){
            buttonReview.innerHTML = "Закрыть Отзыв"
        } else {
            buttonReview.innerHTML = "Написать Отзыв"
        }
    })
}

//Отправить на Сервер отзыв
function bindButtonFormSubmit(form){
    
    form.addEventListener('submit',async function(event){
        event.preventDefault();
        let newDate = formatDate(new Date())
        let formData = new FormData(this);
        formData.append('date',newDate);
        //обязательно писать после адреса до базы, название своей коллекции.json
        let response = await fetch('https://review-app-6ea6e-default-rtdb.firebaseio.com/listEl.json',{
            method:'POST',
            body: JSON.stringify(Object.fromEntries(formData))
        });
        form.reset();
        buttonReviewEl.dispatchEvent(new Event("click"));
    })
}  



// Форматируем время
function formatDate(date){
    let months =["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля","Августа","Сентября","Октября","Ноября","Декабря"];
    let day = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    return `${day} ${month} ${year}`
} 












    