import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconName } from '../../interfaces/icons/icons.type';

@Component({
  selector: 'app-icons',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './icons.component.html',
})
export class IconsComponent {
  public iconHeight = input('24');
  public iconWidth = input('24');
  public iconName = input.required<IconName>();
  public viewBox = input('0 0 24 24');
}
