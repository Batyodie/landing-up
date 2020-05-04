import './component.js';
import {modal, $} from './component.js';

const buttonSubmit = document.querySelector(".btn-modal")
const inputFullName = document.querySelector(".form-name-style-modal")
const inputEmail = document.querySelector(".form-email-modal")



buttonSubmit.addEventListener("click", function (event){
const errorFullName = document.querySelector(".hidden-error-block")
const errorEmail = document.querySelector(".hidden-error-block_2")
const errorFullNameLength = document.querySelector(".hidden-error-block_3")
let flag = false
    event.preventDefault();
     if(inputFullName.value.length == ''){
        errorFullName.innerHTML ="Вы не ввели ФИО"
        flag = false
    }
    else{
      errorFullName.innerHTML ="" 
      flag = true
    }
     if( inputEmail.value.length == ''){
        errorEmail.innerHTML ="Вы не ввели Email"
        flag = false
    }
    else{
      errorEmail.innerHTML =""
      flag = true
    }

    if (inputFullName.value.length > 30 ){
        errorFullNameLength.innerHTML ="ФИО должно быть не больше 30 символов"
        flag = false
    }
    const matchEmail = /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-0-9A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/

  if (inputEmail.value.match(matchEmail)) {
   flag = true
  
    
  } else {
    errorEmail.innerHTML ="Ваш Email заполнен не верно или не введен"
    flag = false
  }
  if(flag){
    const fullName = document.querySelector(".form-name-style-modal").value;
    const email = document.querySelector(".form-email-modal").value;
    const message = document.querySelector(".form-message-style-modal").value;
  
     
      console.log(`Input Data:`  + `${fullName}` +  `${email}` + `${message}`);
  
      fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            message: message,
            fullName: fullName
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then(response => response.json())
        .then(json => {
          console.log('response: ' + JSON.stringify(json));
        })
       const popUP = $.modal({
    title: 'message',
    closable: true,
    content: `
    <div class="form-name-item-modal" style="width: 450px; height: 178px; display: flex; flex-direction: column; justify-content: center; ">
    <div class="container-popUp">    
    <div class="popUp-content">
          <span class="popUp-style">
         <p>Ваше обращение принято! </p>
          </span>
        </div>
        <div class="popUp-content">
        <button type="submit" data-btn="PopUp" class="btn-modal_2 btn-popUp" >
        SUBMIT</button>
        </div>
        <div class="popUp-content">
        </div>
       `,
    width: '540px',
    height: '178px',
})

  document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    if (btnType === 'submit'){
      modal.close()
      popUP.open()
    }
})
document.addEventListener('click', event => {
  event.preventDefault()
  const btnType = event.target.dataset.btn
  if (btnType === 'PopUp'){
    popUP.close()
  }
})   
  }
  
})


