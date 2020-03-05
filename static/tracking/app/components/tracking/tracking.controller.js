angular.module('controller',['angularMoment','ngMaterial', 'ngMessages', 'ngRoute'])

.run(function(amMoment) {
    amMoment.changeLocale('de');
})
.controller('TrackingCtrl',['$scope','$http','$log','$location','$route',function($scope,$http,$log,$location,$route){

  $scope.__trackmsg = ""
  //lista de variable
  $scope.tracking={};
  $scope.configuration={}
  $scope.goLoginHuman = 0;
  $scope.goSearchHuman = 0;
  $scope.userAuth={}


  try{
    $scope.user = firebase.auth().currentUser;

    if ($scope.user == undefined)
      throw new ExcepcionGeneric(1003,"set default header config")

    $scope.headerDefault = {
      "div1Class":"d-none",
      "div2Class":"",
    }
  }catch(e){
    $scope.headerDefault = {
      "div1Class":"",
      "div2Class":"d-none",
    }
  }

  $scope.iamhuman = function(idform){
    if(idform === "login"){
      $scope.goLoginHuman = $scope.goLoginHuman == 0 ? 1 : 0;
      console.log("iamhuman >> $scope.goLoginHuman");
      console.log($scope.goLoginHuman);
    }else if(idform === "search"){
      $scope.goSearchHuman = $scope.goSearchHuman == 0 ? 1 : 0;
      console.log("iamhuman >> $scope.goSearchHuman");
      console.log($scope.goSearchHuman);
    }
  }

  $scope.getConfiguration = function(data){
    console.log("getConfiguration")
    console.log(data)
    $scope.configuration = data.data
  }

  $scope.getSettingMapReload = function($location,$route,$appendscope){
    console.log("getSettingMapReload")
    console.log($appendscope.settingmap)
    let httpOptions = {
      headers: {
        'Content-Type':  'application/json',
        //'Authorization': 'my-auth-token'
      }
    };
    $appendscope.settingmap._request.link=$appendscope.settingmap.link;
    $appendscope.pushData('POST','/checkroute?t=' + Math.ceil(Math.random()*10000),$appendscope.settingmap._request,httpOptions, "settingmap", $scope.getSettingMap, $appendscope);
  }

  $scope.getSettingMap = function(data,$location,$route,$appendscope){
    try{
      console.log("getSettingMap")
      console.log(data)
      $appendscope.settingmap = data.status == 200 ? data.data : {}
      $appendscope.wait = data.showmap

      setTimeout(function(){
        console.log("getSettingMap >> launch getSettingMapReload")
        $scope.getSettingMapReload($location,$route,$appendscope)
      },60000);
    }catch(e){
      console.log("getSettingMap >> err >")
      console.log(e)
    }
  }

  $scope.redirectTo = function(url, params){
    console.log("redirectTo >>")
    console.log("url")
    console.log(url)
    console.log("params")
    console.log(params)
    $location.path(url).search(params);
  }

  $scope.goHome = function(data,locations,route){
    console.log("goHome")
    $scope.redirectTo("/",{"t":Math.ceil(Math.random()*1000)})
  }

  $scope.pushData = function(method,$url,$params,options,attr,fn,$appendscope = "") {
    try{
      console.log($url);
      console.log("pushData > url > "+$url);
      var req = {
        method: method,
        url: $url,
        headers: options,
        data: $params
      };
      $http(req)
      .then(function(response) {
        console.log(response)
        $scope[attr]=response;
        if($appendscope !== ""){
          fn($scope[attr],$location,$route,$appendscope)
        }else{
          fn($scope[attr],$location,$route)
        }
      });
      //$post =
      /*$http.post($url,$params,options)
      $http(req)
      .then(function(response) {
        console.log(response)
        $scope[attr]=response;
        fn($scope[attr],$location)
      });*/
    }catch(e){
      console.log("pushData > exception > "+$url);
      console.log(e);
    }
  }

  let httpOptions = {
    headers: {
      'Content-Type':  'application/json',
      //'Authorization': 'my-auth-token'
    }
  };
  //guardar en el servidor
  try {
    $scope.pushData('GET','/static/tracking/public/json/config.json',{},httpOptions, "configuration", $scope.getConfiguration);
  } catch (e) {
    console.log(e)
  } finally {
  }

  /*
  $http({
                          url: "http://localhost/services/test.php",
                          method: "POST",
                          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                          data: $.param($scope.formAdata)
                      }).success(function(data, status, headers, config) {
                          $scope.status = status;
                      }).error(function(data, status, headers, config) {
                          $scope.status = status;
                      });
  */

}])
//$route.current.params
.controller('GridTrackingCtrl', function($scope,$route) {

    console.log("GridTrackingCtrl");
    console.log("GridTrackingCtrl >> listOrders >>");
    console.log("$scope.configuration");
    console.log($scope.configuration);
    $scope.forecast_date = new Date();
    $scope.forecast_time = new Date(1970, 0, 1, 9, 0, 0);
    $scope.orders = [];
    $scope.setObj = function(obj = ""){
      updateOrder(function(data){
        console.log("GridTrackingCtrl >> setObj >> id >>");
        console.log("you can change before update your page with the button or change the tab");
        console.log(data);
      },obj)
    }
    $scope.getOrders = function(){
      return $scope.orders;
    }
    $scope.setOrders = function(where = []){
      listOrders(function(data){
        console.log("GridTrackingCtrl >> listOrders >> data >>");
        $scope.orders = data;
        $scope.getOrders();
      },where)
    }
    $scope.init = function (step = "active") {
      let unitsarr = $scope.user.units.indexOf("|")>-1 ? $scope.user.units.split("|") : [$scope.user.units]
      if(step === "active"){
        if ($scope.user.rol === "auth"){
          //unitsarr[0] the use has only 1
          $scope.setOrders([["status", "==", 1],["unit", "==", unitsarr[0].toString()]]);
          $scope.getOrders();
        }
        if ($scope.user.rol === "admin"){
          $scope.setOrders([["status", "==", 1],["unit", ">", 0]]);
          $scope.getOrders();
        }
      }
      if(step === "closed"){
        if ($scope.user.rol === "auth"){
          //unitsarr[0] the use has only 1
          $scope.setOrders([["status", "==", 0],["unit", "==", unitsarr[0].toString()]]);
          $scope.getOrders();
        }
        if ($scope.user.rol === "admin"){
          $scope.setOrders([["status", "==", 0],["unit", ">", 0]]);
          $scope.getOrders();
        }
      }
      if(step === "all"){
        if ($scope.user.rol === "auth"){
          //unitsarr[0] the use has only 1
          $scope.setOrders([["status", ">", -1],["unit", "==", unitsarr[0].toString()]]);
          $scope.getOrders();
        }
        if ($scope.user.rol === "admin"){
          $scope.setOrders([["status", ">", -1],["unit", ">", 0]]);
          $scope.getOrders();
        }
      }
    };
    $scope.units = [
      {
        key: "",
        value: 'Choose Vehicle',
        show: 1,
        isOption: 0
      },
      {
        key: 13077207,
        value: 'FYR67E',
        show: 1,
        isOption: 1
      },
      {
        key: 13077320,
        value: 'TFR862',
        show: 1,
        isOption: 1
      },
      {
        key: 13077364,
        value: 'USE051',
        show: 1,
        isOption: 1
      }
    ];

    $scope.fromLoc = [
      {
        key: "",
        value: 'Warehouse',
        show: 1,
        isOption: 0
      },
      {
        key: "bogota",
        value: "bogota",
        show: 1,
        isOption: 1
      },
      {
        key: "medellin",
        value: "medellín",
        show: 1,
        isOption: 1
      }
    ];

    $scope.unit = $scope.units[0];
    $scope.warehouse = $scope.fromLoc[0];

    $scope.changestatus = function(obj){
      console.log("changestatus >> obj >>")
      console.log(obj);
      $scope.setObj(obj);
    }

    $scope.restartTrackForm = function(){
      console.log("restartTrackForm >>")
      $scope.clientname = "";
      $scope.email = "";
      $scope.invoiceid = "";
      $scope.nit = "";
      //it is left the values received for optimization
      //$scope.forecast_date = "";
      //it is left the values received for optimization
      //$scope.forecast_time = "";
      $scope.warehouse = $scope.fromLoc[0];
      $scope.unit = $scope.units[0];
    }

    $scope.saveTrackForm = function(form){
      console.log("GridTrackingCtrl >> saveTrackForm >>")
      try{
        console.log(form);

        $scope.__trackmsg4 = ""
        let fields = [
          "clientname","email","forecast_date","forecast_time","invoiceid","nit","warehouse","unit"
        ];

        let errField = 0;
        let formValue = {}
        for (let i = 0;i < fields.length; i++) {
          console.log("form[fields[i]].$modelValue")
          console.log(fields[i])
          console.log(form[fields[i]].$modelValue)
          if (form[fields[i]].$modelValue == undefined){
            errField++;
          }else{
            if (fields[i] === "warehouse" || fields[i] === "unit"){
              if (form[fields[i]].$modelValue.isOption === 0){
                errField++;
              }else{
                formValue[fields[i]] = form[fields[i]].$modelValue.key
              }
            }else{
              formValue[fields[i]] = form[fields[i]].$modelValue
            }
          }
        }
        console.log("validation...")
        console.log(formValue)
        console.log("errField")
        console.log(errField)


        if (errField > 0)
        {
          $scope.__trackmsg4 += "you need fill all fields";
        }
        //diferencia en dias
        //var df=getSubtractDays(form.L005.$modelValue,form.L004.$modelValue);
        //var df=form.L005.$modelValue,form.L004.$modelValue);

        //si es mayor a un año
        if($scope.__trackmsg4.length == 0){
          console.log("saveTrackForm >> $scope.user")
          console.log($scope.user)
          if (addOrder(formValue,$scope.user.uid, $scope.configuration)) {
            $scope.__trackmsg4 = "Was saved successfully";
            $scope.restartTrackForm();
          }else{
            $scope.__trackmsg4 = "Could not save (0x0F12)";
          }
        }
      }catch(e){
        $scope.__trackmsg4 = "an error has occurred (0x0F11)";
        console.log(e);
      }
    }

    $scope.goTracking = function(data,locations,route){
      console.log("goTracking");
      console.log("goTracking >> data >>");
      console.log(data);
      if (data.data.status === 200){
        $scope.__trackmsg4 = "The notify was created";
        console.log("200, $scope.__trackmsg4");
        console.log($scope.__trackmsg4);
        //loadTrackWithEmail($scope.goLoginEmail,data.data, ".msgAlert1", $scope.goLoginOk);
      }else{
        $scope.__trackmsg4 = "an error has occurred (0x0F10)";
        console.log("200, $scope.__trackmsg4");
        //$scope.__trackmsg4 = data.data.message;
      }
    }
})

