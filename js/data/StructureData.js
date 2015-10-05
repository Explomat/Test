var storage = require('../utils/Storage');
var Structure = require('../models/Structure');


function getSection(structure, sectionUuid){
	var sections = structure.sections || [];
	for (var i = sections.length - 1; i >= 0; i--) {
		if (sections[i].uuid === sectionUuid) {
			return sections[i];
		}
	}
}

function getQuestion(section, questionUuid){
	for (var i = section.questions.length - 1; i >= 0; i--) {
		if (section.questions[i].uuid === questionUuid){
			return { question: section.questions[i], index: i};
		}
	};
	return null;
}

module.exports = {

	getData: function(){
		return storage.getItem('structure');
	},

	saveStructure: function(structure){
		storage.setItem('structure', structure);
	},

	saveSection: function(section){
		var structure = storage.getItem('structure');
		if (!structure){
			throw new Error('\'structure\' is not defined in storage');
			return;
		}
		var sections = structure.sections || [];
		var isEdit = false;
		for (var i = sections.length - 1; i >= 0; i--) {
			if (sections[i].uuid === section.uuid) {
				sections[i] = section;
				isEdit = true;
				break;
			}
		}
		if (!isEdit)
			sections.push(section);
		storage.setItem('structure', structure);
	},

	removeSection: function(sectionUuid){
		var structure = storage.getItem('structure');
		if (!structure){
			throw new Error('\'structure\' is not defined in storage');
			return;
		}
		var sections = structure.sections || [];
		for (var i = sections.length - 1; i >= 0; i--) {
			if (sections[i].uuid === sectionUuid) {
				sections.splice(i, 1);
				break;
			}
		}
		storage.setItem('structure', structure);
	},

	removeQuestion: function(sectionUuid, questionUuid) {
		var structure = storage.getItem('structure');
		if (!structure){
			throw new Error('\'structure\' is not defined in storage');
			return;
		}
		var sections = structure.sections || [];
		for (var i = sections.length - 1; i >= 0; i--) {
			if (sections[i].uuid === sectionUuid) {
				var section = sections[i];
				var questions = section.questions;
				for (var j = questions.length - 1; j >= 0; j--) {
					if (questions[j].uuid === questionUuid) {
						questions.splice(j, 1);
						break;
					}
				}
				break;
			}
		}
		storage.setItem('structure', structure);
	},

	replaceQuestion: function(questionUuid, sourceSectionUuid, destSectionUuid, destQuestionUuid){
		var structure = storage.getItem('structure');
		if (!structure){
			throw new Error('\'structure\' is not defined in storage');
			return;
		}

		var sourceSection = getSection(structure, sourceSectionUuid);
		var sourceQuestion = getQuestion(sourceSection, questionUuid);

		if (sourceSectionUuid === destSectionUuid && destQuestionUuid){
			var destQuestion = getQuestion(sourceSection, destQuestionUuid);
			sourceSection.questions.splice(sourceQuestion.index, 1);
			sourceSection.questions.splice(destQuestion.index, 0, sourceQuestion.question);
			storage.setItem('structure', structure);
			return;
		}
		var destSection = getSection(structure, destSectionUuid);

		var sourceQuestions = sourceSection.questions || [];
		var destQuestions = destSection.questions || [];

		var deletedQuestion = sourceQuestions.splice(sourceQuestion.index, 1)[0];
		destQuestions.push(deletedQuestion);
		storage.setItem('structure', structure);
	},

	init: function () {
		var structure = storage.getItem('structure');
		storage.setItem('structure', new Structure(structure));
		return storage.getItem('structure');
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