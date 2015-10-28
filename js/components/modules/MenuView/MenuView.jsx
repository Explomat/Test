var React = require('react');

function transitionBorder(menuBoxeElem, tabBorderElem, curElem) {

    function getShift(menu, indexCurElem) {
        var width = 0;
        var elems = menuBoxeElem.querySelectorAll(".menu-box__item");
        for (var i = 0; i < indexCurElem; i++) {
            width += elems[i].offsetWidth;
        }
        return width;
    }

    function getElemsWidth(menu, indexCurElem, indexPrevElem) {
        indexPrevElem = indexPrevElem !== -1 ? indexPrevElem : indexCurElem;
        var width = 0;
        var i = indexCurElem >= indexPrevElem ? indexPrevElem : indexCurElem;
        var count = indexCurElem >= indexPrevElem ? indexCurElem : indexPrevElem;
        var elems = menuBoxeElem.querySelectorAll(".menu-box__item");
        for (i; i <= count; i++) {
            width += elems[i].offsetWidth;
        }
        return width;
    }

    if (!menuBoxeElem || !tabBorderElem || !curElem) return;
    var borderWidth = curElem.offsetWidth;
    var children = menuBoxeElem.children;
    if (!borderWidth || !children) return;

    var indexCurElem = Array.prototype.slice.call(children).indexOf(curElem);
    var indexPrevElem = Array.prototype.slice.call(children).indexOf(menuBoxeElem.querySelector('.menu-box__item_active'));
    var shift = getShift(menuBoxeElem, indexCurElem);
    tabBorderElem.style.width = getElemsWidth(menuBoxeElem, indexCurElem, indexPrevElem) + 'px'; //tabBorderElem.offsetWidth + borderWidth + 'px';
    if (indexCurElem < indexPrevElem) tabBorderElem.style.left = shift + 'px';

    tabBorderElem.classList.remove('menu-box__item_border_contract');
    tabBorderElem.classList.add('menu-box__item_border_expand');
    setTimeout(function(){
        tabBorderElem.classList.remove('menu-box__item_border_expand');
        tabBorderElem.classList.add('menu-box__item_border_contract');
        tabBorderElem.style.width = borderWidth + 'px';
        tabBorderElem.style.left = shift + 'px';
    }, 250);
    this.toggleClass(curElem, 'menu-box__item_active');
}

var MenuView = React.createClass({

	propTypes: {
		defaultRoute: React.PropTypes.string.isRequired,
		routes: React.PropTypes.array.isRequired, //[{route: '#settings', title: 'test'}, {...}, {..}]
		
	},

	componentWillMount: function() {
		//MappingStore.addChangeListener(this._onChange);
	},

	handleChangeHash: function(e){

	},

	render: function () {

		return (
			<div className="menu-box">
				{this.props.routes.map(function(r, index){
					return (
						<div key={index} className="menu-box__item">
							<a onClick={this.handleChangeHash} className="menu-box__button" href={r.route}>{r.title}</a>
						</div>
					);
				}.bind(this))}
				<div className="menu-box__item_border"></div>
			</div>
		);
	}
});

module.exports = MenuView;