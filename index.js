const functions = require('firebase-functions');
const admin = require('firebase-admin');
const algoliasearch = require("algoliasearch");

admin.initializeApp();
const db = admin.firestore();
const jwt = require('jsonwebtoken');
const request_domonos = require('request-promise-native');

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;

const ALGOLIA_INDEX_NAME = 'products';
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.sendCollectionToAlgolia = functions.https.onCall(async (request, context) => {
    const algoliaRecords = [];

    const querySnapshot = await db.collection('products').get();

    querySnapshot.forEach(function (doc) {
        // const document = doc.data();
        const record = {
            objectID: doc.id,
            name: doc.data().name,
            category: doc.data().category,
            place: doc.data().place,
        }
        algoliaRecords.push(record);
    });

    index.saveObjects(algoliaRecords);

});