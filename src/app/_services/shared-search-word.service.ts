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

  //if we use signals
  /*

  let searchWord = signal<string>('');

  //method  to receive the shared data
  getSearchWord() : any {
    return this.searchWord;
  }

  //method  to update the shared data
  setSearchWord(word: string) {
    this.searchWord.update(() => word)
  }

  */
}
