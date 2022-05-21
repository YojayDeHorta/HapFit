const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, res, cb) {
		//console.log(path.join(__dirname, '../../front-end/public/image'));
		cb(null, path.join(__dirname, '../public/image'));
	},
	filename: function (req, file, cb) {
		const ext = file.originalname.split('.');
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + '.' + ext[ext.length - 1]);
	},
});

module.exports = multer({ storage: storage });
