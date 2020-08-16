import { Component, ElementRef, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-icon",
  templateUrl: "./icon.component.html",
  styles: [],
})
export class IconComponent implements OnInit {
  private readonly SIZE_MULTIPLIER = 1.125;
  _size = 24;
  _top = 0;
  @Input() name = "face";
  @Input()
  set size(size: "inherit" | number) {
    if (size === "inherit") {
      const parentElement = this.elRef.nativeElement.parentElement;
      this._size = Math.ceil(
        parseFloat(
          window.getComputedStyle(parentElement).getPropertyValue("font-size")
        ) * this.SIZE_MULTIPLIER
      );
      this._top = -(this._size / Math.ceil(14.22 * this.SIZE_MULTIPLIER));
    } else if (isNaN(size)) {
      throw new Error('size must be a number or "inherit"');
    } else {
      this._size = size;
    }
  }
  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {}
}
