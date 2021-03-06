import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../../shared/interfaces';
import { PostsServices } from '../../shared/posts.services';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {

  form!: FormGroup

  constructor(
      private postsServices: PostsServices,
      private alert: AlertService
  ) {}

  ngOnInit(): void {
      this.form = new FormGroup({
          title: new FormControl(null, Validators.required),
          text: new FormControl(null, Validators.required),
          author: new FormControl(null, Validators.required)
      })
  }

  submit(): any {
      if(this.form.invalid) {
          return
      }

      const post: Post = {
          title: this.form.value.title,
          text: this.form.value.text,
          author: this.form.value.author,
          date: new Date()
      }

      this.postsServices.create(post).subscribe( () => {
          this.form.reset()
          this.alert.success('Пост был создан.')
      })
  }

}
