import {Component, OnInit} from '@angular/core';
import {textArr} from "../text-data";
import {Direction} from "@angular/cdk/bidi/directionality";
import * as _ from "lodash";
import {Unicode} from "../app.component";
import * as he from "he";


@Component({
  selector: 'app-solution1',
  templateUrl: './solution1.component.html',
  styleUrls: ['./solution1.component.scss']
})
export class Solution1Component implements OnInit {
  texts = textArr;
  selectedText = this.texts[0];
  inputValue = '';
  preview = '';
  dir: Direction = 'ltr';
  selectionStart: number = 0;
  directions = ['ltr', 'rtl', 'auto']
  he = he;
  lastAddedUnicode = '';
  highlightedText = '';

  ngOnInit(): void {
    this.updateInputValue();
  }

  showSelectedText() {
    let text = "";
    if (window.getSelection) {
      // @ts-ignore
      text = window.getSelection().toString();
      // @ts-ignore
    } else if (document.selection && document.selection.type != "Control") {
      // @ts-ignore
      text = document.selection.createRange().text;
    }
    this.highlightedText = text;
  }

  onChange(value: string) {
    this.preview = _.cloneDeep(he.decode(value));
  }


  UndoUnicode(lastAddedUnicode: string) {
    this.inputValue = he.decode(he.encode(this.inputValue).replace(lastAddedUnicode, ""));
    this.inputValue = _.cloneDeep(he.decode(this.inputValue));
  }

  onRightToLeftClick() {
    const text = `\u2067${this.highlightedText}\u2069`;
    this.inputValue = this.inputValue.replace(this.highlightedText, text);
  }


  onLeftToRightClick() {
    const text = `\u2066${this.highlightedText}\u2069`;
    this.inputValue = this.inputValue.replace(this.highlightedText, text);
  }


  onTextAreaClick(textArea: HTMLTextAreaElement) {
    this.selectionStart = textArea.selectionStart;
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
