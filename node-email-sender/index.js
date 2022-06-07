const dotenv = require('dotenv');
dotenv.config();

// Automate sending email
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

transporter
  .sendMail({
    from: `"Some Service" ${process.env.EMAIL}`,
    to: ['yapow99753@svcache.com', 'yapow99753@svcache.com'],
    subject: 'Test Email',
    // text: 'Hello world',
    html: '<head><style>a { color: red; }</style></head><body>This is a <a href="https://google.com" style="font-weight: bold;">test</a> email<body>'
  })
  .then(() => {
    console.log('The email was sent successfully;');
  })
  .catch((error) => {
    console.log(error);
    // Less secure app access is disabled.
  });
