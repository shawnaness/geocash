import {
  Meteor
} from 'meteor/meteor';

const bodyParser = require('body-parser');
const envvar = require('envvar');
const express = require('express');
const moment = require('moment');
const plaid = require('plaid');

const port = 8080

import {
  CLIENT_ID,
  SECRET,
  PUBLIC_KEY
} from '../constants.js'

var PLAID_CLIENT_ID = CLIENT_ID;
var PLAID_SECRET = SECRET;
var PLAID_PUBLIC_KEY = PUBLIC_KEY;
var PLAID_ENV = envvar.string('PLAID_ENV', 'sandbox');

//tokens that will be recieved from exchanging 
var ACCESS_TOKEN = null;
var PUBLIC_TOKEN = null;

// Defining app on express framework
var app = express();

Meteor.startup(() => {
  // code to run on server at startup

  app.post('/get_transactions', function(request, response) {
    // Setting dates for transactions in last 100 days
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

    const ACCESS_TOKEN = request;

    //calling transactions
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
        process.stdout.write(transactionsResponse);
        response.json(transactionsResponse);
      });
  });
});