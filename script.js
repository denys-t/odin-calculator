const buttons = document.querySelectorAll("button");
buttons.forEach( button => {
    button.addEventListener('click', btnClick);
    button.addEventListener('mousedown', btnMouseDown);
    button.addEventListener('mouseup', btnMouseUp);
});

window.addEventListener('keydown', function(e) {
    const btn = this.document.querySelector(`button[data-key="${e.keyCode}"]`);
    if (btn === null) return;
    btn.mousedown();
    btn.click();
    btn.mouseup();
});

const display = document.querySelector("#display > p");

let number1;
let number2;
let currentNumber;
let operation;
let result;

initiateVars(true,true,true);

function initiateVars(clearOperation = false, clearResult = false, clearNum2 = false) {
    if (clearOperation) operation = "";
    if (clearResult) result = null;
    number1 = "";
    if (clearNum2) number2 = "";
    currentNumber = '';
}

function btnClick() {
    let btnValue = this.textContent;

    if ( !isNaN(parseInt(btnValue)) ) {     
        numberWasPressed(btnValue);
    } else if (btnValue === ".") {
        dotWasPressed();
    } else if (btnValue === "<" && currentNumber != "") {
        currentNumber = currentNumber.slice(0,-1);
        showOnDisplay(currentNumber);
    } else if (btnValue === "=") {
        if (operation === '') return;
        if (number1 === "" && result != null) number1 = result;
        if (number2 === "") {
            currentNumber === '' ? number2 = number1 : number2 = currentNumber;
        } else {
            if (currentNumber != '') {
                number2 = currentNumber;
            }
        }

        if (operation === "/" && number2 === "0") {
            showOnDisplay("INFINITY");
            initiateVars(true,true,true);
        } else {
            result = operate(operation, parseFloat(number1), parseFloat(number2));
            showOnDisplay(result);
            displayValueToExp();
            initiateVars(); 
        }
    } else if (btnValue === "C") {
        initiateVars(true,true,true);
        showOnDisplay("");
    } else {
        operationWasPressed(btnValue);
    }

    checkDisplayOverflow();
}

function numberWasPressed(btnValue) {
    currentNumber += btnValue;
    showOnDisplay(currentNumber);
}

function dotWasPressed() {
    if ( currentNumber.includes(".") ) {
        return;
    } else {
        currentNumber === "" ?  currentNumber = "0." : currentNumber += ".";
        showOnDisplay(currentNumber);
    }
}

function operationWasPressed(btnValue) {
    let newOperation = '';
    operation === '' ? operation = btnValue : newOperation = btnValue;

    if (currentNumber === '') {
        operation = newOperation;
        number2 = result;
        return;
    }

    if (result != null) {
        number1 = result;
        number2 = currentNumber;

        if (operation === "/" && number2 === "0") {
            showOnDisplay("INFINITY");
            initiateVars(true,true,true);
        } else {
            result = operate(operation, parseFloat(number1), parseFloat(number2));
            showOnDisplay(result);
            displayValueToExp();
            initiateVars(false,false,true); 
            operation = newOperation;
        }
    } else if (number1 === '') {
        number1 = currentNumber;
        currentNumber = '';
    } else if (number2 === '') {
        number2 = currentNumber;

        if (operation === "/" && number2 === "0") {
            showOnDisplay("INFINITY");
            initiateVars(true,true,true);
        } else {
            result = operate(operation, parseFloat(number1), parseFloat(number2));
            showOnDisplay(result);
            displayValueToExp();
            initiateVars(false,false,true); 
            operation = newOperation;
        }
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

function showOnDisplay(value) {
    display.textContent = value;   
}

function checkDisplayOverflow(clientWidth, scrollWidth) {
    if (display.scrollWidth > display.clientWidth) {
        display.textContent = display.textContent.slice(0, -1);
        currentNumber = display.textContent;
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

function btnMouseDown() {
    if (this.classList.contains("btn-light")) {
        this.classList.remove("btn-light");
        this.classList.add("btn-light-pressed")
    } else if (this.classList.contains("btn-dark")) {
        this.classList.remove("btn-dark");
        this.classList.add("btn-dark-pressed")
    }
}

function btnMouseUp() {
    if (this.classList.contains("btn-light-pressed")) {
        this.classList.remove("btn-light-pressed");
        this.classList.add("btn-light")
    } else if (this.classList.contains("btn-dark-pressed")) {
        this.classList.remove("btn-dark-pressed");
        this.classList.add("btn-dark")
    }
}