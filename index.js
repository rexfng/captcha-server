require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios');
const qs = require('qs');
const cors = require('cors')

app.use(cors())
app.get('/', function (req, res) {
	axios({
	  method: 'POST',
	  headers: { 'content-type': 'application/x-www-form-urlencoded' },
	  data: qs.stringify({
	    secret: process.env.CAPTCHA_SECRET,
	    response: req.query.code
	  }),
	  url: 'https://www.google.com/recaptcha/api/siteverify',
	})
	.then(function (response) {
		// console.log(response)
		res.send(response.data)
	})
	.catch(function (error) {
		res.status(500).send(error)
	});
})
 
app.listen(process.env.PORT || 3000)