var app = angular.module('app',['ngMaterial', 'ngMessages', 'ngRoute','controller'])

.config(function($routeProvider){
  $routeProvider
  .when('/',
    {
      templateUrl:'app/components/tracking/tracking.view.html',
      controller: 'TrackingCtrl'
    }
  )
  .when('/tracking/header',
    {
      templateUrl:'app/components/tracking/tracking.header.html',
      controller: 'TrackingCtrl'
    }
  )
  .when('/tracking/login',
    {
      templateUrl:'app/components/tracking/tracking.login.html',
      controller: 'TrackingCtrl'
    }
  )
  .when('/tracking/admin',
    {
      templateUrl:'app/components/tracking/tracking.admin.html',
      controller: 'TrackingCtrl'
    }
  )
  .when('/tracking/search',
    {
      templateUrl:'app/components/tracking/tracking.search.html',
      controller: 'TrackingCtrl'
    }
  )
  .when('/tracking/map',
    {
      templateUrl:'app/components/tracking/tracking.mapWith.html',
      controller: 'TrackingCtrl'
    }
  )
  .when('/tracking/list',
    {
      templateUrl:'app/components/tracking/tracking.list.html',
      controller: 'TrackingCtrl'
    }
  )
  .when('/tracking/create',
    {
      templateUrl:'app/components/tracking/tracking.create.html',
      controller: 'TrackingCtrl'
    }
  )
  .when('/tracking/update',
    {
      templateUrl:'app/components/tracking/tracking.update.html',
      controller: 'TrackingCtrl'
    }
  )
  .when('/tracking/delete',
    {
      templateUrl:'app/components/tracking/tracking.delete.html',
      controller: 'TrackingCtrl'
    }
  )
  .otherwise(
    {
      redirectTo: '/'
    }
  )
})

.constant('angularMomentConfig', {
    timezone: 'America/Bogota'
});

app.config(['$sceDelegateProvider', function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://plataforma.gps7000.com/**'
    ]);
}]);

moment.locale("es");
