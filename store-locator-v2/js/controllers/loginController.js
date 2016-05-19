storeLocator.controller('loginController', function($scope, $state, $cookies, $cookieStore, loginManager, sessionController, ngDialog){

    $scope.loginshow = false;
    $scope.submithide = true;
    //$scope.sessionescaduta = false;

    sessionController.check($cookies.getObject('session') ,function(err, result){
        if(!err){
            $state.go('list');
        } else {
            //$scope.sessionescaduta = true;
            console.log("sessione scaduta");
            $scope.loginshow = true;
        }
    });

    $scope.loginComplete = function(){
        
        $scope.loginwait = true;
        $scope.submithide = false;

        var error = false;

        loginManager.login($scope.email, $scope.password, function(err, result){
            if(err){
                error = true;
                $scope.submithide = true;
                $scope.loginwait = false;
            } else {
                var currentSession = result.session;
                if (currentSession) {
                    $cookies.putObject('session', currentSession);
                    $state.go('list');
                    $scope.loginwait = false;
                } else {
                    alert('Celato ha sputtanatao il back-end');
                }
            }
            if(error){
                ngDialog.open({ template: 'Il nome utente o la password potrebbero essere errati. <br> Prova a reinserirli o contatta la nostra assistenza', plain:true});
            }else{
                //register
            }
        })

    };

});