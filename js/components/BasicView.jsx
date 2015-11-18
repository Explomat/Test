var React = require('react');
var Config = require('../config');
var MenuView = require('./modules/MenuView');
var UI = require('../utils/UI');
var MButtonClass = require('./modules/MButton').Class;
var extend = require('extend');

function getHashRoot(hash){
	var isChainHash = hash.indexOf('/');
	return isChainHash === -1 ? hash : hash.substring(0, isChainHash);
}

var BasicView = React.createClass(extend({}, MButtonClass, {

	componentDidMount: function() {
		window.addEventListener('scroll', this.handleScroll);
		//MappingStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		window.removeEventListener('scroll', this.handleScroll);
		//MappingStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		//this.setState(getMappingState());
	},

	handleScroll: function(e){
		var coordinates = UI.getElementCoordinates(this.refs.tests);
		if (coordinates.positionY <= 0){
			this.refs.headerFixed.classList.add('tests__header-fixed_stop');
		}
		else {
			this.refs.headerFixed.classList.remove('tests__header-fixed_stop');
		}
	},

	handleMenuChange: function(e){
		MButtonClass.handleMouseDown.call(this, e, this.refs.testsHeader);
	},

	render: function () {
		return (
			<div ref="tests" className="tests">
				<div ref="testsHeader" className={"tests__header " + this.baseBlockClassName}>
					<div ref="headerFixed" className="tests__header-fixed">
						<div className="tests__header-wrapper clearfix">
							<MenuView onChange={this.handleMenuChange} defaultRoute={getHashRoot(window.location.hash)} routes={[{route: '#settings', title: 'Общие сведения'}, {route: '#structure', title: 'Структура'}, {route: '#view', title: 'Отображение'}]}/>
						</div>
					</div>
				</div>
			    <div id={Config.dom.appId} className="tests__body"></div>
			</div>
		);
	}
}));

module.exports = BasicView;