const weatherForm = document.querySelector('form')
const searchAddress = document.querySelector('input')
const messageOne = document.querySelector('#msg_1')
const messageTwo = document.querySelector('#msg_2')
const messageThree = document.querySelector('#msg_3')
const messageFour = document.querySelector('#msg_4')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''

    fetch('/weather?address=' + searchAddress.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.localTime
                messageThree.textContent = data.forecast
                messageFour.textContent = data.observationTime
            }
        })
    })
})