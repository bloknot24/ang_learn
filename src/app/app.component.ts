import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { Todo, TodosService } from './todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    todos: Todo[] = []
    loading = false
    error: string = ''
    todoTitle = ''

    constructor(private todosService: TodosService) {}

    ngOnInit() {
        this.fetchTodos()
    }

    addTodo() {
        if(!this.todoTitle.trim()) {
            return
        }

        this.todosService.addTodo({
            title: this.todoTitle,
            completed: false
        }).subscribe(todo => {
            this.todos.push(todo)
            this.todoTitle = ''
        })
    }

    fetchTodos() {
        this.loading = true
        this.todosService.fetchTodos()
        .subscribe(todos => {
            this.todos = todos
            this.loading = false
        }, error => {
            this.error = error.message
        })
    }

    removeTodo(id: any) {
        this.todosService.removeTodo(id)
        .subscribe( () => {
            this.todos = this.todos.filter(t => t.id !== id)
        })
    }

    completeTodo(id: any) {
        this.todosService.completeTodo(id).subscribe( todo => {
            this.todos.find(t => t.id === todo.id)!.completed = true
        })
    }
}
