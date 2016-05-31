mayaNotes.factory("uploadManager", function(uuid2) {

  var uploadManager = {};
  var bucket = new AWS.S3({params: {Bucket: 'tsac-its'}});
  var results = document.getElementById('results');
  var bucketNameS3 = 'tsac-its';
  var _url = null;

  function getS3KeyFromFileNameWithExtension (name, ext) {
    return "MayaNotes/" + name + "." + ext
  }

  function extensionControl (ext) {
    if(ext == "jpg" || ext == "png" || ext == "gif" || ext == "bmp"/* || ext == "txt"*/)
      return ext;
    else
      alert("Estensione --> " + ext + " <-- non valida!");
  }

  function generateHash (_title) {
    var hashTitle = CryptoJS.MD5(_title);
    var hashDate = CryptoJS.MD5(new Date());
    var hash = hashTitle+hashDate;

    return hash
  }

  function generateUrl (valueUrl) {
    bucket.getSignedUrl('getObject', valueUrl, function (err, url) {
      //console.log("The URL is", url);
      //console.log(err);
      _url = url;   
    }); 
  }

  function splitExtension (nameWithExt) {
    var splittedFileName = nameWithExt.split(".");
    //if(splittedFileName[1] == undefined)
    //  var ext = "txt";
    //else
      var ext = splittedFileName[1];
    return ext;
  }

  function splitName (nameWithExt) {
    var splittedFileName = nameWithExt.split(".");
    var name = splittedFileName[0];
    return name;
  }

  uploadManager.upload = function (fileChooser, _title, _image, completionHandler){
    var file = fileChooser.files[0];
    if (file) {
      var sizeMegabyte = file.size/1000000;
      if(sizeMegabyte <= 2.048 ){
        _extensionFile = splitExtension(file.name);
        console.log();
        extensionControl(_extensionFile);

        _image._guid = uuid2.newguid()
        _image._path = getS3KeyFromFileNameWithExtension(_image._guid, _extensionFile);
        var valueUrl = {Bucket: bucketNameS3, Key: _image._path};
        generateUrl(valueUrl);
        var params = {Key: _image._path, ContentType: file.type, Body: file};

        bucket.upload(params, function (err, data) {
          completionHandler(_url);;
        });
      } else {
        alert("Dimensione file superiore a 2 Megabyte")
      }
    }
  }

  uploadManager.deleteFile = function (_image) {
    var params = {
        Bucket: bucketNameS3,
        Key: _image.path
    };
    bucket.deleteObject(params, function (err, data) {
        if (data) {
            console.log("File deleted successfully");
        }
        else {
            console.log("Check if you have sufficient permissions : " + err);
        }
    });
}





  return uploadManager;
});