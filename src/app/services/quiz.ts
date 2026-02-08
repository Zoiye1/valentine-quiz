import { Injectable } from '@angular/core';

export interface MultipleChoiceQuestion {
  id: number;
  question: string;
  type: 'multiple-choice';
  options: string[];
  image?: string;
  images?: { [answer: string]: string }
}

export interface TwoChoiceQuestion {
  id: number;
  question: string;
  type: 'yes-no';
  image?: string;
  images?: { [answer: string]: string }
}


// Interface voor het antwoord op een vraag
export interface Answer {
  questionId: number;
  answer: string;
}

@Injectable({
  providedIn: 'root',  // Dit betekent: deze service is beschikbaar in de hele app
})
export class Quiz {
  // Data die we bijhouden
  private userName: string = '';
  private answers: Answer[] = [];

  // Alle vragen voor de quiz
  private questions: (MultipleChoiceQuestion | TwoChoiceQuestion)[] = [
    {
      id: 1,
      question: 'Ben je vrij op 14 Februari?',
      type: 'yes-no',
      image: 'valentijnsdag.png',
    },

    {
      id: 2,
      question: 'Wil je mijn valentijn zijn?',
      type: 'yes-no',
      images: {
        'Ja': 'happy.png',
        'Nee': 'crying.png'
      }
    },

    {
      id: 3,
      question: 'Zullen we samen koken?',
      type: 'yes-no',
      image: 'koken.jpg',
    },

    {
      id: 4,
      question: 'Wat voor eten zullen we samen maken?',
      type: 'multiple-choice',
      options: ['Pasta', 'Pizza', 'Sushi'],
      images: {
        'Pasta': 'pasta.png',
        'Pizza': 'pizza.png',
        'Sushi': 'sushi.png',
      }
    },

    {
      id: 5,
      question: 'Samen naar nieuwe brent faiyaz album luisteren?',
      type: 'yes-no',
      image: 'icon.jpg',
    },

    {
      id: 6,
      question: 'Bij welk huis?',
      type: 'multiple-choice',
      options: ['Mijn huis', 'Jouw huis'],
      images: {
        'Mijn huis': 'zoiyehuis.jpg',
        'Jouw huis': 'femkehuis.jpg',
      }
    },

  ];

  // Getter methods (zodat components de data kunnen ophalen)
  getUserName(): string {
    return this.userName;
  }

  getQuestions(): (MultipleChoiceQuestion | TwoChoiceQuestion)[] {
    return this.questions;
  }

  getAnswers(): Answer[] {
    return this.answers;
  }

  // Setter methods (zodat components de data kunnen opslaan)
  setUserName(name: string): void {
    this.userName = name;
  }

  addAnswer(answer: Answer): void {
    // Check of dit antwoord al bestaat, zo ja → update
    const existingIndex = this.answers.findIndex(a => a.questionId === answer.questionId);
    if (existingIndex !== -1) {
      this.answers[existingIndex] = answer;
    } else {
      this.answers.push(answer);
    }
  }

  // Reset functie (voor als je de quiz opnieuw wilt doen)
  reset(): void {
    this.userName = '';
    this.answers = [];
  }
}
