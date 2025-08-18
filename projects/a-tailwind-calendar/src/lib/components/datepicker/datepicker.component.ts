import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, inject, input, OnChanges, Output, signal } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';
import { InputGroupComponent } from '../input-group/input-group.component';
import { convertDateFormatToDate, formatDateToDDMMYYYY } from '../../helpers/dateHelpers';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [CommonModule, IconsComponent, InputGroupComponent],
  templateUrl: './datepicker.component.html',
})
export class DatepickerComponent implements OnChanges {
  @Output() dateSelected = new EventEmitter<Date>();

  public currentDate = input<Date | null>(null);
  public nonWorkingDay = input<string[]>([]);
  public disabledDayWeek = input<number[]>([]);
  public selectableDays = input<string[]>([]);

  selectedDate = signal<Date | null>(null);
  calendarDate = signal(new Date());
  selects = input<boolean>(false);

  daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

  readonly safeDate = computed(() => {
    if (this.selectableDays().length) {
      return convertDateFormatToDate(this.selectableDays()[0]);
    }

    return this.currentDate() ?? new Date();
  });

  month = computed(() => this.safeDate().toLocaleString('default', { month: 'long' }));
  year = computed(() => this.safeDate().getFullYear());

  months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' }));
  years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);

  daysInMonth = computed(() => {
    const date = this.calendarDate();
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    return Array.from({ length: start.getDay() }, () => 0).concat(
      Array.from({ length: end.getDate() }, (_, i) => i + 1),
    );
  });

  ngOnChanges() {
    this.calendarDate.set(this.safeDate());
    this.selectedDate.set(this.currentDate());
  }

  prevMonth() {
    const date = new Date(this.calendarDate());
    date.setMonth(date.getMonth() - 1);

    this.calendarDate.set(date);
  }

  nextMonth() {
    const date = new Date(this.calendarDate());
    date.setMonth(date.getMonth() + 1);

    this.calendarDate.set(date);
  }

  selectDay(day: number) {
    if (day > 0 && !this.isInabledDay(day)) {
      const date = new Date(this.calendarDate());
      date.setDate(day);

      this.selectedDate.set(date);
      this.dateSelected.emit(date);
    }
  }

  isToday(day: number): boolean {
    const today = new Date();
    const date = new Date(this.safeDate());

    if (this.selectableDays().length === 0) {
      date.setDate(day);

      return (
        day > 0 &&
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    } else {
      return this.offsetStartDay(day);
    }
  }

  private offsetStartDay = (day: number): boolean => {
    const safeDate = +formatDateToDDMMYYYY(this.safeDate()).split('/')[0];
    return day === safeDate;
  };

  isSelected(day: number) {
    const selected = this.selectedDate();
    const date = new Date(this.safeDate());

    date.setDate(day);

    return (
      day > 0 &&
      selected &&
      date.getDate() === selected.getDate() &&
      date.getMonth() === selected.getMonth() &&
      date.getFullYear() === selected.getFullYear()
    );
  }

  isInabledDay(day: number) {
    const date = new Date(this.calendarDate());
    date.setDate(day);

    const dayOfWeek = date.getDay();
    const isWeekend = this.disabledDayWeek().includes(dayOfWeek);

    const formattedDate =
      date.toLocaleDateString().split('/')[0].toString().padStart(2, '0') +
      '/' +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      '/' +
      date.getFullYear();
    const isHoliday = this.nonWorkingDay().includes(formattedDate);

    if (this.selectableDays().length > 0) {
      return !this.selectableDays().includes(formattedDate) || isWeekend;
    }

    return isWeekend || isHoliday;
  }

  monthChange(event: Event) {
    const month = parseInt((event.target as HTMLSelectElement).value, 10);
    const date = new Date(this.calendarDate());
    date.setMonth(month);
    this.calendarDate.set(date);
  }

  yearChange(event: Event) {
    const year = parseInt((event.target as HTMLSelectElement).value, 10);
    const date = new Date(this.calendarDate());
    date.setFullYear(year);
    this.calendarDate.set(date);
  }
}
