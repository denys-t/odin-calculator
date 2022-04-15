const buttons = document.querySelectorAll("button");
buttons.forEach( button => {
    button.addEventListener('click', btnClick);
});

const screen = document.querySelector("#screen");

let number1;
let number2;
let operation;

initiateVars();

function initiateVars() {
    operation = "";
    number1 = "";
    number2 = "";
}

function btnClick() {
    let btnValue = this.textContent;

    if ( !isNaN(parseInt(btnValue)) ) {     
        if (operation === "") {
            number1 += btnValue;
            showOnScreen(number1);
        } else {
            number2 += btnValue;
            showOnScreen(number2);
        }
    } else if (btnValue === ".") {
        if (operation === "") {
            if ( number1.includes(".") ) {
                return;
            } else {
                number1 += btnValue;
                showOnScreen(number1);
            }
        } else {
            if ( number2.includes(".")) {
                return;
            } else {
                number2 += btnValue;
                showOnScreen(number2);
            }
        }
    } else if (btnValue === "=") {
        showOnScreen(operate(operation, parseFloat(number1), parseFloat(number2)));
        initiateVars();
    } else if (btnValue === "C") {
        initiateVars();
        showOnScreen("");
    } else {
        operation = btnValue;
    }
}

function operate(operator, a, b) {
    switch (operator) {
        case "+": return add(a,b);
        case "-": return subtract(a,b);
        case "x": return multiply(a,b);
        case "/": return divide(a,b);
        default: return "Error!"
    }
}

function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}

function showOnScreen(value) {
    screen.textContent = value;
}