.controller('MyControllerCtrl', function($scope, $route, $mdSidenav) {

    console.log("MyControllerCtrl");
    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };
})

.controller('CheckLoginCtrl', function($scope, $route, $location) {

    console.log("CheckLoginCtrl");

    try{
      $scope.user = firebase.auth().currentUser;

      if ($scope.user == undefined)
        throw new ExcepcionGeneric(1001,"user not found")

      $scope.user.rol = firebase.$$t._request.rol
      $scope.user.units = firebase.$$t._request.units
      $scope.user.username = firebase.$$t._request.user

    }catch(e){
      //console.log(e);
      console.log("unauthorized")
      console.log($location)
      $scope.goHome({},$location);
      delete firebase.$$t
      $scope.user = {}
    }
})

.controller('AdminTrackingCtrl', function($scope, $route, $location) {

    console.log("AdminTrackingCtrl");
    console.log("firebase.$$t >>")
    console.log(firebase.$$t)
    try{
      $scope.user = firebase.auth().currentUser;

      if ($scope.user == undefined)
        throw new ExcepcionGeneric(1001,"user not found")

      $scope.user.rol = firebase.$$t._request.rol
      $scope.user.username = firebase.$$t._request.user
      //delete firebase.$$t

    }catch(e){
      $scope.user = {}
    }
})


