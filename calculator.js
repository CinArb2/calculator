const displayNum = document.querySelector('.calculator__output')
const calculator = document.querySelector('.calculator__body')

const calculate = (firstValue, operator, secondValue) => {
  let result = ' ';
  switch (operator) {
    case 'add':
      result = parseFloat(firstValue) + parseFloat(secondValue);
      break;
    case 'subtract':
      result = parseFloat(firstValue) - parseFloat(secondValue);
      break;
    case 'multiply':
      result = parseFloat(firstValue) * parseFloat(secondValue);
      break;
    case 'divide':
      result = parseFloat(firstValue) / parseFloat(secondValue);
  }
  return result;
}

calculator.addEventListener('click', (e) => {
  const key = e.target;
  const action = e.target.dataset.action;
  const displayedNum = displayNum.textContent;
  let previousKeyType = calculator.dataset.previousKeyType;
  
  if (action === 'number') {
    if (displayNum.textContent === '0' || previousKeyType === 'operator') {
      displayNum.textContent = key.textContent;
    } else {
      displayNum.textContent = displayedNum + key.textContent;
    }
    calculator.dataset.previousKeyType = 'number';
  }
  
  if (action === 'DEL') {
    if (displayedNum.length > 1) {
      displayNum.textContent = displayedNum.substring(0, displayedNum.length - 1)
    } else {
      displayNum.textContent = '0';
    }
    calculator.dataset.previousKeyType = 'DEL';
  }
  
  if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
  ) {
    const firstValue = calculator.dataset.firstValue
    const secondValue = displayedNum
    const operator = calculator.dataset.operator
    
    if (firstValue && operator && previousKeyType !== 'operator') {
      const calcValue = calculate(firstValue, operator, secondValue);
      displayNum.textContent = calcValue;
      calculator.dataset.firstValue = calcValue;
    } else {
      calculator.dataset.firstValue = displayedNum;
    }
    calculator.dataset.previousKeyType = 'operator';
    calculator.dataset.operator = action;
  }

  if (action === 'decimal') {
    if (!displayNum.textContent.includes('.')) {
      displayNum.textContent = displayedNum + '.';
    } else if (previousKeyType === 'operator') {
      displayNum.textContent = '0.';
    }
    calculator.dataset.previousKeyType = 'decimal';
  }

  if (action === 'reset') {
    displayNum.textContent = '0';
    calculator.dataset.operator = ' ';
    calculator.dataset.firstValue = ' ';
    calculator.dataset.previousKeyType = 'reset';
  }

  if (action === 'calculate') {
    const secondValue = displayedNum;
    const firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    if (firstValue) {
      displayNum.textContent = calculate(firstValue, operator, secondValue);
      calculator.dataset.firstValue = displayNum.textContent;
    }
    calculator.dataset.previousKeyType = 'calculate';
    calculator.dataset.operator = '';
  }
})