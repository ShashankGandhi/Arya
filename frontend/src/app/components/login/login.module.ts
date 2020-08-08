import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
// import { InterceptorServices } from 'src/app/_services';

@NgModule({
  imports: [FormsModule, LoginRoutingModule],
  exports: [],
  declarations: [LoginComponent],
  providers: [LoginService]
})
export class LoginModule {}
