import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SharedSearchWordService {

  ////// using behavior subject as a service to share data among all components
  private searchWord = new BehaviorSubject<string>('');

  constructor() { }

  getSearchWord() {
    return this.searchWord.asObservable();
  }

  setSearchWord(word: string) {
    this.searchWord.next(word);
  }
}
