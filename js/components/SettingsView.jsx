var React = require('react');
var SettingsStore = require('../stores/SettingsStore');
var SettingsActions = require('../actions/SettingsActions');
var Txt = require('./modules/Text');
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

			            <Txt.TextView value={this.state.settings.title} onBlur={this.handleChangeTitle} placeholder='Введите название теста'/>


			            <Txt.TextView value={this.state.settings.passingScore} onBlur={this.handleChangePassingScore} isValid={SettingsValidation.isValidPassingScore} placeholder='Введите проходной балл'/>


			            <Txt.TextView value={this.state.settings.durationMinutes} onBlur={this.handleChangeDuration} isValid={SettingsValidation.isValidDuration} placeholder='Введите длительность в минутах'/>


			            <Txt.TextView value={this.state.settings.durationDays} onBlur={this.handleChangeDuration} isValid={SettingsValidation.isValidDuration} placeholder='Введите продолжительность в днях'/>
		        	<Txt.TextView value={this.state.settings.attemptsCount} onBlur={this.handleAttemptsCount} isValid={SettingsValidation.isValidAttemptsCount} placeholder='Введите количество попыток'/>
		        	<div className="input-group col-lg-4 all">
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
					<div className="input-group all">
			            <span className="input-group-addon">
			            	<input type="checkbox" checked={this.state.settings.notSentCorrectAnswer}/>
			            </span>
			            <label className="form-control">Не передавать проигрывателю информацию о правильных ответах на вопросы</label>
		        	</div>
		        	<div className="input-group all">
			            <span className="input-group-addon">
			            	<input type="checkbox" checked={this.state.settings.displayResult}/>
			            </span>
			            <label className="form-control">Показывать результаты теста (резюме по тесту)</label>
		        	</div>
		        	<div className="input-group all">
			            <span className="input-group-addon">
			            	<input type="checkbox" checked={this.state.settings.notDisplayLastAttempt}/>
			            </span>
			            <label className="form-control">Не показывать сообщение об исчерпании попыток ответа</label>
		        	</div>
		        	<div className="input-group all">
			            <span className="input-group-addon">
			            	<input type="checkbox" checked={this.state.settings.notDisplayFeedback}/>
			            </span>
			            <label className="form-control">Не показывать в данном тесте сообщения обратной связи</label>
		        	</div>
		        	<div className="input-group all">
			            <span className="input-group-addon">
			            	<input type="checkbox" checked={this.state.settings.displayResultReport}/>
			            </span>
			            <label className="form-control">Показывать отчет о результатах теста</label>
		        	</div>
		        	<div className="input-group all">
			            <span className="input-group-addon">
			            	<input type="checkbox" checked={this.state.settings.displayAnswersInReport}/>
			            </span>
			            <label className="form-control">Показывать варианты ответов в отчете по тестированию</label>
		        	</div>
		        	<div className="input-group all">
			            <span className="input-group-addon">
			            	<input type="checkbox" checked={this.state.settings.displayCorrectAnswerInReport}/>
			            </span>
			            <label className="form-control">Показывать правильный ответ в отчете по тестированию</label>
		        	</div>
		        	<div className="input-group all">
			            <span className="input-group-addon">
			            	<input type="checkbox" checked={this.state.settings.notDisplayUnfinishedScore}/>
			            </span>
			            <label className="form-control">Не показывать набранных балл для незавершенных тестов</label>
		        	</div>
				</div>
	        </div>
		);
	}
});

module.exports = SettingsView;