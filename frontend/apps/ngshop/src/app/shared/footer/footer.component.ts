import { Component } from '@angular/core';

@Component({
  selector: 'eshop-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  get lastYear(): number {
    return new Date().getFullYear();
  }
}
