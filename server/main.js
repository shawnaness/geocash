import {
  Meteor
} from 'meteor/meteor';

import {
  setupApi
} from '../imports/api';

//block runs on start of server
Meteor.startup(() => {
  setupApi();
});