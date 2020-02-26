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

let setError = function(selectorClassAlert, msgAlert1){
    console.log("setError >> selectorClassAlert >> ")
    console.log(selectorClassAlert);
    console.log("setError >> msgAlert1 >> ")
    console.log(msgAlert1);
    $(selectorClassAlert).html(msgAlert1);
    $(selectorClassAlert).show();

}

let listOrders = function(){
  firebase.firestore().collection("orders")
    .where("status", ">", -1)
    .get().then(function(snapshots) {
      snapshots.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
  });
}
//addOrder({nit:123,invoice:321,vehicle:"car1",location:"bogota",email:"frocuts1982@gmail.com",status:1})
let addOrder = function(newDocument, uid = ""){
  console.log("addOrder >> ");
  console.log(newDocument);
  console.log("check user ...");
  try{
    if (uid == "") throw "failure!";
    console.log(uid);
    newDocument.uid = uid;
    newDocument.status = 1;
    newDocument.created = firebase.firestore.FieldValue.serverTimestamp();
    newDocument.updated = newDocument.created;
    firebase.firestore().collection('orders').add(newDocument).catch(function(error) {
      console.error('Error writing new message to Firebase Database', error);
    });
  }catch(e) {
    console.log("failure!");
  }

}

let loadTrackWithEmail2 = function (email, pwd, selectorClassAlert, fn){
  firebase.auth().signInWithEmailAndPassword(email, pwd)
  .then(function(){
    return getDataCollection();
  })
  .catch(function(error) {
    // Handle Errors here.
    console.log(error);
  });
}


let loadTrackWithEmail = function (email, data, selectorClassAlert, fn){
  try{
    console.log("loadTrack");
    console.log("loadTrack >> data >>");
    console.log(data);

    let running = true;
    let login = false;
    let msgAlert1 = "";
    let token = data.token
    delete data.token;
    let app = firebase.initializeApp(firebaseConfig);
    firebase.auth(app).signInWithCustomToken(token)
    .then(function(){
      return getDataCollection(data);
    })
    .catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      running = false;
      msgAlert1 = "Required new token, you call to admin."
      setError(selectorClassAlert, msgAlert1);
      console.log(errorCode + ": " + errorMessage);
    });

    function getDataCollection(data){
      let user = firebase.auth().currentUser;
      let bkuser = data;

      if (user === undefined || user === ""){
          msgAlert1 = "Not found user"
          setError(selectorClassAlert, msgAlert1);
          console.log(msgAlert1);
          running = false;
          login = false;
      } else {
        console.log("user >> ");
        console.log(user);
        console.log("user.email >> ");
        console.log(user.email);
        console.log("only email >> ");
        console.log(email);
        //active the next line if you use valitation for email,
        ///because is check before value and receive value
        //login = user.email === email;
        login = true
        console.log("user >> login >>");
        console.log(login);

        if (login){
          //extend user
          let addMsgUser = {
            uid: user.uid,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          };
          console.log("logger >> ");
          console.log(addMsgUser);
          firebase.firestore().collection('logger').add(addMsgUser).catch(function(error) {
            msgAlert1 = 'Error writing new message to Firebase Database';
            console.error(msgAlert1, error);
            setError(selectorClassAlert, msgAlert1);
          });

          firebase.firestore().collection("logger")
            .where("uid", "==", user.uid)
            .get().then(function(snapshots) {
              snapshots.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
              });
          });
          fn(data); //callback
        }else{
          msgAlert1 = "Error internal 0x01";
          setError(selectorClassAlert, msgAlert1);
          delete firebase.auth().currentUser;
        }
      }

      return login;
    }
  }catch(e) {
      console.log(e);
  }
}
