// умный хедер
let lastScrollTop = 0
const header = document.querySelector('#header-cnt')
const scrollHeaderTop = window.addEventListener('scroll', showHeaderScrollTop)

const formSubscribe = document.querySelector('#form-subscribe')
const submitFormSubscribe = formSubscribe.addEventListener(
	'submit',
	formActions
)

function showHeaderScrollTop() {
	const currentScroll = window.scrollY
	if (currentScroll <= 0) {
		if (header.classList.contains('header_header-scroll')) {
			header.classList.remove('header_header-scroll')
		}
		return
	}

	if (currentScroll > lastScrollTop) {
		if (!header.classList.contains('header_header-scroll')) {
			header.classList.add('header_header-scroll')
		}
	} else if (currentScroll < lastScrollTop) {
		if (header.classList.contains('header_header-scroll')) {
			header.classList.remove('header_header-scroll')
		}
	}
	lastScrollTop = currentScroll
}

// формы
// валидация email
function validateEmail(email) {
	const emailRegex =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

	return emailRegex.test(email)
}
// стилизация по результатам валидации
function formActions(e) {
	e.preventDefault()

	let formData = new FormData(formSubscribe)

	const emailInput = document.querySelector('#inp-email-subscribe')
	const emailVal = emailInput.value.toLowerCase()
	const chbSubscribeChd = document.querySelector('#chb-subscribe').checked
	const subscrSuccessful = document.querySelector('.subscr-successful')
	const successMessage = document.querySelector(
		'.form-subscribe__success-message'
	)
	const inpEmailSubscribeWrp = document.querySelector(
		'#inp-email-subscribe-wrp'
	)

	if (!chbSubscribeChd || !emailVal) {
		successMessage.innerText = `No ha introducido el correo electrónico o no ha aceptado los términos.`
		return
	}

	if (emailVal !== '') {
		const validEmail = validateEmail(emailVal)
		if (!validEmail) {
			emailInput.style.borderColor = 'var(--tangerine)'
			emailInput.style.borderWidth = '2px'
			successMessage.innerHTML = `Formato de email inválido, verifique a ortografia.` // не поставили галочку о соглашении
			inpEmailSubscribeWrp.classList.add('error-inp-wrp')
			inpEmailSubscribeWrp.classList.remove('correct-inp-wrp')
			return
		} else {
			emailInput.style.borderColor = 'var(--grass)'
			emailInput.style.borderWidth = '2px'
			successMessage.innerHTML = ''
			inpEmailSubscribeWrp.classList.add('correct-inp-wrp')
			inpEmailSubscribeWrp.classList.remove('error-inp-wrp')
			// отправляем formData на сервер (Object.fromEntries(formData) для просмотра здесь)

			// имитация отправки на сервер через 1000ms
			setTimeout(() => {
				subscrSuccessful.style.display = 'block'
				formSubscribe.style.display = 'none'
				console.log('Форма отправлена через 1000ms !')
			}, 1000)
		}
	}
	clearTimeout()
}
