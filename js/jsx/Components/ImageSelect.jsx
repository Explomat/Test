var React = require('React');
var QuestionActions = require('../../Controllers/startController/actions/QuestionActions');

var ImageSelect = React.createClass({
		
	handleChange:function(e) {
		console.log(e.target.value);
		if (this.props.changeImg)
			this.props.changeImg({name: e.target.value});
		//this.setState({name:e.target.value});
		//React.findDOMNode(this.refs.form).submit();
	},

	handleSubmit:function(e) {
		e.preventDefault();
		console.log('submit');
		return;
	},

	handleRemove: function(e) {
		//document.getElementById('inputFile').value = '';
		React.findDOMNode(this.refs.test).value = '';
		if (this.props.changeImg)
			this.props.changeImg(null);
		//this.setState({name:''});
	},

	render:function(){
		var imgName = this.props.img ? this.props.img.name : '';
		var isDisplayIcon = { display: (!this.props.img || this.props.img.name.trim() == "") ? "none" : "inline-block" }
		return (
			<form ecntype="multipart/form-data" method="POST" onSubmit={this.handleSubmit}>
				<div className="input-group">
				   	<div tabIndex="-1" className="form-control file-caption  kv-fileinput-caption">
				   		<span title={imgName} className="file-caption-ellipsis">…</span>
				   		<div title={imgName} className="file-caption-name" style={isDisplayIcon}>
				   			<span className="glyphicon glyphicon-file kv-caption-icon"> {imgName}</span>
				   		</div>
					</div>
				   	<div className="input-group-btn">
				    	<button type="button" title="Clear selected files" className="btn btn-default fileinput-remove fileinput-remove-button" style={isDisplayIcon} onClick={this.handleRemove}>
				    		<i className="glyphicon glyphicon-trash"></i> 
				    	</button>
				       	<div style={{"overflow": "hidden"}} className="btn btn-primary btn-file">
				       		<i className="glyphicon glyphicon-picture"></i>
				       		<span> &nbsp; … </span>
				       		<input ref={"test"} accept="image/*" className="file" type="file" onChange={this.handleChange} title="Добавить изображение"/>
				       	</div>
				   	</div>
				</div>
			</form>
		);	
	}
});

module.exports = ImageSelect;