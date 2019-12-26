import { Component, Input, OnInit } from '@angular/core';
import { INode } from '../../../service/file.service';

@Component({
  selector: 'app-card-foot',
  templateUrl: './card-foot.component.html',
  styleUrls: ['./card-foot.component.css']
})
export class CardFootComponent implements OnInit {
  @Input() node: INode;

  constructor() { }

  ngOnInit() {
  }

}
