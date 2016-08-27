export default function(req, res, next) {
    console.log('Check OAUTH token');

    if (!req.session.oauth_token) {
        console.log('No OAUTH token and redirect to flickr auth page...');
        res.redirect('/connect/flickr');
    } else {
        next();
    }
}
