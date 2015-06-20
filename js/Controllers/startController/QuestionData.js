var storage = require('../../utils/Storage');

module.exports = {
	init:function () {
		storage.clear();
		storage.setItem('question', {
			title: 'Temp',
			text: 'What\'s the Fuck?',
			type: 'gap_fill',
			answers: [
				{
					uuid: 'b6363c6e-0c11-41b5-ac2c-3000b87961d2',
					text: 'Test',
					selected: true,
					weight: 1,
					img: {
						id: '6156139271573955688',
						name: 'canvas.png',
					}
				},
				{
					uuid: 'b6363c6e-0c11-41b5-ac2c-3000b87961d1',
					text: 'Test1',
					selected: false,
					weight: 2,
				},
				{
					uuid: 'b6363c6e-0c11-41b5-ac2c-3000b87961d0',
					text: 'Test3',
					selected: false,
					weight: 3
				}
			]
		});
	}
};