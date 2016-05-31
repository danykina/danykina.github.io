mayaNotes.controller('detailsController', function ($scope, $state, $stateParams, pouchService, uploadManager) {
    
    var _id = $stateParams.id;
    var rev = "";
    var _image;

    $scope.doc = pouchService.details(_id, function (err, result) {
        if(!err) {
            $scope.doc = result;
            rev = result._rev;
            _image = result.image;
            console.log(result);
        } else {
            alert(err);
        }
    });
    
    $scope.del = function () {
        uploadManager.deleteFile(_image, function (){
                
        });
        pouchService.delDoc(_id, rev);
        $state.go('home');
    };
    
    $scope.backarrow = function () {
        $state.go('home');
    };
    
    $('#deleteModal').on('shown.bs.modal', function () {
        $('#deleteModal').focus()
    })
    
});