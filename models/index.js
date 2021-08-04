const Quiz = require('./Quiz');
const Question = require('./Question');
const Users = require('./Users');

Quiz.hasMany(Question, {
    foreignKey: 'quiz_id'
});

Question.belongsTo(Quiz, {
    foreignKey: 'quiz_id'
});

module.exports = { Quiz, Question, Users };