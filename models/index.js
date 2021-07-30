const Quiz = require('./Quiz');
const Question = require('./Question');

Quiz.hasMany(Question, {
    foreignKey: 'quiz_id'
});

Question.belongsTo(Quiz, {
    foreignKey: 'quiz_id'
});

module.exports = { Quiz, Question };