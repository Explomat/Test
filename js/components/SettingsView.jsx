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

	render: function(){
		var isDisplayStatus = { display: this.state.isDisplayStatus ? 'block' : 'none' };
		return(
			<div className="panel panel-default">
				<div className="panel-body">
					<div className="row">
						<div className="col-lg-6 col-md-6 col-lg-offset-3 col-md-offset-3">
							<div className="group">
								<div className="group__elem">
									<div className="group__title"></div>
									<div className="group__content">
							            <Txt.TextView value={this.state.settings.title} onBlur={this.handleChangeTitle} placeholder='Название теста'/>
							            <Txt.TextView value={this.state.settings.passingScore} onBlur={this.handleChangePassingScore} isValid={SettingsValidation.isValidPassingScore} placeholder='Проходной балл'/>
							            <Txt.TextView value={this.state.settings.durationMinutes} onBlur={this.handleChangeDuration} isValid={SettingsValidation.isValidDuration} placeholder='Длительность в минутах'/>
							            <Txt.TextView value={this.state.settings.durationDays} onBlur={this.handleChangeDuration} isValid={SettingsValidation.isValidDuration} placeholder='Продолжительность в днях'/>
							        	<Txt.TextView value={this.state.settings.attemptsCount} onBlur={this.handleAttemptsCount} isValid={SettingsValidation.isValidAttemptsCount} placeholder='Количество попыток'/>
							        	<div className="input-group all">
							        		<span className="input-group-addon">Статус</span>
											<button className="btn btn-default dropdown-toggle" type="button" onClick={this.handleToogleDisplayStatus}>
												<span>{SettingsKeys.status.values[this.state.settings.status]}&nbsp;&nbsp;</span>
												<span className="caret"></span>
											</button> 
											<ul className="dropdown-menu" style={isDisplayStatus}>
												{Object.keys(SettingsKeys.status.keys).map(function(s, index){
													return <SelectedUl key={index} handleSelect={this.handleSelectStatus} value={SettingsKeys.status.values[s]} type={s}/>
												}.bind(this))}
											</ul>
										</div>
									</div>
								</div>
								<div className="group__elem">
									<div className="group__title"></div>
									<div className="group__content">
										<CheckBox label={"Не передавать проигрывателю информацию о правильных ответах на вопросы"} checked={this.state.settings.notSentCorrectAnswer} />
							        	<CheckBox label={"Показывать результаты теста (резюме по тесту)"} checked={this.state.settings.displayResult} />
							        	<CheckBox label={"Не показывать сообщение об исчерпании попыток ответа"} checked={this.state.settings.notDisplayLastAttempt} />
							        	<CheckBox label={"Не показывать в данном тесте сообщения обратной связи"} checked={this.state.settings.notDisplayFeedback} />
							        	<CheckBox label={"Показывать отчет о результатах теста"} checked={this.state.settings.displayResultReport} />
							        	
							        	<CheckBox label={"Показывать варианты ответов в отчете по тестированию"} checked={this.state.settings.displayAnswersInReport} />
							        	<CheckBox label={"Показывать правильный ответ в отчете по тестированию"} checked={this.state.settings.displayCorrectAnswerInReport} />
							        	<CheckBox label={"Не показывать набранных балл для незавершенных тестов"} checked={this.state.settings.notDisplayUnfinishedScore} />
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