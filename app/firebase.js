var firebaseConfig = {
    apiKey: "AIzaSyDfAE-zYmd_d1Ttxr42keKn_Uxs1qv_N80",
    authDomain: "review-app-6ea6e.firebaseapp.com",
    databaseURL: "https://review-app-6ea6e-default-rtdb.firebaseio.com",
    projectId: "review-app-6ea6e",
    storageBucket: "review-app-6ea6e.appspot.com",
    messagingSenderId: "346350432403",
    appId: "1:346350432403:web:e7ba38d318d90784b45d66"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



 let listEl = document.querySelector('.reviews__listMessages');

 //Открываем стрим
 const dbRefObject = firebase.database().ref().child('listEl');
 
 //Следим за изменениями
 dbRefObject.on('value', snap => {
     let cards = snap.val();
     if(!cards) return;
     let keys = Object.keys(cards);
     listEl.innerHTML = '';
     counter = 0;
     for(let i=0; i < keys.length; i++){
        let key = keys[i];
        let name = cards[key].name;
        let surname = cards[key].surname;
        let rating = cards[key].rating;
        let textarea = cards[key].textarea;
        let date = cards[key].date;
        listEl.innerHTML += createCard(name,surname,rating,textarea,date);
        arrRating.push(+rating);
        counter++;
     }
    let totalRating = getTotalRating(arrRating);
    publishRating(totalRating,ratingTotalEl);
    publishCounter(counter,counterEl);  
    changeCounterText(counterTextEl,counterEl);
    });



    function createCard(name,surname,rating,textarea,date){
       let ratingEl = (rating/5)*100;
       let elem =  `
       <div class="reviews__listMessage">
            <div class="reviews__listMessageTitleWrapper">
                <i class="fas fa-user-circle fa-3x"></i>
                <h5 class="reviews__listMessageTitle">${name}  ${surname}</h5>
                <p class="reviews__listMessageDate">${date}</p>
            </div>
            <div class="product-card__starsOuter">
                <div class="product-card__starsInner" style="width:${ratingEl}%"></div>
            </div>
            <div class="reviews__listMessageText">${textarea}</div>
        </div>
        `;
        return elem;

    }

