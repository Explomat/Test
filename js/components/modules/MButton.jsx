var React = require('react');

var MButton = {

	propTypes: {
	    value: React.PropTypes.string,
        onClick: React.PropTypes.func
  	},

    baseButtonClassName: 'waves-effect waves-button waves-float',
    baseBlockClassName: 'waves-effect waves-float',

  	getDefaultProps: function () {
		return {
			value: 'Кнопка',
			duration: 750,
			delay: 200
		};
	},

    getInitialState: function () {
        return {
            value: this.props.value
        }   
    },

	componentWillReceiveProps: function (nextProps) {
		this.setState({value : nextProps.value});
	},

	handleMouseDown: function (e, _element) {
		var element = _element || e.target || e.srcElement;
		this.show(e, element);
        this.hide(e);
		//element.addEventListener("mouseup", this.hide);
		//element.addEventListener("mouseleave", this.hide);
	},

	isWindow: function (obj) {
        return obj !== null && obj === obj.window;
    },

    getWindow: function (elem) {
        return this.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    },

    convertStyle: function (styleObj) {
        var style = '';

        for (var prop in styleObj) {
            if (styleObj.hasOwnProperty(prop)) {
                style += (prop + ':' + styleObj[prop] + ';');
            }
        }

        return style;
    },

	offset: function (elem) {
        var docElem, win,
            box = { top: 0, left: 0 },
            doc = elem && elem.ownerDocument;

        docElem = doc.documentElement;

        if (typeof elem.getBoundingClientRect !== typeof undefined) {
            box = elem.getBoundingClientRect();
        }
        win = this.getWindow(doc);
        return {
            top: box.top + win.pageYOffset - docElem.clientTop,
            left: box.left + win.pageXOffset - docElem.clientLeft
        };
    },

    hide: function(e) {
        var element = e.target || e.srcElement;
        var ripples = element.getElementsByClassName('waves-rippling');
        for (var i = 0, len = ripples.length; i < len; i++) {
            this.removeRipple(e, element, ripples[i]);
        }
    },

	show: function (e, element, velocity) {
		if (e.button === 2) {
            return false;
        }

        element = element || this;

        // Create ripple
        var ripple = document.createElement('div');
        ripple.className = 'waves-ripple waves-rippling';
        element.appendChild(ripple);

        // Get click coordinate and element width
        var pos = this.offset(element);
        var relativeY = 0;
        var relativeX = 0;
        // Support for touch devices
        if('touches' in e && e.touches.length) {
            relativeY   = (e.touches[0].pageY - pos.top);
            relativeX   = (e.touches[0].pageX - pos.left);
        }
        //Normal case
        else {
            relativeY = (e.pageY - pos.top);
            relativeX = (e.pageX - pos.left);
        }
        // Support for synthetic events
        relativeX = relativeX >= 0 ? relativeX : 0;
        relativeY = relativeY >= 0 ? relativeY : 0;

        var scale     = 'scale(36)';//'scale(' + ((element.clientWidth / 100) * 3) + ')';
        var translate = 'translate(0,0)';

        if (velocity) {
            translate = 'translate(' + (velocity.x) + 'px, ' + (velocity.y) + 'px)';
        }

        // Attach data to element
        ripple.setAttribute('data-hold', Date.now());
        ripple.setAttribute('data-x', relativeX);
        ripple.setAttribute('data-y', relativeY);
        ripple.setAttribute('data-scale', scale);
        ripple.setAttribute('data-translate', translate);

        // Set ripple position
        var rippleStyle = {
            top: relativeY + 'px',
            left: relativeX + 'px'
        };

        ripple.classList.add('waves-notransition');
        ripple.setAttribute('style', this.convertStyle(rippleStyle));
        ripple.classList.remove('waves-notransition');

        // Scale the ripple
        rippleStyle['-webkit-transform'] = scale + ' ' + translate;
        rippleStyle['-moz-transform'] = scale + ' ' + translate;
        rippleStyle['-ms-transform'] = scale + ' ' + translate;
        rippleStyle['-o-transform'] = scale + ' ' + translate;
        rippleStyle.transform = scale + ' ' + translate;
        rippleStyle.opacity = '1';

        var duration = e.type === 'mousemove' ? 2500 : this.props.duration;
        rippleStyle['-webkit-transition-duration'] = duration + 'ms';
        rippleStyle['-moz-transition-duration']    = duration + 'ms';
        rippleStyle['-o-transition-duration']      = duration + 'ms';
        rippleStyle['transition-duration']         = duration + 'ms';

        ripple.setAttribute('style', this.convertStyle(rippleStyle));
	},

	removeRipple: function (e, el, ripple) {

        // Check if the ripple still exist
        if (!ripple) {
            return;
        }

        ripple.classList.remove('waves-rippling');

        var relativeX = ripple.getAttribute('data-x');
        var relativeY = ripple.getAttribute('data-y');
        var scale = ripple.getAttribute('data-scale');
        var translate = ripple.getAttribute('data-translate');

        // Get delay beetween mousedown and mouse leave
        var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
        var delay = 350 - diff;

        if (delay < 0) {
            delay = 0;
        }

        if (e.type === 'mousemove') {
            delay = 150;
        }

        // Fade out ripple after delay
        var duration = e.type === 'mousemove' ? 2500 : this.props.duration;

        setTimeout(function() {

            var style = {
                top: relativeY + 'px',
                left: relativeX + 'px',
                opacity: '0',

                // Duration
                '-webkit-transition-duration': duration + 'ms',
                '-moz-transition-duration': duration + 'ms',
                '-o-transition-duration': duration + 'ms',
                'transition-duration': duration + 'ms',
                '-webkit-transform': scale + ' ' + translate,
                '-moz-transform': scale + ' ' + translate,
                '-ms-transform': scale + ' ' + translate,
                '-o-transform': scale + ' ' + translate,
                'transform': scale + ' ' + translate
            };

            ripple.setAttribute('style', this.convertStyle(style));

            setTimeout(function() {
                try {
                    el.removeChild(ripple);
                } catch (e) {
                    return false;
                }
            }.bind(this), this.props.duration);

        }.bind(this), this.props.delay);

		el.removeEventListener("mouseup", this.hide);
		el.removeEventListener("mouseleave", this.hide);
    },

	render: function () {
		return (
			<button title={this.state.value} className={this.baseClassName} onMouseDown={this.handleMouseDown} onClick={this.props.onClick}>
	           	{this.state.value}
	        </button>
		);
	}


};

module.exports = React.createClass(MButton);
module.exports.Class = MButton;

