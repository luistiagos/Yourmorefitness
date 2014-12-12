angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('LoginCtrl', function($scope, $stateParams, $location, $ionicPopup) {
	
	$scope.usuario = {};
	
	$scope.doLogin = function() {
		
		var userSession = localStorage.getItem("userSession");
		
		if (userSession) {
			var user = JSON.parse(userSession);
			if (user.email == $scope.usuario.email) {
				$location.path('/app/listaExercicios');
				return;
			}
		}
		
		$ionicPopup.alert({
		     template: 'Usuário ou senha invalido(s)'
		});
	}
	
	$scope.doCadastrar = function() {
		$location.path('/cadastro');
	}
})

.controller('CadastroCtrl', function($scope, $stateParams, $location, $ionicPopup) {
	
	$scope.usuario = {};
	
	$scope.carregar = function() {
		
		var user = localStorage.getItem('userSession');
		
		if (user) {
			$scope.usuario = JSON.parse(user);
		}
	}
	
	$scope.salvar = function() {
		
		if ($scope.usuario.pwdConfirm != $scope.usuario.senha) {
			$ionicPopup.alert({
			     template: 'Confirmação da senha tem que ser igual a senha'
			});
			return;
		}
		
		localStorage.setItem("userSession", JSON.stringify($scope.usuario));
		$location.path('/app/search');
	}
	
	$scope.limpar = function() {
		
	}
	
	$scope.carregar();
})

.controller('ExercicioCtrl', function($scope, $stateParams, $location, $ionicPopup) {
	
	$scope.exercicio = {};
	
	$scope.init = function() {
		$scope.exercicio.nome = "SELECIONE";
		$scope.exercicio.carga = 0;
		$scope.exercicio.repeticoes = 0;
		$scope.exercicio.intervalo = 0;
	}
	
	$scope.salvar = function() {
		
		var user = localStorage.getItem("userSession");
		
		if (user) {
			user = JSON.parse(user); 
			if (!user.listaExercicios) {
				user.listaExercicios = [];
			}
			
			user.listaExercicios.push($scope.exercicio);
			localStorage.setItem("userSession",JSON.stringify(user));
			$location.path('/app/listaExercicios');
		}
	}
	
	$scope.init();
})

.controller('ListaExerciciosCtrl', function($scope, $stateParams, $location, $ionicPopup) {
	
	$scope.listaExercicios = null;
	
	$scope.init = function() {
		
		var usr = localStorage.getItem("userSession");
		
		if (usr) {
			usr = JSON.parse(usr);
			if (usr.listaExercicios) {
				$scope.listaExercicios = usr.listaExercicios;
			}
		}
	}
	
	$scope.init();
})

.controller('EditarExercicioCtrl', function($scope, $rootScope, $stateParams, $location, $ionicPopup) {
	
	$scope.exercicio = {};
	$scope.isEdicao = true;
	
	$scope.getExercicio = function(nomeExercicio) {
		for (var i=0;i<$scope.user.listaExercicios.length; i++) {
			if ($scope.user.listaExercicios[i].nome == nomeExercicio) {
				return $scope.user.listaExercicios[i];
			}
		}
	}
	
	$scope.init = function() {
		$scope.user = $rootScope.getSessionItem("userSession");
		if ($scope.user && $scope.user.listaExercicios) {
			$scope.exercicio = $scope.getExercicio($stateParams.nomeExercicio);
		}
	}
	
	$scope.voltar = function() {
		$location.path('/app/listaExercicios');
	}
	
	$scope.salvar = function() {
		for (var i=0;i<$scope.user.listaExercicios.length; i++) {
			if ($scope.user.listaExercicios[i].nome == $scope.exercicio.nome) {
				$scope.user.listaExercicios[i] = $scope.exercicio;
				break;
			}
		}
		
		$rootScope.setSessionItem("userSession",$scope.user);
		$location.path('/app/listaExercicios');
	}
	
	$scope.init();
});

