import { Component, Input, OnInit } from '@angular/core';
import { WORDS } from 'src/mock-words';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Wordle';
  randomWord: string[] = [];
  randomWordDescription: string | undefined;
  guessWord: string[] = [];
  counter: number | undefined;
  winner = false;
  losser = false;
  tries = 0;
  gameOver = false;



  ngOnInit(): void {
    let word = WORDS[Math.floor(Math.random() * WORDS.length)];
    this.randomWord = word.word.split('');
    this.randomWordDescription = word.description;
    console.log("random word: ", this.randomWord)
    this.guessWord = ['', '', '', '', ''];
    this.counter = 0;

  }

  addLetter(newLetter: string) {
    if (this.counter === 5) {
      return;
    }
    this.guessWord[this.counter!++] = newLetter;
    console.log("app component", this.guessWord)
  }

  deleteLetter(letter: string) {
    if (this.counter === 0) {
      return;
    }
    this.guessWord[--this.counter!] = ''
    this.losser = false;
    this.winner = false;
  }

  checkLetter(letter: string): boolean {
    return this.guessWord.includes(letter);
  }

  checkTheWord(value: boolean) {

    this.tries++;
    if (this.tries >= 3) {
      this.guessWord = this.randomWord;
      this.gameOver = true;
      return;
    }
    if (this.guessWord.join() === this.randomWord.join()) {
      console.log("Match!")
      this.winner = true;
      this.gameOver = true;
      return;
    }

    for (let i = 0; i < this.randomWord.length; i++) {
      if (this.guessWord[i] === this.randomWord[i]) {
        document.getElementById('' + i + '')?.classList.add('winner')
      } else {
        if (this.randomWord.includes(this.guessWord[i])) {
          document.getElementById('' + i + '')?.classList.add('match')
        } else {
          document.getElementById('' + i + '')?.classList.add('lost')
        }
      }
    }
  }

  rightPlace(index: number): boolean {
    return this.guessWord[index] === this.randomWord[index];
  }
}
