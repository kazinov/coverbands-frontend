import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { BandPrices, Price } from './band-prices.model';

@Component({
  selector: 'app-band-prices',
  templateUrl: './band-prices.component.html',
  styleUrls: ['./band-prices.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BandPricesComponent implements OnInit {
  @Input() prices: BandPrices;
  @Output() pricesChange = new EventEmitter<BandPrices>();
  addPriceFrom: FormGroup;
  @ViewChild('formGroup') formGroup: FormGroupDirective;
  tableColumns: string[] = ['value', 'service', 'remove'];

  ngOnInit() {
    this.buildForms();
  }

  private buildForms(): void {
    this.addPriceFrom = this.formBuilder.group({
      value: ['', [Validators.required]],
      service: ['', []]
    });
  }

  onPriceSubmit() {
    this.prices.prices = [
      ...(this.prices.prices || []),
      this.addPriceFrom.value
    ];

    // this.pricesChange.emit(this.prices);
    this.addPriceFrom.reset();
    this.formGroup.resetForm();
  }

  onLinkDelete(linkToDelete: Price) {
    this.prices.prices = (this.prices.prices || [])
      .filter((price) => {
        return !(price.value === linkToDelete.value
          && price.service === linkToDelete.service);
      });
    // this.pricesChange.emit(this.prices);
  }

  get pricesExist() {
    return this.prices && this.prices.prices && this.prices.prices.length;
  }

  constructor(
    private formBuilder: FormBuilder
  ) {

  }
}
