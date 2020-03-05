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
let listOrders = function(fn,_where = []){
  try{
    console.log("listOrders...")
    console.log("listOrders... >> _where >>")
    console.log(_where)
    let listOrdersData = []
    if(_where.length !== 2){
      throw "failure(3)!";
    }

    firebase.firestore().collection("orders")
      //.where("status", _where[0][1].toString(), parseInt(_where[0][2]))
      .where("unit", _where[1][1].toString(), parseInt(_where[1][2]))
      .get().then(function(snapshots) {
        snapshots.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          let dataend = doc.data();
          dataend.id = doc.id;
          //if(dataend.status == )
          listOrdersData.push(dataend)
        });
        fn(listOrdersData);
    });
  }catch(e){
    console.log("listOrders... >> err >>")
    console.log(e)
    fn([]);
  }
}
let updateOrder = function(fn,obj){
  try{
    console.log("updateOrder...")
    console.log("updateOrder... >> obj >>")
    console.log(obj)

    let listOrdersData = []
    if(obj === undefined || obj === "" ||
      obj.id === undefined || obj.id === "" ||
      obj.nit === undefined || obj.nit === "" ||
      obj.invoiceid === undefined || obj.invoiceid === ""
    ){
      throw "failure(4)!";
    }

    let tmpid =  obj.id;
    delete obj.id;
    obj.status = obj.status === 1 ? 0 : 1;
    console.log(obj);

    firebase.firestore().collection("orders").doc(tmpid).set(obj)
    .then(function() {
        console.log("Document successfully written!");
        fn(obj)
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
    delete tmpid;

  }catch(e){
    console.log("listOrders... >> err >>")
    console.log(e)
    fn([]);
  }
}
//addOrder({nit:123,invoice:321,units:13077207,location:"bogota",email:"frocuts1982@gmail.com",status:1})
//addOrder({nit:123,invoice:321,units:13077320,location:"bogota",email:"frocuts1982@gmail.com",status:1})
//addOrder({nit:123,invoice:321,units:13077364,location:"bogota",email:"frocuts1982@gmail.com",status:1})
let addOrder = function(newDocument, uid = "", config = ""){
  console.log("addOrder >> ");
  console.log(newDocument);
  console.log("config")
  console.log(config)
  console.log("check user ...");
  try{
    if (uid == "") throw "failure!";
    if (config == "") throw "failure(2)!";
    console.log(uid);
    newDocument.uid = uid;
    newDocument.status = 1;
    newDocument.created = firebase.firestore.FieldValue.serverTimestamp();
    newDocument.updated = newDocument.created;
    firebase.firestore().collection('orders').add(newDocument).catch(function(error) {
      console.error('Error writing new message to Firebase Database 0x00F100', error);
    });

    //clientname,email,invoiceid,nit,forecast_date,forecast_time,warehouse,unit
    let header_img ='<img src="'+config.catalog.mail.addorder.header_img+'" height="100" alt="Header">';
    let footer_img ='<img src="'+config.catalog.mail.addorder.footer_img+'" height="100" alt="Footer">';
    let subject = config.catalog.mail.addorder.subject;
    let message = config.catalog.mail.addorder.message;
    message = Base64.decode(message);
    message = message.replace('{{header_img}}', header_img);
    message = message.replace('{{footer_img}}', footer_img);
    message = message.replace('{{clientname}}', newDocument.clientname);
    message = message.replace('{{link}}', config.catalog.link.clients);
    message = message.replace('{{nit}}', newDocument.nit);
    message = message.replace('{{invoiceid}}', newDocument.invoiceid);
    let dp1 = newDocument.forecast_date.toISOString().split("T")[0];
    let dp2 = newDocument.forecast_time.toISOString().split("T")[1];
    let dp3 = dp2.split(":");


    let dataMessageQueue = {
      "subject":subject,
      "message":message,
      "email":newDocument.email,
      "status": 1,
      "created": newDocument.created,
      "updated": newDocument.updated,
      "datetimeToSend":dp1 + "T" + dp3[0] + ":" + dp3[0] + ":00"
    }
    console.log("save Message Queue");
    console.log(dataMessageQueue);
    firebase.firestore().collection('queue').add(dataMessageQueue).catch(function(error) {
      console.error('Error writing new message to Firebase Database 0x00F101', error);
    });
  }catch(e) {
    console.log("failure!");
    return false;
  }
  return true;
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
          /*
          firebase.firestore().collection("logger")
            .where("uid", "==", user.uid)
            .get().then(function(snapshots) {
              snapshots.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
              });
          });
          */
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
