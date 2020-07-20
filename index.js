const axios = require('axios')
    , AWS = require('aws-sdk')

const NR_INSERT_KEY=process.env.NR_INSERT_KEY;
const PAYLOAD_SIZE=20;

exports.handler = async function(event, context, callback) {
// console.log('Received event:', JSON.stringify(event, null, 4));
  if (!event.Records.map) {
    console.log('Skip request');
    return;
  }
  var events = event.Records.map(r => JSON.parse(r.Sns.Message)).reduce((a,b)=>[...a, ...b]);

  //timestamp: (new Date(event.LogDate)).getTime(),
  var logEvents = events.map(event => ({
    timestamp: (new Date(event.LogDate)).getTime(),
    message: JSON.stringify(event),
    attributes: event
  }));
  console.log(`Number of events :${logEvents.length}`);
  for (var i = 0; i < logEvents.length; i += PAYLOAD_SIZE) {
    const start = i;
    console.log(`Start upload from ${start}`);
    var payload = [{
      "common": {
        "attributes": {
          "logtype": "trendmicro"
        }
      },
      "logs": logEvents.slice(start, start + PAYLOAD_SIZE)
    }];
    let res = await axios.post('https://log-api.newrelic.com/log/v1', payload, {
      headers: {
        'Content-Type': 'application/json',
        'X-Insert-Key': NR_INSERT_KEY
      }
    }).catch((e) => {
      console.error(e);
    });
  }
  console.log(`Number of events :${logEvents.length} Completed.`)
}