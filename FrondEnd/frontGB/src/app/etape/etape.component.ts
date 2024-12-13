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
  gbRespond : string[] = [];
  steps = [
    { title: 'Sélection moodboard', done: false, current: true },
    { title: 'Sélection thème', done: false, current: false },
    { title: 'Finalisation', done: false, current: false },
    { title: 'Connexion', done: false, current: false },
  ];

  images_moodboard: string[] = [];
  images_theme: string[] = [''];
  images_nav: string[] = ['logo.png'];
  images_selected: string[] = [];
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
  step_images = [
    { images: this.images_moodboard, preview: false },
    { images: this.images_theme, preview: true },
    { images: this.images_nav, preview: true },
  ];

  current_step = 0;



  constructor(private pathService: PathService) {}

  ngOnInit() {
    // Charger les images du moodboard
    for (let i = 1; i < 28; i++) {
      this.images_moodboard.push('mobbin_save/' + i + '.png');
    }
  }

  backStep() {
    this.steps[this.current_step].current = false;
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
      if (this.current_step === 1) {
        this.sendMoodboardPaths();
      }
    }
  }

  toggleImageSelection(image: string) {
    if (this.images_selected.includes(image)) {
      this.images_selected = this.images_selected.filter(img => img !== image);
    } else {
      this.images_selected.push(image);
    }
  }
  sendUserChoicePaths() {
    console.log("yoshi");
  }

  sendMoodboardPaths() {
    if (this.images_selected.length === 0) {
      console.error("Aucune image sélectionnée pour l'envoi.");
      return;
    }

    console.log('Images sélectionnées pour l\'envoi :', this.images_selected);

    this.pathService.sendPrefilledPaths(this.images_selected.map(image => image.replace('mobbin_save/', ''))).subscribe(
      (response: { gb_images: string[] }) => {
        console.log('Réponse du serveur Flask :', response.gb_images);
        this.gbRespond = response.gb_images;

        this.images_selected = [];
        console.log(this.images_selected);
      },
      (error) => {
        console.error("Erreur lors de l'envoi des données :", error);
      }
    );
  }
}
