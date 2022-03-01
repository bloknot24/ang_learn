import { Component, ViewEncapsulation, ChangeDetectionStrategy, ContentChild, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Post } from '../app.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class PostComponent implements OnInit, OnChanges {

  @Input() post!: Post
  @ContentChild('info', {static: true}) infoRef!: ElementRef

  constructor() {
      console.log('constructor')
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log('ngOnChanges', changes)
  }

  ngOnInit(): void {
      console.log('ngOnInit')
      //console.log(this.infoRef.nativeElement)
  }

}
