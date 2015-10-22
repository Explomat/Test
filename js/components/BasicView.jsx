var React = require('react');
var Config = require('../config');
//var MappingStore = require('../stores/MappingStore');
//var MappingActions = require('../actions/SectionActions');

function getHashRoot(hash){
	var isChainHash = hash.indexOf('/');
	return isChainHash === -1 ? hash.substring(1, hash.length) : hash.substring(1, isChainHash);
}

var BasicView = React.createClass({

	componentDidMount: function() {
		//MappingStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		//MappingStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		//this.setState(getMappingState());
	},

	render: function () {

		var curHash = getHashRoot(window.location.hash);
		var isActiveStructureClass = curHash === Config.hashes.structure.key ? 'menu-box__item_active' : '';
		var isActiveViewClass = curHash === Config.hashes.view.key ? 'menu-box__item_active' : '';
		var isActiveSettingsClass = curHash === Config.hashes.settings.key || (curHash !== Config.hashes.settings.key && curHash !== Config.hashes.view.key && curHash !== Config.hashes.structure.key) ? 'menu-box__item_active' : '';

		return (
			<div className="container tests">
				<div className="tests__header">
					<div className="tests__name">{this.props.sectionName}</div>
					<div className="menu-box">
						<div className={"menu-box__item " + isActiveSettingsClass}>
							<a href="#settings">
								<span className="glyphicon glyphicon-pencil menu-box__item_img">
							</span></a>
						</div>
						<div className={"menu-box__item " + isActiveStructureClass}>
							<a href="#structure">
								<span className="glyphicon glyphicon-list menu-box__item_img">
							</span></a>
						</div>
						<div className={"menu-box__item " + isActiveViewClass}>
							<a href="#view">
								<span className="glyphicon glyphicon-check menu-box__item_img"></span>
							</a>
						</div>
					</div>
				</div>
			    <div id={Config.dom.appId} className="tests__body"></div>
			</div>
		);
	}
});

module.exports = BasicView;