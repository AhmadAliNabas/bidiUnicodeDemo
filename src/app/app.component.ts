import {Component, OnInit} from '@angular/core';
import {textArr} from "./text-data";
import * as _ from "lodash";
import {Direction} from "@angular/cdk/bidi/directionality";
import * as he from "he";

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
