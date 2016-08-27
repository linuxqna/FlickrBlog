### Example of oAuth callback
```json
{
    "access_token": "72157668848304333-bbd43ed0dcbe333d",
    "access_secret": "8f19f94c070a5fcc",
    "raw": {
        "fullname": "Junwon Seo",
        "oauth_token": "72157668848304333-bbd43ed0dcbe333d",
        "oauth_token_secret": "8f19f94c070a5fcc",
        "user_nsid": "49182479@N00",
        "username": "Junwon Seo"
    }
}
```

### Example of 'flickr.photos.search' API
```json
{
    id: '11598121896',
    owner: '49182479@N00',
    secret: 'd12f213214',
    server: '3691',
    farm: 4,
    title: 'DSC_0753',
    ispublic: 1,
    isfriend: 0,
    isfriend: 0,
    isfamily: 0
}
```
### Example of 'flickr.photos.getInfo' API
```json
{
    photo: {
        id: '11598125706',
        secret: '9f68bd4b4c',
        server: '2835',
        farm: 3,
        dateuploaded: '1388207950',
        isfavorite: 0,
        license: '0',
        safety_level: '0',
        rotation: 0,
        originalsecret: 'a38aa59f65',
        originalformat: 'jpg',
        owner: {
            nsid: '49182479@N00',
            username: 'Junwon Seo',
            realname: 'Junwon Seo',
            location: '',
            iconserver: '2175',
            iconfarm: 3,
            path_alias: 'linuxqna'
        },
        title: { _content: 'DSC_0749' },
        description: { _content: '' },
        visibility: { ispublic: 1, isfriend: 0, isfamily: 0 },
        dates: {
            posted: '1388207950',
            taken: '2013-12-26 15:02:32',
            takengranularity: '0',
            takenunknown: 0,
            lastupdate: '1388207955'
        },
        views: '98',
        editability: { cancomment: 0, canaddmeta: 0 },
        publiceditability: { cancomment: 1, canaddmeta: 0 },
        usage: { candownload: 1, canblog: 0, canprint: 0, canshare: 1 },
        comments: { _content: '0' },
        notes: { note: [] },
        people: { haspeople: 0 },
        tags: { tag: [Object] },
        urls: { url: [Object] },
        media: 'photo' },
        stat: 'ok'
    }
}
```
