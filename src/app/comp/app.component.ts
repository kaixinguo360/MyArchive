import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';

import { FileService } from '../service/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyArchive';

  // TODO: TEST
  constructor(
    fileService: FileService
  ) {
    fileService.getDir('Image').pipe(
      tap(res => console.log(res)),
      tap(_ => {
        fileService.removeINode('index.php').subscribe();
      })
    ).subscribe();
  }
}
