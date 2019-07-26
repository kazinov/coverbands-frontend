import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-password-reset-link-sent',
  templateUrl: './password-reset-link-sent.component.html',
  styleUrls: ['./password-reset-link-sent.component.scss']
})
export class PasswordResetLinkSentComponent implements OnInit {
  @Input() passwordResetLinkSentEmail: string;
  @Output() goBack = new EventEmitter();

  ngOnInit() {
  }

  constructor() {
  }

}
