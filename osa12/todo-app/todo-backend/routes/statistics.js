const express = require('express');
const redis = require('../redis')
const router = express.Router();

router.get('/', (_, res) => {
    redis.getAsync('added_todos').then(
        todo_count => {
            if (!todo_count) {
                todo_count = 0
            }
            res.send({ added_todos: parseInt(todo_count) })
        } 
    )
})

module.exports = router;
