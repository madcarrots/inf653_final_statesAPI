const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3500;

// no logger required

// cors
app.use(cors(corsOptions));

// built-in middleware to handle URL encoded
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// no static files since this is purely an api
// remember to check this if there are test parameters asking for 404 files, etc. 

// routes - only using API
app.use('/states', require('./routes/api/states.js'));

// don't think I need the /* 404 for a pure api. but remember to add if there is an error

// no error handler mentioned in rubric

// no logging/error no listener needed
// wrong!  you need to listen to API requests!
app.listen(PORT, () => console.log(`Server running on port ${PORT}` ));