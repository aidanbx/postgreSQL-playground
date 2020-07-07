require('dotenv').config();
const todoApi = require('./todoApi');

todoApi.listen(process.env.PORT || 54321, () =>
  console.log(
    `todoApi running at http://${process.env.IP || 'localhost'}:${process.env
      .PORT || '54321'}/api`
  )
);