.controller('LoginTrackingCtrl', function($scope, $route, $location) {

    console.log("LoginTrackingCtrl");
    console.log("$scope.goLoginHuman");
    console.log($scope.goLoginHuman);

    try{
      //delete firebase.auth().currentUser;
      //delete firebase.$$t
    }catch(e){
      console.log("user not exists");
    }

    $scope.question = "write today in roman numeral X";
    $scope.goLoginEmail = "";

    $scope.saveSearchForm3 = function(form){
      console.log("saveSearchForm3 >>>>> ");
      try{
        console.log(form);

        $scope.__trackmsg3 = ""
        $scope.goLoginEmail = "";
        console.log("form.user.$modelValue");
        console.log(form.user.$modelValue);
        if (form.user.$modelValue == undefined || form.user.$modelValue == "" ||
        form.pwd.$modelValue == undefined || form.pwd.$modelValue == "" ||
        $scope.goLoginHuman == 0)
        {
          //$scope.__trackmsg2 += "to qualify, you can choosing the number of stars between 1 is bad and 5 is excellent, also you can to comment about your experience or if you have any service request."
          $scope.__trackmsg3 += "you need fill all fields";
        }
        //diferencia en dias
        //var df=getSubtractDays(form.L005.$modelValue,form.L004.$modelValue);
        //var df=form.L005.$modelValue,form.L004.$modelValue);

        //si es mayor a un año
        if($scope.__trackmsg3.length == 0){
          let httpOptions = {
            headers: {
              'Content-Type':  'application/json',
              //'Authorization': 'my-auth-token'
            }
          };
          //guardar en el servidor
          $scope.pushData('POST','/checkuser?t=' + Math.ceil(Math.random()*10000),{"user":form.user.$modelValue,"pwd":form.pwd.$modelValue},httpOptions, "trackingLoging", $scope.goLogin);
          //$scope.__trackmsg2 = "";
        }
      }catch(e){
        console.log(e);
      }
    }

    $scope.saveSearchForm4 = function(form){
      console.log("saveSearchForm3 >>>>> ");
      try{
        console.log(form);

        $scope.__trackmsg3 = ""
        $scope.goLoginEmail = form.email.$modelValue;
        console.log("form.email.$modelValue");
        console.log(form.email.$modelValue);
        if (form.email.$modelValue == undefined || form.email.$modelValue == "" || $scope.goLoginHuman == 0)
        {
          //$scope.__trackmsg2 += "to qualify, you can choosing the number of stars between 1 is bad and 5 is excellent, also you can to comment about your experience or if you have any service request."
          $scope.__trackmsg3 += "you need fill all fields";
        }
        //diferencia en dias
        //var df=getSubtractDays(form.L005.$modelValue,form.L004.$modelValue);
        //var df=form.L005.$modelValue,form.L004.$modelValue);

        //si es mayor a un año
        if($scope.__trackmsg3.length == 0){
          let httpOptions = {
            headers: {
              'Content-Type':  'application/json',
              //'Authorization': 'my-auth-token'
            }
          };
          //guardar en el servidor
          $scope.pushData('POST','/checkemail?t=' + Math.ceil(Math.random()*10000),{"email":form.email.$modelValue},httpOptions, "trackingLoging", $scope.goLogin);
          //$scope.__trackmsg2 = "";
        }
      }catch(e){
        console.log(e);
      }
    }

    $scope.goLoginOk = function(data){
      console.log("goLoginOk >>")
      console.log(firebase.$$t = data);
      console.log(data);
      location.href = location.protocol + "//" + location.host  + location.pathname + "#!/tracking/admin"
    }

    $scope.goLogin = function(data,locations,route){
      console.log("goLogin");
      console.log("goLogin >> data >>");
      console.log(data);
      if (data.data.status === 200){
        $scope.__trackmsg3 = "Login success, wait please...";
        console.log("200, $scope.__trackmsg3");
        console.log($scope.__trackmsg3);
        loadTrackWithEmail($scope.goLoginEmail,data.data, ".msgAlert1", $scope.goLoginOk);
      }else{
        $scope.__trackmsg3 = data.data.message;
      }
    }

})

