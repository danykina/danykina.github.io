mayaNotes.controller('editController', function ($scope, $state, $stateParams, dataAccess) {


    
    $scope.id = $stateParams.id;
    var currentObj = dataAccess.getById($stateParams.id);

    $scope.name = currentObj.name;
    $scope.date = new Date();
    $scope.text = currentObj.text;

    $scope.updateClick = function(){

        var x = new Object();
        x.id = $scope.id;
        x.name = $scope.name;
        x.date = $scope.date;
        x.text = $scope.text;
        
        dataAccess.update(x);
        $state.go('home');
    }

});