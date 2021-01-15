const imageProductCard = findImageProductCard();

zoomImage(imageProductCard);

bindButtonReview();

floatingLabelColorChange();















function findImageProductCard(){
    let image = document.querySelector('.product-card__image');
    return image;
}

function floatingLabelColorChange(){
    let form = document.forms.review;
    let elements = form.elements.input;
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
        imageProductCard.style.backgroundPosition = `${positionX}% ${positionY}%`
    })
    img.addEventListener('mouseleave',function(){
        img.style.backgroundPosition = 'center';
    })
}


function bindButtonReview(){
    let buttonReview = document.querySelector('.reviews__button');
    let newReview = document.querySelector('.reviews__form-wrapper');
    buttonReview.addEventListener('click',function(){
    newReview.hidden = !newReview.hidden;
    if(buttonReview.innerHTML =='Написать Отзыв'){
        buttonReview.innerHTML = "Закрыть Отзыв"
    } else {
        buttonReview.innerHTML = "Написать Отзыв"
    }
    })
}




