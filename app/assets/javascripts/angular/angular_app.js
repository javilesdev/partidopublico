var app = angular.module("papuApp",[ "ui.bootstrap", 'ng-rails-csrf',, 'ngRoute', 'ngAside', 'flow']);

app.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider) {
 $locationProvider.html5Mode(true);
}]);

app.controller("personasController",["$scope","$http","$location","$aside","$attrs",  function($scope,$http,$location,$aside,$attrs){
  $scope.persona = {};

  var save_or_update_persona = function() {
    if($scope.persona.id) {
      $http.put('/personas/'+$scope.persona.id, $scope.persona)
        .success(function(data){
          console.log("persona update ok")
        })
        .error(function (){
          $scope.messages = { response: false, message: $attrs.errorupdatingask }
          scroll_to_top();
        });
    }
    else {
      $http.post('/personas/'+$scope.persona.id, $scope.persona)
        .success(function(data){
          $scope.persona = data;
        })
        .error(function (){
          $scope.messages = { response: false, message: $attrs.errorcreatingask }
          scroll_to_top();
        });
    }
  }

  function getPersonaInfo(persona_id) {
    $http.get('personas/'+persona_id+'.json')
      .success( function(data){
        $scope.persona = data;
        console.log(data)
      })
      .error( function(error_data){
        $scope.messages = {response: false, message: error_data}
      })
  }

  $scope.getPersonaModal = function(persona_id){
    getPersonaInfo(persona_id);
    $aside.open({
      templateUrl: 'persona_modal_aside.html',
      scope: $scope,
      placement: 'left',
      size: 'lg',
      backdrop: true,
      controller: function($scope,$uibModalInstance){
        $scope.save = function(e) {
          save_or_update_persona();
          $uibModalInstance.close();
          e.stopPropagation();
        };
        $scope.cancel = function(e) {
          $uibModalInstance.close();
          e.stopPropagation();
        };
      }
    });
  }

}]);

app.controller("cargosController",["$scope","$http","$location","$aside","$attrs",  function($scope,$http,$location,$aside,$attrs){
  $scope.cargos = {};
  $scope.partido_id = $location.path().split("/")[2];

  var save_or_update_cargo = function() {
    if($scope.cargo.id) {
      $http.put('/cargos/'+$scope.cargo.id, $scope.cargo)
        .success(function(data){
          getCargosByPartido($scope.partido_id);
        })
        .error(function (){
          $scope.messages = { response: false, message: $attrs.errorupdatingask }
          scroll_to_top();
        });
    }
    else {
      $http.post('/cargos/', $scope.cargo)
        .success(function(data){
          console.log(data)
          getCargosByPartido($scope.partido_id);
        })
        .error(function (){
          $scope.messages = { response: false, message: $attrs.errorcreatingask }
          scroll_to_top();
        });
    }
  }

  function getRegions() {
    $http.get('partidos/'+$scope.partido_id+'/regions')
      .success( function(data){
        $scope.regions = data;
        console.log(data)
      })
      .error( function(error_data){
        $scope.messages = {response: false, message: error_data}
      })
  }

  function getComunas() {
    $http.get('partidos/'+$scope.partido_id+'/comunas')
      .success( function(data){
        $scope.comunas = data;
        console.log(data)
      })
      .error( function(error_data){
        $scope.messages = {response: false, message: error_data}
      })
  }

  function getCargosByPartido(partido_id) {
    $http.get('partidos/'+partido_id+'/cargos')
      .success( function(data){
        $scope.cargos = data;
        console.log(data)
      })
      .error( function(error_data){
        $scope.messages = {response: false, message: error_data}
      })
  }

  function getTipoCargos(partido_id) {
    $http.get('partidos/'+partido_id+'/tipo_cargos')
      .success( function(data){
        $scope.tipo_cargos = data;
        console.log(data)
      })
      .error( function(error_data){
        $scope.messages = {response: false, message: error_data}
      })
  }

  function getPersonasByPartido(partido_id) {
    $http.get('partidos/'+partido_id+'/personas')
      .success( function(data){
        $scope.personas = data;
        console.log("get Personas by partido");
        console.log(data);
      })
      .error( function(error_data){
        $scope.messages = {response: false, message: error_data}
      })
  }

  function getCargoInfo(cargo_id) {
    $http.get('cargos/'+cargo_id+'.json')
      .success( function(data){
        $scope.cargo = data;
        fecha_hasta_array = data.fecha_hasta.split('-')
        fecha_desde_array = data.fecha_desde.split('-')
        $scope.cargo.fecha_hasta = new Date(fecha_hasta_array[0],fecha_hasta_array[1]-1,fecha_hasta_array[2])
        $scope.cargo.fecha_desde = new Date(fecha_desde_array[0],fecha_desde_array[1]-1,fecha_desde_array[2])
        console.log(data.fecha_hasta)
      })
      .error( function(error_data){
        $scope.messages = {response: false, message: error_data}
      })
  }

  $scope.getCargoModal = function(cargo_id){
    if(cargo_id) {
      getCargoInfo(cargo_id);
    } else {
      $scope.cargo = {
        partido_id: $scope.partido_id
      };
    }
    $aside.open({
      templateUrl: 'cargo_modal_aside.html',
      scope: $scope,
      placement: 'left',
      size: 'lg',
      backdrop: true,
      controller: function($scope,$uibModalInstance){
        $scope.save = function(e) {
          save_or_update_cargo();
          $uibModalInstance.close();
          e.stopPropagation();
        };
        $scope.cancel = function(e) {
          $uibModalInstance.close();
          e.stopPropagation();
        };
      }
    });
  }

  getCargosByPartido($scope.partido_id);
  getPersonasByPartido($scope.partido_id);
  getTipoCargos($scope.partido_id);
  getRegions();
  getComunas();
}]);
