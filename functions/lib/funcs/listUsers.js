"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsers = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// import { UserRecord } from "firebase-functions/v1/auth";
// import { isAuth } from "../utils/auth";
exports.listUsers = functions.https.onCall(async (data, context) => {
    try {
        // isAuth(context, "admin");
        console.log('data: ', data);
        let { limit, nextPageToken } = data;
        if (!nextPageToken) {
            nextPageToken = undefined;
        }
        const collectionRef = admin.firestore().collection("users");
        const totalQuery = await collectionRef.count().get();
        let query = collectionRef.orderBy('email', 'desc').limit(limit);
        if (nextPageToken) {
            const startAfterDoc = await collectionRef.doc(nextPageToken).get();
            query = query.startAfter(startAfterDoc);
        }
        const querySnapshot = await query.get();
        const response = [];
        // Iterate over the documents and log their data
        querySnapshot.forEach((doc) => {
            response.push(Object.assign({ id: doc.id }, doc.data()));
            console.log(doc.id, '=>', doc.data());
        });
        // If there are more documents, log the next page token
        if (querySnapshot.size >= limit) {
            const lastDoc = querySnapshot.docs[querySnapshot.size - 1];
            console.log('Next page:', lastDoc.id);
            nextPageToken = lastDoc.id;
        }
        return {
            response,
            nextPageToken,
            total: totalQuery.data().count,
        };
    }
    catch (error) {
        console.log('ListUsers error: ', error);
        throw new functions.https.HttpsError("internal", error.message);
    }
});
//# sourceMappingURL=listUsers.js.map