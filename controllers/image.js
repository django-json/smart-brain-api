const Clarifai = require('clarifai');

//Write your API Key here
const app = new Clarifai.App({
 apiKey: '4c88891ea8824f029e4940c809667a3a'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(
	      Clarifai.FACE_DETECT_MODEL, 
	      req.body.input)
		.then(data => res.json(data))
		.catch(error => res.status(400).json('Unable to work with API'));
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	
	db('users').where({id})
	.increment('entries', 1)
	.returning('entries')
	.then(entries => res.json(entries[0]))
	.catch(err => res.status(400).json('Error updating entries'));
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
};