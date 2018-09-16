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


/*
 * Method to get the transactions from a given client 
 * @param auth_token - the authorization token for a user
 */
// function getTransactions(access_token) {
//   //full Node.js request to Plaid api
//   app.get('/get_transactions', function(request, response, next) {
//     // Setting dates for transactions in last 100 days
//     var startDate = moment().subtract(100,
//       'days').format('YYYY-MM-DD');
//     var endDate = moment().format('YYYY-MM-DD');

//     //calling transactions
//     client.getTransactions(ACCESS_TOKEN,
//       startDate,
//       endDate, {
//         count: 250,
//         offset: 0
//       },
//       function(error, transactionsResponse) {
//         //if failed to get transaction
//         if (error != null) {
//           process.stdout.write("error met in getting transaction")
//           console.log(JSON.stringify(error));
//           return response.json({
//             error: error
//           });
//         }
//         console.log('pulled ' + transactionsResponse.transactions.length +
//           ' transactions');
//         process.stdout.write(transactionsResponse);
//         response.json(transactionsResponse);
//       });
//   });
// };

Meteor.startup(() => {
  // code to run on server at startup

  app.get('/get_transactions', function(request, response, next) {
    // Setting dates for transactions in last 100 days
    var startDate = moment().subtract(100,
      'days').format('YYYY-MM-DD');
    var endDate = moment().format('YYYY-MM-DD');

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