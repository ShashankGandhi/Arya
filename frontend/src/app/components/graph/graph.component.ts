import { Component, OnInit } from '@angular/core';
import { GraphService } from './graph.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnInit {
  constructor(private graphService: GraphService, private router: Router) {}
  ngOnInit(): void {}
  events: string[] = [];
  fromDate: string = '2018-11-01';
  toDate: string = '2019-27-02';
  isLoading = false;
  options: any;
  totalAccepted: Number;
  totalNumber: Number;
  graphType: string;

  handleChange(key, event) {
    if (key === 'fromDate') {
      this.fromDate = event.target.value
    } else if (key === 'toDate') {
      this.toDate = event.target.value
    }
  }

  submit() {
    const postObj = {
      fromDate: this.fromDate,
      toDate: this.toDate,
    };
    this.graphService.getGraphData(postObj).subscribe((res) => {
      if (res.status === 'failure') {
        alert(res.message ? res.message : 'Error occurred while retreiving the data');
      }
      this.options = res.data;
      this.totalAccepted = res.data.totalAccepted;
      this.totalNumber = res.data.totalNumber;
      this.graphType = res.data.graphType;
    });
  }

  // to logout
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
