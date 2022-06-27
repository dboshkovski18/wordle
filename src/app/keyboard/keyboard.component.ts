import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent implements OnInit {

  public alphabet: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  public guessedLetters: string[] = []

  @Input() randomWord: string[] = []
  @Input() gameOver: boolean | undefined;
  @Output() public newLetterEvent = new EventEmitter<string>();
  @Output() public deleteLetterEvent = new EventEmitter<string>();
  @Output() public checkTheWordEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  addLetter(letter: string) {
    if (this.guessedLetters.length >= 5) {
      return;
    }
    this.guessedLetters.push(letter)
    this.newLetterEvent.emit(letter)
  }
  removeLast() {
    console.log(this.guessedLetters)
    console.log("Remove last")
    this.deleteLetterEvent.emit(this.guessedLetters.pop())
    console.log(this.guessedLetters)
  }

  checkTheWord() {
    if (this.guessedLetters.length < 5) {
      return;
    }

    for (let i = 0; i < this.guessedLetters.length; i++) {
      if (this.guessedLetters[i] === this.randomWord[i]) {
        document.getElementById(this.guessedLetters[i])?.classList.add('success')
        document.getElementById('' + i + '')?.classList.add('success')
      } else if (this.randomWord.includes(this.guessedLetters[i])) {
        document.getElementById(this.guessedLetters[i])?.classList.add('match')
        document.getElementById('' + i + '')?.classList.add('match')
      } else {
        document.getElementById(this.guessedLetters[i])?.classList.add('lost')
        document.getElementById('' + i + '')?.classList.add('lost')
      }
    }

    this.checkTheWordEvent.emit(true)
  }

}
