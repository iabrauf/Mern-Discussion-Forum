const mongoose = require("mongoose");

module.exports = function (){
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
    const mongoUrl = 'mongodb+srv://root:root@cluster0.tty3jir.mongodb.net/?retryWrites=true&w=majority';
	try {
		mongoose.connect(mongoUrl, connectionParams);
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
};