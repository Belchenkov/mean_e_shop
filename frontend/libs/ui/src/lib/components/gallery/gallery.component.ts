import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styles: [
  ]
})
export class GalleryComponent implements OnInit {
  selectedImageUrl: string = '';

  @Input() images: string[] = [];

  get hasImages(): boolean {
    return this.images?.length > 0;
  }

  ngOnInit(): void {
    this.selectedImageUrl = this.hasImages ? this.images[0] : '';
  }

  changeSelectedImage(imageUrl: string) {
    this.selectedImageUrl = imageUrl;
  }
}
