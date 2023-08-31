// eslint-disable-next-line no-unused-vars
// import _ from 'lodash';

// const getConcat = (currentString, path, symbol, value) => {
//   let currentValue = value;
//   let valueFirst;
//   let valueSecond;
//   if (typeof value === 'string') {
//     currentValue = `'${value}'`;
//   }

//   if (symbol === '-+') {
//     [valueFirst, valueSecond] = value;
//     if (typeof valueFirst === 'string') {
//       valueFirst = `'${valueFirst}'`;
//     }
//     if (typeof valueSecond === 'string') {
//       valueSecond = `'${valueSecond}'`;
//     }
//   }
//   switch (symbol) {
//     case '':
//       return currentString;
//     case '-':
//       return `${currentString}\nProperty '${path}' was removed`;
//     case '+':
//       return `${currentString}\nProperty '${path}' was added with value: ${currentValue}`;
//     case '-+':
// eslint-disable-next-line max-len
//       return `${currentString}\nProperty '${path}' was updated. From ${valueFirst} to ${valueSecond}`;
//     default:
//       throw new Error(`Unknown symbol: ${symbol}!`);
//   }
// };

// const plain = (diffTree) => {
//   const iter = (tree, path = '', currentString = '') => {
//     const keys = Object.keys(tree);
//     let string = currentString;
//     string = keys.reduce((acc, key) => {
//       let currentPath;
//       if (path === '') {
//         currentPath = `${key}`;
//       } else {
//         currentPath = `${path}.${key}`;
//       }
//       const { symbol } = tree[key];
//       console.log('key         -', key);
//       console.log('currentPath -', currentPath);
//       if (_.has(tree[key], 'value') && _.isObject(tree[key].value)) {
//         if (tree[key].value.symbol === '') {
//           const temp = getConcat(acc, currentPath, symbol, '[complex value]');
//           console.log('Валью это объект, есть Символ ""');
//           console.log(temp.replace('\n', ''));
//           console.log('-------------------------------------------------------');
//           return temp;
//         }
//         const currentValue = iter(tree[key].value, currentPath, currentString);
//         const temp = getConcat(acc, currentPath, symbol, currentValue);
//         console.log('Валью это объект');
//         console.log(temp.replace('\n', ''));
//         console.log('-------------------------------------------------------');
//         return temp;
//       }
//       if (_.has(tree[key], 'value1') && _.isObject(tree[key].value1)) {
//         const valueFirst = iter(tree[key].value1, currentPath, currentString);
//         const valueSecond = tree[key].value2;
//         const temp = getConcat(acc, currentPath, symbol, [valueFirst, valueSecond]);
//         console.log('есть Валью1 и это объект');
//         console.log(temp.replace('\n', ''));
//         console.log('-------------------------------------------------------');
//         return temp;
//       }
//       if (_.has(tree[key], 'value2') && _.isObject(tree[key].value2)) {
//         const valueFirst = tree[key].value1;
//         const valueSecond = iter(tree[key].value2, currentPath, currentString);
//         const temp = getConcat(acc, currentPath, symbol, [valueFirst, valueSecond]);
//         console.log('есть Валью2 и это объект');
//         console.log(temp.replace('\n', ''));
//         console.log('-------------------------------------------------------');
//         return temp;
//       }
//       if (symbol === '-+') {
//         const valueFirst = tree[key].value1;
//         const valueSecond = tree[key].value2;
//         const temp = getConcat(acc, currentPath, symbol, [valueFirst, valueSecond]);
//         console.log('Несработали предыдущие 3, но есть Символ "-+"');
//         console.log(temp.replace('\n', ''));
//         console.log('-------------------------------------------------------');
//         return temp;
//       }
//       const currentValue = tree[key].value;
//       const temp = getConcat(acc, currentPath, symbol, currentValue);
//       console.log('Несработали предыдущие 4');
//       console.log(temp.replace('\n', ''));
//       console.log('-------------------------------------------------------');
//       return temp;
//     }, '');
//     return string;
//   };

//   const diffString = iter(diffTree);
//   return diffString.replace('\n', '');
// };

// export default plain;

// Property 'common.follow' was added with value: false
// Property 'common.setting2' was removed
// Property 'common.setting3' was updated. From true to null
// Property 'common.setting4' was added with value: 'blah blah'
// Property 'common.setting5' was added with value: [complex value]
// Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
// Property 'common.setting6.ops' was added with value: 'vops'
// Property 'group1.baz' was updated. From 'bas' to 'bars'
// Property 'group1.nest' was updated. From [complex value] to 'str'
// Property 'group2' was removed
// Property 'group3' was added with value: [complex value]
