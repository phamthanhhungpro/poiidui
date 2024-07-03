import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from 'app/services/feeback.service';
import { environment } from 'environments/environment.development';

@Component({
  selector: 'app-feeback-chitiet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feeback-chitiet.component.html',
  styleUrl: './feeback-chitiet.component.scss'
})
export class FeebackChitietComponent {
  feedback: any;
  screenshotUrls: string[] = [];

  constructor(private route: ActivatedRoute, private _feedbackService: FeedbackService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this._feedbackService.get(id).subscribe((res) => {
        this.feedback = res;
        this.screenshotUrls = this.feedback.attachments?.split(',').map((item: string) => {
          return `${environment.idApiUrlWithOutEndding}/${item}`;
        });
      });
    }
  }
}
