import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-rating",
  templateUrl: "./rating.component.html",
})
export class RatingComponent implements OnInit {
  @Input() ratingNum: any;
  @Input() showEmptyStar: boolean = false;
  ratingsArray = [];

  constructor() {}

  ngOnInit(): void {
    this.ratingNum = this.ratingNum ? parseInt(this.ratingNum, 10) : 0;
    this.setRatingsArray();
  }

  setRatingsArray() {
    this.ratingsArray = Array(this.ratingNum).fill(1);
    for (let i = 0; i < 5 - this.ratingNum; i++) {
      this.ratingsArray.push(0);
    }
  }
}
