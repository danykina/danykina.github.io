mayaNotes.controller('deleteController', function ($scope, $state, $stateParams, dataAccess) {

    
    
    $scope.id = $stateParams.id;
    var currentObj = dataAccess.getById($stateParams.id);

    $scope.name = currentObj.name;
    $scope.surname = currentObj.surname;
    $scope.deleteClick = function(){
        dataAccess.delete($scope.id);
        $state.go('home');
    };

    $scope.undoClick = function () {

        history.back();
        $state.go('home');
    }


});