const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.verifyToken =  async (req, res, next) => { 
	let token; 

	if(req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer')) {	
		token = req.headers['authorization'].split(' ')[1];
	}

	try { 
		const decoded = jwt.verify(token, 'secret');
		req.user = await User.findById(decoded.user._id);
		next();
	}
	catch(err) {
		res.status(500).json({
			success: false,
			message: err
		});
	}
}