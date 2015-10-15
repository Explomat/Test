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
					<div className="input-group">
			            <span className="input-group-addon">Название : *</span>
			            <Txt.TextView value={this.state.settings.title} onBlur={this.handleChangeTitle} placeholder='Введите название теста'/>
			        </div>
			        <div className="input-group all">
			            <span className="input-group-addon">Проходной балл : *</span>
			            <Txt.TextView value={this.state.settings.passingScore} onBlur={this.handleChangePassingScore} isValid={SettingsValidation.isValidPassingScore} placeholder='Введите проходной балл'/>
			        </div>
			        <div className="input-group all">
			            <span className="input-group-addon">Длительность (минут) : *</span>
			            <Txt.TextView value={this.state.settings.durationMinutes} onBlur={this.handleChangeDuration} isValid={SettingsValidation.isValidDuration} placeholder='Введите длительность в минутах'/>
		        	</div>
		        	<div className="input-group all">
			            <span className="input-group-addon">Продолжительность (дней) : *</span>
			            <Txt.TextView value={this.state.settings.durationDays} onBlur={this.handleChangeDuration} isValid={SettingsValidation.isValidDuration} placeholder='Введите продолжительность в днях'/>
		        	</div>
		        	<div className="input-group all">
			            <span className="input-group-addon">Количество попыток : *</span>
			            <Txt.TextView value={this.state.settings.attemptsCount} onBlur={this.handleAttemptsCount} isValid={SettingsValidation.isValidAttemptsCount} placeholder='Введите количество попыток'/>
		        	</div>
		        	<div className="input-group col-lg-4 all">
		        		<span className="input-group-addon">Статус : *</span>
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
		);
	}
});

module.exports = SettingsView;