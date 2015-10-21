var React = require('react');
var SettingsStore = require('../stores/SettingsStore');
var SettingsActions = require('../actions/SettingsActions');
var Txt = require('./modules/TextLabel');
var CheckBox = require('./modules/CheckBox');
var SettingsValidation = require('../utils/validation/SettingsValidation');
var SettingsKeys = require('../utils/SettingsKeys');

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

	handleBlurStatus: function(){
		if (this.state.isDisplayStatus) {
			this.setState({isDisplayStatus: false});
		}
	},

	handleToogleDisplayStatus: function(e){
		if (e){
			e.stopPropagation();
    		e.nativeEvent.stopImmediatePropagation();
		}
		this.setState({isDisplayStatus : !this.state.isDisplayStatus});
	},

	componentDidMount: function() {
		document.addEventListener('click', this.handleBlurStatus);
		SettingsStore.addChangeListener(this._onChange);
	},

	componentWillmount:function () {
		this.isMounted = false;
	},

	componentWillUnmount: function() {
		document.removeEventListener('click', this.handleBlurStatus);
		SettingsStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(getSettingsState());
	},

	getInitialState: function () {
		var sectionState = getSettingsState();
		sectionState.isDisplayStatus = false;
		return sectionState;
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

	handleChangeNotDisplayFeedback: function(val){
		SettingsActions.changeNotDisplayFeedback(val);
	},

	handleChangeDisplayResultReport: function(val){
		SettingsActions.changeDisplayResultReport(val);
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
		var isDisplayStatus = { display: this.state.isDisplayStatus ? 'block' : 'none' };
		return(
			<div className="panel panel-default tests__body-content">
				<div className="panel-body">
					<div className="row">
						<div className="col-lg-10 col-md-10 col-lg-offset-1 col-md-offset-1">
							<div className="group">
								<div className="group__elem">
									<div className="group__title"></div>
									<div className="group__content">
							            <Txt.TextView value={this.state.settings.title} onBlur={this.handleChangeTitle} placeholder='Название теста'/>
							            <Txt.TextView value={this.state.settings.passingScore} onBlur={this.handleChangePassingScore} isValid={SettingsValidation.isValidPassingScore} placeholder='Проходной балл'/>
							            <Txt.TextView value={this.state.settings.durationMinutes} onBlur={this.handleChangeDurationMinutes} isValid={SettingsValidation.isValidDuration} placeholder='Длительность в минутах'/>
							            <Txt.TextView value={this.state.settings.durationDays} onBlur={this.handleChangeDurationDays} isValid={SettingsValidation.isValidDuration} placeholder='Продолжительность в днях'/>
							        	<Txt.TextView value={this.state.settings.attemptsCount} onBlur={this.handleChangeAttemptsCount} isValid={SettingsValidation.isValidAttemptsCount} placeholder='Количество попыток'/>
							        	<div className="input-group all">
							        		<span className="input-group-addon">Статус</span>
											<button className="btn btn-default dropdown-toggle" type="button" onClick={this.handleToogleDisplayStatus}>
												<span>{SettingsKeys.status.values[this.state.settings.status]}&nbsp;&nbsp;</span>
												<span className="caret"></span>
											</button> 
											<ul className="dropdown-menu" style={isDisplayStatus}>
												{Object.keys(SettingsKeys.status.keys).map(function(s, index){
													return <SelectedUl key={index} handleSelect={this.handleChangeStatus} value={SettingsKeys.status.values[s]} type={s}/>
												}.bind(this))}
											</ul>
										</div>
									</div>
								</div>
								<div className="group__elem">
									<div className="group__title"></div>
									<div className="group__content">
										<CheckBox label={"Не передавать проигрывателю информацию о правильных ответах на вопросы"} checked={this.state.settings.notSentCorrectAnswer} onChangeChecked={this.handleChangeNotSentCorrectAnswer}/>
							        	<CheckBox label={"Показывать результаты теста (резюме по тесту)"} checked={this.state.settings.displayResult} onChangeChecked={this.handleChangeDisplayResult}/>
							        	<CheckBox label={"Не показывать сообщение об исчерпании попыток ответа"} checked={this.state.settings.notDisplayLastAttempt} onChangeChecked={this.handleChangeNotDisplayLastAttempt}/>
							        	<CheckBox label={"Не показывать в данном тесте сообщения обратной связи"} checked={this.state.settings.notDisplayFeedback} onChangeChecked={this.handleChangeNotDisplayFeedback}/>
							        	<CheckBox label={"Показывать отчет о результатах теста"} checked={this.state.settings.displayResultReport} onChangeChecked={this.handleChangeDisplayResultReport}/>
							        	
							        	<CheckBox label={"Показывать варианты ответов в отчете по тестированию"} checked={this.state.settings.displayAnswersInReport} onChangeChecked={this.handleChangeDisplayAnswersInReport}/>
							        	<CheckBox label={"Показывать правильный ответ в отчете по тестированию"} checked={this.state.settings.displayCorrectAnswerInReport} onChangeChecked={this.handleChangeDisplayCorrectAnswerInReport}/>
							        	<CheckBox label={"Не показывать набранных балл для незавершенных тестов"} checked={this.state.settings.notDisplayUnfinishedScore} onChangeChecked={this.handleChangeNotDisplayUnfinishedScore}/>
									</div>
								</div>
							</div>
					    </div>
				    </div>
				</div>
	        </div>
		);
	}
});

module.exports = SettingsView;