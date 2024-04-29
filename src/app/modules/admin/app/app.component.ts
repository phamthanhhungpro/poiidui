import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-app',
  standalone: true,
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  imports: [MatIconModule, RouterLink, MatButtonModule, CdkScrollable],
})
export class AppComponent {

}
