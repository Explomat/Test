var Storage = require('../utils/Storage');
var Section = require('../models/Section');

module.exports = {

	createNew: function(){
		return new Section();
	},

	getSection: function(sectionUuid){
		var structure = Storage.getItem('structure');
		if (!structure){
			throw new Error('Structure is not defined in storage');
			return;
		}
		var sections = structure.sections || [];
		for (var i = sections.length - 1; i >= 0; i--) {
			if (sections[i].uuid == sectionUuid)
				return sections[i];
		}
		return null;
	},

	save: function(section){
		var structure = Storage.getItem('structure');
		if (!structure){
			throw new Error('Structure is not defined in storage');
			return;
		}
		var sections = structure.sections || [];
		var isEdit = false;
		for (var i = sections.length - 1; i >= 0; i--) {
			if (sections[i].uuid == section.uuid) {
				sections[i] = section;
				isEdit = true;
				break;
			}
		}

		if (!isEdit) {
			structure.sections.push(section);
		}
		Storage.setItem('structure', structure);
	}
}

/*module.exports = {
	init: function () {
		storage.clear();
		storage.setItem('question', {
			title: 'Temp',
			text: 'What\'s the Fuck?',
			type: 'match_item',
			img: null,
			answers: [
				{
					uuid: 'b6363c6e-0c11-41b5-ac2c-3000b87961d2',
					text: 'Test',
					weight: 1,
					height: 20,
					width: 1,
					img: null,
					conditions: [
						{
							uuid: 'b6363c6e-0c11-41b5-ac2re',
							text: '1',
							condition: 'equal'
						}
					],
					conditionsText: [
						{
							uuid: 'b6363c6e-0c11-41b5-ac2r',
							text: 'condition0',
							condition: 'equal'
						}
					],
					conformities: [
						{
							uuid: 'b6363c6e',
							text: ''
						}
					]
				},
				{
					uuid: 'b6363c6e-0c11-41b5-ac2c-3000b87961d1',
					text: 'Test1',
					weight: 2,
					height: 20,
					width: 1,
					img: {
						name:'blue.png',
						id:'6166916040804028637',
						error: null
					},
					conditions: [
						{
							uuid: 'b6363c6e-0c11-41b5-ac2s',
							text: '2',
							condition: 'moreOrEqual'
						},

						{
							uuid: 'b6363c6e-0c11-41b5-ac2a',
							text: 'condition3',
							condition: 'lessOrEqual'
						}
					],
					conditionsText: [
						{
							uuid: 'b6363c6e-0c11-41b5-ac2',
							text: 'condition2',
							condition: 'equal'
						},

						{
							uuid: 'b6363c6e-0c11-41b5-ac',
							text: 'condition3',
							condition: 'contains'
						}
					],

					conformities: [
						{
							uuid: 'b6363c6',
							text: ''
						},
						{
							uuid: 'b6363c5',
							text: ''
						},
					]
				}
			]
		});
	}
};*/