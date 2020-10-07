const { firestore } = require('../config/firebase');

const FirestoreDB = {
    saveToFirestoreAutoKey: async function(res, leObj, leCollection){
        return new Promise(async function(resolve, reject) {
            try {
                let newDocRef = await firestore.collection(leCollection).add(leObj);
                let newDocRef2 = await newDocRef.get();
                let docData = newDocRef2.data();
                res.json ({status: 200, error: null, response: ([docData] || [])});
                resolve(docData);
            } catch(error){
                res.json ({status: 500, error: error.toString(), response: null});
                reject(error);
            }
        });
    },
    saveToFirestoreCustomKey: async function(res, leObj, leCollection, leKey){
        return new Promise(async function(resolve, reject) {
            try {
                let newDocRef = await leFireRef.collection(leCollection).doc(leKey).set(leObj);
                let newDocRef2 = await newDocRef.get();
                let docData = newDocRef2.data();
                res.json ({status: 200, error: null, response: ([docData] || [])});
                resolve(docData);
            } catch(error){
                res.json ({status: 500, error: error.toString(), response: null});
                reject(error);
            }
        });
    },
    getAllInFirestoreCollection: async function(res, leCollection){
        return new Promise(async function(resolve, reject){
            try {
                const collectionRef = firestore.collection(leCollection);
                const snapshot = await collectionRef.get();
                if (snapshot.empty) {
                    res.json ({status: 200, error: null, response: []});
                    resolve([]);
                } else {
                    let tmpArray = [];
                    snapshot.forEach(doc => {
                        let tmpObj = doc.data();
                        tmpObj['__firestorekey'] = doc.id;
                        tmpArray.push(tmpObj);
                    });
                    res.json ({status: 200, error: null, response: tmpArray});
                    resolve(tmpArray);
                }
            } catch(error){
                reject(error);
            }
        });
    },
    getFirestoreDocument: async function(res, leCollection, leKey){
        return new Promise(async function(resolve, reject) {
            try {
                let docRef = firestore.collection(leCollection).doc(leKey);
                let docObj = await docRef.get();
                if (docObj.exists) {
                    let docData = docObj.data();
                    docData['__firestorekey'] = docObj.id;
                    res.json ({status: 200, error: null, response: ([docData] || [])});
                  } else {
                    res.status(404).json ({status: 404, error: 'api-list/not-exists', response: []});
                    resolve([]);
                  }
            } catch(error){
                res.json ({status: 500, error: error.toString(), response: null});
                reject(error);
            }
        });
    },
    isDocumentWithKeyUnique: async function(lePath, leKey, leKeyValue){
        return new Promise(async function(resolve, reject) {
            try {
                let collectionRef = firestore.collection(lePath);
                let queryResults = await collectionRef.where(leKey, '==', leKeyValue.trim().get());
                resolve(queryResults.empty);
            } catch(err){
                reject(err.toString());
            }
        });
    }
}

module.exports = { FirestoreDB }