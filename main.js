const display = document.querySelector('#display-screen')
const operands = document.querySelectorAll('.operand')
const clearBtn = document.querySelector('.clear')
const percent = document.querySelector('#percent')
const negate = document.querySelector('#negate')

const operators = document.querySelectorAll('.operator')


let displayVal = '0';
let numA = '';
let numB = '';
let currentOperator = '';
let operatorArr =['+', '-', '*', '/','=','Enter']
let counter = 0;

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
    return a * b;
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

    if(counter <= 15) {
        if ((e.target.classList[0]  === 'operand' && e.key !== 'Enter' && e.key !== '=') || (e.type === 'keypress' && currentOperator !== '=' && operatorArr.indexOf(e.key) === -1)){
            if (clearBtn.id === 'allClear') {
                displayVal = ''
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
    if (currentOperator === '' /*|| currentOperator === '='*/ ) {
        setOperator(e)
        numA = displayVal
        displayVal = ''
    } else {
        numB = displayVal;
        numA = displayVal = operate(+numA, +numB, currentOperator);
        updateDisplay(e);
        if ( e.key !== '=' || e.key !== 'Enter' || e.target.dataset.key !== '=' ){ 
            setOperator(e);
        }
        displayVal = '';
        counter = 0;
    }
}


function setOperator(e) {

    clearSelectedOp()
    if(e.key === 'Enter') {
        currentOperator = '='
    } else {
        currentOperator = e.type === 'keypress' ? e.key : e.target.dataset.key
    }
    let selectOperator = document.querySelector(`.operator[data-key="${currentOperator}"]`)
    selectOperator.classList.add("selected")

    if(currentOperator === '=') {
        setTimeout(clearSelectedOp,200)
    }

}

function clear(e) {
    if(clearBtn.id === 'clear'){
        displayVal = '0';
        counter = 0;
        updateDisplay(e);
        clearBtn.id = 'allClear';
        clearBtn.textContent = 'AC';
        clearSelectedOp()

    } else {
        displayVal = numA = numB = currentOperator = '';
        counter = 0;
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

function selectOp(e) {
    e.target.id = "current-operator"
}

function clearSelectedOp() {
    let selectedOp = document.querySelector('.selected')
    if (selectedOp) {
        selectedOp.classList.remove("selected")
    }
}

function getKey (e) {
    operatorArr.indexOf(e.key) === -1 ? updateDisplay(e) : evaluate(e)
}

/***
 * Optional tasks:
 * DONE - Update to fix scenarios where JavaScript divides "funkily" i.e. 12.2 / .1
 * DONE - Selected state for operator buttons
 * DONE - Update AC to just clear the latest number
 * DONE - Keyboard functionality - Partially Done (need to account for when user hits enter/return)
 * Bug Fix for chaining calculations and the selected operator functionality
 * 
 */