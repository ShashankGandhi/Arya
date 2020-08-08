import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [FormsModule, HomeRoutingModule],
  exports: [],
  declarations: [HomeComponent],
  providers: [HomeService]
})
export class HomeModule {}
