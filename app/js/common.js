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




// window.onload = function(){
//     let canvas = document.getElementById('canvas');
//     if(canvas){
//         let context = canvas.getContext('2d');
//         context.fillStyle = "rgba(33, 150, 243,0.8)";
//         context.strokeStyle = "rgba(33, 150, 243,0.8)";
//         context.lineWidth = 5;
//         context.shadowColor = "rgba(0, 0, 0,0.28)";
//         context.shadowOffsetY = 5;
//         context.shadowBlur = 10;
//         context.font = "20pt Comic sans ms"
//         context.textBaseline = "bottom";
//         context.fillText("Оценивай здесь!",180,80);
//         context.beginPath();
//         context.arc(101,120,100,1.7*Math.PI,1.2*Math.PI,true);
//         context.lineJoin = "round";
//         context.moveTo(54,15);
//         context.lineTo(18,61);
//         context.lineTo(20,61);
//         context.lineTo(50,50);
//         context.stroke();
//     }  
// }