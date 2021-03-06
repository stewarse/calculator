const display = document.querySelector('#display-screen')
const operands = document.querySelectorAll('.operand')
const clearBtn = document.querySelector('.clear')
const percent = document.querySelector('#percent')
const negate = document.querySelector('#negate')

const operators = document.querySelectorAll('.operator')


let displayVal = '0';
let numA = '0';
let numB = '';
let currentOperator = '';
const operatorArr =['+', '-', '*', '/','=','Enter']
let counter = 0;
let period = false;
const calculatorArr = ["0","1","2","3","4","5","6","7","8","9",".",...operatorArr]


operands.forEach((operand) => operand.addEventListener('click', updateDisplay))

window.addEventListener('keypress', getKey)

operators.forEach((operator) => operator.addEventListener('click', evaluate))

clearBtn.addEventListener('click', clear)

percent.addEventListener('click', getPercentage)

negate.addEventListener('click',changeSign)

function operate(a, b, op) {
    switch(op) {
        case "+":
            value = add(a,b)
            break;
        case "-":
            value = subtract(a,b)
            break;
        case "*":
            value = multiply(a,b)
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
    return ((100 * a) * (100 * b)) / 10000;
}

function divide(a, b) {

    if(b == 0) {
        alert("WTFYD")
        return 0
    }
    return (100 * a) / (100 * b); 
}

function updateDisplay(e) {
    let temp = e.type === 'keypress' ? e.key : e.target.dataset.key
    console.log(e.target.classList)
    if(temp === '.') {
        if (!period) {
            period = true
        } else {
            return
        }
    }

    if(counter <= 15) {
        if ((e.target.classList[0]  === 'operand' && e.key !== 'Enter' && e.key !== '=') || (e.type === 'keypress' && currentOperator !== '=' && operatorArr.indexOf(e.key) === -1)){
            if (temp === '.' && displayVal === '' ){
                displayVal = '0'
            } else if (temp !== '.' && displayVal === '0') {
                displayVal = ''
            }

            if (clearBtn.id === 'allClear') {
                clearBtn.textContent = 'C'
                clearBtn.id = 'clear'
            } 
            display.textContent = displayVal += temp
        } else {
            display.textContent = displayVal
        }
        counter++;
    }
}

function evaluate(e) {
    period = false
    if (currentOperator === '' /*|| currentOperator === '='*/ ) {
        setOperator(e)
        numA = displayVal
        displayVal = ''
    }  else {
        if(numB !== '' || displayVal !== ''){
            numB = displayVal;
            numA = displayVal = operate(+numA, +numB, currentOperator);
            updateDisplay(e);
            displayVal = '';
            counter = 0;
            clearSelectedOp()
        }
        if ( e.key !== '=' && e.key !== 'Enter' && e.target.dataset.key !== '=' ){ 
            setOperator(e);
        } else {
            clearSelectedOp()
            setSelectedOp(e)
        }

    }
}


function setOperator(e) {

    clearSelectedOp()
    if(e.key === 'Enter') {
        currentOperator = '='
    } else {
        currentOperator = e.type === 'keypress' ? e.key : e.target.dataset.key
    }
    setSelectedOp(e)

}

function clear(e) {
    if(clearBtn.id === 'clear'){
        displayVal = '0';
        counter = 0;
        period = false
        updateDisplay(e);
        clearBtn.id = 'allClear';
        clearBtn.textContent = 'AC';
        clearSelectedOp()

    } else {
        displayVal = numA = '0';
        currentOperator = numB = ''
        counter = 0;
        updateDisplay(e)
    }
} 

function getPercentage(e) {
    displayVal /= 100;
    updateDisplay(e)
}

function changeSign(e) {
    displayVal = displayVal[0] !== '-' ? '-' + displayVal : displayVal.slice(1)
    updateDisplay(e)
}

function setSelectedOp(e) {
    let selection = e.type === 'keypress' ? e.key : e.target.dataset.key;

    if (selection === '=' || selection === 'Enter') {
        selection = '='
    }

    let selectedOperator = document.querySelector(`.operator[data-key="${selection}"]`)
    selectedOperator.classList.add("selected")

    if(selection === '=') {
        setTimeout(clearSelectedOp,200)
    }
}

function clearSelectedOp() {
    let selectedOp = document.querySelector('.selected')
    if (selectedOp) {
        selectedOp.classList.remove("selected")
    }
}

function getKey (e) {
    console.log(e)

    if(calculatorArr.indexOf(e.key)  !== -1){
        operatorArr.indexOf(e.key) === -1 ? updateDisplay(e) : evaluate(e)
    }
}

/***
 * Optional tasks:
 * DONE - Enhancement: Update to fix scenarios where JavaScript divides "funkily" i.e. 12.2 / .1
 * DONE - Enhancement: Selected state for operator buttons
 * DONE - Enhancement: Update AC to just clear the latest number
 * DONE - Enhancement: Keyboard functionality - Partially Done (need to account for when user hits enter/return)
 * DONE - Bug Fix for chaining calculations and the selected operator functionality
 * DONE - Bug Fix: Handle when a user enters a operator first thing
 * DONE - Bug Fix: Prevent a user from entering non-calculator symbols
 * DONE - Bug Fix: When a user enters AC as the first button
 * DONE - Bug Fix: User allowed to enter multiple .'s 
 * DONE - Bug Fix: Issue with . not always displaying 
 */