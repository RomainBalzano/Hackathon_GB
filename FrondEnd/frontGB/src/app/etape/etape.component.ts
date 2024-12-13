import { Component } from '@angular/core';
import { StepperComponent } from '../stepper/stepper.component';
import { SelectionComponent } from '../selection/selection.component';
import { PathService } from '../path-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ValidationComponent } from '../validation/validation.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { RegisterFormComponent } from '../register-form/register-form.component';

@Component({
  selector: 'app-etape',
  standalone: true,
  imports: [
    StepperComponent,
    SelectionComponent,
    HttpClientModule,
    ValidationComponent,
    LoginFormComponent,
    RegisterFormComponent,
  ],
  templateUrl: './etape.component.html',
  styleUrl: './etape.component.css',
})
export class EtapeComponent {
  steps = [
    { title: 'Sélection moodboard', done: false, current: true },
    { title: 'Sélection thème', done: false, current: false },
    { title: 'Sélection navigation', done: false, current: false },
    { title: 'Finalisation', done: false, current: false },
    { title: 'Connexion', done: false, current: false },
  ];

  // lot d'image à load
  images_moodboard = [
    'original-59389f72068ff21d26cb3499ee205d64.jpg',
    'original-3993be19e330359a36fe1c51df745f25.jpg',
  ];

  images_theme = [''];

  images_nav = ['logo.png'];

  images_selected = new Array();

  // image à afficher en fonction des steps
  step_images = [
    { images: this.images_moodboard, preview: false },
    { images: this.images_theme, preview: true },
    { images: this.images_nav, preview: true },
  ];

  current_step = 0;

  constructor(private pathService: PathService) {}

  backStep() {
    this.steps[this.current_step].current = false;
    // this.steps[this.current_step].done = false;

    if (this.current_step > 0) {
      this.current_step -= 1;
      this.steps[this.current_step].current = true;
      this.steps[this.current_step].done = false;
    }
  }

  nextStep() {
    this.steps[this.current_step].current = false;
    this.steps[this.current_step].done = true;

    if (this.current_step < this.steps.length - 1) {
      this.current_step += 1;
      this.steps[this.current_step].current = true;

      // Envoyer les chemins des images moodboard si c'est le premier step
      // if (this.current_step === 1) {
      //   this.sendMoodboardPaths();
      // }
    }
  }

  sendMoodboardPaths() {
    console.log('images selected');
    console.log(this.images_selected);
    this.pathService.sendPaths(this.images_selected).subscribe(
      (response) => {
        console.log('Réponse du serveur Flask :', response.data.paths);
        this.step_images[1].images = response.data.paths;
        this.images_selected = [];
      },
      (error) => {
        console.error("Erreur lors de l'envoi des données :", error);
      }
    );
  }

  sendUserChoicePaths() {
    console.log('dans user choice');
    this.pathService.sendPaths(this.images_selected).subscribe(
      (response) => {
        console.log('Réponse du serveur Flask :', response.data.paths);
        // this.step_images[1].images = response.data.paths;
      },
      (error) => {
        console.error("Erreur lors de l'envoi des données :", error);
      }
    );
  }
}
