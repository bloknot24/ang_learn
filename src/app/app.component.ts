import { Component, OnInit } from '@angular/core';

export interface Post {
    title: string
    text: string
    id?: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    isVisible = true

    ngOnInit(): void {}

}
