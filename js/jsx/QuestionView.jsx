var React = require('react');
var QuestionStore = require('../Controllers/startController/stores/QuestionStore');
var AnswersStore = require('../Controllers/startController/stores/AnswersStore');
var QuestionActions = require('../Controllers/startController/actions/QuestionActions');
var AnswerActions = require('../Controllers/startController/actions/AnswerActions');
var QuestionTypes = require('../Controllers/startController/utils/QuestionTypes');
var Answer = require('./AnswersView');
var Txt = require('./Components/Text');
var ImageSelect = require('./Components/ImageSelect');

function getQuestionState() {
	return {
		title: QuestionStore.getTitle(),
		text: QuestionStore.getText(),
		answers: AnswersStore.getAnswers(),
		isDisplayTypes: QuestionStore.isDisplayTypes(),
		type: QuestionStore.getTypeSelected()
	};
}

var Menu = React.createClass({

	handleClick:function() {
		AnswerActions.addAnswer();
	},

	render:function() {
		return (
			<div className="pull-right">
				<button type="button" className="btn btn-default btn-sm" onClick={this.handleClick}>
					<span className="glyphicon glyphicon-plus"></span>
					<span>&nbsp;Добавить ответ</span>
				</button>
			</div>
		);
	}
});

var Title = React.createClass({

	handleChange:function(val) {
		QuestionActions.changeTitle(val);
	},

	render:function() {
		return (
			<div className="input-group all">
	            <span className="input-group-addon">Заголовок : *</span>
	            <Txt.TextView value={this.props.title} onBlur={this.handleChange} placeholder='Заголовок вопроса'/>
	        </div>
		);
	}
});

var QuestionImage = React.createClass({

	uploadImage: function(eventTarget) {
		QuestionActions.uploadImage(eventTarget);
	},

	removeImage: function (img) {
		QuestionActions.removeImage(img);
	},

	render:function() {
		return (
			<ImageSelect img={QuestionStore.getImg()} uploadImage={this.uploadImage} removeImage={this.removeImage}/>
		);
	}
});

var QuestionText = React.createClass({

	handleChange:function(val) {
		QuestionActions.changeText(val);
	},

	render:function() {
		return (
			<div className="form-group all">
				<label>Вопрос : *</label>
				<Txt.TextAreaView value={this.props.text} onBlur={this.handleChange} placeholder='Введите вопрос' />
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
			<li onClick={this.handleSelectType}>
				<span>{this.props.type}</span>
			</li>
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

	render: function() {
		var isTypeDisplayStyle = { display: QuestionStore.isDisplayTypes() ? "block" : "none" };
		var list = [];
		Object.keys(QuestionTypes.values).forEach(function(k, count){
			if (count % 2 == 0 && count != 0)
				list.push(<li key={"divider"+k + count} className="divider"></li>);
			list.push(<QuestionType key={k + count} id={k} type={QuestionTypes.values[k]} handleSelectType={this.handleSelectType}/>);
		}.bind(this));
		
		return (
			<div className="btn-group btn-group-sm">
				<button className="btn btn-default dropdown-toggle qtype-btn" type="button" onClick={this.handleDisplayTypes}>
					<span>{QuestionTypes.values[this.props.type]}&nbsp;&nbsp;</span>
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
		AnswersStore.addChangeListener(this._onChange);
	},

	componentWillUnmount:function() {
		QuestionStore.removeChangeListener(this._onChange);
		AnswersStore.addChangeListener(this._onChange);
	},

	_onChange:function() {
		this.setState(getQuestionState());
	},

	getInitialState: function () {
		return getQuestionState();
	},

	render:function () {
		var answers = [];
		var qType = QuestionStore.getTypeSelected();
		this.state.answers.forEach(function(ans, i){
			var answer = null;
			if (qType == QuestionTypes.keys.multiple_choice || qType == QuestionTypes.keys.multiple_response)
				answer = <Answer.ChoiceAnswer uuid={ans.uuid} key={ans.uuid} selected={ans.selected} number={i+1} text={ans.text} weight={ans.weight}/>;
			else if (qType == QuestionTypes.keys.order)
				answer = <Answer.OrderAnswer uuid={ans.uuid} key={ans.uuid} number={i+1} text={ans.text} weight={ans.weight}/>;
			else if (qType == QuestionTypes.keys.match_item)
				answer = <Answer.MatchItemAnswer uuid={ans.uuid} key={ans.uuid} number={i+1} text={ans.text} weight={ans.weight} height={ans.height} width={ans.width}/>;
			else if (qType == QuestionTypes.keys.numerical_fill_in_blank)
				answer = <Answer.NumericalFillAnswer uuid={ans.uuid} key={ans.uuid} number={i+1} text={ans.text} weight={ans.weight} height={ans.height} width={ans.width}/>;
			else if (qType == QuestionTypes.keys.gap_fill)
				answer = <Answer.ConformityAnswer uuid={ans.uuid} key={ans.uuid} number={i+1} text={ans.text} weight={ans.weight}/>;
			if (answer)
				answers.push(answer);
		});
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<Title title={this.state.title} />
					<QuestionImage />
			        <QuestionText text={this.state.text} />
			        <Menu />
			        <SelectQuestionType type={this.state.type}/>
				</div>
				<div className="panel-body answers">
			        {answers}
				</div>
			</div>
		);
	}
});

module.exports = QuestionView;