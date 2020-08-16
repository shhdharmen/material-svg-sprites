import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <p>
      Hi, I am a <code>&lt;p&gt;</code> tag with
      <app-icon size="inherit"></app-icon> icon.
    </p>
    <h1>
      Hi, I am a <code>&lt;h1&gt;</code> tag with
      <app-icon size="inherit"></app-icon> icon.
    </h1>
  `,
  styles: [],
})
export class AppComponent {
  title = "material-svg-sprites";
}
