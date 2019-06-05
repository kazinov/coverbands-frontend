import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { BandLink } from '../../core/bands/bands.model';

@Component({
  selector: 'app-band-links',
  templateUrl: './band-links.component.html',
  styleUrls: ['./band-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BandLinksComponent implements OnInit {
  @Input() links: BandLink[];
  @Output() linksChange = new EventEmitter<BandLink[]>();
  linksForm: FormGroup;
  @ViewChild('linksFormGroup') linksFormGroup: FormGroupDirective;
  linksTableColumns: string[] = ['link', 'description'];

  ngOnInit() {
    this.buildForms();
  }

  private buildForms(): void {
    this.linksForm = this.formBuilder.group({
      link: ['', [Validators.required]],
      description: ['', []]
    });
  }

  onLinkSubmit() {
    this.links = [
      ...this.links,
      this.linksForm.value
    ];

    console.log('links', this.links);
    this.linksChange.emit(this.links);
  }

  constructor(
    private formBuilder: FormBuilder
  ) {

  }
}
