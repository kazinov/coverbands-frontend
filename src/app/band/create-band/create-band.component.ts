import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-band',
  templateUrl: './create-band.component.html',
  styleUrls: ['./create-band.component.scss']
})
export class CreateBandComponent implements OnInit {
  form: FormGroup;
  addBandForm: FormGroup;

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

    this.addBandForm = this.formBuilder.group({
      bandName: ['', [Validators.required]],
      song: ['', []]
    });
  }
}
