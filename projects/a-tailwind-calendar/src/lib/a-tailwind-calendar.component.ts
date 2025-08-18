import { Component, ElementRef, HostListener, input, output, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputGroupComponent } from './components/input-group/input-group.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';

import { dateFormatYYYYMMDD } from './helpers/dateHelpers';

@Component({
  selector: 'a-tailwind-calendar',
  standalone: true,
  imports: [CommonModule, InputGroupComponent, DatepickerComponent],
  templateUrl: './a-tailwind-calendar.component.html',
  styles: ``
})
export class ATailwindCalendarComponent {
public toggle = signal<boolean>(false);
  public selectorsOfDate = input<boolean>(false);
  public nonWorkingDay = input<string[]>([]);
  public disabledDayWeek = input<number[]>([]);
  public selectableDays = input<string[]>([]);
  public disabled = input(false);
  public isLoading = input(false);
  public change = output();

  @ViewChild('input') input!: ElementRef;

  isCalendarVisible = false;
  formattedDate = '';
  calendarDate: Date | null = null;

  constructor(private readonly elementRef: ElementRef) {}

  private onChange: (value: string) => void = () => {
    this.change.emit();
  };
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.formattedDate = value;
    this.calendarDate = value ? new Date(value) : null;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  showCalendar() {
    this.isCalendarVisible = true;
  }

  onDateSelected(date: Date): void {
    this.formattedDate = date.toLocaleDateString();
    this.isCalendarVisible = false;
    this.toggle.set(false);
    this.calendarDate = date;

    const dateToReturn = dateFormatYYYYMMDD(date, '/');
    this.onChange(dateToReturn);
    this.onTouched();
    this.change.emit();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {

    const tget = this.elementRef.nativeElement;

    if (!tget.contains(event.target)) {
      this.isCalendarVisible = false;
      this.toggle.set(false);
    }
  }

  toggleCalendar(): void {
    this.toggle.update(value => !value);
  }
}
