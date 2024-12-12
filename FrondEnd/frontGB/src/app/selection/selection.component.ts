import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.css',
})
export class SelectionComponent {
  changePreview(img: string) {
    this.current_image = img;
  }
  // path de l'image actuelle
  current_image = '';

  preview = false;

  // liste des images
  @Input() images = [''];
}
