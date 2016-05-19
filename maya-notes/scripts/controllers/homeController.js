mayaNotes.controller('homeController', function ($scope, $state, $stateParams, dataAccess) {

    
    $scope.list = dataAccess.getAll();

    $scope.clearStorage = function(){
        localStorage.clear();
        window.location.reload()
    };
    

});