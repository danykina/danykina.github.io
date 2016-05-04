storeLocator.factory("storeManager", function($http) {

	var store_manager = {};

	store_manager.getAll = function(session, completionHandler) {

		$http.get("http://its-bitrace.herokuapp.com/api/v2/stores", {
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
	return store_manager;
});