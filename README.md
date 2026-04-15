    - 1️⃣ What is the difference between var, let, and const?
    ans: var is function scoped not block scoped and it can be updated and redeclared and it can be hoisted. On the other hand let is block scoped and it can be updated and it can be hoisted but not initialized that means it will be in temporal dead zone. const is block scoped and cant be updated
    - 2️⃣ What is the spread operator (...)?
    ans: it expands array ot object.
    example:
    const arr1 = [1, 2];

const arr2 = [...arr1, 3, 4];
// [1, 2, 3, 4]
🔹 Object example
const user = { name: "John" };
const updated = { ...user, age: 25 }; -
3️⃣ What is the difference between map(), filter(), and forEach()?
ans: 🔹 map() transforms array and returns new array.
ex:const nums = [1, 2, 3];
const doubled = nums.map(n => n \* 2);
// [2, 4, 6]
🔹 filter()is a function which filters based on condition and returns new array
const nums = [1, 2, 3];
const even = nums.filter(n => n % 2 === 0);
// [2]
🔹 forEach() is which function which Just loops and Returns nothing
nums.forEach(n => console.log(n));

- 4️⃣ What is an arrow function? - 5️⃣ What are template literals?

---

```






```
