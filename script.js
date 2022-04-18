const buttons = document.querySelectorAll("button");
buttons.forEach( button => {
    button.addEventListener('click', btnClick);
});

const display = document.querySelector("#display");

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
            showOnDisplay(number1);
        } else {
            number2 += btnValue;
            showOnDisplay(number2);
        }
    } else if (btnValue === ".") {
        if (operation === "") {
            if ( number1.includes(".") ) {
                return;
            } else {
                number1 === "" ?  number1 = "0" + btnValue : number1 += btnValue;
                showOnDisplay(number1);
            }
        } else {
            if ( number2.includes(".")) {
                return;
            } else {
                number2 === "" ?  number2 = "0" + btnValue : number2 += btnValue;
                showOnDisplay(number2);
            }
        }
    } else if (btnValue === "=") {
        showOnDisplay(operate(operation, parseFloat(number1), parseFloat(number2)));
        displayValueToExp()
        initiateVars();
    } else if (btnValue === "C") {
        initiateVars();
        showOnDisplay("");
    } else {
        if(number2 === "") {
            operation = btnValue;
        }
    }

    checkDisplayOverflow();
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

function showOnDisplay(value) {
    display.textContent = value;   
}

function checkDisplayOverflow(clientWidth, scrollWidth) {
    if (display.scrollWidth > display.clientWidth) {
        display.textContent = display.textContent.slice(0, -1);

        if (number2 === "") number1 = display.textContent;
        else number2 = display.textContent;
    }
}

function displayValueToExp() {
    if (display.scrollWidth > display.clientWidth) {
        let displayValue = parseFloat(display.textContent);    
        let numInExpNot = [];
        [numInExpNot.coefficient, numInExpNot.exponent] =
            displayValue.toExponential().split('e');
        
        display.textContent = Math.round(numInExpNot.coefficient * 100) / 100 + "e" + numInExpNot.exponent;
    }
}