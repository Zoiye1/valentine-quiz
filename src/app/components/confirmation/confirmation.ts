import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Quiz, Answer } from '../../services/quiz';

interface DateDetails {
  name: string;
  food: string;
  foodImage: string;
  location: string;
  locationImage: string;
  date: string;
}

@Component({
  selector: 'app-confirmation',
  imports: [CommonModule],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.scss',
})
export class ConfirmationComponent {
  isEnvelopeOpen: boolean = false;
  dateDetails: DateDetails | null = null;

  constructor(private quizService: Quiz) {
    // Bij het laden van de component, bereid de date details voor
    this.prepareDateDetails();
  }

  openEnvelope(): void {
    this.isEnvelopeOpen = true;
  }

  prepareDateDetails(): void {
    const answers = this.quizService.getAnswers();
    const questions = this.quizService.getQuestions();

    // Vind specifieke antwoorden
    const foodAnswer = this.findAnswer(answers, 4); // Question ID 3 is food
    const locationAnswer = this.findAnswer(answers, 6); // Question ID 5 is location

    // Vind de images bij de antwoorden
    const foodQuestion = questions.find(q => q.id === 4);
    const locationQuestion = questions.find(q => q.id === 6);

    this.dateDetails = {
      name: this.quizService.getUserName(),
      food: foodAnswer || 'Verassing',
      foodImage: this.getImageForAnswer(foodQuestion, foodAnswer),
      location: locationAnswer === 'Mijn' ? 'Jouw huis' : 'Mijn huis',
      locationImage: this.getImageForAnswer(locationQuestion, locationAnswer),
      date: '14 Februari 2026',
    };
  }

  private findAnswer(answers: Answer[], questionId: number): string | null {
    const answer = answers.find(a => a.questionId === questionId);
    return answer ? answer.answer : null;
  }

  private getImageForAnswer(question: any, answer: string | null): string {
    if (!question || !answer) return '';

    // Voor multiple choice vragen
    if (question.type === 'multiple-choice' && question.images) {
      return question.images[answer] || '';
    }

    return '';
  }
}
