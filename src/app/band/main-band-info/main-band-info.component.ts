import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainBandInfo } from '../band.model';

@Component({
  selector: 'app-main-band-info',
  templateUrl: './main-band-info.component.html',
  styleUrls: ['./main-band-info.component.scss']
})
export class MainBandInfoComponent implements OnInit {
  @Input() saveButtonText = 'Save';
  @Output() saveClick = new EventEmitter<MainBandInfo>();
  form: FormGroup;

  genres: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      genres: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.saveClick.emit(this.form.value);
  }
}
