import {ControlValueAccessor} from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

export abstract class ValueAccessorBase<T> implements ControlValueAccessor {
  private innerValue: T;

  private changed = new Array<(value: T) => void>();
  private touched = new Array<() => void>();

  constructor(protected changeDetectorRef: ChangeDetectorRef) {
  }

  get value(): T {
    return this.innerValue;
  }

  set value(value: T) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.changed.forEach(f => f(value));
    }
  }

  writeValue(value: T) {
    this.innerValue = value;

    // this fixes the problem described here: https://github.com/angular/angular/issues/21780
    this.changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: (value: T) => void) {
    this.changed.push(fn);
  }

  registerOnTouched(fn: () => void) {
    this.touched.push(fn);
  }

  touch() {
    this.touched.forEach(f => f());
  }
}
