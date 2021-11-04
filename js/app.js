const body = document.body

const page = document.querySelector('.page')
const nav = document.querySelector('.nav')

let pageWidth = page.clientWidth
let navWidth = 300

const header = document.querySelector('.header')
const logo = document.querySelector('.logo')
const intro = document.querySelector('.intro')
const introMask = document.querySelector('.intro__mask')
const introBgImages = document.querySelector('.intro__bg--images')
const introBg = document.querySelectorAll('.intro__bg')

let headerHeight = header.clientHeight

/* Change Theme */

const changeTheme = document.querySelector('#change-theme')
const changeFavTheme = document.querySelector('#change-favicon-theme')

const bulb = document.querySelector('.header__bulb')

changeTheme.setAttribute('href', `css/${localStorage.getItem('theme')}-theme.css`)
changeFavTheme.setAttribute('href', `images/favicon-${localStorage.getItem('theme')}.svg`)

if (localStorage.getItem('theme') === 'dark') {
    changeTheme.setAttribute('data-theme', 'light')
}

bulb.addEventListener('click', () => {
    changeTheme.setAttribute('href', `css/${changeTheme.getAttribute('data-theme')}-theme.css`)

    if (changeTheme.getAttribute('data-theme') === 'dark') {
        changeTheme.setAttribute('data-theme', 'light')
        changeFavTheme.setAttribute('href', `images/favicon-dark.svg`)

        localStorage.setItem('theme', 'dark')
    } else {
        changeTheme.setAttribute('data-theme', 'dark')
        changeFavTheme.setAttribute('href', `images/favicon-light.svg`)

        localStorage.setItem('theme', 'light')
    }
})

/* Inrtro & Header */

function checkScrollPos() {
    if (scrollPos >= intro.clientHeight) {
        header.classList.add('fixed')
        introMask.setAttribute('style', `background: linear-gradient(0deg, rgba(16,16,16,1) 5%, rgba(16,16,16,1) 115%);`)
        introBgImages.style.transform = `translateY(${intro.clientHeight * 0.25}px)`
        bulb.classList.add('active')
        logo.classList.add('canScroll')
    } else {
        header.classList.remove('fixed')
        introMask.setAttribute('style', `background: linear-gradient(0deg, rgba(16,16,16,1) 5%, rgba(16,16,16,${(scrollPos / 1000) * 1.2}) 115%);`)  
        introBgImages.style.transform = `translateY(${scrollPos * 0.25}px)`
        logo.classList.remove('canScroll')
    }
}

let scrollPos = window.scrollY
checkScrollPos()

window.addEventListener('scroll', () => {
    scrollPos = window.scrollY
    checkScrollPos()
})

const scrollBtn = document.querySelector('.intro__sroll--btn')

scrollBtn.addEventListener('click', () => {
    window.scrollBy({
        top: intro.clientHeight - scrollPos,
        behavior: 'smooth'
    })
})

/* introBg */

introBg[0].classList.add('startAnim')

let i = 1

const x = setInterval(() => {
    introBg.forEach(item => item.classList.remove('startAnim'))
    introBg[i].classList.add('startAnim')
    i++
    if (i === introBg.length) i = 0
}, 3500)

/* Toggle Navigation */

const burger = document.querySelector('.burger')
const navMask = document.querySelector('.nav__mask')

burger.addEventListener('click', toggleNav)

navMask.addEventListener('click', Event => {
    if (Event.target.id === 'close-nav') {
        toggleNav()
    }
})

function toggleNav() {
    body.classList.toggle('nav__active')
    chronicHide()
    if (window.innerWidth > 1000 - 17) {
        changeBlockSize()
    }
}

window.addEventListener('keydown', Event => {
    if (Event.key === 'Escape') toggleNav()
})

/* Calc size when nav open */

const standartFontSize = 16

function changeBlockSize() {
    (body.classList.contains('nav__active')) 
        ? body.style.fontSize = `${calcSize()}px` 
        : body.style.fontSize = `${standartFontSize}px`   
}

window.addEventListener('resize', () => {
    (body.classList.contains('active')) 
        ? pageWidth = page.clientWidth 
        : pageWidth = page.clientWidth + 300

    if (window.innerWidth > 1000 - 17) {
        changeBlockSize()
    } else {
        body.style.fontSize = `${standartFontSize}px`
    }
})

function calcSize() {
    return (standartFontSize * (((pageWidth - navWidth) * 100) / pageWidth)) / 100
}

/* Swiper */

