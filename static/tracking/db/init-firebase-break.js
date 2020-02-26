<!-- Previously loaded Firebase SDKs -->

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
  "type": "service_account",
  "projectId": "automatons-c6871",
  "project_id": "automatons-c6871",
  "private_key_id": "810a4078718777dd79203a57eb57d3c21acc82f4",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCLoOLJ6jKhrcPk\nIjdDOH2LMekbjnZ64O/69oUg+zGGsKGY2FRGifqvLHnbbN2ycDn8jQKeHwUhwyNh\n39y4ncA1GggydxTD4rSP4Y/KJ7sk6LiMP9DI8pOIsJhHVuJbAk+9TNp74/cRUwMp\n15VHkmN1JdISPIFUxautodkma0AnHiXaK+/S50RmqEvBGEmGPpximCUg9mya20yV\nfF0guH07EIdF5DdbwO0IOIlLtvzyNd0yqYi+nNPKpaF9JLSRC9xelESkrDI4klmb\nLmIoSwEL5lnleCvuQbYCU2SYQTWOj5/hyhO0dW4w5IX4bQIK70ZhIz3yYQ2UqpOn\nad5OObgTAgMBAAECggEAI9a0T1pPC6Ozy5sirxzRUIiLijirXYfd4P8klZ4UDLvK\nhpZEL2TcFNloH7OWReY7ZAD3oolYwl05eDZDC5nmC1s2rmlVSaAnc2TUiPFgvi0D\nrW/10ZY92xBkza7V48E4oWCYFcOiF27EuZktplTDNX7zKB4inhUspyELQSq3KTLZ\nNvS/bk9qfiiXHfUnxg+LMA2Vmf4sTyb/Z+buJZG01Wa/tOmhvkXK5TsxucMgT3u4\nSO8DwZ7QuZlbbA6FTJ0pNBA/0DJZHoivHoZajcn9i1N9/xW9bFnoJ0lAZAy/Mwpv\nvZiFAtxd6RKDRY6E0K3GylYm7cUmsLeBZ7mW88wHnQKBgQDAiosWKv1qdrThHflv\nnnAlMryz3U2Qdf9nM6DrJkldu0Fx5TNhACN91oK7yU9tVlW36xZW5dPzG2WjZ+O7\nO4K+YxvJSsFoez49H79lpQkM1ExSmIE9RRa8yz3HA78RIqdeeRYzdU6+R2MZdv6X\nR0JLY8PKwsj+GxnYPmLm89ZYrQKBgQC5peNVoDr8GhrrfhT0oEgieJU0xtcFYakI\n1ebT+JB9yNl0DtEquzm0RWjIMO8U6DgkqTC0XBEnO1YLQYxoQMNHIUoknREcgA3E\nunoiAGo1srZOspdGiB+LU4Gz/hfSOp6jhd9uFgZQInpGAlA5qoSXNvnoQ5E0fwSs\nWwS/zJqrvwKBgAgKgS6G0xiMJpe0OcOYmVRkXw8f8epTkzwLIvBPJAc/F8ea699k\nMxdBSypuiNunHGNW9RLh/E0N2tvNLeyW2qn616E7dwJXC01gMw0arFsVzq4wYk1d\nwkpWLplOJb+gc971LaEuiABYWOIqXw2QU0t0uiuQoPZDyXuHd3fvvQbtAoGAHoog\njKxwJ5qvxP+XuOpJE4qcmPMA2jzHjtGJSGOCeX657vKlDA+CnZoxc4VBP0I4Qien\nAHSIydhj/jQJQfktZp0eUkmYUATsvukiQEerMSw1+1o7snmgHs5c7twk1QuZnzLd\nn4F2Bma1kKC+y822RB3iHIhI8cbXYPcUH+0roIcCgYAx7u8gOpxRqFaN5WtTzB8g\nkIAe39rc8W70nfNLxSBthFcK7aKiLqHMewp26hvC7qFOaE6aCpzelY/7wY9K2uJf\nACPkClm9hnLL4eWW4uEceUK49kP0f0R642pFGApD4ULWNWKVeR8DRBQDjvHwhejt\nf1eyXNvLGxa8LXY37HcyrQ==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-50b1p@automatons-c6871.iam.gserviceaccount.com",
  "client_id": "109120845662528474045",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-50b1p%40automatons-c6871.iam.gserviceaccount.com"
};

firebaseConfig = {
  apiKey: '### FIREBASE API KEY ###',
  authDomain: '### FIREBASE AUTH DOMAIN ###',
  projectId: '### CLOUD FUNCTIONS PROJECT ID ###'
  databaseURL: 'https://### YOUR DATABASE NAME ###.firebaseio.com',
};

var firebaseConfigDemo = {
  apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
  appID: "app-id",
  projectId: "automatons-c6871"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig, {
  'projectId': "automatons-c6871",
});


// Initialize Firebase with a "default" Firebase project
//var otherProject = firebase.initializeApp(firebaseConfig, "tracking");

console.log("firebase.app().name >>");  // "[DEFAULT]"
console.log(firebase.app().name);  // "[DEFAULT]"

// Option 1: Access Firebase services via the defaultProject variable
//defaultStorage = firebase.storage();
db = firebase.firestore();

//defaultStorage is not active on server
//console.log("defaultStorage >>");
//console.log(defaultStorage);

console.log("defaultFirestore === db >> ");
console.log(db);

// Initialize Cloud Functions through Firebase
var functions = firebase.functions();
console.log("defaultFirestore === functions >> ");
console.log(functions);


/*db.collection("test1").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
}).then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
*/

//console.log("db >> process1 >> ");
//console.log(test1);
//docs = process1.get();
/*process1.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
});*/

