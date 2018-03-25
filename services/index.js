require('module-alias/register');

const http = require('http'),
    budgetAPI = require('@budgetAPI'),
    server = http.Server(budgetAPI),
    port = process.env.PORT || 3000,
    host = process.env.host || 'localhost';

server.listen(port, host, () => console.log(`Server running on post: ${port}`));