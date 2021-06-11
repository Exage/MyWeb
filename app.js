document.querySelectorAll('a').forEach( item => {
    item.addEventListener('click', Event => {
        Event.preventDefault()
    })
})

//let countDownDate = new Date("June 9, 2021 11:04:45").getTime()
let countDownDate = new Date("June 9, 2023 11:04:45").getTime()

let x = setInterval(() => {
    let now = new Date().getTime(),
        distance = countDownDate - now

    let days = Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = Math.floor((distance % (1000 * 60)) / (1000))

    // Useless shit that needs to be remove
    document.querySelector('.intro__timer').removeAttribute("style")
    document.querySelector('.intro__title').removeAttribute("style")

    let introTimerDate = document.querySelectorAll('.intro__timer--date')

    introTimerDate[0].innerHTML = days
    introTimerDate[1].innerHTML = hours
    introTimerDate[2].innerHTML = minutes
    introTimerDate[3].innerHTML = seconds

}, 1000)

// Burger

const burgerButton = document.querySelector('.burger__button'),
      headerNav = document.querySelector('.header__nav')

burgerButton.addEventListener('click', () => {
    headerNav.classList.toggle('active')
})

// Header

const headerInner = document.querySelector('.header__inner')

window.addEventListener('scroll', () => {
    if(window.pageYOffset >= 40) {
        headerInner.classList.add('fixed')
    } else {
        headerInner.classList.remove('fixed')
    }
})












