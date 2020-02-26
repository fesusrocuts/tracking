angular.module('controller',['angularMoment','ngMaterial', 'ngMessages', 'ngRoute'])

.run(function(amMoment) {
    amMoment.changeLocale('de');
})
.controller('TrackingCtrl',['$scope','$http','$log','$location',function($scope,$http,$log,$location){

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

  $scope.redirectTo = function(url, params){
    console.log("redirectTo >>")
    console.log("url")
    console.log(url)
    console.log("params")
    console.log(params)
    $location.path(url).search(params);
  }

  $scope.goHome = function(data,locations){
    console.log("goHome")
    $scope.redirectTo("/",{"t":Math.ceil(Math.random()*1000)})
  }

  $scope.pushData = function(method,$url,$params,options,attr,fn) {
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
        fn($scope[attr],$location)
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

.controller('GridTrackingCtrl', function($scope) {

    console.log("GridTrackingCtrl");

})

.controller('MyControllerCtrl', function($scope, $mdSidenav) {

    console.log("MyControllerCtrl");
    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };

})

.controller('CheckLoginCtrl', function($scope, $location) {

    console.log("CheckLoginCtrl");

    try{
      $scope.user = firebase.auth().currentUser;

      if ($scope.user == undefined)
        throw new ExcepcionGeneric(1001,"user not found")

      $scope.user.rol = firebase.$$t._request.rol
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

.controller('AdminTrackingCtrl', function($scope, $location) {

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


.controller('LoginTrackingCtrl', function($scope, $location) {

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

    $scope.goLogin = function(data,locations){
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

.controller('DrawStarsCtrl', function($scope) {

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


.controller('DrawTrackingCtrl', function($scope, $sce, $location) {

    console.log("DrawTrackingCtrl");
    console.log("$location >> ");
    console.log($location);
    console.log($location.$$search);

    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }
    $scope.order = $location.$$search.order;
    //$scope.order = "http://plataforma.gps7000.com/?sid=026514bc837bcf18473765b9958fb7fd"


})

.controller('SearchDateTrackingCtrl', function($scope, $location) {

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
    $scope.getTracking = function(data,locations){
      console.log("getTracking")
      console.log(data)
      if (data.data.status==200){
        $scope.redirectTo("tracking/map",{"order":data.data.route})
      }else{
        $scope.__trackmsg = data.data.message
      }
    }

    $scope.showRate = function(form){
      console.log("active comment");
      $('.margtop100').remove();
      $('.rate').removeClass('d-none');
      $('.rate').show();
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
          $scope.pushData('GET','/static/tracking/public/json/tracking.json?t=' + Math.ceil(Math.random()*10000),{},httpOptions, "tracking", $scope.getTracking);
        }
      }catch(e){
        console.log(e);
      }
    }

    $scope.saveSearchForm2 = function(form){
      console.log("saveSearchForm2 >>>>> ");
      try{
        //$scope.stars = $(".stars .checked").length;
        console.log(form.stars.$modelValue);
        console.log(form);

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
          //guardar en el servidor
          $scope.pushData('GET','/static/tracking/public/json/tracking.json?t=' + Math.ceil(Math.random()*10000),{},httpOptions, "trackingComment", $scope.goHome);
          //$scope.__trackmsg2 = "";
        }
      }catch(e){
        console.log(e);
      }
    }

});
