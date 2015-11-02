var React = require('react');

var ModalBoxContent = React.createClass({

	propTypes: {
		children: React.PropTypes.array
	},

	getDefaultProps: function(){
		return {
			children: []
		}
	},

	render: function(){
		<div className="modal-box__content">
			{this.props.children}
		</div>
	}
});

var ModalBoxHeader = React.createClass({

	propTypes: {
		children: React.PropTypes.array
	},

	getDefaultProps: function(){
		return {
			children: []
		}
	},

	render: function(){
		<div className="modal-box__header">
			{this.props.children}
		</div>
	}
});

var ModalBoxBody = React.createClass({

	propTypes: {
		children: React.PropTypes.array
	},

	getDefaultProps: function(){
		return {
			children: []
		}
	},

	render: function(){
		<div className="modal-box__body">
			{this.props.children}
		</div>
	}
});

var ModalBoxFooter = React.createClass({

	propTypes: {
		children: React.PropTypes.array
	},

	getDefaultProps: function(){
		return {
			children: []
		}
	},

	render: function(){
		<div className="modal-box__footer">
			{this.props.children}
		</div>
	}
});


var ModalBox = {

	propTypes: {
		children: React.PropTypes.array,
    	postionX: React.PropTypes.number,
    	postionY: React.PropTypes.number,
    	scale: React.PropTypes.number,
    	delay: React.PropTypes.number
    },

    getDefaultProps: function(){
    	return {
    		children: [],
    		positionX: 0,
    		positionY: 0,
    		scale: 0.05,
    		delay: 350
    	}
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

    handleClose: function(){
		this.refs.modalBox.classList.remove('modal-box_color_overlay');
		this.refs.modal.classList.remove('modal-box__dialog_show');
		this.refs.modal.classList.add('modal-box__dialog_close');
		setTimeout(function(){
			SectionStore.removeChangeListener(this._onChange);
			Hasher.setHash('structure/false');
		}.bind(this), this.props.delay);
	},

	componentDidMount: function() {
		this.shift();
		setTimeout(this.toggle, 0);
	},

	render: function(){
		var classes = '';
        if (this.state.isMounted) {
            classes = ' modal-box__dialog_show';
        }
		return (
			<div ref="modalBox" className="modal-box" style={{display: "block"}}>
				<div ref="modal" className={"modal-box__dialog modal-box__dialog_translate" + classes}>
					{this.props.children}
				</div>
			</div>
		)
	}
}


module.exports = {
	ModalBox: React.createClass(ModalBox),
	ModalBoxContent: ModalBoxContent,
	ModalBoxHeader: ModalBoxHeader,
	ModalBoxBody: ModalBoxBody,
	ModalBoxFooter: ModalBoxFooter
}

module.exports.Class = ModalBox;