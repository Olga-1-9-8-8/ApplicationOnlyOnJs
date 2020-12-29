window.onload = function(){
    let canvas = document.getElementById('canvas');
    if(canvas){
        let context = canvas.getContext('2d');
        context.fillStyle = "rgba(33, 150, 243,0.8)";
        context.strokeStyle = "rgba(33, 150, 243,0.8)";
        context.lineWidth = 5;
        context.shadowColor = "rgba(0, 0, 0,0.28)";
        context.shadowOffsetY = 5;
        context.shadowBlur = 10;
        context.font = "20pt Comic sans ms"
        context.textBaseline = "bottom";
        context.fillText("Оценивай здесь!",180,80);
        context.beginPath();
        context.arc(101,120,100,1.7*Math.PI,1.2*Math.PI,true);
        context.lineJoin = "round";
        context.moveTo(54,15);
        context.lineTo(18,61);
        context.lineTo(20,61);
        context.lineTo(50,50);
        context.stroke();
    }  
}





const imageProductCard = document.querySelector('.product-card__image')

zoomImage(imageProductCard);






function zoomImage(img){
    img.addEventListener('mousemove',function(e){
        // find size of the image
        let width = img.offsetWidth;
        let height = img.offsetHeight;
        // find mouse-coords relative to block(product-card__image)
        let mouseX = e.offsetX;
        let mouseY = e.offsetY;
        console.log(mouseX,mouseY)
    })
}






bindButtonReview();





function bindButtonReview(){
    let buttonReview = document.querySelector('.reviews__button');
    let newReview = document.querySelector('.reviews__form-wrapper');
    buttonReview.addEventListener('click',() =>
    newReview.hidden = !newReview.hidden
    )
}



