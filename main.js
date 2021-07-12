function operate(a, b, op) {
    switch(op) {
        case "+":
            add(a,b)
            break;
        case "-":
            subtract(a,b)
            break;
        case "x":
            multiply(a,b)
            break;
        case "/":
            divide(a,b)
            break;

    }
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