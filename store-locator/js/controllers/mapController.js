storeLocator.controller('mapController', function($scope, $state, $cookies, $cookieStore, $http, storeManager, sessionController){

    var session = $cookies.getObject('session');

    sessionController.check($cookies.getObject('session') ,function(err, result){
        if(!err){
            $state.go('map');
        } else {
            console.log("sessione scaduta");
            $state.go('login');
        }
    });
    
    var gmap;
    var userPin = 'asserts/userPositionPin.png';
    var storePin = 'asserts/storePositionPin.png';


    storeManager.getAll(session, function(err, result){
        if(err){
            console.log('errore caricamento stores')
        } else {
            list = result;
            gmap = new GMaps({
                el: '#map',
                lat: 45.9132589, //placeholder
                lng: 12.5066841,  //placeholder
                icon: userPin,
                infoWindow:{
                    content: '<h5>Tu sei qui</h5>'
                }
            });
            GMaps.geolocate({
                success: function(position) {
                    gmap.setCenter(position.coords.latitude, position.coords.longitude);
                    gmap.addMarker({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        icon: userPin,
                        infoWindow:{
                            content: '<p><h4>JESSE SPA</h4>' + '<br/>' + 'Via Sacile, 75,Francenigo TV' + '<br/>' + '<a href =callto:"' + '+ 39 0434 766711' + '>' + '+39 0434 766711' + '</a></p>'
                        }
                    })
                },
                error: function(error) {
                    alert('Geolocation failed: '+error.message);
                },
                not_supported: function() {
                    alert("Your browser does not support geolocation");
                },
                always: function() {
                    //alert("Everything working fine...at least now.");
                }
            });
            for (var i = result.length - 1; i >= 0; i--) {

                    gmap.addMarker({
                    lat: result[i].latitude,
                    lng: result[i].longitude,
                    icon: storePin,
                    infoWindow:{
                        content: '<p><h4><a ui-sref="details(result[i].guid)">' + result[i].name + '</a></h4>' + result[i].address + '<br />' + '<a href =callto:"' + result[i].phone + '">' + result[i].phone + '</a></p>'
                    }

                })
            }
        }
    });

    $scope.logout = function () {
        $cookies.remove('session');
        $state.go('login');
    };

    $scope.details =  function (guid) {
        $state.go('details', {guid:guid});
    };
});