import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'drp-social-media-button',
  templateUrl: './social-media-button.component.html',
  styleUrls: ['./social-media-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialMediaButtonComponent {
  @Input() faIcon = faFacebookSquare;
  @Input() ariaLabel = '';

  @Output() clicked = new EventEmitter<void>();

  onClicked(): void {
    this.clicked.emit();
  }
}