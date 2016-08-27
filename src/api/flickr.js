import request from 'request';
import config from '@purest/providers';
import purest from 'purest';
import GrantConfig from '../../config.json';
import People from './people';
import Photos from './photos';

class FlickrClient {
    constructor(req) {
        const purestClient = purest({request});

        this.config = GrantConfig.flickr;
        this.client = purestClient({
            provider: 'flickr',
            config
        });
        //this.oauth_token = req.session.oauth_token || '';
        //this.user_nsid = req.session.user_nsid || '';

        this.people = new People(this);
        this.photos = new Photos(this);
    }

    /**
     * https://www.flickr.com/services/api/auth.oauth.html
     * Handle OAuth callback.
     * Save oauth_token and user_nsid to session
     */
    callback(req, res) {
        //res.end(JSON.stringify(req.query, null, 2));
        //req.session.oauth_token_secret = req.query.raw.oauth_token_secret;
        req.session.oauth_token = req.query.raw.oauth_token;
        req.session.user_nsid = req.query.raw.user_nsid;
        res.redirect('/');
    }
}

export default FlickrClient;
