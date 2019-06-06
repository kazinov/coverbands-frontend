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
  form: FormGroup;
  @ViewChild('formGroup') formGroup: FormGroupDirective;
  linksTableColumns: string[] = ['link', 'description', 'remove'];

  ngOnInit() {
    this.buildForms();
  }

  private buildForms(): void {
    this.form = this.formBuilder.group({
      link: ['', [Validators.required]],
      description: ['', []]
    });
  }

  onLinkSubmit() {
    this.links = [
      ...(this.links || []),
      this.form.value
    ];

    this.linksChange.emit(this.links);
    this.form.reset();
    this.formGroup.resetForm();
  }

  onLinkDelete(linkToDelete: BandLink) {
    this.links = (this.links || [])
      .filter((link) => {
        return !(link.description === linkToDelete.description
        && link.link === linkToDelete.link);
      });
    this.linksChange.emit(this.links);
  }

  get linksExist() {
    return this.links && this.links.length;
  }

  constructor(
    private formBuilder: FormBuilder
  ) {

  }
}
