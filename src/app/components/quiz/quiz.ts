import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Quiz, MultipleChoiceQuestion, TwoChoiceQuestion } from '../../services/quiz';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss',
})

export class QuizComponent {
  currentQuestionIndex: number = 0;
  questions: (MultipleChoiceQuestion | TwoChoiceQuestion)[] = [];

  constructor(
    private quizService: Quiz,
    private router: Router
  ) {
    this.questions = this.quizService.getQuestions();
  }

  getCurrentQuestion(): MultipleChoiceQuestion | TwoChoiceQuestion | undefined {
    return this.questions[this.currentQuestionIndex];
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex == (this.questions.length - 1)) {
      this.router.navigate(['/confirmation']);
    } else {
      this.currentQuestionIndex = this.currentQuestionIndex + 1;
    }
  }

  restartQuiz(): void {
    this.router.navigate(['/']);
  }


  selectAnswer(answer: string) {
    const Answer = {
      questionId: this.getCurrentQuestion()!.id,
      answer: answer
    }

    this.quizService.addAnswer(Answer)

    this.nextQuestion();

  }

  getMultipleChoiceOptions(): string[] {
    const question = this.getCurrentQuestion();
    if (question && question.type === 'multiple-choice') {
      return (question as MultipleChoiceQuestion).options;
    }
    return [];
  }


}
