mayaNotes.controller('homeController', function ($scope, $state, $stateParams, pouchService, uploadManager) {
    
    var idDel = "";
    var revDel = "";
    var _hasImage = "";
    var _urlImage = "";


    $scope.setvar = function (id, rev, image) {
        idDel = id;
        revDel = rev;
        _image = image;

        $scope.del = function () {
            uploadManager.deleteFile(_image, function (){
                
            });
            pouchService.delDoc(idDel, revDel);
            $state.reload('home')
        }
    };
    
    pouchService.showAll(function (err, result) {
        if(!err) {
            $scope.list = result.rows;
            //console.log(result);
        }
    });
   
    $('#deleteModal').on('shown.bs.modal', function () {
        $('#deleteModal').focus();
        console.log('modale');
    });
    
});