var express = require('express')
const client = require('prom-client');


var app = express()
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})


app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(5000, () => {
  console.log('Server running on port 3000');
});
