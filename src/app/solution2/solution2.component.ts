import {Component, OnInit} from '@angular/core';
import {textArr} from "../text-data";
import {Direction} from "@angular/cdk/bidi/directionality";
import * as _ from "lodash";
import * as he from "he";


@Component({
  selector: 'app-solution2',
  templateUrl: './solution2.component.html',
  styleUrls: ['./solution2.component.scss']
})
export class Solution2Component implements OnInit {


  texts = textArr;
  selectedText = this.texts[0];
  inputValue = '';
  preview = '';
  dir: Direction = 'ltr';
  directions = ['ltr', 'rtl', 'auto']
  he = he;
  fields: { inputValue: string, dir: Direction } [] = [];

  onChange(value: string) {
    this.preview = _.cloneDeep(he.decode(value));
  }

  ngOnInit(): void {
    this.updateInputValue();
  }


  addField() {
    this.fields.push({inputValue: '', dir: 'ltr'});
  }


  updatePreview() {
    let text = '';
    this.fields.forEach((field) => {
      if (field.dir === 'rtl') {
        text += `\u2067${field.inputValue}\u2069`;
      } else {
        text += `\u2066${field.inputValue}\u2069`;
      }
    })
    this.inputValue = text;
  }

  insertAt(selectionStart: number, inputValue: string, code: string): string {
    return inputValue.slice(0, selectionStart) + code + inputValue.slice(selectionStart);
  };

  updateInputValue() {
    this.inputValue = _.cloneDeep(he.decode(this.selectedText));
    this.preview = _.cloneDeep(this.inputValue);
    this.fields = [];
    this.fields.push({inputValue: this.inputValue, dir: this.dir});
  }
}
