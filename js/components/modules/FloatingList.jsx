var React = require('react');

var FloatingList = React.createClass({

	propTypes: {
		rootHeight: React.PropTypes.number.isRequired,
		scrollHeight: React.PropTypes.number.isRequired,
	}

	getInitialState: function(){
		return {
			show: false
		}
	},

	componentDidMount: function() {
		window.addEventListener('scroll', this.handleScroll);
		setTimeout(this._positionFloatingButton, 0);
	},
 
	componentWillUnmount: function() {
		window.removeEventListener('scroll', this.handleScroll);
	},

	_positionFloatingButton: function(){
		var btn = this.refs.floatingButton;
		var documentHeight = document.documentElement.clientHeight;

		if (this.props.rootHeight > documentHeight){
			var hiddentTestsHeight = this.props.rootHeight - documentHeight;
			var visibleTestsHeight = this.props.rootHeight - hiddentTestsHeight;
			btn.style.top = (visibleTestsHeight - btn.offsetHeight - this.props.scrollHeight) + 'px';
		}
		else btn.style.top = null;
	},

	handleScroll: function(e){
		this._positionFloatingButton();
	},

	handleToogleClick: function(e){
		this.setState({show: !this.state.show});
	},

	render: function () {
		var c = { transform: 'scaleY(0.4) scaleX(0.4) translateY(40px) translateX(0px)', opacity: this.state.show ? 1 : 0 };
		var floatingListClassName = this.state.show ? 'floating-list_active' : '';
		return (
			<div ref="floatingButton" className="floating-button-box">
				<div onClick={this.handleToogleClick} title="Сохранить тест" className="floating-button">
					<span className="floating-button__icon glyphicon glyphicon-floppy-disk"></span>
				</div>
				<ul className={"floating-list " + floatingListClassName}>
					<li style={c}>
						<div title="Сохранить тест" className="floating-button">
							<span className="floating-button__icon glyphicon glyphicon-floppy-disk"></span>
						</div>
					</li>
					<li style={c}>
						<div title="Сохранить тест" className="floating-button">
							<span className="floating-button__icon glyphicon glyphicon-floppy-disk"></span>
						</div>
					</li>
				</ul>
			</div>
		);
	}
});

module.exports = BasicView;