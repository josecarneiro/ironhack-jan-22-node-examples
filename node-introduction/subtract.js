const subtract = (a, b) => {
  return a - b;
};

// We're telling the JavaScript engine
// that the single value exported from this file
// (that can the imported in a different file)
// is the function referenced by the subtract variable
// CommonJS syntax
// (there are multiple ways to export and import values
// in JavaScript, the syntax that has wider adoption in 2022
// is the CommonJS syntax)
module.exports = subtract;

// ESModule Syntax
// export default subtract;
