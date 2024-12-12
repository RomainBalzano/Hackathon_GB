import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.css',
})
export class SelectionComponent {
  // image pour preview
  // current_image = '';

  // images sélectionnées
  @Input() selectedImg = [''];
  @Output() selectedImgChange = new EventEmitter<string[]>();

  @Input() preview = false;

  // liste des images à afficher
  @Input() images = [''];

  // @Output() addItemEvent = new EventEmitter<string[]>();

  // addItem() {
  //   this.addItemEvent.emit(img);
  // }

  isSelected(img: string): boolean {
    return this.selectedImg.includes(img);
  }

  onClick(img: string) {
    // this.current_image = img;
    let index = this.selectedImg.indexOf(img);
    // si img pas sélectionnée
    if (index == -1) {
      this.selectedImg.push(img);
    } else {
      this.selectedImg.splice(index, 1);
    }
    // console.log(this.selectedImg);
    this.selectedImgChange.emit(this.selectedImg);
  }
}
