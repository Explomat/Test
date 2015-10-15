var AppDispatcher = require('../dispatcher/AppDispatcher');
var SettingsConstants = require('../constants/SettingsConstants');

var SettingsActions = {

	receiveSettings: function(data) {
		AppDispatcher.handleAction({
			actionType: SettingsConstants.RECEIVE_SETTINGS_DATA,
			data: data
		});
	}
}

module.exports = SettingsActions;