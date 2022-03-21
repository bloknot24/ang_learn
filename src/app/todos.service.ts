import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';

export interface Todo {
    completed: boolean
    title: string
    id?: number
}

@Injectable({providedIn: 'root'})
export class TodosService {

    constructor(private http: HttpClient) {}

    addTodo(todo: Todo): Observable<Todo> {
        const headers = new HttpHeaders({
            'MyCustomHeader': Math.random().toString(),
            'JMkfekj': '231'
        })
        return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo, {
            headers
        })
    }

    fetchTodos(): Observable<Todo[]> {
        let params = new HttpParams()
        params = params.append('_limit', '4')
        params = params.append('custom', 'anything')

        return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
            //params: new HttpParams().set('_limit', '3')
            params
        })
        .pipe(
            delay(500),
            catchError(error => {
                console.log('Error: ', error.message)
                return throwError(error)
            })
        )
    }

    removeTodo(id: any): Observable<void> {
        return this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`)
    }

    completeTodo(id: any): Observable<Todo> {
        return this.http.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            completed: true
        })
    }
}
