var React = require('react');
var Config = require('../config');
var MenuSimple = require('./modules/MenuSimple');
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

	_setHash: function(newHash){
		setTimeout(function(){
			this.setState({hash: getHashRoot('#' + newHash)});
		}.bind(this), this.delay);
	},

	handleMouseLeave: function(e){
		if (e.relatedTarget && e.relatedTarget !== this.refs.floatingList) {
			this.setState({show: false});
		}
	},

	handleListMouseLeave: function(e){
		if (e.relatedTarget && e.relatedTarget !== this.refs.floatingList) {
			this.setState({show: false});
		}
	},

	handleMouseEnter: function(e){
		this.setState({show: true});
	},

	render: function () {
		var c = { transform: this.state.show ? 'scaleY(1) scaleX(1) translateY(0px) translateX(0px)' : 'scaleY(0.4) scaleX(0.4) translateY(40px) translateX(0px)', opacity: this.state.show ? 1 : 0 };
		var floatingListClassName = this.state.show ? 'floating-list_active' : '';
		return (
			<div ref="tests" className="tests">
				<div className="tests__header">
					<MenuSimple defaultRoute={this.state.hash} routes={[{route: '#settings', iconClass: 'glyphicon glyphicon-cog'}, {route: '#structure', iconClass: 'glyphicon glyphicon-list'}, {route: '#view', iconClass: 'glyphicon glyphicon-ok'}]}/>
				</div>
				<div ref="floatingButton" className="floating-button-box">
					<div onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} className="floating-button">
						<i className="floating-button__icon fa fa-bars"></i>
					</div>
					<ul onMouseLeave={this.handleListMouseLeave} ref='floatingList' className={"floating-list " + floatingListClassName}>
						<li className="floating-list__item">
							<div style={c} title="Сохранить тест" className="item floating-button floating-button_small button button_blue">
								<span className="floating-button__icon glyphicon glyphicon-floppy-disk"></span>
							</div>
						</li>
						<li className="floating-list__item">
							<div style={c} title="Уведомить администратора" className="item floating-button floating-button_small button button_yellow">
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