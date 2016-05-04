storeLocator.factory("loginManager", function($http) {

	var login_manager = {};

	login_manager.login = function(email, password, completionHandler) {

		var _email = email;
		var _password = (CryptoJS.SHA512(password).toString(CryptoJS.enc.Base64)||"");

		$http.post("http://its-bitrace.herokuapp.com/api/public/v2/login", {
			email: _email,
			password: _password
		}).success(function(result){
			if(result.success) {
                completionHandler(null, (result.data || []));
            }
			else {
                completionHandler(true);
            }
		})
		.error(function(result) {
				completionHandler(true);
			})
	};
	return login_manager;
});