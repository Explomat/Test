var React = require('React');

var quiestionTypes = {
	values:{
		'multiple_choice':'Единственный выбор',
		'multiple_response':'Множественный выбор',
		'order':'Ранжирование',
		'gap_fill':'Соответствие',
		'numerical_fill_in_blank':'Текстовый ввод',
		'match_item':'Цифровой ввод'
	},

	toArray:function() {
		return (Object.keys(this.values).map(function(key){
			var obj = {};
			Object.defineProperty(obj, key,{
				value: this.values[key],
				writable: true,
				enumerable: true,
				configurable: true
			});
	    	return obj;
	    }.bind(this)));
	}
};

var Menu = React.createClass({
	render:function() {
		return (
			<div className="menu all">
				<div>
					<button type="button" className="menu-item"><i className="fa fa-file-image-o fa-2x"></i></button>
					<span>Показывать картинки</span>
				</div>
				<div>
					<button type="button" className="menu-item"><i className="fa fa-cubes fa-2x"></i></button>
					<span>Показывать вес</span>
				</div>
			</div>
		);
	}
});

var Title = React.createClass({

	handleChange:function(e) {
		this.setState({title:e.target.value});
	},

	getInitialState:function() {
		return {
			title:this.props.title || ''
		}
	},

	render:function() {
		return (
			<div className="input-group all menu-float">
	            <span className="input-group-addon">Заголовок : *</span>
	            <input type="text" className="form-control" placeholder='Заголовок вопроса' value={this.state.title} onChane={this.handleChange}/>
	        </div>
		);
	}
});

var QuestionText = React.createClass({

	handleChange:function(e) {
		this.setState({qText:e.target.value});
	},

	getInitialState:function() {
		return {
			qText:this.props.qText || ''
		}
	},

	render:function() {
		return (
			<div className="form-group all menu-float">
				<label>Вопрос : *</label>
				<textarea className="form-control" rows="2" value={this.state.qText} onChange={this.handleChange}></textarea>
			</div>
		);
	}
});

var QuestionType = React.createClass({

	handleSelectType:function() {
		if (this.props.handleSelectType)
			this.props.handleSelectType(this.props.id);
	},

	render:function() {
		return (
			<li onClick={this.handleSelectType}><a href="#">{this.props.type}</a></li>
		);
	}
});

var SelectQuestionType = React.createClass({

	handleSelectType:function(key) {
		this.setState({qType:key});
		this.handleDisplayTypes();
	},

	handleBlurTypes:function() {
		//this.setState({isTypeDisplay:false});
	},

	handleDisplayTypes:function() {
		this.setState({isTypeDisplay:!this.state.isTypeDisplay});
	},

	getInitialState:function() {
		return {
			isTypeDisplay:false,
			qType:this.props.qType
		}
	},

	render:function() {
		console.log(this.state.qType);
		console.log(this.props.qType);
		var isTypeDisplayStyle = { display: this.state.isTypeDisplay ? "block":"none" };
		var list = [];
		var count = 0;
		Object.keys(quiestionTypes.values).forEach(function(k){
			if (count % 2 == 0 && count != 0)
				list.push(<li key={"divider"+k} className="divider"></li>);
			list.push(<QuestionType key={k} id={k} type={quiestionTypes.values[k]} handleSelectType={this.handleSelectType}/>);
			count++;
		}.bind(this));
		return (
			<div className="btn-group select-qtype" tabIndex="0">
				<button type="button" className="btn btn-default qtype-btn">
					{quiestionTypes.values[this.state.qType]}
				</button>
				<button type="button" className="btn btn-primary dropdown-toggle" onClick={this.handleDisplayTypes} onBlur={this.handleBlurTypes}>
					<span className="caret"></span>
				</button>
				<ul className="dropdown-menu" role="menu" style={isTypeDisplayStyle}>
					{list}
				</ul>
			</div>
		);
	}
});

var QuestionView = React.createClass({

	getDefaultProps:function() {
		return {
			title: 'A',
			qText: 'BB',
			qType: 'multiple_choice'
		}
	},

	render:function () {
		return (
			<div className="panel panel-default">
				<div className="panel-body">
					<Menu />
					<Title title={this.props.title}/>
			        <QuestionText qText={this.props.qText}/>
			        <SelectQuestionType qType={this.props.qType}/>
				</div>
			</div>
		);
	}
});

module.exports = QuestionView;