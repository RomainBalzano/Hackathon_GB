import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  title = 'Bienvenue sur mon site';
  subtitle = 'Explorez nos fonctionnalités';
  buttonText = 'En savoir plus';

  @Input() image = '';

  onButtonClick() {
    console.log('Bouton cliqué !');
  }
}

// card.component.html
