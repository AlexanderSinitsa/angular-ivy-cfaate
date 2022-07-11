import { Component } from '@angular/core';

import { FetchService } from './services/fetch.service';

enum BoxStateEnum {
  Empty = 'empty',
  Loading = 'loading',
  Ready = 'ready'
}

interface BoxInterface {
  id: number;
  text?: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  BoxStateEnum = BoxStateEnum;
  boxes: BoxInterface[] = Array(10).fill({});
  boxesVisibilityState: { [key: number]: BoxStateEnum; } = {};

  constructor(private fetchService: FetchService) {
    this.init();
  }

  private init() {
    this.boxes.forEach((item, i) => {
      this.boxes[i] = { id: i }
      this.boxesVisibilityState[i] = BoxStateEnum.Empty;
    })
  }

  async fetchBoxContent(isVisible: boolean, index: number) {
    if (isVisible && this.boxesVisibilityState[index] === BoxStateEnum.Empty) {
      this.boxesVisibilityState[index] = BoxStateEnum.Loading;

      // consider to use observer if you want to cancel some requests on fast scroll
      const boxContent = await this.fetchService.fetch(index)
        .catch(err => {
          console.error(err);
          return 'Something went wrong!';
        });

      this.updateBoxContent(index, String(boxContent));
    }
  }

  private updateBoxContent(index: number, content: string) {
    if (this.boxes[index]?.id || this.boxes[index]?.id === 0) {
      this.boxes[index].text = content;
      this.boxesVisibilityState[index] = BoxStateEnum.Ready;
    }
  }

}
