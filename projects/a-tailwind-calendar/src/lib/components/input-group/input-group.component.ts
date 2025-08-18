import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';
import { IconName } from '../../interfaces/icons/icons.type';

@Component({
  selector: 'app-input-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IconsComponent],
  templateUrl: './input-group.component.html',
  host: {
    class: 'grid w-full border rounded-md',
    style: 'padding-left: 9px;padding-top: 4px;padding-bottom: 4px;padding-right: 9px;',
   },
})
export class InputGroupComponent {
  icon = input<IconName>('');
  margin = input<string>('mr-[5px]');
}
