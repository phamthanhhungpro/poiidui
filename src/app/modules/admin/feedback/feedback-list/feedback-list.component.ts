import { Component } from '@angular/core';
import { AsyncPipe, CommonModule, CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink } from '@angular/router';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { FeedbackService } from 'app/services/feeback.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-feedback-list',
  standalone: true,
  imports: [MatIconModule, RouterLink, MatButtonModule, CdkScrollable, NgIf,
    AsyncPipe, NgForOf, CurrencyPipe, MatButtonModule, MatMenuModule,
    FuseDrawerComponent, MatDividerModule, MatSidenavModule],
  templateUrl: './feedback-list.component.html',
  styles: [
    /* language=SCSS */
    `
        .donvi-grid {
            grid-template-columns: 100px auto 80px;

            @screen sm {
                grid-template-columns:  100px auto 80px;
            }

            @screen md {
                grid-template-columns: 200px auto 80px;
            }

            @screen lg {
                grid-template-columns: 20px 250px auto 96px;
            }
        }
    `,
  ],
})
export class FeedbackListComponent {
  public data$;

  constructor(private _feedbackService: FeedbackService, private router: Router) { }

  ngOnInit() {
    this.getTableData();
  }

  // get data from api
  getTableData() {
    this.data$ = this._feedbackService.getAllNoPaging().pipe(
      map((data: any) => {
        const items: any[] = data.map((item, index: number) => ({
          ...item,
          stt: index + 1
        }));
        return { items };
      })
    );
  }

  goToDetail(model) {
    this.router.navigate(['/feedback', model.id]);
  }
}


