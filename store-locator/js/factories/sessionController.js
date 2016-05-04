storeLocator.factory("sessionController", function($http) {

	var session_controller = {};

	session_controller.check = function(session, completionHandler) {

		$http.get("http://its-bitrace.herokuapp.com/api/v2/stores", {
			headers:{'x-bitrace-session': session}
		}).success(function(result){
			if(result.success) {
                completionHandler(null, true);
            }
			else {
                completionHandler(true);
            }
		})
		.error(function(result) {
				completionHandler(true);
			})
	};
	return session_controller;
});