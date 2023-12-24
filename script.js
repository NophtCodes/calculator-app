// Creating a new class Calculator
class Calculator {
    constructor(previousOperandEl, currentOperandEl) {
        this.previousOperandEl = previousOperandEl;
        this.currentOperandEl = currentOperandEl;
        this.clear();
    }

    // Reset method
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    // Delete method
    del() {
        this.currentOperand = String(this.currentOperand).slice(0, -1);
    }

    // Add number function
    addNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand += number;
    }

    // Set mathematical operator function
    setOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.calculate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand + ' ' + this.operation;
        this.currentOperand = '';
    }

    // Calculation function
    calculate() {
        if (this.currentOperand === '') {
            this.currentOperand.clear();
        }
        let computation = eval(this.previousOperand + this.currentOperand);
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    // Updater function to update display
    updateScreen() {
        this.currentOperandEl.innerText = this.currentOperand;
        this.previousOperandEl.innerText = this.previousOperand;
    }
}

// Declaring dom elements
const nums = document.querySelectorAll('[data-value]'),
    operations = document.querySelectorAll('[data-action]'),
    equals = document.querySelector('[data-equal]'),
    del = document.querySelector('[data-del]'),
    reset = document.querySelector('[data-reset]'),
    previousOperandEl = document.querySelector('[data-previous-operand]'),
    currentOperandEl = document.querySelector('[data-current-operand]');

// Creating new instance of calculator object 
const calculator = new Calculator(previousOperandEl, currentOperandEl);

// Setting events
nums.forEach(num => {
    num.addEventListener('click', () => {
        calculator.addNumber(num.innerText);
        calculator.updateScreen();
    });
});

operations.forEach(operation => {
    operation.addEventListener('click', () => {
        calculator.setOperation(operation.innerText);
        calculator.updateScreen();
    });
});

equals.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateScreen();
});

del.addEventListener('click', () => {
    calculator.del();
    calculator.updateScreen();
});

reset.addEventListener('click', () => {
    calculator.clear();
    calculator.updateScreen();
})

// Theme toggler
const setTheme = (theme) => {
    localStorage.setItem('theme', theme);
};

const getTheme = () => {
    return localStorage.getItem('theme');
}
const setCirclePosition = (theme) => {
    if (theme === 'theme-1') {
        circle.style.left = '4px';
    } else if (theme === 'theme-2') {
        circle.style.left = '22px';
    } else if (theme === 'theme-3') {
        circle.style.left = '38px';
    }
};

const applyTheme = () => {
    const savedTheme = getTheme();
    if (savedTheme) {
        body.classList.add(savedTheme);
        setCirclePosition(savedTheme);
    }
}
const body = document.querySelector('body'),
    toggler = document.querySelector('.calc-theme-switch'),
    circle = toggler.querySelector('.calc-toggle .toggle-circle');

toggler.addEventListener('click', () => {
    if (body.classList.contains('theme-3')) {
        body.classList.remove('theme-3');
        body.classList.add('theme-1');
        setTheme('theme-1');
        circle.style.left = '4px';
    } else if (body.classList.contains('theme-2')) {
        body.classList.remove('theme-2');
        body.classList.add('theme-3');
        setTheme('theme-3');
        circle.style.left = '38px';
    } else if (body.classList.contains('theme-1')) {
        body.classList.remove('theme-1');
        body.classList.add('theme-2');
        setTheme('theme-2');
        circle.style.left = '22px';
    }
});
applyTheme();