import { QueryStringBuilder as qsBuilder } from './query-string-utils';

let configs = [
  {
    paramName: 'key',
    overrideSearch: /key/gi,
    defaultValue: 'value'
  }
];

console.log(new qsBuilder().withConfig(configs).withOverrides(window.location.search).build().getString());

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
