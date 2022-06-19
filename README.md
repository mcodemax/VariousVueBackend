VariousVueBackend
=======================
## Overview

This is the backend in Node.js of an app.

## Getting Started

To use this application, you will need to download and install [NodeJS](http://nodejs.org/download/).

Once you have NodeJS installed, you have two choices for downloading this source code fork this repository and git clone your fork

Next, you need to install the package dependencies by running the following command in the top-level directory of this source tree:
```
npm install
```

Once the dependancies are installed, you can start the application server by running
```
npm start
```

To stop the server, press CTRL-C.

## REST API

The Users JSON REST API is exposed at [http://localhost:3001/](http://localhost:3001).

On server start, user data is read into memory from init_data.json. All subsequent actions are done against this memory store.  Stopping and starting the server will re-initialize data from init_data.json.  

#### API Endpoints

* **/users**  
HTTP GET: returns array of all info with pagination

optional query params to pass in:
order, order data alphabetically (asc) or reverse alphabetically (desc)
titleSort, sort results by title
descriptSort, sort results by description
nameSort, sort results by name
page, get what page of results you're on
limit, results limits per page

Here is an example of results returned from HTTP GET on /users:
```
[{
            "id": 2140,
            "title": "gj",
            "description": "ghj",
            "location": "Hermannplatz 5-6, 10967 Berlin, Germany",
            "lng": 0,
            "lat": 0,
            "userId": 4051,
            "name": "manoj",
            "isdeleted": false,
            "profilePicture": "Images/9b291404-bc2e-4806-88c5-08d29e65a5ad.png",
            "videoUrl": null,
            "images": null,
            "mediatype": 0,
            "imagePaths": null,
            "feedsComment": null,
            "commentCount": 0,
            "multiMedia": [
                {
                    "id": 3240,
                    "name": "",
                    "description": null,
                    "url": "http://www.youtube.com/embed/mPhboJR0Llc",
                    "mediatype": 2,
                    "likeCount": 0,
                    "place": null,
                    "createAt": "0001-01-01T00:00:00"
                }
            ],
            "likeDislike": {
                "likes": 0,
                "dislikes": 0,
                "userAction": 2
            },
            "createdAt": "2020-01-02T13:32:16.7480006",
            "code": 0,
            "msg": null
        },
        {
            "id": 2139,
            "title": "dfg",
            "description": "df",
            "location": "443 N Rodeo Dr, Beverly Hills, CA 90210, USA",
            "lng": 0,
            "lat": 0,
            "userId": 4051,
            "name": "manoj",
            "isdeleted": false,
            "profilePicture": "Images/9b291404-bc2e-4806-88c5-08d29e65a5ad.png",
            "videoUrl": null,
            "images": null,
            "mediatype": 0,
            "imagePaths": null,
            "feedsComment": null,
            "commentCount": 2,
            "multiMedia": [
                {
                    "id": 3239,
                    "name": "",
                    "description": null,
                    "url": "http://www.youtube.com/embed/RtFcZ6Bwolw",
                    "mediatype": 2,
                    "likeCount": 0,
                    "place": null,
                    "createAt": "0001-01-01T00:00:00"
                }
            ],
            "likeDislike": {
                "likes": 0,
                "dislikes": 0,
                "userAction": 2
            },
            "createdAt": "2020-01-02T10:54:07.6092829",
            "code": 0,
            "msg": null
        }
]
```