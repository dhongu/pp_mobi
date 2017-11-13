sap.ui.define(function() {
	"use strict";

	var BarCodeScanner = {

		handler: function(event) {
			var code = "";
			var timeStamp = 0;
			var timeout = null;

			if (timeStamp + 50 < new Date().getTime()) {
				code = "";
			}

			timeStamp = new Date().getTime();
			clearTimeout(timeout);

			if (event.which != 13) { // ignore returns
				code += String.fromCharCode(event.which);
			}
			timeout = setTimeout(function() {
				var focus = $(":focus");
				if (focus == undefined || focus.length === 0) {
					if (code.length >= 3) {
						this.callback(code);
					}
				} else {
					if (code.length >= 3) {
						if (focus[0].tagName != "INPUT") {
							event.target.value = event.target.value.replace(code, '');
						}
						this.callback(code);
					}
				}
				code = "";
			}, 100);
		},

		connect: function(callback) {
			this.callback = callback;
			$('body').on('keypress', this.handler);
		},

		element_is_editable: function(element) {
			return $(element).is('input,textarea,[contenteditable="true"]');
		},

		disconnect: function() {
			$('body').off('keypress', this.handler);
		}
	};

	return BarCodeScanner;

}, /* bExport= */ true);