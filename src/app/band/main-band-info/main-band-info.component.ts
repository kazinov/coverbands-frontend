import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-band-info',
  templateUrl: './main-band-info.component.html',
  styleUrls: ['./main-band-info.component.scss']
})
export class MainBandInfoComponent implements OnInit {
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
      genres: ['', []]
    });
  }
}
