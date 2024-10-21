// умный хедер
let lastScrollTop = 0
const header = document.querySelector('.header')

// window.addEventListener('scroll', function () {
// 	const scrollTop = window.pageYOffset || document.documentElement.scrollTop
// 	if (scrollTop > lastScrollTop) {
// 		header.style.top = '-100px' // Hide header
// 	} else {
// 		header.style.top = '0' // Show header
// 	}
// 	lastScrollTop = scrollTop
// })

// На странице есть форма подписки, необходимо реализовать валидацию email, если поле не корректно заполнили подсвечиваем инпут красным, в макетах есть пример текстового поля с ошибкой в секции ui-kit. После успешного заполнения формы и отправки мы должны показать блок успеха и скрыть форму.

// document.querySelector('.form').addEventListener('submit', function (event) {
//   event.preventDefault()

//   const name = document.querySelector('#name').value
//   const email = document.querySelector('#email').value
//   const phone = document.querySelector('#phone').value

//   if (!name ||!email ||!phone) {
//     alert('Please fill all fields')
//     return
//   }

//   // валидация email
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//   if (!emailRegex.test(email)) {
//     alert('Please enter a valid email address')
//     return
//   }

// отправка формы
document.querySelector('.form').addEventListener('submit', function (event) {
	event.preventDefault()

	const name = document.querySelector('#name').value
	const emailInput = document.querySelector('#email')
	const email = emailInput.value
	const phone = document.querySelector('#phone').value
	const successMessage = document.querySelector('.success-message')
	const form = document.querySelector('.form')

	if (!name || !email || !phone) {
		alert('Please fill all fields')
		return
	}

	// Email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	if (!emailRegex.test(email)) {
		emailInput.style.borderColor = 'red' // Highlight input in red
		alert('Please enter a valid email address')
		return
	} else {
		emailInput.style.borderColor = '' // Reset input border color
	}

	// Show success message and hide form
	successMessage.style.display = 'block'
	form.style.display = 'none'
})
