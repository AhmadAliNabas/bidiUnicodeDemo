import {Component, OnInit} from '@angular/core';

export interface Unicode {
  abbreviation: string;
  code: string;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
  }

}
