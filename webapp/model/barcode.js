sap.ui.define(function() {
  "use strict";

  var BarCodeScanner = {

    connect: function(callback) {
      var code = "";
      var timeStamp = 0;
      var timeout = null;

      this.handler = function(event) {
        if (timeStamp + 150 < new Date().getTime()) {
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
              callback(code);
            }
            }
          else {
            if (code.length >= 3) {
              if (focus[0].tagName == "INPUT") {
              	if (focus[0].name != 'Input_lot') {
                	event.target.value = event.target.value.replace(code,'');
              	}
              }
              else {
            	callback(code);
              }
            }

          }

          code = "";
        }, 151);
      };

      $('body').on('keypress', this.handler);

    },
    disconnect: function() {
      $('body').off('keypress', this.handler);
    }
  };

  return BarCodeScanner;

}, /* bExport= */ true);