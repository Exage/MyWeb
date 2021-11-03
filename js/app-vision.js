const body = document.querySelector('body')
const page = document.querySelector('.page')

/* Show controls */

let isControlsOpen = false

document.querySelector('.vision__controls--button').addEventListener('click', function() {
    if (isControlsOpen) {
        document.querySelector('.vision__controls').style.height = `0px`
        isControlsOpen = false

        this.classList.remove('rot')
    } else {
        document.querySelector('.vision__controls').style.height = `${document.querySelector('.vision__controls--inner').clientHeight}px`
        isControlsOpen = true

        this.classList.add('rot')
    }
})

/* Open Nav */

document.querySelector('.open__nav').addEventListener('click', () => {
    document.querySelector('.nav').classList.toggle('active')
})

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

const pageTopHeight = document.querySelector('.page__top').clientHeight

document.querySelectorAll('.nav__link').forEach(item => {
    item.addEventListener('click', Event => {
        Event.preventDefault()

        let target = document.querySelector(item.getAttribute('href'))
        let targetTop = target.getBoundingClientRect().top

        clearModals()
        body.style.overflow = 'auto'

        window.scrollBy({
            top: targetTop - (pageTopHeight + 25),
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

let modalCounter = 0

modal.forEach((item, itemPos) => {
    item.addEventListener('click', Event => {
        if (Event.target.id === 'close-modal') {
            item.classList.remove('active')
            body.style.overflow = 'auto'
        }

        if (Event.target.id === 'modal-work__next') {
            clearModals()
            if (modalCounter === modal.length - 1) {
                modalCounter = 0
            } else {
                modalCounter++
            }
            modal[modalCounter].classList.add('active')
        }
        if (Event.target.id === 'modal-work__prev') {
            clearModals()
            if (modalCounter === 0) {
                modalCounter = modal.length - 1
            } else {
                modalCounter--
            }
            modal[modalCounter].classList.add('active')
        }
    })
})

function clearModals() {
    modal.forEach(item => item.classList.remove('active'))
}

/* Call Modal By Exposition */

const expositionItem = document.querySelectorAll('.exposition__item')

expositionItem.forEach((item, itemPos) => {
    item.addEventListener('click', () => {
        if (!(modal[itemPos] === undefined)) {
            body.style.overflow = 'hidden'
            modalCounter = itemPos
            modal[modalCounter].classList.add('active')
        } else {
            alert('Модального окна нет, Швороб добавь окно')
        }
    })
})

modal.forEach(item => {
    item.setAttribute('style', `height: ${document.documentElement.clientHeight - pageTopHeight}px`) 
})