.controller('DrawStarsCtrl', function($scope, $route) {

    console.log("DrawStarsCtrl");
    $scope.stars = 0;
    $scope.onGetStars = function(id){

      console.log("onGetStars >>");

      $(".stars span").removeClass("set");
      //$(this).addClass("set");
      $($(".stars span")[id]).addClass("set");
      $(".stars .checked").removeClass("checked");
      let els = $(".stars span");
      let iddetect = 0;
      let nstars = -1;
      for (let a = 0; a < els.length; a++){
        let el = $(els[a]);
        if(iddetect === 0){
          el.addClass("checked")
        }
        if(el.hasClass("set")){
          iddetect = 1;
          nstars = a + 1;
          el.removeClass("set");
        }
      }
      $scope.stars = nstars;
    }
})


.controller('DrawTrackingCtrl', function($scope, $route, $sce, $location) {
    console.log("DrawTrackingCtrl");
    console.log("$location >> ");
    console.log($location);
    console.log($location.$$search);
    console.log("$scope.user")
    console.log($scope.user)
    $scope.wait = 1;
    $scope.settingmap = {
      "message":"Validando su token, espere por favor......"
    }
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }
    let httpOptions = {
      headers: {
        'Content-Type':  'application/json',
        //'Authorization': 'my-auth-token'
      }
    };
    $scope.pushData('GET','/static/temporarily/'+$location.$$search.link+'.json',{},httpOptions, "settingmap", $scope.getSettingMap, $scope);
    //$scope.order = $location.$$search.link;
    //$scope.order = "http://plataforma.gps7000.com/?sid=026514bc837bcf18473765b9958fb7fd"
})

