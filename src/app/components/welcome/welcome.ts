import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Voor navigatie
import { FormsModule } from '@angular/forms';  // Voor two-way binding
import { CommonModule } from '@angular/common';  // Voor *ngIf
import { Quiz } from '../../services/quiz';  // Onze service

@Component({
  selector: 'app-welcome',
  imports: [FormsModule, CommonModule],  // Importeer FormsModule en CommonModule
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome {
  name: string = '';  // Hier slaan we de naam op
  errorMessage: string = '';  // Voor error melding

  // Dependency Injection - Angular geeft ons automatisch deze services
  constructor(
    private quizService: Quiz,  // Onze quiz service
    private router: Router      // Router voor navigatie
  ) {}

  // Functie die wordt aangeroepen als ze op "Start" klikken
  startQuiz(): void {
    // Check of er een naam is ingevuld
    if (this.name.trim()) {
      // Check of de naam "Femke" is (case insensitive)
      if (this.name.trim().toLowerCase() === 'femke') {
        // Sla de naam op in de service
        this.quizService.setUserName(this.name);
        // Navigeer naar de quiz pagina
        this.router.navigate(['/quiz']);
      } else {
        // Verkeerde naam - toon error
        this.errorMessage = 'Deze quiz is alleen voor Femke! 💕';
      }
    }
  }

  // Clear error als ze weer begint te typen
  onNameChange(): void {
    this.errorMessage = '';
  }
}
