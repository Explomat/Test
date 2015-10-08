var storage = require('../utils/Storage');
var Structure = require('../models/Structure');


function getSection(structure, sectionUuid){
	var sections = structure.sections || [];
	for (var i = sections.length - 1; i >= 0; i--) {
		if (sections[i].uuid === sectionUuid) {
			return sections[i];
		}
	}
	return null;
}

function getSectionWithIndex(structure, sectionUuid){
	var sections = structure.sections || [];
	for (var i = sections.length - 1; i >= 0; i--) {
		if (sections[i].uuid === sectionUuid) {
			return { section: sections[i], index: i};
		}
	}
	return null;
}

function getQuestion(structure, questionUuid){
	var sections = structure.sections || [];
	for (var j = sections.length - 1; j >= 0; j--) {
		var section = sections[j];
		for (var i = section.questions.length - 1; i >= 0; i--) {
			if (section.questions[i].uuid === questionUuid) {
				return { question: section.questions[i], index: i};
			}
		};
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

	replaceSection: function(sectionUuid, destSectionUuid){
		var structure = storage.getItem('structure');
		if (!structure){
			throw new Error('\'structure\' is not defined in storage');
			return;
		}

		function _getSection(_sections, _sectionUuid) {
			for (var i = _sections.length - 1; i >= 0; i--) {
				if(_sections[i].uuid === _sectionUuid) {
					return { section:_sections[i], index: i};
				}
			}
			return null;
		}

		var sourceSection = _getSection(structure.sections, sectionUuid);
		var destSection = _getSection(structure.sections, destSectionUuid);

		if (sourceSection && destSection){
			structure.sections.splice(sourceSection.index, 1);
			structure.sections.splice(destSection.index, 0, sourceSection.section);
			storage.setItem('structure', structure);
		}
	},

	shiftUpSection: function(sectionUuid){
		var structure = storage.getItem('structure');
		if (!structure){
			throw new Error('\'structure\' is not defined in storage');
			return;
		}

		var sourceSection = getSectionWithIndex(structure, sectionUuid);
		if (sourceSection && sourceSection.index === 0) return;

		var destSection = structure.sections[sourceSection.index - 1];
		structure.sections.splice(sourceSection.index, 1);
		structure.sections.splice(sourceSection.index - 1, 0, sourceSection.section);
		storage.setItem('structure', structure);
	},

	shiftDownSection: function(sectionUuid){
		var structure = storage.getItem('structure');
		if (!structure){
			throw new Error('\'structure\' is not defined in storage');
			return;
		}

		var sourceSection = getSectionWithIndex(structure, sectionUuid);
		if (sourceSection && sourceSection.index === structure.sections.length - 1) return;

		var destSection = structure.sections[sourceSection.index + 1];
		structure.sections.splice(sourceSection.index, 1);
		structure.sections.splice(sourceSection.index + 1, 0, sourceSection.section);

		storage.setItem('structure', structure);
	},

	toggleExpandSection: function(sectionUuid){
		var structure = storage.getItem('structure');
		if (!structure){
			throw new Error('\'structure\' is not defined in storage');
			return;
		}

		var sourceSection = getSection(structure, sectionUuid);
		if (sourceSection) {
			sourceSection.isExpanded = !sourceSection.isExpanded;
		}
		storage.setItem('structure', structure);
	},

	toggleExpandSections: function(isExpandedSections){
		var structure = storage.getItem('structure');
		if (!structure){
			throw new Error('\'structure\' is not defined in storage');
			return;
		}

		for (var i = structure.sections.length - 1; i >= 0; i--) {
			structure.sections[i].isExpanded = isExpandedSections;
		};

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

	replaceQuestionInSection: function(questionUuid, sourceSectionUuid, destQuestionUuid){
		var structure = storage.getItem('structure');
		if (!structure){
			throw new Error('\'structure\' is not defined in storage');
			return;
		}

		var sourceSection = getSection(structure, sourceSectionUuid);
		var sourceQuestion = getQuestion(structure, questionUuid);
		var destQuestion = getQuestion(structure, destQuestionUuid);
		sourceSection.questions.splice(sourceQuestion.index, 1);
		sourceSection.questions.splice(destQuestion.index, 0, sourceQuestion.question);
		storage.setItem('structure', structure);
	},

	replaceQuestionInNewSection: function(sourceQuestionUuid, sourceSectionUuid, destSectionUuid){
		var structure = storage.getItem('structure');
		if (!structure){
			throw new Error('\'structure\' is not defined in storage');
			return;
		}

		var sourceSection = getSection(structure, sourceSectionUuid);
		var destSection = getSection(structure, destSectionUuid);
		var sourceQuestion = getQuestion(structure, sourceQuestionUuid);

		sourceSection.questions.splice(sourceQuestion.index, 1);
		destSection.questions.push(sourceQuestion.question);
		storage.setItem('structure', structure);
	},

	shiftUpQuestion: function(questionUuid, sectionUuid){
		var structure = storage.getItem('structure');
		if (!structure){
			throw new Error('\'structure\' is not defined in storage');
			return;
		}

		var sourceQuestion = getQuestion(structure, questionUuid);
		var sourceSection = getSectionWithIndex(structure, sectionUuid);
		if (!sourceQuestion || !sourceSection) return;
		if (sourceQuestion.index === 0 && sourceSection.index === 0) return;

		if (sourceQuestion.index === 0 && sourceSection.index > 0) {
			sourceSection.section.questions.splice(sourceQuestion.index, 1);
			structure.sections[sourceSection.index - 1].questions.push(sourceQuestion.question);
		}
		else if (sourceQuestion.index > 0) {
			sourceSection.section.questions.splice(sourceQuestion.index, 1);
			sourceSection.section.questions.splice(sourceQuestion.index - 1, 0, sourceQuestion.question);
		}
		storage.setItem('structure', structure);
	},

	shiftDownQuestion: function(questionUuid, sectionUuid){
		var structure = storage.getItem('structure');
		if (!structure){
			throw new Error('\'structure\' is not defined in storage');
			return;
		}

		var sourceQuestion = getQuestion(structure, questionUuid);
		var sourceSection = getSectionWithIndex(structure, sectionUuid);
		if (!sourceQuestion || !sourceSection) return;
		var lastQuestionIndexInSection = sourceSection.section.questions.length - 1;
		if (sourceQuestion.index === lastQuestionIndexInSection && sourceSection.index === structure.sections.length - 1) return;

		if (sourceQuestion.index === lastQuestionIndexInSection && sourceSection.index < structure.sections.length - 1) {
			sourceSection.section.questions.splice(sourceQuestion.index, 1);
			structure.sections[sourceSection.index + 1].questions.splice(0, 0, sourceQuestion.question);
		}
		else if (sourceQuestion.index < lastQuestionIndexInSection) {
			sourceSection.section.questions.splice(sourceQuestion.index, 1);
			sourceSection.section.questions.splice(sourceQuestion.index + 1, 0, sourceQuestion.question);
		}
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