.controller('SearchDateTrackingCtrl', function($scope, $route, $location) {

    console.log("SearchDateTrackingCtrl");

    $scope.question = "write today in roman numeral";

    $scope.selectedDispatch = '';
    $scope.selectDispatch = [
      {value: 'Bogota', viewValue: 'Bogota'},
      {value: 'Medellin', viewValue: 'Medellin'}
    ];
    $scope.__trackmsg = "";
    $scope.__trackmsg2 = "";
    $scope.nit = "";
    $scope.invoiceid = "";
    $scope.answer = "";
    //$scope.stars = 0;
    $scope.comment = "";
    $scope.starsGrade = ["* required", "bad", "poor", "fair", "good", "excellent" ];



    $scope.getRandomUuid = function (){
      return Math.floor((Math.random()*6)+1);
    };
    $scope.getTracking = function(data,locations,route){
      console.log("getTracking")
      console.log(data)

      if (data.data.status==200){
        $scope.redirectTo("tracking/map",{"order":data.data.route})
      }else{
        $scope.__trackmsg = data.data.message
      }
    }

    $scope.getRatingToNotify = function(data,locations,route,$appendscope){
      console.log("getRatingToNotify")
      console.log(data)
      $appendscope.comment = ""
      $appendscope.__trackmsg5 = data.data.message
    }

    $scope.showRate = function(form){
      console.log("active comment");
      $('.margtop100').remove();
      $('.rate').removeClass('d-none');
      $('.rate').show();
    }
    $scope.hiddenintro = function(form){
      console.log("hiddenintro");
      $('.messagetoclient').hide();
    }

    //procesa la peticion de envio de datos del formulario
    $scope.saveSearchForm = function(form){
      console.log("saveSearchForm >>>>> ");
      try{

        $scope.__trackmsg = ""
        $scope.goSearchHuman
        if ($scope.nit.length == 0 || $scope.invoiceid.length == 0 || $scope.goSearchHuman == 0)
        {
          $scope.__trackmsg += "you need fill all fields"
        }

        //diferencia en dias
        //var df=getSubtractDays(form.L005.$modelValue,form.L004.$modelValue);
        //var df=form.L005.$modelValue,form.L004.$modelValue);

        //si es mayor a un año
        if($scope.__trackmsg.length==0){
          let httpOptions = {
            headers: {
              'Content-Type':  'application/json',
              //'Authorization': 'my-auth-token'
            }
          };

          //guardar en el servidor
          $scope.pushData('POST','/checkroute?t=' + Math.ceil(Math.random()*10000),{"nit":form.nit.$modelValue,"invoiceid":form.invoiceid.$modelValue},httpOptions, "trackingIframe", $scope.goIframe);
          //$scope.pushData('GET','/static/tracking/public/json/tracking.json?t=' + Math.ceil(Math.random()*10000),{},httpOptions, "tracking", $scope.getTracking);
        }
      }catch(e){
        console.log(e);
      }
    }

    $scope.goIframe = function(data,locations,route){
      console.log("goIframe");
      console.log("goIframe >> data >>");
      console.log(data);
      console.log("goIframe >> locations >>");
      console.log(locations);
      console.log("goIframe >> route >>");
      console.log(route);
      //route.reload()
      //route.updateParams({child: 'all'});
      //route.current.params
      if (data.data.status === 200){
        $scope.__trackmsg = "Loading map, wait please...";
        $scope.redirectTo("/tracking/map",{"link":data.data.link,"t":Math.ceil(Math.random()*1000)})
        //loadTrackWithEmail($scope.goLoginEmail,data.data, ".msgAlert1", $scope.goLoginOk);
      }else{
        $scope.__trackmsg = data.data.message;
      }
    }

    $scope.saveSearchForm2 = function(form, inforel){
      console.log("saveSearchForm2 >>>>> ");
      try{
        //$scope.stars = $(".stars .checked").length;
        console.log(form.stars.$modelValue);
        console.log(form);
        console.log(inforel);


        $scope.__trackmsg2 = ""
        if ((form.stars.$modelValue.length == 0 || form.stars.$modelValue == 0) || form.comment.$modelValue.length == 0)
        {
          //$scope.__trackmsg2 += "to qualify, you can choosing the number of stars between 1 is bad and 5 is excellent, also you can to comment about your experience or if you have any service request."
          $scope.__trackmsg2 += "we want know your experience with the current service, choosing the stars and write any comment.";
        }
        //diferencia en dias
        //var df=getSubtractDays(form.L005.$modelValue,form.L004.$modelValue);
        //var df=form.L005.$modelValue,form.L004.$modelValue);

        //si es mayor a un año
        if($scope.__trackmsg2.length==0){
          let httpOptions = {
            headers: {
              'Content-Type':  'application/json',
              //'Authorization': 'my-auth-token'
            }
          };

          let dataToSend = {
            "inforel":inforel,
            "stars":form.stars.$modelValue,
            "comment":form.comment.$modelValue
          }
          $scope.pushData('POST','/addcomment?t=' + Math.ceil(Math.random()*10000),dataToSend,httpOptions, "ratingtonotify", $scope.getRatingToNotify, $scope);
          //$scope.__trackmsg2 = "";
        }
      }catch(e){
        console.log(e);
      }
    }

});
