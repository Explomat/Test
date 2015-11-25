var React = require('react');
var SettingsStore = require('../stores/SettingsStore');
var SettingsActions = require('../actions/SettingsActions');
var Txt = require('./modules/TextLabel');
var ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var CheckBox = require('./modules/CheckBox');
var QuestionTooltipField = require('./modules/tooltip/QuestionTooltipField');
var SettingsValidation = require('../utils/validation/SettingsValidation');

function getSettingsState() {
	return {
		settings: SettingsStore.getSettings()
	}
}

var SelectedUl = React.createClass({

	handleSelect: function(){
		if (this.props.handleSelect) {
			this.props.handleSelect(this.props.type);
		}
	},

	render: function() {
		return (
			<li onClick={this.handleSelect}><span>{this.props.value}</span></li>
		);
	}
});

var SettingsView= React.createClass({

	toggle: function() {
        this.setState({isMounted: !this.state.isMounted});
    },

	componentDidMount: function() {
		SettingsStore.addChangeListener(this._onChange);
		setTimeout(this.toggle, 0);
	},

	componentWillUnmount: function() {
		SettingsStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(getSettingsState());
	},

	getInitialState: function () {
		var settingsState = getSettingsState();
		settingsState.isMounted = false;
		return settingsState;
	},

	handleChangeTitle: function(title){
		SettingsActions.changeTitle(title);
	},

	handleChangePassingScore: function(passingScore){
		SettingsActions.changePassingScore(passingScore);
	},

	handleChangeDurationMinutes: function(durationMinutes){
		SettingsActions.changeDurationMinutes(durationMinutes);
	},

	handleChangeDurationDays: function(durationDays) {
		SettingsActions.changeDurationDays(durationDays);
	},

	handleChangeAttemptsCount: function(attemptsCount) {
		SettingsActions.changeAttemptsCount(attemptsCount);
	},

	handleChangeStatus: function(status){
		SettingsActions.changeStatus(status);
	},

	handleChangeNotSentCorrectAnswer: function(val){
		SettingsActions.changeNotSentCorrectAnswer(val);
	},

	handleChangeDisplayResult: function(val){
		SettingsActions.changeDisplayResult(val);
	},

	handleChangeNotDisplayLastAttempt: function(val){
		SettingsActions.changeNotDisplayLastAttempt(val);
	},

	handleChangeDisplayAnswersInReport: function(val){
		SettingsActions.changeDisplayAnswersInReport(val);
	},

	handleChangeDisplayCorrectAnswerInReport: function(val){
		SettingsActions.changeDisplayCorrectAnswerInReport(val);
	},

	handleChangeNotDisplayUnfinishedScore: function(val){
		SettingsActions.changeNotDisplayUnfinishedScore(val);
	},

	render: function(){
		var classes = '';
        if (this.state.isMounted) {
            classes = ' tests__body-content_show';
        }
		return(
			<div className={"tests__body-content tests__body-content_translate" + classes}>
				<div className="group">
					<div className="group__elem">
						<div className="group__content">
				            <Txt.TextView value={this.state.settings.title} onBlur={this.handleChangeTitle} placeholder='Название теста'/>
				            <Txt.TextView value={this.state.settings.passingScore} onBlur={this.handleChangePassingScore} isValid={SettingsValidation.isValidPassingScore} placeholder='Проходной балл'/>
				            <Txt.TextView value={this.state.settings.durationMinutes} onBlur={this.handleChangeDurationMinutes} isValid={SettingsValidation.isValidDuration} placeholder='Длительность в минутах'/>
				            <Txt.TextView value={this.state.settings.durationDays} onBlur={this.handleChangeDurationDays} isValid={SettingsValidation.isValidDuration} placeholder='Продолжительность в днях'/>
				        	<Txt.TextView value={this.state.settings.attemptsCount} onBlur={this.handleChangeAttemptsCount} isValid={SettingsValidation.isValidAttemptsCount} placeholder='Количество попыток'/>
						</div>
					</div>
					<div className="group__elem">
						<div className="group__content">
							<QuestionTooltipField.QuestionTooltipFieldRight text={"Порядок следования вопросов"}>
								<CheckBox label={"Не передавать проигрывателю информацию о правильных ответах на вопросы"} checked={this.state.settings.notSentCorrectAnswer} onChangeChecked={this.handleChangeNotSentCorrectAnswer}/>
							</QuestionTooltipField.QuestionTooltipFieldRight>
							<QuestionTooltipField.QuestionTooltipFieldRight text={"Порядок следования вопросов"}>
								<CheckBox label={"Показывать результаты теста (резюме по тесту)"} checked={this.state.settings.displayResult} onChangeChecked={this.handleChangeDisplayResult}/>
				        	</QuestionTooltipField.QuestionTooltipFieldRight>
				        	<QuestionTooltipField.QuestionTooltipFieldRight text={"Порядок следования вопросов"}>
				        		<CheckBox label={"Не показывать сообщение об исчерпании попыток ответа"} checked={this.state.settings.notDisplayLastAttempt} onChangeChecked={this.handleChangeNotDisplayLastAttempt}/>
							</QuestionTooltipField.QuestionTooltipFieldRight>
						</div>
					</div>
					<div className="group__elem">
						<div className="group__content">
							<QuestionTooltipField.QuestionTooltipFieldRight text={"Порядок следования вопросов"}>
				        		<CheckBox label={"Показывать варианты ответов в отчете по тестированию"} checked={this.state.settings.displayAnswersInReport} onChangeChecked={this.handleChangeDisplayAnswersInReport}/>
				        	</QuestionTooltipField.QuestionTooltipFieldRight>
				        	<QuestionTooltipField.QuestionTooltipFieldRight text={"Порядок следования вопросов"}>
				        		<CheckBox label={"Показывать правильный ответ в отчете по тестированию"} checked={this.state.settings.displayCorrectAnswerInReport} onChangeChecked={this.handleChangeDisplayCorrectAnswerInReport}/>
				        	</QuestionTooltipField.QuestionTooltipFieldRight>
				        	<QuestionTooltipField.QuestionTooltipFieldRight text={"Порядок следования вопросов"}>
				        		<CheckBox label={"Не показывать набранных балл для незавершенных тестов"} checked={this.state.settings.notDisplayUnfinishedScore} onChangeChecked={this.handleChangeNotDisplayUnfinishedScore}/>
							</QuestionTooltipField.QuestionTooltipFieldRight>
						</div>
					</div>
				</div>
	        </div>
		);
	}
});

module.exports = SettingsView;