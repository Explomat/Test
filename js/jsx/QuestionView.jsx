var React = require('react');
var QuestionStore = require('../Controllers/startController/stores/QuestionStore');
var QuestionActions = require('../Controllers/startController/actions/QuestionActions');
var QuiestionTypes = require('../Controllers/startController/utils/QuestionTypes');
var ChoiceAnswer = require('./AnswersView').ChoiceAnswer;

function getQuestionState() {
	return {
		title: QuestionStore.getTitle(),
		text: QuestionStore.getText(),
		answers: QuestionStore.getAnswers(),
		imgVisible: QuestionStore.getImgVisible(),
		weightVisible: QuestionStore.getWeightVisible(),
		isDisplayTypes: QuestionStore.isDisplayTypes(),
		type: QuestionStore.getTypeSelected()
	};
}

var Menu = React.createClass({
	render:function() {
		return (
			<div className="menu all">
				<div>
					<button type="button" className="btn btn-default"><span className="glyphicon glyphicon-plus"></span></button>
					<span>Добавить ответ</span>
				</div>
			</div>
		);
	}
});

var Title = React.createClass({

	handleChange:function(e) {
		QuestionActions.changeTitle(e.target.value);
	},

	render:function() {
		return (
			<div className="input-group all menu-float">
	            <span className="input-group-addon">Заголовок : *</span>
	            <input type="text" className="form-control" placeholder='Заголовок вопроса' value={this.props.title} onChange={this.handleChange}/>
	        </div>
		);
	}
});

var QuestionText = React.createClass({

	handleChange:function(e) {
		QuestionActions.changeText(e.target.value);
	},

	render:function() {
		return (
			<div className="form-group all menu-float">
				<label>Вопрос : *</label>
				<textarea className="form-control" rows="2" value={this.props.text} onChange={this.handleChange}></textarea>
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

	componentWillUnmount: function() {
		document.removeEventListener('click', this.handleBlurTypes);
	},

	componentDidMount: function() {
		document.addEventListener('click', this.handleBlurTypes);
	},

	handleSelectType:function(key) {
		QuestionActions.selectType(key);
	},

	handleBlurTypes:function() {
		QuestionActions.displayTypes(false);
	},

	handleDisplayTypes:function(e) {
		e.stopPropagation();
    	e.nativeEvent.stopImmediatePropagation();
    	QuestionActions.displayTypes(!QuestionStore.isDisplayTypes());
	},

	render:function() {
		var isTypeDisplayStyle = { display: QuestionStore.isDisplayTypes() ? "block" : "none" };
		var list = [];
		Object.keys(QuiestionTypes.values).forEach(function(k, count){
			if (count % 2 == 0 && count != 0)
				list.push(<li key={"divider"+k} className="divider"></li>);
			list.push(<QuestionType key={k} id={k} type={QuiestionTypes.values[k]} handleSelectType={this.handleSelectType}/>);
		}.bind(this));
		
		return (
			<div className="btn-group">
				<button className="btn btn-default dropdown-toggle qtype-btn" type="button" onClick={this.handleDisplayTypes}>
					<span>{QuiestionTypes.values[this.props.type]}&nbsp;&nbsp;</span>
					<span className="caret"></span>
				</button>
				<ul className="dropdown-menu" style={isTypeDisplayStyle}>
					{list}
				</ul>
			</div>
		);
	}
});

var QuestionView = React.createClass({

	componentDidMount:function() {
		QuestionStore.addChangeListener(this._onChange);
	},

	componentWillUnmount:function() {
		QuestionStore.removeChangeListener(this._onChange);
	},

	_onChange:function() {
		this.setState(getQuestionState());
	},

	getInitialState: function () {
		return getQuestionState();
	},

	render:function () {
		var answers = [];
		this.state.answers.forEach(function(ans, i){
			answers.push(<ChoiceAnswer key={ans.uuid} selected={ans.selected} number={i+1} text={ans.text} weight={ans.weight}/>);
		});
		return (
			<div className="panel panel-default">
				<div className="panel-body">
					<Menu />
					<Title title={this.state.title} />
			        <QuestionText text={this.state.text} />
			        <SelectQuestionType type={this.state.type}/>
			        {answers}
				</div>
			</div>
		);
	}
});

module.exports = QuestionView;