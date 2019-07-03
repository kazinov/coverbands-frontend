import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { BandPrices, Price } from './band-prices.model';
import { Currencies } from '../../core/currencies/currencies.model';

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
  form: FormGroup;
  @ViewChild('formGroup', { static: true }) formGroup: FormGroupDirective;
  tableColumns: string[] = ['value', 'service', 'remove'];
  pricesDirty: Price[] = [];

  ngOnInit() {
    this.buildForms();
  }

  private buildForms(): void {
    this.pricesDirty = this.prices && this.prices.prices || [];
    this.addPriceFrom = this.formBuilder.group({
      value: ['', [Validators.required]],
      service: ['', []]
    });

    this.form = this.formBuilder.group({
      value: [
        this.prices &&
        this.prices.oneShowPrice &&
        this.prices.oneShowPrice.value, []],
      service: [this.prices &&
      this.prices.oneShowPrice &&
      this.prices.oneShowPrice.service, []]
    });
  }

  onPriceSubmit() {
    this.pricesDirty = [
      ...(this.pricesDirty || []),
      this.addPriceFrom.value
    ];

    this.addPriceFrom.reset();
    this.formGroup.resetForm();
  }

  onLinkDelete(linkToDelete: Price) {
    this.pricesDirty = (this.pricesDirty || [])
      .filter((price) => {
        return !(price.value === linkToDelete.value
          && price.service === linkToDelete.service);
      });
  }

  get pricesExist() {
    return this.pricesDirty && this.pricesDirty.length;
  }

  onSubmit() {
    const result: BandPrices = {
      oneShowPrice: null,
      prices: null
    };

    if (this.form.value.value) {
      result.oneShowPrice = {
        value: this.form.value.value,
        currency: this.form.value.value ? Currencies.RussianRuble : undefined,
        service: this.form.value.service
      }
    }

    if (this.pricesDirty.length) {
      result.prices = this.pricesDirty
        .map((price: Price) => ({
          value: price.value,
          currency: Currencies.RussianRuble,
          service: price.service
        } as Price))
    }

    this.pricesChange.emit(result);
  }

  constructor(
    private formBuilder: FormBuilder
  ) {

  }
}
