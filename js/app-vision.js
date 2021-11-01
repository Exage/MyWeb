const body = document.querySelector('body')
const page = document.querySelector('.page')

/* Img Grayscale */

document.querySelector('#img-gray').addEventListener('click', function() {
    page.classList.toggle('img-gray')

    if (page.classList.contains('img-gray')) {
        this.innerHTML = 'ЦВЕТ'
    } else {
        this.innerHTML = 'Ч/Б'
    }
})
document.querySelector('#img-change').addEventListener('click', function() {
    page.classList.toggle('no-img')

    if (page.classList.contains('no-img')) {
        this.innerHTML = 'ВКЛ'
    } else {
        this.innerHTML = 'ВЫКЛ'
    }
})

/* Page Color */

document.querySelector('#page-color-light').addEventListener('click', () => page.classList.remove('dark'))
document.querySelector('#page-color-dark').addEventListener('click', () => page.classList.add('dark'))

/* Font Size */

let fontCounter = 1

document.querySelector('#font-plus').addEventListener('click', () => {
    (fontCounter >= 4) ? fontCounter = 4 : fontCounter++
    page.style.fontSize = `${16 + (fontCounter * 2)}px`
})

document.querySelector('#font-minus').addEventListener('click', () => {
    (fontCounter <= 1) ? fontCounter = 1 : fontCounter--
    page.style.fontSize = `${16 + (fontCounter * 2)}px`
})

/* Line Height */

let lineHeightCounter = 0

document.querySelector('#lh-plus').addEventListener('click', function() {
    (lineHeightCounter < 6) ? lineHeightCounter++ : lineHeight = 6
    page.style.lineHeight = `1.${lineHeightCounter + 1}`
})

document.querySelector('#lh-minus').addEventListener('click', function() {
    (lineHeightCounter > 0) ? lineHeightCounter-- : lineHeight = 0
    page.style.lineHeight = `1.${lineHeightCounter + 1}`
})

/* Smooth Scroll */

const pageTopHeight = document.querySelector('.page__top').clientHeight + 25

document.querySelectorAll('.nav__link').forEach(item => {
    item.addEventListener('click', Event => {
        Event.preventDefault()

        let target = document.querySelector(item.getAttribute('href'))
        let targetTop = target.getBoundingClientRect().top

        window.scrollBy({
            top: targetTop - pageTopHeight,
            behavior: 'smooth'
        })
    })
})

/* Modals */

const swiperM = new Swiper('.modal__swiper', {
    spaceBetween: 30,
    slidesPerView: 1,
    autoHeight: true,

    pagination: {
        el: '.modal__swiper-pagination',
        clickable: 'true'
    },

    navigation: {
        nextEl: '.modal__swiper-button-next',
        prevEl: '.modal__swiper-button-prev',
    },

    breakpoints: {
        1060: {
            autoHeight: false
        }
    }
})

const modal = document.querySelectorAll('.modal')

modal.forEach((item, itemPos) => {
    item.addEventListener('click', Event => {
        if (Event.target.id === 'close-modal') {
            item.classList.remove('active')
            body.style.overflow = 'auto'
            header.style.display = 'block'
        }

        if (Event.target.id === 'modal-work__next') {
            if (itemPos < modal.length - 1) {
                modal[itemPos + 1].classList.add('active')
                item.classList.remove('active')
            }
        }
        if (Event.target.id === 'modal-work__prev') {
            if (itemPos > 0) {
                modal[itemPos - 1].classList.add('active')
                item.classList.remove('active')
            }
        }
    })
})

const expositionItem = document.querySelectorAll('.exposition__item')
const header = document.querySelector('.header')

console.log(expositionItem)

expositionItem.forEach((item, itemPos) => {
    item.addEventListener('click', () => {
        if (!(modal[itemPos] === undefined)) {
            modal[itemPos].classList.add('active')
            body.style.overflow = 'hidden'
            header.style.display = 'none'
        } else {
            alert('Модального окна нет, Швороб добавь окно')
        }
    })
})