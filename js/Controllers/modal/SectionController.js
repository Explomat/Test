var React = require('react');
var Hasher = require('../../utils/Hasher');
var SectionActions = require('../../actions/SectionActions');
var SectionAPI = require('../../api/SectionAPI');
var SectionView = require('../../components/SectionView');
var Config = require('../../config');

module.exports = {

	start: function(sectionUuid) {
		var section = sectionUuid ? SectionAPI.getSection(sectionUuid) : SectionAPI.createSection();
		if (!section){
			Hasher.setHash('structure');
			return;
		}

		var app = document.getElementById(Config.dom.modalId) || document.body;
		React.unmountComponentAtNode(app);
		SectionActions.receiveSection(section);
		React.render(React.createElement(SectionView), app);
	}
}
