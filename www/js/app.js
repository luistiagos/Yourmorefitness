// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  
  $rootScope.getSessionItem = function(name) {
	  var item = localStorage.getItem(name);
	  if (item) {
		  return JSON.parse(item);
	  }
	  
	 return null;
  }
  
  $rootScope.setSessionItem = function(name,item) {
	  localStorage.setItem(name,JSON.stringify(item));
  }
  
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
      url: "/login",
      templateUrl: "templates/usuario/login.html",
      controller: 'LoginCtrl'
   })
  
   .state('cadastro', {
      url: "/cadastro",
      templateUrl: "templates/usuario/cadastro.html",
      controller: 'CadastroCtrl'
   })
   
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
   
  .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
   })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  })
  
  .state('app.exercicio', {
    url: "/cadastrarExercicio",
    views: {
      'menuContent': {
        templateUrl: "templates/ficha/exercicio.html",
        controller: 'ExercicioCtrl'
      }
    }
  })
  
  .state('app.editarExercicio', {
    url: "/editarExercicio/:nomeExercicio",
    views: {
      'menuContent': {
        templateUrl: "templates/ficha/exercicio.html",
        controller: 'EditarExercicioCtrl'
      }
    }
  })
  
  .state('app.listaExercicios', {
    url: "/listaExercicios",
    views: {
      'menuContent': {
        templateUrl: "templates/ficha/exerciciolist.html",
        controller: 'ListaExerciciosCtrl'
      }
    }
  });
  
  $urlRouterProvider.otherwise('/login');
});
