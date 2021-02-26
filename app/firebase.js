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


 const dbRefObject = firebase.database().ref().child('listEl');
 
 
 dbRefObject.on('value', snap => {
     let cards = snap.val();
     let keys = Object.keys(cards);
     for(let i=0; i < keys.length; i++){
        let key = keys[i];
        let name = cards[key].name;
        let surname = cards[key].surname;
        let rating = cards[key].rating;
        let textarea = cards[key].textarea;
        let date = cards[key].date;
        listEl.innerHTML += createCard(name,surname,rating,textarea,date) 
     }
     
    });



    function createCard(name,surname,rating,textarea,date){
       
       return  `
       <div class="reviews__listMessages">
            <div class="reviews__listMessageTitleWrapper">
                <h5 class="reviews__listMessageTitle">${name}  ${surname}</h5>
                <p class="reviews__listMessageDate">${date}</p>
            </div>
            <div class="reviews__listMessageRating">${rating}</div>
            <div class="reviews__listMessageText">${textarea}</div>
        </div>
        `
    }

