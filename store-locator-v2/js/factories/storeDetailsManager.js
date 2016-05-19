storeLocator.factory("storeDetailsManager", function($http) {

	var details_manager = {};

	details_manager.getByID = function(session, guid, completionHandler) {

		$http.get("http://its-bitrace.herokuapp.com/api/v2/stores/" + guid, {
			headers:{'x-bitrace-session': session}
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
	return details_manager;
});