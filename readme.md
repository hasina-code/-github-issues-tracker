### Answers to Questions:

1️⃣ What is the difference between var, let, and const?

# 1. var:

# Scope:

    1. var is function-scoped, meaning it is limited to the function it is declared in.
    1. Even if declared inside a block (like if or for), it can be accessed outside the block.

# Reassignable:

    1.Variables declared with var can be reassigned.

# Hoisting:

    1.var variables are hoisted to the top of the function.
    1.If a value is assigned later, it shows undefined before assignment.

# 2. let

# Scope:

1.  let is block-scoped, meaning it is limited to the {} block where it is declared.
2.  Using it outside the block throws a ReferenceError.

# Reassignable:

1.Variables declared with let can be reassigned later.

# Hoisting:

1.let is hoisted but must be declared before use.
2.It has a Temporal Dead Zone (TDZ), so using it before declaration causes an error.

## 3. const

# Scope:

1.const is also block-scoped, limited to the {} block where it is declared.

# Reassignable:

1.Cannot reassign a const variable.
2.Once a value is assigned, it cannot be changed.

# Hoisting:

1.const is hoisted but has a TDZ.
2.Must be declared before using the variable.

# Objects and Arrays:

1.You cannot reassign the variable itself.
2.But you can modify the contents (like properties of objects or elements of arrays).

2️⃣ What is the spread operator (...)?

## Spread Operator ...

... (three dots) is called the spread operator.It “spreads” or expands an array or object into individual elements or properties.it takes a collection and spreads its items.

## Use Cases:

1.  Copying arrays or objects
2.  Merging arrays or objects
3.  Passing elements as function arguments

3️⃣ What is the difference between map(), filter(), and forEach()?

## Difference Between map(), filter(), and forEach()

# map()

1. Returns:
   map() always returns a new array.

2. Purpose:
   Used to transform each element of an array.

# filter()

1. Returns:
   filter() always returns a new array.
2. Purpose:
   Select elements that satisfy a condition from the array.

# forEach()

1.  Returns:
    forEach() does not return a new array, it returns undefined.

2.  Purpose:
    Perform an action or side-effect on each element of the array.

4️⃣ What is an Arrow Function?

An arrow function is a shorter and simpler way to write functions in JavaScript.It was introduced in ES6 (ECMAScript 2015).
It uses the arrow symbol => instead of the function keyword.

5️⃣ What are Template Literals?

Template literals are a modern way to write strings in JavaScript.They were introduced in ES6 (ECMAScript 2015).
Instead of using single (' ') or double (" ") quotes, template literals use backticks ` `.
