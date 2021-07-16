const display = document.querySelector('#display-screen')
const operands = document.querySelectorAll('.operand')
const allClear = document.querySelector('#allClear')
const operators = document.querySelectorAll('.operator')

let displayVal = '';
let numOne, numTwo, currentOperator = '';
let total = 0

operands.forEach((operand) => operand.addEventListener('click', updateDisplay))

operators.forEach((operator) => operator.addEventListener('click', calculate))



function operate(a, b, op) {
    switch(op) {
        case "+":
            value = add(a,b)
            break;
        case "-":
            value = subtract(a,b)
            break;
        case "x":
            value =multiply(a,b)
            break;
        case "/":
            value = divide(a,b)
            break;
    }
    return value;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b; 
}

function multiply(a, b) { 
    return a * b;
}

function divide(a, b) {

    if(b == 0) {
        return alert("WTFYD")
    }
    return a / b; 
}

function updateDisplay(e) {

    //Update this function to update display no matter what button is selected 
    console.log(e)
    displayVal += e.currentTarget.dataset.key
    display.textContent = displayVal;
}

function calculate(e) {
    console.log(e)

    if (currentOperator === '') {
        setOperator(e)
        numA = displayVal
        displayVal = ''
    } else if( e.currentTarget.dataset.key !== '=' ) {
        numB = displayVal 
        displayVal = operate(+numA, +numB, currentOperator)
        display.textContent = displayVal
    } else { 

    // This will cover the scenario when a user clicks the = 

    }
    
}

function setOperator(e) {
    currentOperator = e.currentTarget.dataset.key
}
