export default function(req, res) {
    const {name, val} = req.params;

    switch (name) {
        case 'photos.search':
            req.flickr.photos.search(val).then(photos => {
                const response = {photos};

                res.json(response);
            });
    }
}
