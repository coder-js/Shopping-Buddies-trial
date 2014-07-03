var ActivityIndicator = {
    show: function (text) {
    	text = text || "Please wait...";
    	if(window.cordova) {
        	cordova.exec(null, null, "ActivityIndicator", "show", [text]);
    	}
    },
    hide: function () {
        if(window.cordova) {
        	cordova.exec(null, null, "ActivityIndicator", "hide", []);
    	}	
    }
};

module.exports = ActivityIndicator;