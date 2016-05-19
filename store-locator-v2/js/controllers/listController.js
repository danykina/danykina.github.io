storeLocator.controller('listController', function($scope, $state, $cookies, $cookieStore, $http, $stateParams, loginManager, storeDetailsManager, storeManager, sessionController){

    var session = $cookies.getObject('session');

    sessionController.check($cookies.getObject('session') ,function(err, result){
        if(!err){
            $state.go('list');
        } else {
            console.log("sessione scaduta");
            $state.go('login');
        }
    });
    
    $scope.loading = true;

    storeManager.getAll(session, function(err, result){
        if(err){
            console.log('errore caricamento stores')
        } else {
            console.log(result);
            $scope.list = result;
            $scope.loading = false;
        }
    });



    $scope.details =  function (guid) {
        $state.go('details', {guid:guid});
    };

    $scope.logout = function () {
        $cookies.remove('session');
        $state.go('login');
    }

});