mayaNotes.controller('detailsController', function ($scope, $state, $stateParams, dataAccess) {


    
    $scope.id = $stateParams.id;
    var currentObj = dataAccess.getById($stateParams.id);

    $scope.id = currentObj.id;
    $scope.date = currentObj.date;
    $scope.name = currentObj.name;
    $scope.text = currentObj.text;






});