import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  imageError: string;
  showImage: boolean;
  cardImageBase64: string;
  base64Image: string;
  file: File;
  constructor(private sanitizer: DomSanitizer, private router: Router) {}
  ngOnInit(): void {}

  //Call this method in the image source, it will sanitize it.
  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image);
  }

  handleInputChange(event) {
    this.file = event.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!this.file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(this.file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    var base64result = reader.result;
    this.base64Image = base64result;
  }

  submit() {
    // console.log('in submit======');
    // this.transform();
    this.showImage = true;
  }

  // to logout
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
