import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-band',
  templateUrl: './create-band.component.html',
  styleUrls: ['./create-band.component.scss']
})
export class CreateBandComponent implements OnInit {
  addBandForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    this.addBandForm = this.formBuilder.group({
      bandName: ['', [Validators.required]],
      song: ['', []]
    });
  }
}
