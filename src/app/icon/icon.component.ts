import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-icon",
  templateUrl: "./icon.component.html",
  styles: [],
})
export class IconComponent implements OnInit {

  @Input() size = 24;
  @Input() name = 'face';

  constructor() {}

  ngOnInit(): void {}
}
