const weatherForm = document.querySelector('form')
const searchAddress = document.querySelector('input')
const messageOne = document.querySelector('#msg_1')
const messageTwo = document.querySelector('#msg_2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + searchAddress.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})