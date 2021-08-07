const Quiz = require('./Quiz');
const Question = require('./Question');
const Users = require('./Users');

Users.hasMany(Quiz, {
    foreignKey: 'user_id'
});

Quiz.belongsTo(Users, {
    foreignKey: 'user_id'
});

Quiz.hasMany(Question, {
    foreignKey: 'quiz_id'
});

Question.belongsTo(Quiz, {
    foreignKey: 'quiz_id'
});

module.exports = { Quiz, Question, Users };