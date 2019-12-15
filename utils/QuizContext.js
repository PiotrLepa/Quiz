import _ from 'lodash';

export default class QuizContext {
  static completedTasks = [];

  static getPointsResult() {
    const score =  this._calculateUserResult();
    const maxPoints = this.completedTasks.length;
    return {
      score,
      maxPoints
    };
  }

  static getQuizType() {
    return this.quiz.name;
  }

  static _calculateUserResult() {
    return this.completedTasks.reduce((acc, task) => {
      if (task.userAnsweredCorrect) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  static getResult() {
    return this.completedTasks;
  }

  static saveUserAnswer(index, correct) {
    const task = this.getTask(index);
    this.completedTasks.push({
      ...task,
      userAnsweredCorrect: correct,
    });
  }

  static setQuiz(quiz) {
    this.clear();
    this.quiz = this._shuffleTasksAndAnswers(quiz);
  }

  static _shuffleTasksAndAnswers(quiz) {
    quiz.tasks = _.shuffle(quiz.tasks);
    for (let i = 0; i < quiz.tasks.length; i++) {
      quiz.tasks[i].answers = _.shuffle(quiz.tasks[i].answers);
    }
    return quiz;
  }

  static getTask(index) {
    return this.quiz.tasks[index];
  }

  static isLastQuestion(index) {
    return this.quiz.tasks.length === index + 1;
  }

  static clear() {
    this.quiz = undefined;
    this.completedTasks = [];
  }
}
