import { QueryStringParser as qsp } from './query-string-parser';

console.log(qsp.getQueryObject(window.location.search));

// function component() {
  
//   const element = document.createElement('div');
//   const btn = document.createElement('button');

//   element.innerHTML = 'Hello webpack';
//   btn.innerHTML = 'Click me and check the console!';
//   btn.onclick = () => console.log('hey');

//   element.appendChild(btn);
//   return element;
// }

// document.body.appendChild(component());
