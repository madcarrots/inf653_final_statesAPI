const whitelist = [
    'https://www.madcarrots.org',
    'http://127.0.0.1:5500',
    'http://localhost:3500',
    'https://dazzling-snickerdoodle-777101.netlify.app', 
    'https://inf653-final-statesapi.onrender.com', 
    'https://serene-roentgen-345cd7.netlify.app', 
    '*'
];

const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin ) {
            callback(null, true);
        } else {
            callback(new Error('You shall not pass!'));  // remember to change this if test want specific message
        }
    },
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'headers']

};

module.exports = corsOptions;