import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-gpt-message-ortography',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './gptMessageOrtography.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageOrtographyComponent {
  @Input({required:true}) userScore!: number;
  @Input({required:true}) text!: string;
  @Input() errors: string[] = []
 }
