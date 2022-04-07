const mongoose = require('mongoose');

// Mongoose schema
// Represents the shape of each document
// in a collection that corresponds to the model
// that implements said schema
const companySchema = new mongoose.Schema();

// Mongoose Model
// has a one-to-one relationship
// with a MongoDB collection
// For every mongoose model in an application
// you will have a collection in your database
// Model name
// equals collection name in singular form

// Models should be capitalized and singular,
// even though collection names are lowercase (or camelCase) and plural
// Mongoose will coerce the model name from PascalCase to camelCase
// and it will pluralize it
// Model name "Company" becomes collection name "companies"

// 'Company' is the name for the model
// companySchema refers to this Model's schema
// (it is an object instantiated from the mongoose.Schema class)
const Company = mongoose.model('Company', companySchema);

mongoose
  .connect('mongodb://localhost:27017/forbes')
  .then(() => {
    console.log('Connected to mongodb');
    // Calling the method find on a model
    // will issue a query to the database
    // to the collection that corresponds to said model
    // and return a promise.
    // The promise resolves with an array of documents
    // that match the filter object passed
    // to the find static method
    // If no filter is passed, all documents
    // are matched
    // Chaining the limit static method to the find static method
    // will limit the amount of documents with which the promise
    // resolves
    return Company.find().limit(3);
  })
  .then((list) => {
    console.log(list);
  })
  .catch((error) => {
    console.log('There was an error connecting to mongodb', error);
  });

// Calling mongoose.model('ModelName', modelSchema) "creates a class"
// this class can be instantiated
// any methods of the class can be called on objects instantiated from that class

// Calling Model.find() issues a query to the mongoDB database
// which is the application is connected to, it returns a promise
// that resolves once mongoDB has returned a result for this
// asynchronous query
// This promise will resolve with a list of documents that match the filter
// object passed to the find method

// Static methods of mongoose models
// find() -> Query database for many results
// findOne() -> Query database for single result
// findById() -> Query database for single result that matches a certain id
// create() -> Add document to collection
// findOneAndUpdate -> Update single document
// findByIdAndUpdate -> Update single document that a matches a certain id
// findOneAndDelete -> Delete single document
// findByIdAndDelete -> Delete single document that a matches a certain id
// exists -> Resolves with true if document that matches condition exists
// counts -> Resolves with number of documents that match condition

// Modifier static methods of mongoose models
// can be chained on other static methods
// limit() -> Limits count of documents returned
// select() -> Project fields (choose to include or exclude fields)
// sort() -> Sorts documents
// skip() -> Skip over documents
// populate() -> To be discussed

// Company.find().skip(10).limit(5).sort({ founded_year: 1 }).select('name');
// Return a promise that resolves with 5 documents skipping over the first 10,
// sorted by founded year. Documents will only hold _id and name property.

/*
class Dog {
  // bark would be called on an instance of the Dog class
  bark() {
    console.log('WOOF');
  }
  // foo would be called on the Dog class itself
  static foo() {
    console.log('BAR');
  }
}
const dog = new Dog();
dog.bark();
Dog.foo();
*/
