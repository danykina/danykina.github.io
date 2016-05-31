mayaNotes.controller('editController', function ($scope, $state, $stateParams, pouchService, uploadManager) {
    
    var _id = $stateParams.id;

    pouchService.details(_id, function (err, result) {
        if(!err) {
            $scope.title = result.title;
            $scope.text = result.text;
            $scope.tag = result.tag;
            $scope.hasImage = result.image.hasImage;
            $scope.urlImage = result.image.urlImage;
            $scope.guid = result.image.guid;
            $scope.path = result.image.path;
        } else {
            alert(err);
        }
    });
    
    $scope.edit = function () {
        var fileChooser = document.getElementById('file-chooser');

        var _date = new Date().toISOString();
        var _id = $stateParams.id;
        var _rev = $stateParams.rev;
        var _title = $scope.title;
        var _text = $scope.text;
        var _tag = $scope.tag;
        var _image = {
            "_hasImage": $scope.hasImage,
            "_urlImage": $scope.urlImage,
            "_guid": $scope.guid,
            "_path": $scope.path
        }

        if(document.getElementById('file-chooser').files[0] != null){
            uploadManager.upload(fileChooser, _title, _image, function (url){
                if(url != ""){
                    _image._hasImage = true;
                    _image._urlImage = url;
                }

                pouchService.editDoc(_id, _rev, _title, _text, _tag, _date, _image);
            });
        } else{
                pouchService.editDoc(_id, _rev, _title, _text, _tag, _date, _image);
        }

        $state.go('home');
    };
    
    $scope.backarrow = function () {
        $state.go('home');
    };

});