const swiper = new Swiper('.workers__slider', {
    loop: true,
    spaceBetween: 15,
    slidesPerView: 1,
    centeredSlides: false,

    pagination: {
        el: '.workers .workers__dots',
        clickable: 'true'
    },

    navigation: {
        nextEl: '.workers__button-next',
        prevEl: '.workers__button-prev',
    },

    breakpoints: {
        750: { 
            slidesPerView: 2,
            centeredSlides: false,
        },
        1160: { 
            slidesPerView: 3,
            spaceBetween: 20,
            centeredSlides: true,
        }
    }
})

const swiper2 = new Swiper('.chronicle__slider', {
    spaceBetween: 15,
    slidesPerView: 1,

    pagination: {
        // el: '.workers .workers__dots',
        clickable: 'true'
    },

    navigation: {
        nextEl: '.chronicle__button-next',
        prevEl: '.chronicle__button-prev',
    },

    breakpoints: {
        650: { 
            spaceBetween: 15,
            slidesPerView: 2
        },
        915: { 
            spaceBetween: 15,
            slidesPerView: 3
        },
        1200: { 
            spaceBetween: 15,
            slidesPerView: 4
        }
    }
})

const swiperM = new Swiper('.modal__swiper', {
    spaceBetween: 30,
    slidesPerView: 1,
    autoHeight: true,
    loop: true,

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

/* Smooth Scroll */

const navLinks = document.querySelectorAll('.nav__link')
const footerLinks = document.querySelectorAll('.footer__link')

const smoothScrollLinks = new Array(...navLinks, ...footerLinks)

smoothScrollLinks.forEach(item => {
    smoothScroll(item)
})

function smoothScroll(item) {
    item.addEventListener('click', Event => {
        Event.preventDefault()

        const target = document.querySelector(item.getAttribute('href'))
        const targetTop = target.getBoundingClientRect().top

        window.scrollBy({
            top: targetTop - headerHeight,
            behavior: 'smooth'
        })
    })
}

/* Chronicle */

const chronicleItem = document.querySelectorAll('.chronicle__item')
const chronicleBlocks = document.querySelector('.chronicle__blocks')
const chronicleBlocksHidden = document.querySelectorAll('.chronicle__block--hidden')
const chronicleBlocksCross = document.querySelectorAll('.chronicle__block--cross')

chronicleItem.forEach((item, itemPos) => {
    item.addEventListener('click', () => {
        if (!body.classList.contains('nav__active')) {
            chronicHide()
            const hiddenHeight = chronicleBlocksHidden[itemPos].querySelector('.chronicle__block--inner').clientHeight
            chronicleBlocksHidden[itemPos].style.height = `${hiddenHeight / standartFontSize}em`
        }
    })
})

chronicleBlocksCross.forEach(item => {
    item.addEventListener('click', chronicHide)
})

function chronicHide() {
    chronicleBlocksHidden.forEach(item => item.style.height = 0)
}

/* Modals */

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

/* Person More */

const personInfoMore = document.querySelector('.person__info--more')
const personInfoMoreInner = document.querySelector('.person__info--more__inner')
const personMoreBtn = document.querySelector('.person__more-btn')

personMoreBtn.addEventListener('click', () => {
    if (personInfoMoreInner.classList.contains('active')) {
        personInfoMore.style.height = 0
        personInfoMoreInner.classList.remove('active')
    } else {
        personInfoMore.style.height = `${personInfoMoreInner.clientHeight / 24}em`
        personInfoMoreInner.classList.add('active')
    }
})

/* To Top */

const logoImg = document.querySelector('.logo__img')

logoImg.addEventListener('click', Event => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})

/* ??? */

window.addEventListener('keydown', Event => {
    if (Event.key === ']' || Event.key === 'ъ') {
        if (Event.ctrlKey) {
            let secret = prompt('Введи код') 
            console.log(secret)
            if (secret !== null) {
                if (secret === '240205__210405') {
                    window.open('https://www.youtube.com/watch?v=YX5UdrBozms&ab_channel=BRUTTONOSTRA')
                } else if (secret === 'Полина Рогова' || secret === 'Рогова Полина') {
                    alert('Крашиха')
                } else {
                    alert('Такого не знаем... ¯\_(ツ)_/¯')
                }
            }
        }
    }
    
    if (Event.code === 'KeyA') {
        console.log('tps://www.y [2]')
    }
    if (Event.code === 'KeyR') {
        console.log('ht [1]')
    }
    if (Event.code === 'Slash') {
        console.log('outube.c [3]')
    }
    if (Event.code === 'Comma') {
        console.log('om/watch? [4]')
    }
    if (Event.code === 'KeyZ') {
        console.log('v=dQ [5]')
    }
    if (Event.code === 'KeyX') {
        console.log('w4w [6]')
    }
    if (Event.code === 'KeyG') {
        console.log('9WgX [7]')
    }
    if (Event.code === 'KeyC') {
        console.log('cQ [8]')
    }
})


