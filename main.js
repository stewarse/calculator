const display = document.querySelector('#display-screen')
const operands = document.querySelectorAll('.operand')
const clearBtn = document.querySelector('.clear')

const operators = document.querySelectorAll('.operator')


let displayVal = '0';
let numA = '';
let numB = '';
let currentOperator = '';
let operatorArr =['+', '-', '*', '/','=']

operands.forEach((operand) => operand.addEventListener('click', updateDisplay))

operators.forEach((operator) => operator.addEventListener('click', calculate))

clearBtn.addEventListener('click', clear)

function operate(a, b, op) {
    switch(op) {
        case "+":
            value = add(a,b)
            break;
        case "-":
            value = subtract(a,b)
            break;
        case "*":
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
    return (100 * a) / (100 * b); 
}

function updateDisplay(e) {
    if(displayVal === '0' && clearBtn.id === 'allClear') {
        displayVal = ''
        clearBtn.textContent = 'C'
        clearBtn.id = 'clear'
    } else if (displayVal === '0') { 
        displayVal = ''
    }
    if (e.target.classList[0]  === 'operand' && currentOperator !== '='){
        display.textContent = displayVal += e.target.dataset.key
    } else {
        display.textContent = displayVal
        displayVal = ''
    }
}

function calculate(e) {
    console.log(e)

    if (currentOperator === '') {
        setOperator(e)
        numA = displayVal
        displayVal = '0'
    } else if (e.target.dataset.key === '=' && numB !== '') {
        numA = displayVal = operate(+numA, +numB, currentOperator)
        updateDisplay(e)
    } else {
        numB = displayVal;
        numA = displayVal = operate(+numA, +numB, currentOperator)
        updateDisplay(e)
    }
}


function setOperator(e) {
    currentOperator = e.target.dataset.key
}

function clear(e) {
    if(clearBtn.id = 'clear'){
        displayVal = '0'
        updateDisplay(e)
        clearBtn.id = 'allClear'
        clearBtn.textContent = 'AC'
    } else {
        displayVal = numA = numB = currentOperator = ''
    }
}

/****
 * five 
 *  - display the number 5
 *  - store 5 for use in calcs
 *  plus 
 *  - store the operator 
 *  - move the number to a new variable to use in calculations
 *  - reset display val
 * four  
 *  - display the number 4
 *  - store 4 for use in calcs (add subsequent numbers as well)
 * minus 
 *  - call operate based on existing operator
 *  - replace display number with the result
 *  - display results
 *  - set numA = displayVal
 *  - clear displayVal
 * three 
 */



/***
 * Optional tasks:
 * Update to fix scenarios where JavaScript divides "funkily" i.e. 12.2 / .1
 * Selected state for operator buttons
 * Update AC to just clear the latest number  
 */