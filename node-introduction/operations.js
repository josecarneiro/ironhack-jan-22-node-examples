const divide = (a, b) => {
  return a / b;
};

const multiply = (a, b) => {
  return a * b;
};

// module.exports = multiply;

// Named export
// Using the CommonJS syntax
exports.divide = divide;
exports.multiply = multiply;

// ES Module syntax
// export { divide };
