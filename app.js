(function() {
    var myApp = angular.module('inCaneva',['ngSanitize']);

    /*
    myApp.config(function ($httpProvider) {
        //$httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
        console.log('config');
    });
    */

    myApp.controller('printEvents', function($scope, $http, $httpParamSerializerJQLike){

        $http({
            method  : 'POST',
            url     : 'http://incaneva.it/wp-admin/admin-ajax.php',
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' },
            data    : $httpParamSerializerJQLike({ //$.param
                action: 'incaneva_events',
                blog: '1,6,7,8',
                old: false,
                limit: 10
            }),
        }).then(function (response){
            $scope.eventi = response.data.data;
            formatDate();
        }, function(response){
            alert("Nope");
        });

        formatDate = function(){
            angular.forEach($scope.eventi, function (value, key){
                if(value.evcal_end_date == ""){
                    value.formattedDate = value.evcal_start_date;
                }else{
                    value.formattedDate = value.evcal_start_date + " - " + value.evcal_end_date;
                }
            });
        }
    });

    
    /*
    myApp.controller('myCTRL', ['$scope', function($scope) {

        var eventi;

        $.ajaxSetup({async: false});

        $.post("http://incaneva.it/wp-admin/admin-ajax.php",
            {
                action: 'incaneva_events',
                blog: '1,6,7,8', limit: 10, old: false
            },
            function(result){
                eventi = result.data;
            },
            'json');

        $scope.eventi = eventi;
        
        $scope.eventi.forEach(function (x){
            if(x.evcal_end_date == ""){
                x.formattedDate = x.evcal_start_date;
            }else{
                x.formattedDate = x.evcal_start_date + " - " + x.evcal_end_date;
            }
        });   

        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });

    }]);
    */

})();