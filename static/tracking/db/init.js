// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyCUpe3WPoii-7hHWqevXqrD8xWoaFlR-yo",
  authDomain: "automatons-c6871.firebaseapp.com",
  databaseURL: "https://automatons-c6871.firebaseio.com",
  projectId: "automatons-c6871",
  storageBucket: "automatons-c6871.appspot.com",
  messagingSenderId: "1068248828094",
  appId: "1:1068248828094:web:1d20ac43f73b87d69ab6ef",
  measurementId: "G-SRS2Y7Z0HS"
};

let loadTrackWithEmail = function (email, token){
  try{
    console.log("loadTrack");
    let running = true;
    let login = false;
    let app = firebase.initializeApp(firebaseConfig);
    firebase.auth(app).signInWithCustomToken(token)
    .then(function(){
      getDataCollection();
    })
    .catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      running = false;
      console.log("Required new token, you call to admin.")
    });

    function getDataCollection(){
      let user = firebase.auth().currentUser;
      if (user === undefined || user === ""){
          console.log("Not found user");
          running = false;
          login = false;
      } else {
        console.log("user >> ");
        console.log(user);
        login = user.email === email;
        console.log("user >> login >>");
        console.log(login);

        let addMsgUser = {
          uid: user.uid,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };
        console.log("logger >> ");
        console.log(addMsgUser);
        firebase.firestore().collection('logger').add(addMsgUser).catch(function(error) {
          console.error('Error writing new message to Firebase Database', error);
        });

        firebase.firestore().collection("logger")
          .where("uid", "==", user.uid)
          .get().then(function(snapshots) {
            snapshots.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
            });
        });

        let messages = firebase.firestore().collection("messages").get().limit(1);
        console.log("messages >>");
        console.log(messages);
      }
      return login;
    }
  }catch(e) {
      console.log(e);
  }
}

window.onload = function() {
  loadTrackWithEmail('dennisserocuts@gmail.com','eyJ0eXAiOiAiSldUIiwgImFsZyI6ICJSUzI1NiIsICJraWQiOiAiODEwYTQwNzg3MTg3NzdkZDc5MjAzYTU3ZWI1N2QzYzIxYWNjODJmNCJ9.eyJpc3MiOiAiZmlyZWJhc2UtYWRtaW5zZGstNTBiMXBAYXV0b21hdG9ucy1jNjg3MS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsICJzdWIiOiAiZmlyZWJhc2UtYWRtaW5zZGstNTBiMXBAYXV0b21hdG9ucy1jNjg3MS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsICJhdWQiOiAiaHR0cHM6Ly9pZGVudGl0eXRvb2xraXQuZ29vZ2xlYXBpcy5jb20vZ29vZ2xlLmlkZW50aXR5LmlkZW50aXR5dG9vbGtpdC52MS5JZGVudGl0eVRvb2xraXQiLCAidWlkIjogIkQ2TWRvWGxVb2xZQVRnNExxUklSaVJHTms1QzMiLCAiaWF0IjogMTU3OTgzODA5NywgImV4cCI6IDE1Nzk4NDE2OTd9.eeup4xjCAkc0ZyFSCQhVK1C97hrxncWeUTfQLLpNuHjoZi0fTv3fmFBq6ypiFC8neDV-klLskSAzRx_EtPesv8Qt6mmEpSJ5bkbA1_WADlxnkhYrmJHnzNlbm6G9U305SqwO9HT8NITtQfa_myZxGdzPTnyRvY7NwZkj1xcIy1scjwAEAJc5L8C64Ky_hIlmN9p_HxNxQc4WZCeEWSqYOs3VY6m9SaMD3pLib6Vx4PNDX6kvmPR6nuYptyDcDA0Uzl219LuvH4eQIqBY_UjTYpaoT_DIWZ5QYh501EwMVraEJOyPi1tV7aVcduGqdcQuoDwBlRNTauZc0E5Xq4e3bw');
};
