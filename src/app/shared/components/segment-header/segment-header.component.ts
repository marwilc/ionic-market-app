import { Component, Input, OnInit } from '@angular/core';
import { ISegment } from '@core/models/mock.model';

@Component({
    selector: 'app-segment-header',
    templateUrl: './segment-header.component.html',
    styleUrls: ['./segment-header.component.scss'],
})
export class SegmentHeaderComponent implements OnInit {
    @Input() segments: ISegment[] = [];
    constructor() {}

    ngOnInit() {}
}
