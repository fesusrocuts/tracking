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

let loadTrackWithEmail = function (token){
  try{
    console.log("loadTrack");
    let running = true;
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
    });

    function getDataCollection(){
      let user = firebase.auth().currentUser;
      if (user === undefined || user === ""){
          console.log("Not found user");
      } else {
        console.log("user >> ");
        console.log(user);
        let addMsgUser = {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          token: user.refreshToken,
          text: "",
          photoURL: user.photoURL,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };
        console.log("addMsgUser >> ");
        console.log(addMsgUser);
        firebase.firestore().collection('messages').add(addMsgUser).catch(function(error) {
          console.error('Error writing new message to Firebase Database', error);
        });

        firebase.firestore().collection("messages")
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
    }
  }catch(e) {
      console.log(e);
  }
}


window.onload = function() {
  //loadTrackWithEmail('eyJ0eXAiOiAiSldUIiwgImFsZyI6ICJSUzI1NiIsICJraWQiOiAiODEwYTQwNzg3MTg3NzdkZDc5MjAzYTU3ZWI1N2QzYzIxYWNjODJmNCJ9.eyJpc3MiOiAiZmlyZWJhc2UtYWRtaW5zZGstNTBiMXBAYXV0b21hdG9ucy1jNjg3MS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsICJzdWIiOiAiZmlyZWJhc2UtYWRtaW5zZGstNTBiMXBAYXV0b21hdG9ucy1jNjg3MS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsICJhdWQiOiAiaHR0cHM6Ly9pZGVudGl0eXRvb2xraXQuZ29vZ2xlYXBpcy5jb20vZ29vZ2xlLmlkZW50aXR5LmlkZW50aXR5dG9vbGtpdC52MS5JZGVudGl0eVRvb2xraXQiLCAidWlkIjogIkQ2TWRvWGxVb2xZQVRnNExxUklSaVJHTms1QzMiLCAiaWF0IjogMTU3OTgzMzEzNiwgImV4cCI6IDE1Nzk4MzY3MzZ9.W3hoahynHVjK4y9AxT5-2TMvwhtYxxplovYR5gEfp5sNBbRVOzM848DKhmq_hdDnsRNupgfFBHGWVOAKWFJUG2knF5a6kzmP1YuFHtFdnG5LOi2T8Xlat0QekzjuE4lRarTl4A1e20tEf23UmJUEJRvzCb3WgAu7tiYZe-HAXjD8QIekMtzCC2hApMz8Iz3c7MAEmzNVRYW_5fAExanXMBAL_ZL3XX26YNWHjGyAsHoDjiOCUaNK25ihlT23oIjXhkDc1OVA7BnsS6XAIvw7nrBvGVGgkRYNlVriqpi3-GoxTH1fvI98wMjoSH8aaAodLvGqYZu2QVB0pC15ZO8Bbg');
};
