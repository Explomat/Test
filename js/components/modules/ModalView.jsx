var React = require('react');
var UI = require('../../utils/UI');

var ModalBoxContent = React.createClass({

	propTypes: {
		children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.array]),
		className: React.PropTypes.string
	},

	getDefaultProps: function(){
		return {
			children: [],
			className: ''
		}
	},

	render: function(){
		return (
			<div className={"modal-box__content " + this.props.className}>
				{this.props.children}
			</div>
		);
	}
});

var ModalBoxHeader = React.createClass({

	propTypes: {
		children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.array]),
		className: React.PropTypes.string,
		onClose: React.PropTypes.func
	},

	contextTypes: {
        delay: React.PropTypes.number.isRequired,
        parent: React.PropTypes.any.isRequired,
        showParentScroll: React.PropTypes.func
    },

	getDefaultProps: function(){
		return {
			children: [],
			className: ''
		}
	},

	handleClose: function(){
		this.context.parent.refs.modalBox.classList.remove('modal-box_color_overlay');
		this.context.parent.refs.modal.classList.remove('modal-box__dialog_show');
		this.context.parent.refs.modal.classList.add('modal-box__dialog_close');
		setTimeout(function(){
			if (this.props.onClose) {
				this.props.onClose();
			}
		}.bind(this), this.context.delay);
		this.context.showParentScroll();
	},

	render: function(){
		return (
			<div className={"modal-box__header " + this.props.className}>
				<button type="button" className="close" onClick={this.handleClose}>&times;</button>
				{this.props.children}
			</div>
		);
	}
});

var ModalBoxBody = React.createClass({

	propTypes: {
		children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.array]),
		className: React.PropTypes.string
	},

	getDefaultProps: function(){
		return {
			children: [],
			className: ''
		}
	},

	render: function(){
		return (
			<div className={"modal-box__body clearfix" + this.props.className}>
				{this.props.children}
			</div>
		);
	}
});

var ModalBoxFooter = React.createClass({

	propTypes: {
		disabled: React.PropTypes.bool,
		children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.array]),
		className: React.PropTypes.string,
		onSave: React.PropTypes.func
	},

	contextTypes: {
        delay: React.PropTypes.number.isRequired,
        parent: React.PropTypes.any.isRequired,
        showParentScroll: React.PropTypes.func
    },

	getDefaultProps: function(){
		return {
			disabled: false,
			children: [],
			className: ''
		}
	},

	handleSave: function(){
		this.context.parent.refs.modalBox.classList.remove('modal-box_color_overlay');
		this.context.parent.refs.modal.classList.remove('modal-box__dialog_show');
		this.context.parent.refs.modal.classList.add('modal-box__dialog_close');
		setTimeout(function(){
			if (this.props.onSave) {
				this.props.onSave();
			}
		}.bind(this), this.context.delay);
		this.context.showParentScroll();
	},

	render: function(){
		return (
			<div className={"modal-box__footer " + this.props.className}>
				{this.props.children}
				<button type="button" className="btn btn-primary" onClick={this.handleSave} disabled={this.props.disabled}>Сохранить</button>
			</div>
		);
	}
});


var ModalBox = React.createClass({

	propTypes: {
		children: React.PropTypes.element,
		className: React.PropTypes.string,
    	positionX: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    	positionY: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    	scale: React.PropTypes.number,
    	delay: React.PropTypes.number
    },

    childContextTypes: {
		delay: React.PropTypes.number.isRequired,
		parent: React.PropTypes.any,
		showParentScroll: React.PropTypes.func
	},

    getDefaultProps: function(){
    	return {
    		children: [],
    		className: '',
    		positionX: 0,
    		positionY: 0,
    		scale: 0.05,
    		delay: 350
    	}
    },

    getChildContext: function() {
        return { 
        	delay: this.props.delay || 350,
        	parent: this,
        	showParentScroll: this.showParentScroll
        };
    },

    getInitialState: function () {
    	return {
    		isMounted: false
    	}
    },

    toggle: function() {
        this.setState({isMounted: !this.state.isMounted});
    },

    shift: function(){
    	var coordinates = UI.getElementCoordinates(this.refs.modal);
    	var shiftX = this.props.positionX - coordinates.positionX;
    	var shiftY = this.props.positionY - coordinates.positionY;
		var x = Number(shiftX);
		var y = Number(shiftY);
		this.refs.modal.style.transform = 'scale(' + this.props.scale +')';
		this.refs.modal.style.transformOrigin = x + 'px '+ this.props.positionY + 'px';
    	
		setTimeout(function(){
			this.refs.modalBox.classList.add('modal-box_color_overlay');
		}.bind(this), this.props.delay);
    },

    hideParentScroll: function(){
    	var _html = document.getElementsByTagName('html')[0]; 
    	var _body = document.getElementsByTagName('body')[0];
    	_html.style.overflowY = 'hidden';
    	_body.style.overflowY = 'hidden';
    },

    showParentScroll: function(){
    	var _html = document.getElementsByTagName('html')[0]; 
    	var _body = document.getElementsByTagName('body')[0];
    	_html.style.overflowY = 'auto';
    	_body.style.overflowY = 'auto';
    },

	componentDidMount: function() {
		this.shift();
		setTimeout(this.toggle, 0);
		this.hideParentScroll();
	},

	componentWillUnmount: function(){
		this.showParentScroll();
	},

	render: function(){
		var modalClasses = '';
        if (this.state.isMounted) {
            modalClasses = ' modal-box__dialog_show';
        }
		return (
			<div ref="modalBox" className={"modal-box " + this.props.className} style={{display: "block"}}>
				<div ref="modal" className={"modal-box__dialog modal-box__dialog_translate" + modalClasses}>
					{this.props.children}
				</div>
			</div>
		);
	}
});


module.exports = {
	ModalBox: ModalBox,
	ModalBoxContent: ModalBoxContent,
	ModalBoxHeader: ModalBoxHeader,
	ModalBoxBody: ModalBoxBody,
	ModalBoxFooter: ModalBoxFooter
}