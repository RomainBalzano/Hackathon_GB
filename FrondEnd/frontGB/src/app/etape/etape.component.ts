import { Component } from '@angular/core';
import { StepperComponent } from '../stepper/stepper.component';
import { SelectionComponent } from '../selection/selection.component';
import { PathService } from '../path-service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-etape',
  standalone: true,
  imports: [StepperComponent, SelectionComponent,HttpClientModule],
  templateUrl: './etape.component.html',
  styleUrl: './etape.component.css',
})
export class EtapeComponent {
  steps = [
    { title: 'Sélection moodboard', done: false, current: true },
    { title: 'Sélection thème', done: false, current: false },
    { title: 'Sélection navigation', done: false, current: false },
    { title: 'Validation', done: false, current: false },
    { title: 'Connexion', done: false, current: false },
  ];

  // lot d'image à load
  images_moodboard = [
    'original-59389f72068ff21d26cb3499ee205d64.jpg',
    'original-3993be19e330359a36fe1c51df745f25.jpg',
  ];

  images_theme = ['booking_231_floatingtabbar_withmenu@2x.webp'];

  images_nav = ['logo.png'];

  step_images = [
    { images: this.images_moodboard, preview: false },
    { images: this.images_theme, preview: true },
    { images: this.images_nav, preview: true },
  ];

  current_step = 0;

  constructor(private pathService: PathService) {}

  nextStep() {
    this.steps[this.current_step].current = false;
    this.steps[this.current_step].done = true;

    if (this.current_step < this.steps.length - 1) {
      this.current_step += 1;
      this.steps[this.current_step].current = true;

      // Envoyer les chemins des images moodboard si c'est le premier step
      if (this.current_step === 1) {
        this.sendMoodboardPaths();
      }
    }
  }

  sendMoodboardPaths() {
    this.pathService.sendPaths(this.images_moodboard).subscribe(
      (response) => {
        console.log('Réponse du serveur Flask :', response);
      },
      (error) => {
        console.error('Erreur lors de l\'envoi des données :', error);
      }
    );
  }
}
