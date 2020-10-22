require('./config/config');
require('./db/mongo-db');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const expressGraphQL = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');

const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);

const port = process.env.PORT;

const corsOptions = {
    origin:"http://localhost:3000",
    credentials: true
}

const app = express();

// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET,
    store: new MongoStore({
        url: process.env.MONGODB_URI,
        autoReconnect: true
    })
}));

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(cors(corsOptions));


app.use('/graphql', (req, res) => {
    const authService = require('./service/authService');
    expressGraphQL({
        schema,
        graphiql: true,
        context: { authService, req }
    })(req, res);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});