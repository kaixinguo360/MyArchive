import { Component } from '@angular/core';
import { ContentDetail } from '../content-detail';
import { INode } from '../../../service/file.service';

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent implements ContentDetail {
  node: INode;
}
