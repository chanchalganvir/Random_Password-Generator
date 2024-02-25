// Get HTML elements by their IDs
const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

// Object with functions for generating random characters
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

// Event listener for the clipboard button
clipboardEl.addEventListener('click', () => {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea')
    // Get the generated password from the result element
    const password = resultEl.innerText

    // If there's no password, return
    if(!password) { return }

    // Set the value of the textarea to the password
    textarea.value = password
    // Append the textarea to the body
    document.body.appendChild(textarea)
    // Select the text in the textarea
    textarea.select()
    // Execute the copy command
    document.execCommand('copy')
    // Remove the textarea
    textarea.remove()
    // Alert the user that the password is copied to the clipboard
    alert('Password copied to clipboard!')
})

// Event listener for the generate button
generateEl.addEventListener('click', () => {
    // Get user input values
    const length = +lengthEl.value
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked

    // Generate and display the password
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})

// Function to generate a password based on user input
function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = ''
    // Count the number of selected character types
    const typesCount = lower + upper + number + symbol
    // Create an array of selected character types
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])

    // If no character types are selected, return an empty string
    if(typesCount === 0) {
        return ''
    }

    // Loop to generate the password based on the selected character types
    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            // Call the appropriate random function and append the result to the password
            generatedPassword += randomFunc[funcName]()
        })
    }

    // Trim the password to the desired length
    const finalPassword = generatedPassword.slice(0, length)

    return finalPassword
}

// Functions to generate random lowercase, uppercase, number, and symbol characters
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}