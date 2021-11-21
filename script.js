let firstNumber = [];
let secondNumber = [];
let operator = [];
let total =0;
let container = document.querySelector('.calculator__output');



  
const resetAll = () =>{
  firstNumber = [];
  secondNumber = [];
  operator = [];
  total = 0;
}

const getTotal = () => {
  let a;
  (typeof firstNumber === 'object')
    ? a = parseFloat(firstNumber.join(''))
    : a = firstNumber;
  let b = parseFloat(secondNumber.join(''));

  operatorList.forEach(item => {

    if (item.operator === operator.join('')) {
      total = item.calc(a, b);
      (total % 1 != 0)
        ? container.innerHTML = total.toFixed(3)
        : container.innerHTML = total;
    }
  })
}

const operatorList = [
    {
        operator: 'x',
        calc(a, b) { return a * b }
    },
    {
        operator: '/',
        calc(a, b) { return a / b }
    },
    {
        operator: '+',
        calc(a, b) {
        return a + b
      }
    },
    {
        operator: '-',
        calc(a, b) { return a - b }
    },
];

const otherRequest = [
  {
    request: 'DEL',
    reques() {
      if (typeof firstNumber === 'number') {
        let convert = firstNumber.toString().split('');
        firstNumber = convert;
      }
      if (secondNumber.length === 0) {
        firstNumber.pop()
        container.innerHTML = firstNumber.join('');
      } else {
        secondNumber.pop()
        container.innerHTML = secondNumber.join('');
      }
      
      if (firstNumber.length === 0) {
        resetAll();
        container.innerHTML = '';
      }
    }
  },
  {
    request: 'RESET',
    reques() {
      firstNumber = [];
      secondNumber = [];
      operator = [];
      total = 0;
      container.innerHTML = '';
    }
  },
  {
    request: '=',
    reques() {

      if (secondNumber.length === 0) {
        container.innerHTML = firstNumber.join('');
      } else {
        getTotal();
        firstNumber = total;
        secondNumber = [];
        operator = [];
        container.innerHTML = firstNumber;
      }
    }
  }
]


document.addEventListener('click', (e) => {
  
  if (container.innerHTML === '') {
    if (e.target.matches('[data-number]')) {
      firstNumber.push(e.target.innerHTML)
      container.innerHTML = firstNumber.join('');
    }
    if (e.target.matches('[data-point]')) {
        firstNumber.push('.')
        container.innerHTML = firstNumber.join('');
      }
  } else {
    
    if ((e.target.matches('[data-operator]')) & operator.length === 1 & secondNumber.length === 0) {
      operator.pop();
      operator.push(e.target.innerHTML)
    }

    if ((e.target.matches('[data-number]')) & operator.length === 0) {
      if (typeof firstNumber === 'number') {
        firstNumber = [];
        container.innerHTML = '';
        firstNumber.push(e.target.innerHTML);
        container.innerHTML = firstNumber.join('');
      } else {
        firstNumber.push(e.target.innerHTML);
        container.innerHTML = firstNumber.join('');
      }
    }
    
    if ((e.target.matches('[data-operator]')) & operator.length === 0) {
      operator.push(e.target.innerHTML)
    } else if ((e.target.matches('[data-number]')) & operator.length === 1) {
      secondNumber.push(e.target.innerHTML);
      container.innerHTML = secondNumber.join('');
    }
      
    if (e.target.matches('[data-operator]') & secondNumber.length > 0) {
      getTotal();
      firstNumber = total;
      secondNumber = [];
      operator = [];
      operator.push(e.target.innerHTML)
    }
    
    if (container.innerHTML === 'Infinity' | container.innerHTML === 'NaN') {
      resetAll();
    }
    if (e.target.matches('[data-point]')) {
      if (total != [] & secondNumber.length === 0) {
        resetAll();
        firstNumber.push('.')
        container.innerHTML = firstNumber.join('');
      }
      if (firstNumber.length > 0 & operator.length >0 & secondNumber.length === 0) {
        secondNumber.push('.');
        container.innerHTML = secondNumber.join('');
      }
      if (secondNumber.length === 0 & !firstNumber.includes('.')) {
        firstNumber.push('.')
        container.innerHTML = firstNumber.join('');
      }
      if (secondNumber.length > 0 & !secondNumber.includes('.')) {
        secondNumber.push('.');
        container.innerHTML = secondNumber.join('');
      }
    }
    if (e.target.matches('[data-request]')) {
      otherRequest.forEach(item => {
        if (item.request === e.target.innerHTML) {
          item.reques();
        }
      })
    }
  }
})

