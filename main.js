const display = document.querySelector('#display-screen')
const operands = document.querySelectorAll('.operand')
const allClear = document.querySelector('#allClear')
const operators = document.querySelectorAll('.operator')

let displayVal = '';
let numOne, numTwo, currentOperator = '';
let total = 0
let operatorArr =['+', '-', '*', '/','=']

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
    return a / b; 
}

function updateDisplay(e) {

    //Update this function to update display no matter what button is selected 
    //console.log(e.currentTarget.classList[0] === 'operand')
    if (e.currentTarget.classList[0] === 'operand'){
        display.textContent = displayVal += e.target.dataset.key
    } else {
        display.textContent = displayVal
    }
}

function calculate(e) {
    console.log(e)

    if (currentOperator === '') {
        setOperator(e)
        numA = displayVal
        displayVal = ''
    } else {
        //numB = displayVal 

        displayVal = operate(+numA, +displayVal, currentOperator)
        updateDisplay(e)
        if (e.currentTarget.dataset.key !== '=') {
            numA = displayVal
        }
    // } else { 

    // // This will cover the scenario when a user clicks the = 

    //     if (currentOperator !== '') {
    //         //Need to fix this function because it 
    //         displayVal = operate(+numA, +numB, currentOperator)
    //         display.textContent = displayVal 
    //     }
    
     }
}

function setOperator(e) {
    currentOperator = e.currentTarget.dataset.key
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

// Figure out a solution for 12.2 / .1 (currently returns 121.99999999999 instead of 122)