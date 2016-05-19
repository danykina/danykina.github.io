mayaNotes.controller('insertController', function ($scope, $state, dataAccess) {

    $scope.date = new Date();

    $scope.insertClick = function(){

        var x = new Object();

        if(!$scope.name) {
            alert('Nome richiesto per aggiungere una nota')
        }

        else {
            x.name = $scope.name;
            x.date = $scope.date;
            x.text = $scope.text;

            dataAccess.insert(x);
            $state.go('home');
        }
    }
});