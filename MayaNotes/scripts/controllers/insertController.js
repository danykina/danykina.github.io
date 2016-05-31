mayaNotes.controller('insertController', function ($scope, $state, pouchService, uploadManager, $http) {

    $scope.insert = function () {

        var fileChooser = document.getElementById('file-chooser');
  
        var _title = $scope.title;
        var _text = $scope.text;
        var _tag = $scope.tags;
        var _image = {
            "_hasImage": false,
            "_urlImage": "",
            "_guid": "",
            "_path": ""
        }
        
        if(document.getElementById('file-chooser').files[0] != null){
            uploadManager.upload(fileChooser, _title, _image, function (url){
                if(url != ""){
                    _image._hasImage = true;
                    _image._urlImage = url;
                    //console.log("url insertController " + url)
                }

                insertNote(_title, _text, _tag, _image);
            });
        } else{
            insertNote(_title, _text, _tag, _image);

        }

        $scope.loadTags = function (query) {
            return $http.get('/tags?query=' + query);
        };    
    };

    function insertNote (_title, _text, _tag, _image){
        if(_title) {
            pouchService.insertDoc(_title, _text, _tag, _image);
            $state.go('home');
        } else {
            alert('Metti il titolo per inserire una nota')
        }
    }

    $scope.backarrow = function () {
        $state.go('home');
    };
    
});