const objectFilter = (originalObject, arrOfKeys) => {
  const obj1 = {};
  {
    for (let key of arrOfKeys) {
      // console.log(originalObject[key]);
      obj1[key] = originalObject[key];
    }
  }
  return obj1;
};
// reasonable test code:
objectFilter({ a: 1, b: 2, c: 3 }, ["a", "b"]); // returns {a: 1, b: 2}
objectFilter({ a: 1, silly: 2, example: 3 }, ["example"]); // returns {example: 3}