//var otherStorage = otherProject.storage();
//var otherFirestore = otherProject.firestore();

// Option 2: Access Firebase services using shorthand notation
//defaultStorage = firebase.storage();
//defaultFirestore = firebase.firestore();


//##########################################
/*
// Initialize Firebase with a default Firebase project
firebase.initializeApp(firebaseConfig);

// Initialize Firebase with a second Firebase project
var otherProject = firebase.initializeApp(otherProjectFirebaseConfig, "other");

console.log(firebase.app().name);  // "[DEFAULT]"
console.log(otherProject.name);    // "otherProject"

// Use the shorthand notation to access the default project's Firebase services
var defaultStorage = firebase.storage();
var defaultFirestore = firebase.firestore();

// Use the otherProject variable to access the second project's Firebase services
var otherStorage = otherProject.storage();
var otherFirestore = otherProject.firestore();
*/

//test connection
//console.log("test connection >> ")
//console.log(defaultFirestore.currentUser.uid)


/*var firebaseConfig = {
  apiKey: "AIzaSyCUpe3WPoii-7hHWqevXqrD8xWoaFlR-yo",
  authDomain: "automatons-c6871.firebaseapp.com",
  databaseURL: "https://automatons-c6871.firebaseio.com",
  projectId: "automatons-c6871",
  storageBucket: "automatons-c6871.appspot.com",
  messagingSenderId: "1068248828094",
  appId: "1:1068248828094:web:1d20ac43f73b87d69ab6ef",
  measurementId: "G-SRS2Y7Z0HS",
  zzzcontrol: "",
  type: "service_account",
  projectId: "automatons-c6871",
  project_id: "automatons-c6871",
  private_key_id: "810a4078718777dd79203a57eb57d3c21acc82f4",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCLoOLJ6jKhrcPk\nIjdDOH2LMekbjnZ64O/69oUg+zGGsKGY2FRGifqvLHnbbN2ycDn8jQKeHwUhwyNh\n39y4ncA1GggydxTD4rSP4Y/KJ7sk6LiMP9DI8pOIsJhHVuJbAk+9TNp74/cRUwMp\n15VHkmN1JdISPIFUxautodkma0AnHiXaK+/S50RmqEvBGEmGPpximCUg9mya20yV\nfF0guH07EIdF5DdbwO0IOIlLtvzyNd0yqYi+nNPKpaF9JLSRC9xelESkrDI4klmb\nLmIoSwEL5lnleCvuQbYCU2SYQTWOj5/hyhO0dW4w5IX4bQIK70ZhIz3yYQ2UqpOn\nad5OObgTAgMBAAECggEAI9a0T1pPC6Ozy5sirxzRUIiLijirXYfd4P8klZ4UDLvK\nhpZEL2TcFNloH7OWReY7ZAD3oolYwl05eDZDC5nmC1s2rmlVSaAnc2TUiPFgvi0D\nrW/10ZY92xBkza7V48E4oWCYFcOiF27EuZktplTDNX7zKB4inhUspyELQSq3KTLZ\nNvS/bk9qfiiXHfUnxg+LMA2Vmf4sTyb/Z+buJZG01Wa/tOmhvkXK5TsxucMgT3u4\nSO8DwZ7QuZlbbA6FTJ0pNBA/0DJZHoivHoZajcn9i1N9/xW9bFnoJ0lAZAy/Mwpv\nvZiFAtxd6RKDRY6E0K3GylYm7cUmsLeBZ7mW88wHnQKBgQDAiosWKv1qdrThHflv\nnnAlMryz3U2Qdf9nM6DrJkldu0Fx5TNhACN91oK7yU9tVlW36xZW5dPzG2WjZ+O7\nO4K+YxvJSsFoez49H79lpQkM1ExSmIE9RRa8yz3HA78RIqdeeRYzdU6+R2MZdv6X\nR0JLY8PKwsj+GxnYPmLm89ZYrQKBgQC5peNVoDr8GhrrfhT0oEgieJU0xtcFYakI\n1ebT+JB9yNl0DtEquzm0RWjIMO8U6DgkqTC0XBEnO1YLQYxoQMNHIUoknREcgA3E\nunoiAGo1srZOspdGiB+LU4Gz/hfSOp6jhd9uFgZQInpGAlA5qoSXNvnoQ5E0fwSs\nWwS/zJqrvwKBgAgKgS6G0xiMJpe0OcOYmVRkXw8f8epTkzwLIvBPJAc/F8ea699k\nMxdBSypuiNunHGNW9RLh/E0N2tvNLeyW2qn616E7dwJXC01gMw0arFsVzq4wYk1d\nwkpWLplOJb+gc971LaEuiABYWOIqXw2QU0t0uiuQoPZDyXuHd3fvvQbtAoGAHoog\njKxwJ5qvxP+XuOpJE4qcmPMA2jzHjtGJSGOCeX657vKlDA+CnZoxc4VBP0I4Qien\nAHSIydhj/jQJQfktZp0eUkmYUATsvukiQEerMSw1+1o7snmgHs5c7twk1QuZnzLd\nn4F2Bma1kKC+y822RB3iHIhI8cbXYPcUH+0roIcCgYAx7u8gOpxRqFaN5WtTzB8g\nkIAe39rc8W70nfNLxSBthFcK7aKiLqHMewp26hvC7qFOaE6aCpzelY/7wY9K2uJf\nACPkClm9hnLL4eWW4uEceUK49kP0f0R642pFGApD4ULWNWKVeR8DRBQDjvHwhejt\nf1eyXNvLGxa8LXY37HcyrQ==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-50b1p@automatons-c6871.iam.gserviceaccount.com",
  client_id: "109120845662528474045",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-50b1p%40automatons-c6871.iam.gserviceaccount.com"
};*/
