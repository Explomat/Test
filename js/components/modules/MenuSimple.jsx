var React = require('react');

var MenuItem = React.createClass({

    handleChangeRoute: function(){
        if (this.props.changeRoute) {
            this.props.changeRoute(this.props.route);
        }
    },

    render: function(){
        var itemClass = this.props.isActive ? 'menu-simple__item_active': '';
        var buttonClass = this.props.isActive ? 'menu-simple__button-icon_active': '';
        return (
            <div style={{width: this.props.width + '%'}} className = {"menu-simple__item " + itemClass}>
                <a onClick={this.handleChangeRoute} className="menu-simple__button" href={this.props.route}>
                    <span className={"menu-simple__button-icon " + buttonClass + " " +this.props.iconClass}></span>
                </a>
            </div>
        );
    }
});

var MenuView = React.createClass({

    propTypes: {
        routes: React.PropTypes.array.isRequired, //[{route: '#settings', iconClass: 'glyphicon glyphicon-pencil'}, ...]
        defaultRoute: React.PropTypes.string
    }, 

    getItemWidth: function(){
        return 100 / this.props.routes.length;
    },

    handleChangeRoute: function(route){
        if (this.props.changeRoute) {
            this.props.changeRoute(route);
        }
    },

	render: function () {
        var itemWidth = this.getItemWidth();
		return (
            <div className="menu-simple">
				{this.props.routes.map(function(r, index){
					return <MenuItem key={index} {...r} width={itemWidth} isActive={this.props.defaultRoute === r.route} changeRoute={this.handleChangeRoute}/>;
				}.bind(this))}
            </div>
		);
	}
});

module.exports = MenuView;