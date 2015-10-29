var React = require('react');
var Config = require('../config');
var MenuView = require('./modules/MenuView');

function getHashRoot(hash){
	var isChainHash = hash.indexOf('/');
	return isChainHash === -1 ? hash : hash.substring(0, isChainHash);
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
		return (
			<div className="tests">
				<div className="tests__header">
					<MenuView defaultRoute={getHashRoot(window.location.hash)} routes={[{route: '#settings', title: 'Общие сведения'}, {route: '#structure', title: 'Структура'}, {route: '#view', title: 'Отображение'}]}/>
				</div>
			    <div id={Config.dom.appId} className="tests__body"></div>
			</div>
		);
	}
});

module.exports = BasicView;