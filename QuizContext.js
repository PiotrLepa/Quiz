export default class QuizContext {
  completedQuestions = [];

  static saveUserAnswer(index, correct) {
    const question = this.getQuestion(index);
    console.log(question);
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
