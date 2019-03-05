const fs = require('fs');
const express = require('express');
const app = express();

const { jsonGraphqlExpress } = require('json-graphql-server');
const data = JSON.parse(fs.readFileSync('futurama.json', 'UTF-8'));

app.use('/graphql', jsonGraphqlExpress(data));

const PORT = 3000;
app.listen(PORT);
