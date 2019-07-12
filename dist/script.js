const state = { operationCount: 0, evalCount: 0 };
let history = "",
    input = "",
    result = 0,
    temp = 0;
const calculate = input => {
    result = eval(input);
    temp = result;
    state.evalCount++;
    return result;
};

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
            state.hasActiveOperation = true;
            state.operationCount++;
        } else {
            state.hasActiveOperation = false;
        }

        if (state.evalCount > 1 && state.hasActiveOperation) {
            input = `${temp}`;
        }

        history += e.target.textContent;
        showHistory();

        input += e.target.textContent;
        if (!state.hasActiveOperation) {
            result = calculate(input);
            showResult();
        }
    });
}
document.getElementById("c").addEventListener("click", () => {
    state.operationCount = 0;
    state.evalCount = 0;
    history = "";
    input = "";
    result = 0;
    temp = 0;
    showHistory();
    showResult();
});
