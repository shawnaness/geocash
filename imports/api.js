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

const port = 3000

var PLAID_CLIENT_ID = CLIENT_ID;
var PLAID_SECRET = SECRET;
var PLAID_PUBLIC_KEY = PUBLIC_KEY;
var PLAID_ENV = envvar.string('PLAID_ENV', 'sandbox');


// Accept the public_token sent from Link and get Access token
async function getAccessToken(req, res) {
	PUBLIC_TOKEN = request.body.public_token;
	//creating client object
	var client = new plaid.Client(
		PLAID_CLIENT_ID,
		PLAID_SECRET,
		PLAID_PUBLIC_KEY,
		plaid.environments[PLAID_ENV], {
			version: '2018-05-22'
		}
	);
	//exchanging tokens
	client.exchangePublicToken(PUBLIC_TOKEN, function(error,
		tokenResponse) {
		if (error != null) {
			var msg = 'Could not exchange public_token!';
			console.log(msg + '\n' + error);
			return response.json({
				error: msg
			});
		}
		//if success
		ACCESS_TOKEN = tokenResponse.access_token;
		ITEM_ID = tokenResponse.item_id;
		console.log('Access Token: ' + ACCESS_TOKEN);
		console.log('Item ID: ' + ITEM_ID);
		res.json(tokenResponse);
	});
}



//asynchronous function to obtain transactions given access token
async function getTransactions(req, res) {
	var startDate = moment().subtract(100,
		'days').format('YYYY-MM-DD');
	var endDate = moment().format('YYYY-MM-DD');
	//creating Client object 
	var client = new plaid.Client(
		PLAID_CLIENT_ID,
		PLAID_SECRET,
		PLAID_PUBLIC_KEY,
		plaid.environments[PLAID_ENV], {
			version: '2018-05-22'
		}
	);

	//how to access (update this)
	const ACCESS_TOKEN = req.body.public_token;

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
				return transactionsResponse.json({
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
	app.post('/getTransactions', getTransactions);
	app.post('/getAccessToken', getAccessToken);

	WebApp.connectHandlers.use(app);
}