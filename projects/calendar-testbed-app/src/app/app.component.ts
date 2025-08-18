import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ATailwindCalendarComponent } from 'a-tailwind-calendar';


@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ATailwindCalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Calendar';
}
