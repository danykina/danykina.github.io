storeLocator.factory("sessionManager", function() {

	var session_manager = {};

	session_manager.setSession = function(session) {
		localStorage.setItem("currentSession", session);
	}

	session_manager.getSession = function(completionHandler) {
		var loaded_session = localStorage.getItem("currentSession");
		completionHandler(null, loaded_session);
	}

	return session_manager;
});