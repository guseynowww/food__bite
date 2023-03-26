function slider({container, slide, prevArrow, nextArrow, totalCount, currentCount, wrapper, field}) {
    // Slider

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCount),
        current = document.querySelector(currentCount),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width

    let slideIndex = 1,
        offset = 0

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex
    }

    slidesField.style.cssText = `
        display: flex;
        transition: 0.5s all;
        width: ${100 * slides.length}%;
    `

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width
    })

    slider.style.position = 'relative'

    const indicators = document.createElement('ol')
    let dots = []
    indicators.classList.add('carousel-indicators')

    slider.append(indicators)

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '')
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0
            slideIndex = 1
            current.textContent = `0${slideIndex}`
        } else {
            offset += deleteNotDigits(width)
            slideIndex++
            current.textContent = `0${slideIndex}`
        }

        slidesField.style.transform = `translateX(-${offset}px)`

        dotsActivity()
    })

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1)
            slideIndex = slides.length
            current.textContent = `0${slideIndex}`
        } else {
            offset -= deleteNotDigits(width)
            slideIndex--
            current.textContent = `0${slideIndex}`
        }

        slidesField.style.transform = `translateX(-${offset}px)`

        dotsActivity()
    })

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li')
        dot.setAttribute('data-slide-to', i + 1)
        dot.classList.add('dot')
        indicators.append(dot)
        dots.push(dot)

        if (i == 0) {
            dots[i].style.opacity = '1'
        }

        dots.forEach((item) => {
            item.addEventListener('click', (e) => {
                const slideTo = e.target.getAttribute('data-slide-to')

                slideIndex = slideTo
                offset = deleteNotDigits(width) * (slideTo - 1)

                slidesField.style.transform = `translateX(-${offset}px)`

                current.textContent = `0${slideIndex}`

                dotsActivity()
            })
        })
    }

    function dotsActivity() {
        dots.forEach(i => i.style.opacity = '.5')
        dots[slideIndex - 1].style.opacity = '1'
    }
}

export default slider