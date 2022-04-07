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
// Models should be capitalized,
// even when collection names are lowercase (or camelCase)
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
