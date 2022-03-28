import { Component } from '@angular/core';
import { trigger, keyframes, transition, query, group, style, state, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
      trigger('box', [
          state('start', style({ background: 'blue' })),
          state('end', style({
              background: 'red',
              transform: 'scale(1.2)'
          })),
          state('special', style({
              background: 'orange',
              transform: 'scale(0.5)',
              borderRadius: '50%'
          })),
          transition('start => end', animate(450)),
          transition('end => start', animate('800ms ease-in-out')),
          transition('special <=> *', [ // * из любого состояния в sp.
              group([
                  query('h4', animate(1500, style({ // получаем доступ в внутренним элементам
                      fontSize: '.5rem',
                      color: 'red'
                  }))),
                  style({ background: 'green' }),
                  animate('1s', style({
                      background: 'pink'
                  })),
                  animate(750)
              ])
          ]),
          // void => *
          transition(':enter', [ // void - для необозначенных элементов
              animate('4s', keyframes([ // метод показывает 4 стиля за 4 секунды
                  style({ background: 'red', offset: 0 }),
                  style({ background: 'black', offset: 0.2 }),
                  style({ background: 'orange', offset: 0.3 }),
                  style({ background: 'blue', offset: 1 })
              ]))
              // style({ opacity: 0 }),
              // animate('850ms ease-out')
          ]),
          // * => void
          transition(':leave', [
              style({ opacity: 1 }),
              group([ // передаем сюда список анимаций, которые должны запускаться вместе
                  animate(750, style({
                      opacity: 0,
                      transform: 'scale(1.2)'
                  })),
                  animate(300, style({
                      color: '#000',
                      fontWeight: 'bold'
                  }))
              ])
          ])
      ])
  ]
})

export class AppComponent {
    boxState = 'start'

    visible = true

    animate() {
        this.boxState = this.boxState === 'end' ? 'start' : 'end'
    }

    animationStarted(event: any) {
        console.log('animationStarted', event)
    }

    animationDone(event: any) {
        console.log('animationDone', event)
    }
}
