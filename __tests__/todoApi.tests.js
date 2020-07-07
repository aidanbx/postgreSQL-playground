const todoApi = require('../todoApi');
const request = require('supertest');

describe('GET /api/', () => {
  test('It should give basic info', async () => {
    const response = await request(todoApi).get('/api/');
    // console.log('IN JEST\n' + response);
    expect(response.text).toEqual(
      JSON.stringify(
        {
          info     : 'Todolist API',
          commands : {
            getTodos    : 'get /todos',
            getTodoById : 'get /todos/:id',
            createTodo  : 'post /todos',
            updateTodo  : 'put /todos/:id',
            deleteTodo  : 'delete /todos/:id'
          }
        },
        null,
        2
      )
    );
    expect(response.statusCode).toBe(200);
  });
});
