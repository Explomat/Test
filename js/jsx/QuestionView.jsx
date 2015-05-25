var React = require('React');

var Menu = React.createClass({
	render:function() {
		return (
			<div className="menu all">
				<div>
					<i className="fa fa-file-image-o fa-2x menu-item"></i>
					<span>Показывать картинки</span>
				</div>
				<div>
					<i className="fa fa-cubes fa-2x menu-item"></i>
					<span>Показывать вес</span>
				</div>
			</div>
		);
	}
})

var QuestionView = React.createClass({
	render:function () {
		return (
			<div className="panel panel-default">
				<div className="panel-body">
					<Menu />
					<div className="input-group all .menu-float">
			            <span className="input-group-addon">Заголовок : *</span>
			            <input type="text" className="form-control" placeholder='Заголовок вопроса'/>
			        </div>
			        <div className="form-group all menu-float">
						<label>Вопрос : *</label>
						<textarea className="form-control" rows="2"></textarea>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = QuestionView;