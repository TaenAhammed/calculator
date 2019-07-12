let num1, num2, temp, result, history;
init();
function init() {
    num1 = "";
    num2 = "";
    temp = "";
    history = "";
    result = 0;
}
class Calculator {
    constructor(num1, num2) {
        this.num1 = num1;
        this.num2 = num2;
    }
    addition() {
        return this.num1 + this.num2;
    }
    subtraction() {
        return this.num1 - this.num2;
    }
    multiplication() {
        return this.num1 * this.num2;
    }
    division() {
        return this.num1 / this.num2;
    }
}

const state = {
    hasActiveOperation: false,
    activeOperationCount: 0,
    operation: ""
};

const stateCopy = { ...state };

function calculate() {}

function showHistory() {
    document.querySelector(".calculator_history").textContent = history;
}

function showResult() {
    document.querySelector(".calculator_result").textContent = result;
}

const calculatorInputs = document.getElementsByClassName("calculator_input");
for (calculatorInput of calculatorInputs) {
    calculatorInput.addEventListener("click", e => {
        let id = e.target.id;
        if (id === "plus" || id === "minus" || id === "mul" || id === "div") {
            state.hasActiveOperation = !state.hasActiveOperation;
            state.activeOperationCount++;

            stateCopy.operation = e.target.textContent;
        } else {
            let number = e.target.textContent;
            if (state.hasActiveOperation) {
                num2 += number;
                num2 = parseFloat(num2);
            } else {
                num1 += number;
                num1 = parseFloat(num1);
            }
        }
        if (state.activeOperationCount > 1) {
            const cal = new Calculator(num1, num2);

            if (state.operation === "+") {
                result = cal.addition(num1, num2);
                showResult();
            }

            if (state.operation === "-") {
                result = cal.subtraction(num1, num2);
                showResult();
            }

            if (state.operation === "*") {
                result = cal.multiplication(num1, num2);
                showResult();
            }

            if (state.operation === "/") {
                result = cal.division(num1, num2);
                showResult();
            }
        }

        state.operation = stateCopy.operation;

        history += e.target.textContent;
        showHistory();
    });
}

document.getElementById("c").addEventListener("click", () => {
    state.hasActiveOperation = false;
    state.activeOperationCount = 0;
    state.operation = "";
    stateCopy.operation = "";
    init();
    showResult();
    showHistory();
});

document.getElementById("equal").addEventListener("click", () => console.log("equal"));
