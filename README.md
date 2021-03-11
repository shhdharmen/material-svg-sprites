# Material Design Icons: Font vs SVG. And how to use SVG Sprites in Angular? <!-- omit in toc -->

![cover](https://cdn.hashnode.com/res/hashnode/image/upload/v1599159777259/M-Bz6SFMm.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress)

_In this article we will compare usage of [Google's Material Design Icons](http://google.github.io/material-design-icons/), as font and SVG. And we will also see how we can use SVG sprites in an Angular application._

## 📋 Table of Contents <!-- omit in toc -->

- [Material Icons](#material-icons)
  - [Icon 🔠 font for the web](#icon--font-for-the-web)
  - [Icon 🖼️ SVGs for the web](#icon-️-svgs-for-the-web)
- [Font vs SVG](#font-vs-svg)
  - [📦 Bundle size](#-bundle-size)
  - [🎭 Performance](#-performance)
  - [🏆 What to choose](#-what-to-choose)
- [⛳ Using material icon SVG symbol sprites in Angular](#-using-material-icon-svg-symbol-sprites-in-angular)
  - [🛠️ Setup](#️-setup)
  - [⚔️ Coding](#️-coding)
    - [1. Create `<app-icon>` component](#1-create-app-icon-component)
    - [2. Modify icon component class](#2-modify-icon-component-class)
    - [3. Modify icon component template](#3-modify-icon-component-template)
    - [4. Create *📄 sprites.svg*](#4-create--spritessvg)
      - [4.1 *📄 gulpfile.js*](#41--gulpfilejs)
    - [5. `npm` scripts](#5-npm-scripts)
    - [6. Icon SVGs](#6-icon-svgs)
    - [7. `<app-root>` component](#7-app-root-component)
    - [8. Advanced](#8-advanced)
      - [8.1 `<app-root>` template changes](#81-app-root-template-changes)
      - [8.2 `<app-icon>` component and template changes](#82-app-icon-component-and-template-changes)
- [☑️ Conclusion](#️-conclusion)
- [🙏 Thank you](#-thank-you)
    - [Credits](#credits)

## Material Icons

Material Icons are Google's official icon pack. They are carefully designed following [Material Design Guidelines](https://material.io/design/iconography/system-icons.html#design-principles). It's one of the most widely used icon sets for both, web and mobile applications. It has got around 40k+ ⭐️ on [github](https://github.com/google/material-design-icons).

### Icon 🔠 font for the web

The easiest way to include the material icons is to use material icon font. All the material icons are packaged into a single font.

You just need to add single line of HTML:

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

And then you can use them easily, See below example:

```html
<i class="material-icons">face</i>
```

To further style them, check this [official guide](https://google.github.io/material-design-icons/#styling-icons-in-material-design).

### Icon 🖼️ SVGs for the web

The material icons are also provided as SVGs that are suitable for web projects. Individual icons are downloadable from the [material icons library](https://www.google.com/design/icons/).

For Angular, we can also use `@angular/material`'s [icon component](https://material.angular.io/components/icon/overview), with some additional setup. To summarize, below are the steps which will be needed:

1. Add `@angular/material` by running `ng add @angular/material`
2. Import `MatIconModule`
3. Create svg file for the icon under assets
4. Register the same svg file for it's corresponding icon. For example, you can do below in a component:

```ts
...
constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
        'thumbs-up',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
}
...
```

and then use it in HTML:

```html
<mat-icon svgIcon="thumbs-up" aria-hidden="false" aria-label="Example thumbs up SVG icon"></mat-icon>
```

Now, 🔁 repeat steps 3 and 4 for all your icons.

## Font vs SVG

There are multiple aspects when it comes to selection. We are going to look at the most important ones only:

- Bundle size
- Performance

### 📦 Bundle size

|      | Size | Can be reduced? |
| ---- | ---- | --------------- |
| Font | 42KB | ❌               |
| SVG  | 62KB | ✅               |

<small><a href="https://google.github.io/material-design-icons/#icon-font-for-the-web">source</a></small>

Clearly, font file is winner when it comes to bundle size. But, SVG file size can be reduced considerably by compiling only the icons you need into a single SVG file with symbol sprites. We will look into it later on.

### 🎭 Performance

Now let's see which one looks better in browser, we will use standard sizes suggested by Google Material Design in [sizing](https://google.github.io/material-design-icons/#sizing), i.e. `18px`, `24px`, `36px` and `48px`.

![Font vs SVG](https://dev-to-uploads.s3.amazonaws.com/i/n9bj1837m35i9cmxg0j4.png)

As you can see, they both look almost same for `24px`, `36px` and `48px`. Let's try by reducing the size to `18px`:

![Font vs SVG 18px](https://dev-to-uploads.s3.amazonaws.com/i/t9v99wg1d70bcsv36r6a.png)

Ok, as you can see for `18px`, font loses its consistency around circular edges while svg still looks good. But, it totally depends on which icons you're using. For instance, look at below:

![Font vs SVG 18px Part 2](https://dev-to-uploads.s3.amazonaws.com/i/ve9ifnegbmd4s93gpm3k.png)

`done_all` and `swap_horiz` don't have round edges, that's why they look fine in font, too.

>  
> 💻 Code for above preview samples is available [here](https://github.com/shhdharmen/material-svg-sprites/tree/master/preview).
>  

### 🏆 What to choose

As you saw, except for some cases, font and svg, both perform well in browsers. But we can improve the bundle size of svg, by compiling only the icons we need in a single file. Let's see how we can do it in Angular.

---

## ⛳ Using material icon SVG symbol sprites in Angular

First of all, compiling single file with svg symbol sprite is not related to Angular or any other web framework. It's an opinionated way of achieving cost and performance effective solution to use material icons in your web application. You can read more about it [here](https://github.com/google/material-design-icons/tree/master/sprites).

<img src="https://media.giphy.com/media/l0DAHAQ3Ex4XbL1ni/giphy.gif" alt="Let's get started">

### 🛠️ Setup

Go to your favorite 📁 directory and open-up the 👨‍💻 terminal.

1. `npm i -g @angular-cli`
2. `ng new material-svg-sprites --minimal --interactive=false`
3. Go to 😴 sleep for sometime and wake-up once above command is done 🏃 running
4. `cd material-svg-sprites`
5. `ng serve`

Cool. Let's move on to next part.

### ⚔️ Coding

#### 1. Create `<app-icon>` component

Open-up another terminal at the project directory and:

```bash
ng g c icon --inlineStyle --inlineTemplate=false
```

> 👉 Ideally, you should create such components in a shared module. For more, head out to [official docs](https://angular.io/guide/styleguide#shared-feature-module).

#### 2. Modify icon component class

Let's add 2 `@Input`s to our component:

```typescript
// src\app\icon\icon.component.ts

import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-icon",
  templateUrl: "./icon.component.html",
  styles: [],
})
export class IconComponent implements OnInit {

  @Input() size = 24; // 👈 added
  @Input() name = 'face'; // 👈 added

  constructor() {}

  ngOnInit(): void {}
}
```

So, `size` is going to be responsible for size (height and width), of-course 😅. And `name` represents name of the icon, by default we will show `face`, cz it looks nice 😊.

#### 3. Modify icon component template

```html
<!-- src\app\icon\icon.component.html -->

<svg [ngStyle]="{ height: size + 'px', width: size + 'px' }">
  <use [attr.href]="'assets/icons/sprites.svg#' + name"></use>
</svg>
```

Let's see what's going on here...

1. `[ngStyle]`- we are going to use `@Input() size` here to give fixed height and width to our svg
2. `<use>`- this element takes nodes from within the SVG document, and duplicates them somewhere else. As you can see in its `href`, we are giving location of the icon which are going to use.

From this, you might have understood that *sprites.svg* is going to be our single file with svg symbol sprites. Let's get into that.

#### 4. Create *📄 sprites.svg*

Now, we are not directly going to create sprites file, we are going to automate the flow. To summarize we are going to do below:

1. Download SVG files for the icons which we need from [material icons library](https://material.io/resources/icons). We will keep them at *📁 src/icons/svg*.
2. Read them and convert them into `<symbol>`
3. Combine all `<symbol>` to one single file, i.e. *📄 sprites.svg* under *📁 assets* directory
4. Repeat steps 2 and 3 whenever any new icon is added under *📁 src/icons/svg*

To automate above flow, we will use **[gulp](https://gulpjs.com/)**. You do not need to have detailed understanding of gulp, just remember that it's a toolkit to automate and enhance our workflow.

##### 4.1 *📄 gulpfile.js*

Let's install some devDependencies first:

```bash
npm i -D gulp gulp-svgstore gulp-svgmin path gulp-rename gulp-run-command
```

Now create *📄 gulpfile.js*:

```javascript
// gulpfile.js

const gulp = require("gulp");
const svgstore = require("gulp-svgstore");
const svgmin = require("gulp-svgmin");
const rename = require("gulp-rename");
const run = require("gulp-run-command").default;

gulp.task("svg-sprite", () => {
  return gulp
    .src("src/icons/svg/*.svg")
    .pipe(
      svgmin(() => {
        return {
          plugins: [
            {
              removeViewBox: false,
            },
            {
              removeDimensions: true,
            },
          ],
        };
      })
    )
    .pipe(svgstore())
    .pipe(rename({ basename: "sprites" }))
    .pipe(gulp.dest("src/assets/icons"));
});

gulp.task("ng-serve", run("ng serve -o"));

gulp.task("ng-build", run("ng build --prod"));

gulp.task("watch", () =>
  gulp.watch(["src/icons/svg/*.svg"], gulp.series("svg-sprite"))
);

gulp.task(
  "default",
  gulp.series("svg-sprite", gulp.parallel("ng-serve", "watch"))
);

gulp.task("build", gulp.series("svg-sprite", "ng-build"));

```

Without much details, below is the flow of default task gulp:

1. Read all `.svg` files from *📁 src/icons/svg*. This is the folder where we will download all of our icon svg files.
2. Minify them by keeping `viewBox` and removing dimensions. Thanks to [gulp-svgmin](https://www.npmjs.com/package/gulp-svgmin)
3. Compile all of it in `<symbol>` and merge them into single svg file. With this, it should also keep `id` of `<symbol>` same as filename, which will be useful in our `<app-icon>` component template's `<use>` tag's `href` attribute. Credit goes to [gulp-svgstore](https://www.npmjs.com/package/gulp-svgstore)
4. Rename the result file to *📄 sprites.svg* using [gulp-rename](https://www.npmjs.com/package/gulp-rename)
5. And put that file at *📁 src/assets/icons*
6. Start Angular app by running command `ng serve -o`
7. Keep watching for svg files under *📁 src/icons/svg*, if changed repeat steps 1, 2, 3, 4, 5.

There is also one more task called `build`, which does the same thing as above, except it doesn't keep watching svg files and instead of `ng serve`, it runs `ng build --prod`.

#### 5. `npm` scripts

As we have created *📄 gulpfile.js* in such a way that it handles running of Angular project, too, we can simply have below script in our *📄 package.json* to run it:

```json
// package.json

...
"scripts": {
    "ng": "ng",
    "start": "gulp", // 👈 modified
    "build": "gulp build", // 👈 modified
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
...
```

Now, we can simply run `npm start` and `npm run build` to run the project in watch mode and build it respectively.

#### 6. Icon SVGs

Download `face` icon's svg file from [here](https://fonts.gstatic.com/s/i/materialicons/face/v6/24px.svg?download=true) or you can goto [material icons library](https://material.io/resources/icons), find and download `face` icon's svg file.

Once it's downloaded, rename it to *📄 face.svg*, so that when it gets compiled, `id` of `<symbol>` is `face`. Don't forget to keep it under *📁 src/icons/svg*.

#### 7. `<app-root>` component

We're almost done. Let's add reference to `<app-icon>` component in `<app-root>`. Simply have below in your template:

```html
<app-icon></app-icon>
```

And 🎉 voila!!! You should see `face` icon's svg in your browser.

Also try by giving different sizes, like below, it should work fine:

```html
<app-icon size="48"></app-icon>
```

With above, we done with all the setup and coding. Now, to use any other icon, for example [`done_all`](https://fonts.gstatic.com/s/i/materialicons/done_all/v6/24px.svg?download=true) icon, simply download it from [material icons library](https://material.io/resources/icons), rename it to some memorable general keyword, put it under *📁 src/icons/svg*. And use it like below:

```html
<app-icon name="done_all" size="36"></app-icon>
```

Great 👍!!! If you're with me up-to this, consider I am continuously 👏👏👏 clapping for you.

<img src="https://media.giphy.com/media/HjheuybfwDGnu/giphy.gif" alt="Clapping">

#### 8. Advanced

This is some advanced changes which we will be doing for better alignment and size when icon is placed inline with text, this is totally optional.

##### 8.1 `<app-root>` template changes

First, let's see how it looks inline with text. For that, simply change `<app-root>` template:

```html
<p>
  Hi, I am a <code>&lt;p&gt;</code> tag with
  <app-icon size="18"></app-icon> icon.
</p>
<h1>
  Hi, I am a <code>&lt;h1&gt;</code> tag with
  <app-icon size="36"></app-icon> icon.
</h1>
```

I have kept icon sizes at **1.125 multiplier with font size**. So by default, in chrome, `<p>` and `<h1>` tags have `16px` and `32px` font size, so that will become `18px` and `36px` for icon size. You can choose your multiplier, but 1.125 works for me.

Let's look at output:

![Icon with inline text](https://dev-to-uploads.s3.amazonaws.com/i/hluwqd1brgsq2w9g3wje.png)

As you can see, we need to really work on alignment. Let's do that.

##### 8.2 `<app-icon>` component and template changes

Modify `<app-icon>` component like below:

```typescript
// src\app\icon\icon.component.ts

...
export class IconComponent implements OnInit {
 private readonly SIZE_MULTIPLIER = 1.125; // 👈 you can change this as per your need
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
  ...
}
```

```html
<!-- src\app\icon\icon.component.html -->

<svg
  [ngStyle]="{
    height: _size + 'px',
    width: _size + 'px',
    top: _top + 'px'
  }"
  style="display: inline-block; vertical-align: top; position: relative;"
>
  <use [attr.href]="'assets/icons/sprites.svg#' + name"></use>
</svg>
```

To summarize, below is what we did:

1. Instead of directly setting `size`, we introduced a property `_size` and used `setter`. So based on `@Input() size`, `_size` will be calculated.
2. `_top` - this will help us to align icon properly.
3. `_size` setter - now, we are also accepting `inherit` as value. If user has provides `inherit` as value for `@Input() size`, we are getting icon's `parentElement`'s `font-size` using `window.getComputedStyle`. And we are multiplying it with our multiplier, i.e. `SIZE_MULTIPLIER = 1.125`. Lastly, `_top` is also calculated. Everything is simple maths, you can play around and make changes as per your need.
4. template - we have made some style changes so that it looks proper. Now, these style changes are really an opinionated way. You can select your own way, maybe make `<svg>`'s style `position: absolute;top: 50%;height: <HEIGHT>;margin-top: -<HEIGHT/2>` and wrap it inside an element with `position: relative`. You can read more about `vertical-align` at [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align).

>  
> 👉 You can try to have `fill-color` set based on parent element and/or input.
>  

Now, let's look at the output in browser again:

![Icon with inline text updated](https://dev-to-uploads.s3.amazonaws.com/i/3nfmu9lvz4v8gn5idwnm.png)

Alright, now it looks good.

>  
> 💻 Code for Angular application is present at [github/material-svg-sprites](https://github.com/shhdharmen/material-svg-sprites)
>  

<https://github.com/shhdharmen/material-svg-sprites>

---

## ☑️ Conclusion

1. We learned what Google Material Design Icons are
2. We also saw 2 ways of adding icons: Font and SVG
3. We saw how we can create single svg sprite file of symbols using gulp in an Angular application
4. And at last, we also took a look at how we can align the icon for inline text

## 🙏 Thank you

You guys have been great readers. I really appreciate that you've taken some time to read this article. Let me know your thoughts and feedbacks in the comments section.

You can follow me on 🐦 twitter [@shhdharmen](https://twitter.com/shhdharmen). Don't be shy even just say hi 👋!

And yes, always believe in yourself.

<img src="https://source.unsplash.com/vnpTRdmtQ30" alt="breathe neon on green leaves">

#### Credits

<small><span>Footer Photo by <a href="https://unsplash.com/@nofilter_noglory?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener noreferrer">Tim Goedhart</a> on <a href="https://unsplash.com/s/photos/believe-in-yourself?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
<span>
  </small>
