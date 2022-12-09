const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();

app.use(cors({
	origin: '*',
	methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/stickers', cors(), (req, res, next) => {
	console.log(`MY REQUEST ES: ${req}`)
	const data = {
		item1: "dataItem1",
		item2: "dataItem2",
		item3: "dataItem3"
	 }
	res
		.set('Content-Type', 'application/json')
		.status(200)
		.json(data)
})

app.post('/stickers', cors(), (req, res, next) => {
	
	const data = JSON.stringify(req.body)

	console.log(data)
	res.json(`DATA POST: ${data}`)
})

app.listen(3001);