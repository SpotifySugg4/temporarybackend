const db = require('../data/dbConfig.js');

async function add(user) { 
    let [id] = await db('users').insert(user, 'id')
    return findUserBy({id})
}

function getAll() { 
    return db('users')
}

function findUserBy(filter) { 
    return db('users').where(filter)
}

module.exports = {add, getAll, findUserBy}