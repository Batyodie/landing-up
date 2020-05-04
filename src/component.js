const $ = {}
window.$ = $

function _createModal(options) {
    const DEFAULT_WIDTH = '400px'
    const DEFAULT_HEIGHT = '550px'
    const modal = document.createElement('div')
    modal.classList.add('modal')
    modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close="true">
      <div class="main-contact-inner-right-modal" style="width: ${options.width || DEFAULT_WIDTH}; height:${options.height || DEFAULT_HEIGHT}" >
            
        <div class="inner-right-form-modal" style="height: ${options.height || DEFAULT_HEIGHT}; ">
        
          <form id="myForm" class="inner-form-modal" >
         
         ${options.content || ''}
        </form>
        </div>
      </div>
  </div>
  `)
  document.body.appendChild(modal)
      return modal     
  }
  
  $.modal = function(options) {
    const ANIMATION_SPEED = 200
    const $modal = _createModal(options)
    let closing = false
    let destroyed = false

    const modal = {
        open() {
            if(destroyed) {
                return console.log('modal is destroyed')
            }
            !closing && $modal.classList.add('open')
          },
          close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout( () => {
            $modal.classList.remove('hide')
            closing = false
            }, ANIMATION_SPEED  )
          },

    }
        const listener = event =>{
            if (event.target.dataset.close){
                modal.close()
            }
        }


    $modal.addEventListener( 'click', listener)
      
      return Object.assign(modal, {
        destroy() {
          $modal.parentNode.removeChild($modal)
          $modal.removeEventListener('click', listener)
          destroyed = true
        }
    })    
          
  }
  const modal = $.modal({
      title: 'message',
      closable: true,
      content: `
      <div class="form-name-item-modal">
         <p class="hidden-error-block"></p>
         <p class="hidden-error-block_2"></p>
         <p class="hidden-error-block_3"></p>
            <span class="name-title-style-modal">
              Full Name
            </span>
            <input type="text" class="form-name-style-modal" name="name" placeholder="Введите полное Имя"  required>
          </div>
          <div class="form-email-item-modal">
            <span class="email-title-style-modal">
              Email
            </span>
            <input type="email"  class="form-email-modal" name="email" placeholder="Введите Email"  required>
          </div>
          <div class="form-message-item-modal">
            <span class="message-title-style-modal">
              Message
            </span>
            <textarea class="form-message-style-modal" id="new_body" name="textarea" placeholder="Введите сообщение" cols="30" rows="10"></textarea>
          </div>
          <div class="inner-form-button-modal">
            <button type="submit" data-btn="submit" class="btn-modal">SUBMIT</button>
          </div>
         `,
      width: '428px'
  })
  document.addEventListener('click', event => {
      event.preventDefault()
      const btnType = event.target.dataset.btn
      if (btnType === 'form'){
          modal.open()
      }
  })

 export {
   modal,
   $
 }


 