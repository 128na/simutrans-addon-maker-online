#!/usr/bin/env node

require('./src/setup');

const { DateTime } = require('luxon');
const { mapAllUsers } = require('./src/authentication');

const toDateTimeSting = dt => DateTime.fromHTTP(dt).setLocale('ja').toLocaleString(DateTime.DATETIME_FULL);
mapAllUsers(user => {
  const { uid, email, displayName, metadata } = user;
  const { creationTime, lastRefreshTime, lastSignInTime } = metadata;
  console.log({
    uid,
    email,
    displayName,
    creation: toDateTimeSting(creationTime),
    lastRefresh: toDateTimeSting(lastRefreshTime),
    lastSignin: toDateTimeSting(lastSignInTime),
  })
});
