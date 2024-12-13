import { Component, OnInit } from '@angular/core';
import { StepperComponent } from '../stepper/stepper.component';
import { SelectionComponent } from '../selection/selection.component';
import { PathService } from '../path-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ValidationComponent } from '../validation/validation.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { CardComponent } from '../card/card.component';

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
    CardComponent,
    CardComponent,
  ],
  templateUrl: './etape.component.html',
  styleUrl: './etape.component.css',
})
export class EtapeComponent implements OnInit {
  steps = [
    { title: 'Sélection moodboard', done: false, current: true },
    { title: 'Sélection thème', done: false, current: false },
    { title: 'Finalisation', done: false, current: false },
    { title: 'Connexion', done: false, current: false },
  ];

  indication = [
    {
      titre: 'Sélectionner des images qui vous inspirent',
      text: 'Faîtes votre sélection et nous nous chargeons de trouver le thème GoodBarber adapté à vos envies.',
    },
    {
      titre: 'Thème correspondant à votre sélection',
      text: "Ce thème est celui qui s'approche le plus de ce que vous souhaitez, s'il ne vous convient pas, retournez à l'étape précédente et refaite votre sélection !",
    },
    {
      titre: 'Donnez un nom à votre application',
      text: "Pour finir le processus, il ne vous reste plus qu'à donner un nom à votre application !",
    },
    {
      titre: 'Connectez-vous pour valider le processus',
      text: 'Une fois connecté, votre application sera officiellement créée',
    },
  ];

  // lot d'image à load
  images_moodboard = new Array();

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

  ngOnInit() {
    for (let i = 1; i < 28; i++) {
      this.images_moodboard.push('mobbin_save/' + i + '.png');
    }
  }

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
        // this.images_selected = [];
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
