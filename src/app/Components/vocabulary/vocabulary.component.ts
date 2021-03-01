import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VocabularyService} from '../../services/vocabulary.service';
import {ToasterService} from '../../services/toaster.service';

interface List {
  author: string;
  current_vote: string;
  defid: number;
  definition: string;
  example: string;
  permalink: string;
  sound_urls: any[];
  thumbs_down: number;
  thumbs_up: number;
  word: string;
  written_on: Date;
}

export interface ExplanationType {
  list: List[] | null;
}

@Component({
  selector: 'app-vocabulary',
  template: `
    <div>
      <form [formGroup]="searchWord" (ngSubmit)="getWord()">
        <mat-form-field floatLabel="never" class="w100">
          <mat-label>Type your word ...</mat-label>
          <input matInput search formControlName="wordSearch">
        </mat-form-field>
        <button mat-flat-button color="primary">Search</button>
      </form>
      <!--Results -->
      <br/>
      <div>
        <mat-card class="vocabulary_card" *ngFor="let explanation of getExplList">
          <mat-card-title>
            <a [href]="explanation.permalink" target="_blank">{{explanation.word}}</a>
          </mat-card-title>
          <mat-card-content>
            <div>{{explanation.definition}}</div>
            <br/>
            <div><i>{{explanation.example}}</i></div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    '.vocabulary_card {margin-bottom: 14px}'
  ]
})

export class VocabularyComponent implements OnInit {
  public searchWord: FormGroup;
  public explanationArr: ExplanationType;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private vocabularyService: VocabularyService,
    private toastService: ToasterService) {
  }

  createForm() {
    this.searchWord = this.formBuilder.group({
      wordSearch: ['', [Validators.required]]
    });
  }

  get getExplList() {
    return this.explanationArr && this.explanationArr.list;
  }

  getWord() {
    const searchWord: string = this.searchWord.get('wordSearch').value;
    if (searchWord['length'] > 1) {
      this.vocabularyService.getExplanation(this.searchWord.get('wordSearch').value).subscribe((explanation: ExplanationType) => {
        this.explanationArr = explanation;
        this.searchWord.reset();
      }, error => {
        this.toastService.showToast('cantFetchWord', 'error');
      });
    }
  }

  ngOnInit() {
    this.createForm();
  }

}

