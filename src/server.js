import config from '../config.json';
import express from 'express';
import Grant from 'grant-express';
//import session from 'express-session';
//import Auth from './middleware/auth';
import FlickrClient from './api/flickr';
import handleApi from './middleware/api';
import handleRender from './middleware/render';
//import configureStore from './configureStore';
//import { selectMenu, receiveSlides } from './actions';

//const MongoStore = require('connect-mongo')(session);
const app = express();
const port = 3000;
const grant = new Grant(config);

// Serving static asset
app.use('/static', express.static(__dirname + '/../bin'));

/*
// mongodb session
app.use(session({
    secret:'flickr grant',
    store: new MongoStore({
        url: 'mongodb://localhost/test'
    })
}));

// Check oAuth token
app.use('/$', Auth);

// Flickr OAuth Callback
app.get('/handle_flickr_callback', (req, res) => {
    req.flickr.callback(req, res);
});
*/

// Init FlickrClient
app.use(grant);
app.use((req, res, next) => {
    req.flickr = new FlickrClient(req);
    next();
});

// Handle XHR flickr API call from browser
app.get('/api/:name/tag/:val', handleApi);

// This is fired every time the server side receives a request
app.use(handleRender);

app.listen(port, () => {
    console.log('Express server listening on port:' + port);
});
