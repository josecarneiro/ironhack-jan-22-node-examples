const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // Every book document must have a value for 'available'
      required: true, // Required is not a validator (it's a bit more complex)
      minlength: 3, // minimum length validator
      maxlength: 140, // maximum length validator,
      unique: true // It is not a mongoose validator (it's a mongoDB built in validator/indexer)
    },
    pages: {
      type: Number,
      min: 1, // minimum value validator
      max: 10000 // maximum value validator
    },
    available: {
      type: Boolean,
      // We're saying that by default every document will have
      // 'available' set to true unless specified otherwise
      default: true
    },
    // genres: [String],
    genres: [
      {
        type: String,
        enum: ['science', 'education', 'romance', 'drama', 'fantasy']
      }
    ],
    condition: {
      type: String,
      // We can specify that 'condition' can only have one of two values
      // either 'new' or 'used'
      enum: ['new', 'used'] // Schema validator
    },
    publicationDate: {
      type: Date
    }
    // Make every document have a createdAt property
    // which holds the creation date
    /*
  createdAt: {
    type: Date,
    default: () => new Date()
  }
  */
  },
  // With this options object,
  // we can tell mongoose to always include createdAt and updatedAt
  // values in our documents
  { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);

mongoose
  .connect('mongodb://localhost:27017/library')
  .then(() => {
    console.log('Connected to mongodb');
    // To add single document to books collection,
    // we call the Book.create() static method
    // and pass it an object with properties and values
    // that this specific book document should have
    return Book.create({
      name: 'Sapiens',
      pages: 498,
      available: true,
      condition: 'new',
      genres: ['science', 'education'],
      publicationDate: new Date(2011, 9, 1)
    });
  })
  .then((book) => {
    console.log('Created a book', book);
    // We can call Book.create() and pass it an array of objects
    // to have multiple documents inserted into the collection at once
    return Book.create([
      { name: 'The Secret Life of Planets', pages: 274 },
      { name: 'The Master Algorithm', pages: 347 }
    ]);
  })
  .then((books) => {
    console.log('Multiple books added', books);
    return Book.find({ pages: { $gte: 300 } });
  })
  .then((books) => {
    console.log('Books with more than 300 pages', books);
    return Book.findOne({ available: true });
  })
  .then((book) => {
    console.log('This is one of the available books', book);
    // Note: if no books had 'available' set to true,
    // the parameter book would hold value null
    return Book.findOneAndUpdate(
      { pages: { $lte: 300 }, available: true },
      { available: false },
      { new: true } // Forces mongoose to resolve promise with up to date document
    );
  })
  .then((book) => {
    console.log('Book was updated', book);
    return Book.findOneAndDelete({ name: 'Sapiens' });
  })
  .then(() => {
    console.log('Book was deleted');
    // Instead of a filter object, these take a document's id
    // and behave the same as findOne, findOneAndUpdate and findOneAndDelete respectively
    // findById
    // findByIdAndUpdate
    // findByIdAndDelete
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Was disconnected from MongoDB');
  })
  .catch((error) => {
    console.log('There was an error connecting to mongodb', error);
  });
