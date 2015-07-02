var React = require('React');
var QuestionActions = require('../../Controllers/startController/actions/QuestionActions');

var ImageSelect = React.createClass({

	onLoadFrame: function(e){
		console.log(e);
	},
		
	handleChange:function(e) {
		e.target.parentNode.submit();
		if (this.props.changeImg)
			this.props.changeImg({name: img.value});
		//React.findDOMNode(this.refs.form).submit();
	},

	handleRemove: function(e) {
		e.target.value = '';
		if (this.props.changeImg)
			this.props.changeImg(null);
	},

	render:function(){
		var imgName = this.props.img ? this.props.img.name : '';
		var isDisplayIcon = { display: (!this.props.img || this.props.img.name.trim() == "") ? "none" : "inline-block" }
		return (
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

			       		<form action="http://study.merlion.ru/custom_web_template.html?object_id=6135330846971222087&server_id=6166852566696923932&action_name=saveFile" method="post" encType="multipart/form-data" target="iframe-name">
			       			<input accept="image/*" name="file_upload" className="file" type="file" onChange={this.handleChange} title="Добавить изображение"/>
						</form>
						<iframe name="iframe-name" src="#" style={{"display":"none"}} onLoad={this.onLoadFrame}></iframe>
			       	</div>
			   	</div>
			</div>
		);	
	}
});

module.exports = ImageSelect;