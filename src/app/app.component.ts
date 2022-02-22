import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    title: string = 'Dynamic title'
    number: number = 42
    arr: number[] = [1, 2, 3, 4, 5]

    obj = { a: 1, b: {c: 2} }

}
