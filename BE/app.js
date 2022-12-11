const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser')
const app = express();

let stickers = []
const json_stickers = fs.readFileSync('./stickers.json', 'utf-8');
if(json_stickers !==""){
	stickers = JSON.parse(json_stickers)
}

// cross-origin requests and data transfers
app.use(cors({
	origin: '*',
	methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

// to process data sent in an HTTP request body
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json 
app.use(bodyParser.json());


app.get('/stickers', cors(), (req, res, next) => {

	res
		.set('Content-Type', 'application/json')
		.status(200)
		.json(stickers)
})

app.post('/stickers', cors(), (req, res, next) => {
	
	const data = JSON.stringify(req.body)

	fs.writeFileSync('./stickers.json', data, 'utf-8');
	res
		.set('Content-Type', 'application/json')
		.status(201)
		.json(`Stickers saved successfully`)
})

app.listen(3001);