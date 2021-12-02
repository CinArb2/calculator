const displayNum = document.querySelector('.calculator__output')
const calculator = document.querySelector('.calculator__body')


const calculate = (firstValue, operator, secondValue) => {
  switch (operator) {
    case 'add':
      return parseFloat(firstValue) + parseFloat(secondValue);
      break;
    case 'subtract':
      return parseFloat(firstValue) - parseFloat(secondValue);
      break;
    case 'multiply':
      return parseFloat(firstValue) * parseFloat(secondValue);
      break;
    case 'divide':
      return parseFloat(firstValue) / parseFloat(secondValue);
      break;
  }
}


calculator.addEventListener('click', (e) => {
  const key = e.target;
  const action = e.target.dataset.action;
  const displayedNum = displayNum.textContent;
  let previousKeyType = calculator.dataset.previousKeyType;
  const operator = calculator.dataset.previousKeyType;

  if (action === 'number') {
    if (displayNum.textContent === '0' || previousKeyType === 'operator') {
      displayNum.textContent = key.textContent;
      calculator.dataset.previousKeyType = ' ';
    } else {
      displayNum.textContent = displayedNum + key.textContent;
    }
  }
  
  if (action === 'DEL') {
    console.log('DEL');
  }
  
  if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
    ) {
      calculator.dataset.previousKeyType = 'operator';
      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;
  }
   
    
  if (action === 'decimal') {
    if (!displayNum.textContent.includes('.')) {
      displayNum.textContent = displayedNum + '.';
    }
  }

  if (action === 'reset') {
    console.log('reset');
  }

  if (action === 'calculate') {
    const secondValue = displayedNum;
    const firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;

    displayNum.textContent = calculate(firstValue, operator, secondValue)
  }

})