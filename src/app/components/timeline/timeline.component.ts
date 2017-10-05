import { Component, OnInit } from '@angular/core';
import { TimelineService } from './timeline.service';

@Component({
selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  providers: [TimelineService]
})
export class TimelineComponent implements OnInit {
  timelineItens: any[];

  constructor(private timelineService: TimelineService) { }

  ngOnInit() {
    this.timelineItens = this.timelineService.getTimelineItens();
  }

}
