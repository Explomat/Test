var React = require('react');
var Config = require('../config');
var MenuView = require('./modules/MenuView');
var UI = require('../utils/UI');
var Hasher = require('../utils/Hasher');

function getHashRoot(hash){
	var isChainHash = hash.indexOf('/');
	return isChainHash === -1 ? hash : hash.substring(0, isChainHash);
}

var BasicView = React.createClass({

	getInitialState: function(){
		return {
			hash: getHashRoot(window.location.hash),
			show: false
		}
	},

	componentWillMount: function(){
		this.delay = 250;
		Hasher.changed.add(this._setHash);
	},

	componentDidMount: function() {
		window.addEventListener('scroll', this.handleScroll);
		setTimeout(this._positionFloatingButton, 0);
		this.appTop = this.refs.tests.getBoundingClientRect().top;
	},
 
	componentWillUnmount: function() {
		window.removeEventListener('scroll', this.handleScroll);
	},

	_setHash: function(newHash){
		setTimeout(function(){
			this.setState({hash: getHashRoot('#' + newHash)});
		}.bind(this), this.delay);
		window.scrollTo(0, this.appTop);
		this._positionFloatingButton();
	},

	_positionFloatingButton: function(){
		var btn = this.refs.floatingButton;
		var documentHeight = document.documentElement.clientHeight;
		var testsHeight = this.refs.tests.clientHeight;
		var scrollTop = this.refs.testsBody.getBoundingClientRect().top;

		if (testsHeight > documentHeight){
			var hiddentTestsHeight = testsHeight - documentHeight;
			var visibleTestsHeight = testsHeight - hiddentTestsHeight;
			btn.style.top = (visibleTestsHeight - btn.offsetHeight - scrollTop) + 'px';
		}
		else btn.style.top = null;
	},

	handleScroll: function(e){
		var coordinates = UI.getElementCoordinates(this.refs.tests);
		if (coordinates.positionY <= 0) this.refs.headerFixed.classList.add('tests__header-fixed_stop');
		else this.refs.headerFixed.classList.remove('tests__header-fixed_stop');

		this._positionFloatingButton();
	},

	handleClick: function(){
		this.setState({show: !this.state.show});
	},

	render: function () {
		var c = { transform: this.state.show ? 'scaleY(1) scaleX(1) translateY(0px) translateX(0px)' : 'scaleY(0.4) scaleX(0.4) translateY(40px) translateX(0px)', opacity: this.state.show ? 1 : 0 };
		var floatingListClassName = this.state.show ? 'floating-list_active' : '';
		return (
			<div ref="tests" className="tests">
				<div className="tests__header">
					<div ref="headerFixed" className="tests__header-fixed">
						<div className="tests__header-wrapper clearfix">
							<MenuView delay={this.delay} defaultRoute={this.state.hash} routes={[{route: '#settings', title: 'Общие сведения'}, {route: '#structure', title: 'Структура'}, {route: '#view', title: 'Отображение'}]}/>
						</div>
					</div>
				</div>
				<div ref="floatingButton" className="floating-button-box">
					<div onClick={this.handleClick} className="floating-button">
						<i className="floating-button__icon fa fa-bars"></i>
					</div>
					<ul ref='floatingList' className={"floating-list " + floatingListClassName}>
						<li className="floating-list__item">
							<div style={c} title="Уведомить администратора" className="item floating-button floating-button_small button button_blue">
								<span className="floating-button__icon glyphicon glyphicon-floppy-disk"></span>
							</div>
						</li>
						<li className="floating-list__item">
							<div style={c} title="Сохранить тест" className="item floating-button floating-button_small button button_yellow">
								<span className="floating-button__icon glyphicon glyphicon-send"></span>
							</div>
						</li>
					</ul>
				</div>
			    <div ref="testsBody" id={Config.dom.appId} className="tests__body"></div>
			</div>
		);
	}
});

module.exports = BasicView;