//
const imageProductCardEl = findImageProductCard();

let formEl = findForm();
let inputsFormEl = findFormInputs(formEl);
let textareaFormEl = findFormTextarea(formEl);
let submitFormEl = findFormSubmit(formEl);

let buttonReviewEl = findButtonReviw();
let newReviewEl = findNewReview();


    

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
 return form.elements.input;
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




function bindButtonFormSubmit(form){
    
    form.addEventListener('submit',async function(event){
        event.preventDefault();
        
        //обязательно писать после адреса до базы, название своей коллекции.json
        let response = await fetch('https://review-app-6ea6e-default-rtdb.firebaseio.com/reviews.json',{
            method:'POST',
            body: JSON.stringify(Object.fromEntries(new FormData(this))),
            headers:{
    	        'Content-Type': 'application/json'
            }
        });


        let result = await response.json();

    })
}  

// function getRating(){
//     let radios = document.getElementsByName('rating');
//     for(let radio of radios){
//         radio.onchange = function(){
            
//         }
//     }
//  return alert('sdg');
// }
// const reviewObj = {
//     name: inputs[0].value,
//     surname: inputs[1].value,
//     starScore: getRating(),
//     reviewText: textarea.value
// }
// console.log(reviewObj)

