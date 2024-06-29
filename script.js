// Get the input box element
const inputBox = document.getElementById('Inputbox');
// Get all the buttons
const buttons = document.querySelectorAll('button');
// Variable to store the current input
let currentInput = '';
// Flag to determine if a new input should start
let shouldStartNewInput = false;
// Variable to store memory value
let memoryValue = 0;

// Function to handle calculator actions based on button text
function handleInput(buttonText) {
    if (buttonText === 'AC') {
        // Clear the input
        currentInput = '';
        inputBox.value = '0';
        shouldStartNewInput = false;
    } else if (buttonText === 'DEL') {
        // Delete the last character
        currentInput = currentInput.slice(0, -1);
        inputBox.value = currentInput || '0';
    } else if (buttonText === '=') {
        // Evaluate the expression
        try {
            // Replace percentage symbol with its equivalent calculation
            currentInput = currentInput.replace(/%/g, '/100');
            currentInput = eval(currentInput).toString();
            inputBox.value = currentInput;
            shouldStartNewInput = true;
        } catch (e) {
            // Handle invalid expression
            inputBox.value = 'Error';
            currentInput = '';
            shouldStartNewInput = false;
        }
    } else if (buttonText === 'M+') {
        // Add the current input to memory
        if (!isNaN(parseFloat(currentInput))) {
            memoryValue += parseFloat(currentInput);
        }
    } else if (buttonText === 'M-') {
        // Subtract the current input from memory
        if (!isNaN(parseFloat(currentInput))) {
            memoryValue -= parseFloat(currentInput);
        }
    } else if (buttonText === 'MR') {
        // Recall the memory value
        currentInput = memoryValue.toString();
        inputBox.value = currentInput;
    } else if (buttonText === 'MC') {
        // Clear the memory value
        memoryValue = 0;
    } else if (buttonText === '√') {
        // Calculate the square root
        try {
            currentInput = Math.sqrt(parseFloat(currentInput)).toString();
            inputBox.value = currentInput;
            shouldStartNewInput = true;
        } catch (e) {
            // Handle invalid input for square root
            inputBox.value = 'Error';
            currentInput = '';
            shouldStartNewInput = false;
        }
    } else {
        // Handle other button inputs (numbers and operators)
        if (shouldStartNewInput) {
            currentInput = '';
            shouldStartNewInput = false;
        }
        currentInput += buttonText;
        inputBox.value = currentInput;
    }
}

// Add event listeners to all the buttons to handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleInput(button.innerText);
    });
});

// Add event listener for keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key;
    // Check for number keys and decimal point
    if (key >= '0' && key <= '9' || key === '.') {
        handleInput(key);
    // Check for Enter key
    } else if (key === 'Enter') {
        handleInput('=');
    // Check for Backspace key
    } else if (key === 'Backspace') {
        handleInput('DEL');
    // Check for Escape key
    } else if (key === 'Escape') {
        handleInput('AC');
    // Check for operator keys
    } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
        handleInput(key);
    // Check for memory recall key
    } else if (key === 'm') {
        handleInput('MR');
    // Check for memory clear key
    } else if (key === 'M') {
        handleInput('MC');
    // Check for square root key
    } else if (key === 'r') {
        handleInput('√');
    }
});
