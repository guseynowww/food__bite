function calc() {
    // Calculator

    const result = document.querySelector('.calculating__result span')
    let sex, ratio, weight, height, age

    function calcTotal() {
        if (!sex || !weight || !height || !age || !ratio) {
            result.textContent = '_____'
            return
        }

        if (sex == 'female') {
            result.textContent = Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * ratio)
        } else if (sex == 'male') {
            result.textContent = Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio)
        }
    }

    calcTotal()

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector)

        elements.forEach(i => {
            i.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio')
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
                } else {
                    sex = e.target.getAttribute('id')
                    localStorage.setItem('sex', e.target.getAttribute('id'))
                }

                elements.forEach(item => item.classList.remove(activeClass))
                e.target.classList.add(activeClass)

                calcTotal()
            })
        })
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio')
    } else {
        ratio = 1.375
        localStorage.setItem('ratio', 1.375)
    }


    if (localStorage.getItem('sex')) {
        ratio = localStorage.getItem('sex')
    } else {
        sex = 'female'
        localStorage.setItem('sex', 'female')
    }


    getStaticInformation('#gender div', 'calculating__choose-item_active')
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active')


    function getInputInformation(selector) {
        const input = document.querySelector(selector)

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red'
            } else {
                input.style.border = 'none'
            }

            switch (input.getAttribute('id')) {
                case 'weight':
                    weight = +input.value
                    break
                case 'height':
                    height = +input.value
                    break
                case 'age':
                    age = +input.value
                    break
            }

            calcTotal()
        })
    }

    function activeClassInit(selector, activeClass) {
        const elements = document.querySelectorAll(selector)

        elements.forEach(item => {
            item.classList.remove(activeClass)

            if (item.getAttribute('id') === localStorage.getItem('sex')) {
                item.classList.add(activeClass)
            }

            if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                item.classList.add(activeClass)
            }
        })
    }

    activeClassInit('#gender div', 'calculating__choose-item_active')
    activeClassInit('.calculating__choose_big div', 'calculating__choose-item_active')

    getInputInformation("#age")
    getInputInformation("#weight")
    getInputInformation("#height")
}

export default calc