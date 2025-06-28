
//passport
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy; //username and password strategy

const Person = require('./video12/models/Person');


// Passport Configuration

//verification Strategy
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        if (!username || !password) {
            return done(null, false, { message: 'Missing credentials' });
        }
        // console.log('Received credentials:', username, password);
        const user = await Person.findOne({ username });
        if (!user)
            return done(null, false, { message: 'Incorrect username.' });
        
        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch)
            return done(null, user);
        else
            return done(null, false, { message: 'Incorrect password.' })
    } catch (error) {
        return done(error);
    }
}));


module.exports = passport; // Export configured passport