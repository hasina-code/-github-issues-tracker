### Answers to Questions:

1️⃣ What is the difference between var, let, and const?

### var:

# 1. Scope:

    .var is function-scoped, meaning it is limited to the function it is declared in.
    .Even if declared inside a block (like if or for), it can be accessed outside the block.

# 2. Reassignable:

    .Variables declared with var can be reassigned.

# 3. Hoisting:

    .var variables are hoisted to the top of the function.
    .If a value is assigned later, it shows undefined before assignment.

### let

# 1. Scope:

.let is block-scoped, meaning it is limited to the {} block where it is declared.
.Using it outside the block throws a ReferenceError.

# 2. Reassignable:

.Variables declared with let can be reassigned later.

# 3. Hoisting:

.let is hoisted but must be declared before use.
.It has a Temporal Dead Zone (TDZ), so using it before declaration causes an error.

### const

# 1. Scope:

.const is also block-scoped, limited to the {} block where it is declared.

# 2. Reassignable:

.Cannot reassign a const variable.
.Once a value is assigned, it cannot be changed.

# 3. Hoisting:

.const is hoisted but has a TDZ.
.Must be declared before using the variable.

# 4. Objects and Arrays:

.You cannot reassign the variable itself.
.But you can modify the contents (like properties of objects or elements of arrays).

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
