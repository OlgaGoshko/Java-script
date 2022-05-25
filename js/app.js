
const $form = document.querySelector('#todo-list-form')

if ($form){
   const $warning = document.querySelector('#warning')
   const $noteField = document.querySelector('#note-field')
   const $noteList = document.querySelector('#todo-list-items')
   const $buttonFilter = document.querySelector('#button-filter')

   let $listItem = []
   let $buttonsDelete = []
   const notes = []
   
   $buttonFilter.addEventListener('click', function(){
      if ($noteList.classList.contains('reverse')){
         $noteList.classList.remove('reverse')
         $buttonFilter.textContent = 'Спочатку старі'
      } else {
         $noteList.classList.add('reverse')
         $buttonFilter.textContent = 'Спочатку нові'
      }
   })


   function renderNote(nodeList){
      $noteList.innerHTML = ''
      // render - процес візуалізації (відтворення)
      notes.forEach((note, index) => {
         $noteList.insertAdjacentHTML('afterbegin', `
         <li class="todo-list__item">
            <span class="todo-list__number">${index + 1}</span>
            <p class="todo-list__note">${note}</p>
            <button data-index=${index} class="todo-list__button-delete">Видалити</button>
         </li>
         `)
      })
   }

   $noteField.addEventListener('input', event => {
      if ($noteField.value){
         $warning.textContent = ''
      }
   })

   $form.addEventListener('submit', event => {
      // Відміна базової події перезавантаження
      event.preventDefault()
      
      const noteText = $noteField.value

      if (noteText){
         $warning.textContent = ''

         notes.push(noteText)

         renderNote(notes)

         $buttonsDelete = document.querySelectorAll('.todo-list__button-delete')
         $listItem = document.querySelectorAll('.todo-list__item')

         $buttonsDelete.forEach((button, index) => {
            button.addEventListener('click', () => {
               $noteList.removeChild($listItem[index])
               notes.splice(index, 1)
            })
         })

         $noteField.value = ''
      } else {
         $warning.textContent = 'Заповніть поле, воно пусте...'
      }
   })
}