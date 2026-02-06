import { Routes } from '@angular/router';
import { Welcome } from './components/welcome/welcome';
import { QuizComponent } from './components/quiz/quiz';
import { ConfirmationComponent  } from './components/confirmation/confirmation';

export const routes: Routes = [
  { path: '', component: Welcome },
  { path: 'quiz', component: QuizComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: '**', redirectTo: '' }
];
