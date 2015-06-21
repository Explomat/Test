var React = require('react');
var QuestionStore = require('../Controllers/startController/stores/QuestionStore');
var QuestionActions = require('../Controllers/startController/actions/QuestionActions');
var QuestionTypes = require('../Controllers/startController/utils/QuestionTypes');
var ChoiceAnswer = require('./AnswersView').ChoiceAnswer;
var OrderAnswer = require('./AnswersView').OrderAnswer;
var MatchItemAnswer = require('./AnswersView').MatchItemAnswer;

function getQuestionState() {
	return {
		title: QuestionStore.getTitle(),
		text: QuestionStore.getText(),
		answers: QuestionStore.getAnswers(),
		isDisplayTypes: QuestionStore.isDisplayTypes(),
		type: QuestionStore.getTypeSelected()
	};
}

var Menu = React.createClass({

	handleClick:function() {
		QuestionActions.addAnswer();
	},

	render:function() {
		return (
			<div className="menu">
				<div>
					<button type="button" className="btn btn-default btn-xs" onClick={this.handleClick}>
						<span className="glyphicon glyphicon-plus"></span>
						<span>&nbsp;Добавить ответ</span>
					</button>
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
		Object.keys(QuestionTypes.values).forEach(function(k, count){
			if (count % 2 == 0 && count != 0)
				list.push(<li key={"divider"+k} className="divider"></li>);
			list.push(<QuestionType key={k} id={k} type={QuestionTypes.values[k]} handleSelectType={this.handleSelectType}/>);
		}.bind(this));
		
		return (
			<div className="btn-group">
				<button className="btn btn-default btn-xs dropdown-toggle qtype-btn" type="button" onClick={this.handleDisplayTypes}>
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
		var qType = QuestionStore.getTypeSelected();
		this.state.answers.forEach(function(ans, i){
			var answer = null;
			switch(qType) {
				case QuestionTypes.keys.multiple_choice:
				answer = <ChoiceAnswer uuid={ans.uuid} key={ans.uuid} selected={ans.selected} number={i+1} text={ans.text} weight={ans.weight}/>;
				break;
				case QuestionTypes.keys.multiple_response:
				answer = <ChoiceAnswer uuid={ans.uuid} key={ans.uuid} selected={ans.selected} number={i+1} text={ans.text} weight={ans.weight}/>;
				break;
				case QuestionTypes.keys.order:
				answer = <OrderAnswer uuid={ans.uuid} key={ans.uuid} selected={ans.selected} number={i+1} text={ans.text} weight={ans.weight}/>;
				break;
				case QuestionTypes.keys.match_item:
				answer = <MatchItemAnswer uuid={ans.uuid} key={ans.uuid} number={i+1} text={ans.text} weight={ans.weight} rowsCount={ans.rows} colsCount={ans.cols}/>;
				break;	
			}
			answers.push(answer);
		});
		return (
			<div className="panel panel-default">
				<div className="panel-body">
					<Title title={this.state.title} />
			        <QuestionText text={this.state.text} />
			        <Menu />
			        <SelectQuestionType type={this.state.type}/>
			        {answers}
				</div>
			</div>
		);
	}
});

module.exports = QuestionView;