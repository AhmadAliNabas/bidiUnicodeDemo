import { Component, OnInit } from '@angular/core';
import {textArr} from "../text-data";
import {Direction} from "@angular/cdk/bidi/directionality";
import * as _ from "lodash";
import {Unicode} from "../app.component";
import * as he from "he";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  texts = textArr;
  selectedText = this.texts[0];
  inputValue = '';
  preview = '';
  dir: Direction = 'ltr';
  unicodeArr: Unicode[] = [
    {abbreviation: 'LRE', code: '\u202A', description: 'Left to Right Embedding'},
    {abbreviation: 'RLE', code: '\u202B', description: 'Right to Left Embedding'},
    {abbreviation: 'PDF', code: '\u200C', description: 'Pop Directional Formatting (ending an embedding)'},
    {abbreviation: 'LRI', code: '\u2066', description: 'Left to Right Isolate'},
    {abbreviation: 'RLI', code: '\u2067', description: 'Right to Left Isolate'},
    {abbreviation: 'FSI', code: '\u2068', description: 'First Strong Isolate'},
    {abbreviation: 'PDI', code: '\u2069', description: 'Pop Directional Isolate (ending an isolate)'},
    {abbreviation: 'RLM', code: '\u200F', description: 'Right to Left mark'},
    {abbreviation: 'LRM', code: '\u200E', description: 'Left-to-right mark'},
    {abbreviation: 'ALM', code: '\u061C', description: 'Arabic letter mark'},
    //&rlm; &lrm; $alm;
  ];
  selectionStart: number = 0;
  directions = ['ltr', 'rtl', 'auto']
  he = he;
  lastAddedUnicode = '';

  onChange(value: string) {
    this.preview = _.cloneDeep(he.decode(value));
  }


  undoUnicode(lastAddedUnicode: string) {
    this.inputValue = he.decode(he.encode(this.inputValue).replace(lastAddedUnicode, ""));
    this.inputValue = _.cloneDeep(he.decode(this.inputValue));
  }

  ngOnInit(): void {
    this.updateInputValue();
  }

  onTextAreaClick(textArea: HTMLTextAreaElement) {
    this.selectionStart = textArea.selectionStart;
  }

  onUnicodeButtonClick(unicode: Unicode) {
    this.inputValue = this.insertAt(this.selectionStart, this.inputValue, unicode.code);
    this.lastAddedUnicode = he.encode(unicode.code);
  }

  onResetButtonClick() {
    this.updateInputValue();
  }

  insertAt(selectionStart: number, inputValue: string, code: string): string {
    return inputValue.slice(0, selectionStart) + code + inputValue.slice(selectionStart);
  };

  updateInputValue() {
    this.inputValue = _.cloneDeep(he.decode(this.selectedText));
    this.preview = _.cloneDeep(this.inputValue);
  }
}
