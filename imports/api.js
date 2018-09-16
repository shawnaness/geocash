import {
	Meteor
} from 'meteor/meteor';

import express from 'express';

import {
	CLIENT_ID,
	SECRET,
	PUBLIC_KEY
} from '../constants.js'

const bodyParser = require('body-parser');
const envvar = require('envvar');
const moment = require('moment');
const plaid = require('plaid');

const port = 8080

var PLAID_CLIENT_ID = CLIENT_ID;
var PLAID_SECRET = SECRET;
var PLAID_PUBLIC_KEY = PUBLIC_KEY;
var PLAID_ENV = envvar.string('PLAID_ENV', 'sandbox');

//asynchronous function to obtain transactions 
async function getTransactions(req, res) {
	var startDate = moment().subtract(100,
		'days').format('YYYY-MM-DD');
	var endDate = moment().format('YYYY-MM-DD');
	//creating Client user 
	var client = new plaid.Client(
		PLAID_CLIENT_ID,
		PLAID_SECRET,
		PLAID_PUBLIC_KEY,
		plaid.environments[PLAID_ENV], {
			version: '2018-05-22'
		}
	);

	//how to access (update this)
	const ACCESS_TOKEN = req.body;

	client.getTransactions(ACCESS_TOKEN,
		startDate,
		endDate, {
			count: 250,
			offset: 0
		},
		function(error, transactionsResponse) {
			//if failed to get transaction
			if (error != null) {
				process.stdout.write("error met in getting transaction")
				console.log(JSON.stringify(error));
				return response.json({
					error: error
				});
			}
			console.log('pulled ' + transactionsResponse.transactions.length +
				' transactions');
			res.status(201).json(transactionsResponse);
		});
}

//exporting function to main.js
export function setupApi() {
	const app = express();

	//when accessing api, call the return transactions method
	app.post('/api', getTransactions);

	WebApp.connectHandlers.use(app);
}