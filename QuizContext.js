export default class QuizContext {
  static completedQuestions = [];

  static getPointsResult() {
    if (this.completedQuestions.length == 0) return null;

    const score =  this._calculateUserResult();
    const maxPoints = this.completedQuestions.length;
    return {
      score,
      maxPoints
    };
  }

  static _calculateUserResult() {
    return this.completedQuestions.reduce((acc, question) => {
      if (question.userAnsweredCorrect) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  static getResult() {
    return this.completedQuestions;
  }

  static saveUserAnswer(index, correct) {
    const question = this.getQuestion(index);
    this.completedQuestions.push({
      ...question,
      userAnsweredCorrect: correct,
    });
  }

  static setCurrentQuiz(quiz) {
    this.clear();
    this.quiz = quiz;
  }

  static getQuestion(index) {
    return this.quiz[index];
  }

  static isLastQuestion(index) {
    return this.quiz.length === index + 1;
  }

  static clear() {
    this.quiz = undefined;
    this.completedQuestions = [];
  }
}
