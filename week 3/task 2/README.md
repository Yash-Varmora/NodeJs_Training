# Task 2 - NodeJs Basic Script

## How to access command-line arguments

- The `process.argv` array holds the cli arguments.

```js
console.log(process.argv);

/**
 * run node name.js Yash
 * [
  'C:\\node.exe',
  'C:\\NodeJs_Training\\week 3\\task 2\\name.js',
  'Yash'
  ]
*/
```

- The first two elements are the path to the node executable and the script file.
- The third element is the first argument passed to the script. You can access it like this:

```js
console.log(process.argv[2]); // Yash
```

