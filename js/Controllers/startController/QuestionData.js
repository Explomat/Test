var storage = require('../../utils/Storage');

module.exports = {
	init:function () {
		storage.clear();
		storage.setItem('question', {
			title: 'Temp',
			text: 'What\'s the Fuck?',
			type: 'match_item',
			answers: [
				{
					uuid: 'b6363c6e-0c11-41b5-ac2c-3000b87961d2',
					text: 'Test',
					weight: 1,
					img: {
						id: '6156139271573955688',
						name: 'canvas.png',
					},
					conditions: [
						{
							uuid: 'b6363c6e-0c11-41b5-ac2re',
							text: 'condition0',
							condition: 'equal',
							selected: true
						}
					]
				},
				{
					uuid: 'b6363c6e-0c11-41b5-ac2c-3000b87961d1',
					text: 'Test1',
					weight: 2,
					conditions: [
						{
							uuid: 'b6363c6e-0c11-41b5-ac2s',
							text: 'condition2',
							condition: 'moreOrEqual',
							selected: true
						},

						{
							uuid: 'b6363c6e-0c11-41b5-ac2a',
							text: 'condition3',
							condition: 'lessOrEqual'
						}
					]
				},
				{
					uuid: 'b6363c6e-0c11-41b5-ac2c-3000b87961d0',
					text: 'Test3',
					weight: 3,
					conditions: [
						{
							uuid: 'b6363c6e-0c11-41b5-ac2c',
							text: 'condition4',
							condition: 'more',
							selected: true
						},

						{
							uuid: 'b6363c6e-0c11-41b5-ac2f',
							text: 'condition5s',
							condition: 'less'
						}
					]
				}
			]
		});
	}
};