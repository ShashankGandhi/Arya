import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { GraphComponent } from './graph.component';
import { GraphService } from './graph.service';
import { FormsModule } from '@angular/forms';
import { GraphRoutingModule } from './graph-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  imports: [
    FormsModule,
    GraphRoutingModule,
    NgxEchartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatTableModule
  ],
  exports: [],
  declarations: [GraphComponent],
  providers: [GraphService],
})
export class GraphModule {}
