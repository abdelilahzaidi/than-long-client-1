import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramComponent {
  @Input() showProgram: boolean = false
  @Input() program: any | undefined

  getProgramById(program: any) {

  }
}
