function operate(operator, a, b) {
    switch (operator) {
        case "+": return add(a,b);
        case "-": return subtract(a,b);
        case "*": return multiply(a,b);
        case "/": return divide(a,b);
        default: return "Error! Unknown operator."
    }
}

function add(a,b) {
    return Math.add(a,b);
}

function subtract(a,b) {
    return Math.subtract(a,b);
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}