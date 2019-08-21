import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Artist, Price } from '@core/artist/artist.model';
import { Currencies } from '@core/models/currencies.model';
import assign from 'lodash-es/assign';
import { TRANSLATIONS } from '@core/translation/translations';

@Component({
  selector: 'app-edit-artist-prices',
  templateUrl: './edit-artist-prices.component.html',
  styleUrls: ['./edit-artist-prices.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditArtistPricesComponent implements OnInit {
  t = TRANSLATIONS;
  @Input() artist: Artist;
  @Input() saveButtonText = this.t.editArtist.saveButton;
  @Output() savePrices = new EventEmitter<Artist>();
  addPriceFrom: FormGroup;
  form: FormGroup;
  @ViewChild('formGroup', { static: true }) formGroup: FormGroupDirective;
  tableColumns: string[] = ['value', 'service', 'remove'];
  pricesDirty: Price[] = [];

  ngOnInit() {
    this.buildForms();
  }

  private buildForms(): void {
    this.pricesDirty = this.artist && this.artist.prices || [];
    this.addPriceFrom = this.formBuilder.group({
      value: ['', [Validators.required]],
      service: ['', []]
    });

    this.form = this.formBuilder.group({
      value: [
        this.artist &&
        this.artist.oneShowPrice &&
        this.artist.oneShowPrice.value, []],
      service: [this.artist &&
      this.artist.oneShowPrice &&
      this.artist.oneShowPrice.service, []]
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
    const result: Artist = assign({}, this.artist, {
      oneShowPrice: null,
      prices: null
    });

    if (this.form.value.value) {
      result.oneShowPrice = {
        value: this.form.value.value,
        currency: this.form.value.value ? Currencies.RussianRuble : undefined,
        service: this.form.value.service
      };
    }

    if (this.pricesDirty.length) {
      result.prices = this.pricesDirty
        .map((price: Price) => ({
          value: price.value,
          currency: Currencies.RussianRuble,
          service: price.service
        } as Price));
    }

    this.savePrices.emit(result);
  }

  constructor(
    private formBuilder: FormBuilder
  ) {

  }
}
