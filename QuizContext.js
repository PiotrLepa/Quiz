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

  static _calculateUserResult() {
    return this.completedTasks.reduce((acc, question) => {
      if (question.userAnsweredCorrect) {
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
    this.quiz = quiz;
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
