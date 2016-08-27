class People {
    constructor({config, client, oauth_token: token, user_nsid: user_id}) {
        this.config = config;
        this.client = client;
        this.token = token;
        this.user_id = user_id;
    }

    /**
     * Get a list of public photos for the given user.
     */
    getPublicPhotos() {
        return new Promise((resolve, reject) => {
            this.client.get('?method=flickr.people.getPublicPhotos')
                //.auth({token: this.token})
                .qs({api_key: this.config.key, user_id: this.config.owner_nsid})
                .request((error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        const photos = body.photos.photo.map(photo => {
                            const {farm, server, id, title, secret} = photo;
                            const size = 'm';

                            return {
                                id,
                                title,
                                url: `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_${size}.jpg`
                            };
                        });

                        resolve(photos);
                    }
                });
        });
    }
}

export default People;
