### 1. Describe Document Flow.

**Document Flow** (also called normal flow) is the core principle of how browsers layout web pages based on the HTML source order before any CSS layout manipulation occurs. It governs the initial positioning of elements on a page.

* **Block elements** in normal flow stack vertically, taking the full width available by default, causing each block element to start on a new line. Examples: `<div>`, `<p>`.
* **Inline elements** flow horizontally inside their containing block, only occupying as much width as their content requires. Examples: `<span>`, `<a>`.
* Document flow ensures natural reading order and accessibility.
* **Flow disruption:** CSS properties like `float`, `position` (absolute/fixed), and newer layout modules (`flexbox`, `grid`) can alter this flow. For example, floats remove elements from normal flow, causing sibling elements to wrap around.
* **Impact:** Understanding document flow is crucial for debugging layout issues and creating accessible, well-structured web pages.

---

### 2. Explain at least 2 ways to center a modal window horizontally and vertically.

Centering in CSS is notoriously tricky, especially vertically. Here are two reliable and widely supported methods:

* **Method 1: Flexbox**

Flexbox is designed for one-dimensional layouts but excels at alignment tasks.

```css
.modal-wrapper {
  position: fixed; /* covers viewport */
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  justify-content: center; /* centers horizontally */
  align-items: center;     /* centers vertically */
  background: rgba(0,0,0,0.5); /* modal backdrop */
}
```

*Why it works:* Flexbox treats the container as a flexible box, aligning its children both horizontally and vertically with minimal code. Also adapts well to dynamic content sizes.

* **Method 2: Absolute positioning + CSS transform**

```css
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

*Why it works:* Positioning at 50% top and left places the element's top-left corner in the center, and the transform shifts it back by half of its own size, achieving perfect centering.

*Trade-offs:* Fixed/flexible height content may need additional tweaks; transform is GPU accelerated and performant.

---

### 3. Describe best practices of writing CSS.

Senior-level CSS writing means maintainability, scalability, and performance, often within large teams/projects.

* **Modularize CSS:** Use components and isolate styles to avoid global bleed and reduce specificity wars.
* **Use a CSS methodology:** BEM, OOCSS, or Atomic CSS to enforce consistent class naming, making styles predictable and easier to maintain.
* **Avoid deep nesting:** Too specific selectors become brittle and hard to override.
* **Use variables:** CSS custom properties (`--var-name`) or preprocessors reduce duplication and ease theme changes.
* **Mobile-first approach:** Write styles targeting smallest screens first; add media queries for larger devices, improving performance and usability.
* **Use shorthand properties:** Saves space and improves readability (`margin: 0 10px` instead of individual margins).
* **Limit `!important`:** It breaks cascade and makes overrides complicated.
* **Vendor prefixes:** Automate via tools (Autoprefixer) rather than manual inclusion.
* **Accessibility:** Ensure focus styles, color contrasts, and avoid hidden content that breaks screen readers.
* **Performance:** Avoid expensive selectors like universal selectors or overly complex descendant chains.

---

### 4. Fixed vs Adaptive Design.

* **Fixed design:**

  * Sets explicit widths (often in pixels).
  * Layout doesn’t respond to viewport resizing.
  * Easier to design but breaks on smaller/larger screens.
  * Example: a desktop-only legacy site.
  * *Drawback:* poor mobile usability; requires horizontal scrolling.

* **Adaptive design:**

  * Defines several fixed layouts for key breakpoints (e.g., mobile, tablet, desktop).
  * At runtime, the layout switches to the appropriate design based on screen size.
  * Uses media queries but only switches between discrete layouts, not fluid.
  * *Benefit:* Optimized experience for target devices; more predictable design at breakpoints.
  * *Downside:* Requires more CSS and testing for each breakpoint; abrupt changes.

* **Responsive design** (not explicitly asked but related):

  * Uses fluid grids, flexible images, and continuous media queries to create layouts that adapt smoothly to any viewport size.
  * Often considered best practice today.

---

### 7. Alternative to flexbox and grid, how to make a template without them?

Before Flexbox and Grid became widely supported, developers used:

* **Floats:**

  * Float elements left or right to create columns.
  * Requires clearfix hacks to prevent container collapse.
  * Limited control over vertical alignment.
  * Still useful for legacy support or small layout tweaks.

* **Inline-block:**

  * Elements displayed inline but treated as blocks.
  * Whitespace between inline-block elements causes gaps, requiring hacks like font-size: 0 on parent.
  * Vertical alignment can be tricky.

* **Table/Table-cell display:**

  * Using `display: table` and `display: table-cell` mimics table layout without actual table markup.
  * Provides solid vertical and horizontal alignment.
  * Considered semantically incorrect for non-tabular data.

* **Positioning (absolute/relative):**

  * Absolute positioning elements explicitly with top/left values.
  * Usually brittle and non-responsive.

---

### 8. Explain floating.

* Floats shift elements to the left or right and allow content to wrap around them.
* Originally designed to wrap text around images.
* Floated elements are taken out of normal flow, so parent containers can collapse unless cleared.
* Clearing floats is done by `clear: both` or clearfix technique (`::after` with `content: ""` and `clear: both`).
* Using floats for page layout was a common pattern before Flexbox/Grid.
* Drawbacks: Complex to manage with dynamic content, inconsistent behavior across browsers, and can cause collapsing issues.

---

### 9. Explain @media selector. Which data can we acquire, how can it be used?

* `@media` is a **CSS at-rule** for conditional styles based on the characteristics of the device or environment.
* You can query:

  * Viewport dimensions: width, height, min/max-width, aspect-ratio.
  * Device capabilities: resolution, pointer accuracy (fine/coarse).
  * Orientation: landscape vs portrait.
  * Color features: color depth, color gamut.
  * Light level, prefers-reduced-motion, prefers-color-scheme, etc.
* Used primarily for **responsive design** to apply different styles depending on device size, capabilities, or user preferences.
* Example:

  ```css
  @media (prefers-color-scheme: dark) {
    body { background: #000; color: #fff; }
  }
  ```
* Helps create accessible, optimized UI experiences across diverse devices and contexts.

---

### 10. Benefits of using preprocessors. What CSS preprocessor you prefer?

* **Benefits:**

  * Enables **variables** (colors, fonts, sizes) for easier theming and maintenance.
  * Allows **nesting** of selectors for better logical grouping and readability.
  * Provides **mixins/functions** for reusable code blocks and logic.
  * Supports **operations and calculations** (e.g., math on sizes).
  * Facilitates **modularization** through imports and partials.
  * Offers control directives (`if`, `for`, `each`) for dynamic style generation.
  * Can generate vendor prefixes automatically.
  * Greatly enhances maintainability for large, complex CSS codebases.

* **Preferred Preprocessor:**
  I prefer **Sass/SCSS** because:

  * Industry standard with large ecosystem and community.
  * Rich feature set combining power and expressiveness.
  * Supported out-of-the-box by many build tools and frameworks.
  * Sass has well-defined modular system (`@use`, `@forward`) improving scalability.

---

### 11. Explain CSS Specificity.

* Specificity is a weight applied by browsers to conflicting CSS rules to determine which rule wins.
* Calculated as a four-part value:

  1. Inline styles (`style` attribute) count highest.
  2. Number of IDs in selector.
  3. Number of classes, attributes, pseudo-classes.
  4. Number of element and pseudo-element selectors.
* Example:

  * Inline style: specificity = (1,0,0,0)
  * `#id .class p` = (0,1,1,1)
* When rules have the same specificity, **last declared wins** (source order).
* Specificity encourages writing selectors that are as simple and modular as possible.
* Overly specific selectors reduce flexibility and increase maintenance difficulty.

---

### 12. Explain how z-index property works.

* `z-index` controls **stacking order** along the z-axis (front-to-back).
* Applies only to elements with a positioning context (`relative`, `absolute`, `fixed`, `sticky`).
* Higher `z-index` means element appears **above** others with lower `z-index`.
* Creates **stacking contexts**:

  * Each positioned element with `z-index` forms a new context.
  * Children of a stacking context are constrained within it and can’t be layered outside.
* Complex layouts can have nested stacking contexts causing unexpected layering.
* Understanding stacking context is crucial for managing overlapping elements and modal dialogs.

---

### 13. Explain when and how to use display: grid.

* Use **CSS Grid** when you need to build **two-dimensional** layouts involving rows and columns.
* It allows explicit control over rows, columns, gaps, alignment, and areas.
* Powerful for complex page layouts where Flexbox’s 1D nature is insufficient.
* CSS Grid enables features like:

  * Named grid areas for semantic placement.
  * Grid auto-placement.
  * Fractional units (`fr`) for proportional distribution.
* Example usage:

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
```

* Grid supports responsive reflow and nested grids, making it highly flexible.
* Supported widely in modern browsers, it should be preferred for layout-heavy UI designs.

---

### 14. Explain basics of flexbox layout.

* Flexbox is a **1D layout module** managing layout in either row or column direction.
* Flex container has properties controlling alignment and distribution:

  * `flex-direction` (row, column)
  * `justify-content` (main axis alignment)
  * `align-items` (cross axis alignment)
  * `flex-wrap` (wrap or nowrap)
* Flex items can grow, shrink, or have fixed sizes using `flex-grow`, `flex-shrink`, and `flex-basis`.
* Perfect for toolbars, navigation, centering elements, and small to medium component layouts.
* Easier to write and maintain than float-based layouts for common UI patterns.

---

### 15. Describe CSS Box Model.

* Every HTML element is a rectangular box composed of:

  * **Content**: The actual text or media.
  * **Padding**: Space between content and border.
  * **Border**: Surrounds padding and content.
  * **Margin**: Space outside the border separating from other elements.
* The box model determines element’s size on the page.
* The CSS property `box-sizing` controls how width/height calculations include padding and border.

  * `content-box` (default): width/height apply only to content area.
  * `border-box`: width/height include padding and border.
* Understanding box model is key to layout precision and avoiding unexpected overflow or spacing.

---

### 16. List main CSS units.

* **Absolute units:**

  * `px` (pixels): Fixed, device dependent.
  * `pt`, `pc`, `in`, `cm`, `mm`: print-oriented or physical units.
* **Relative units:**

  * `%`: relative to parent element’s size.
  * `em`: relative to font-size of the element.
  * `rem`: relative to root font-size (better for consistency).
  * `vw`, `vh`, `vmin`, `vmax`: relative to viewport width/height, enabling responsive designs.
* **Time units:**

  * `s`, `ms`: used in transitions and animations.

---

### 17. Explain margin collapsing.

* Vertical margins of block elements may **collapse** into a single margin equal to the largest margin, rather than adding up.
* Happens in the following scenarios: adjacent siblings, parent and first/last child, empty blocks with top and bottom margin.
* Margin collapsing prevents unwanted double spacing but can cause layout bugs if unexpected.
* To prevent collapsing, insert borders/padding or use overflow properties.

---

### 18. Block vs inline elements.

* **Block elements:**

  * Start on a new line.
  * Take up full container width by default.
  * Can have width/height, margins, paddings respected vertically and horizontally.
  * Examples: `<div>`, `<section>`, `<p>`

* **Inline elements:**

  * Flow within a line horizontally.
  * Width and height properties ignored.
  * Vertical margins/padding don’t affect layout as expected.
  * Examples: `<span>`, `<a>`, `<strong>`

---

### 19. Pseudo classes and pseudo selectors. What’s the difference?

* **Pseudo-classes** represent a **state or condition** of elements, e.g., `:hover` (when mouse is over element), `:nth-child()` (selects elements based on position), `:focus`. They don’t create new elements.
* **Pseudo-elements** allow styling **virtual sub-parts** of elements, e.g., `::before` and `::after` insert content before or after element content without changing the DOM.
* Pseudo-elements are written with double colon syntax (`::`), while pseudo-classes use single colon (`:`).
* Both help avoid extra markup and enhance styling flexibility.

---

### 20. Explain the three main ways to apply CSS styles to a web page.

* **Inline styles:** directly on element’s `style` attribute; highest specificity, bad for maintainability.
* **Internal stylesheet:** CSS within `<style>` tags inside HTML `<head>`. Useful for page-specific styles.
* **External stylesheet:** Linked CSS files via `<link>` tag; promotes reusability, caching, separation of concerns, preferred for larger projects.

---

### 21. Give an example of media query.

```css
@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
}
```

*Explanation:* Applies styles only when viewport width is 768px or less, commonly used for tablet and mobile responsive layouts.

---

### 22. What selector “#container .block1.gray\:hover\:after” means?

* Selects the **`::after` pseudo-element** of any element with class `gray` inside an element with class `block1` which itself is inside the element with ID `container` — but **only when the `.gray` element is hovered**.
* Used to create decorative content or effects on hover for specific nested elements.

---

### CSS Methodologies

### 1. Main rules of BEM methodology.

* Write classes in the form: `block__element--modifier`.
* Avoid styling nested elements via descendant selectors to reduce specificity issues.
* Promote component reusability and predictable class names.
* Separate structure (`block`), parts (`element`), and variants (`modifier`) clearly.

---

### 2. Block vs Element vs Modifier.

* **Block:** standalone, reusable component (e.g., `.button`).
* **Element:** child part inside block (e.g., `.button__icon`).
* **Modifier:** different state or version (e.g., `.button--disabled`).

---

### 3. Why do we need CSS methodologies?

* To scale CSS for large teams/projects.
* Avoid class name collisions and maintainable specificity.
* Ensure predictable and consistent styling patterns.
* Facilitate onboarding and code reviews.

---

### 4. OOCSS vs Atomic CSS vs BEM.

* **OOCSS:** Object-oriented approach, separates structure and skin, encourages reusable objects.
* **Atomic CSS:** utility-first, small reusable classes, encourages composition.
* **BEM:** naming convention for clarity and modularity.

---

### CSS Preprocessors

### 1. Stylus vs LESS/SASS.

* Stylus offers flexible syntax with optional braces/semicolons, less verbose but less standard.
* LESS is simpler, closer to vanilla CSS syntax but less powerful.
* Sass is the most powerful and widely adopted with mature tooling.

---

### 2. Benefits of using preprocessor?

* Advanced features: variables, nesting, mixins, control logic.
* Better maintainability for complex stylesheets.
* Facilitates DRY principles.

---

### 3. Cons of using preprocessor?

* Requires build tooling.
* Can obscure CSS when overused.
* Learning curve and potential for inconsistent styles if team not disciplined.

---

### 4. LESS/SASS, choose one and list main features.

**SASS/SCSS:**

* Variables, nesting, mixins, functions.
* Partial files & imports.
* Control directives (`@if`, `@for`, `@each`).
* Modules system (`@use` and `@forward`).
* Maps and lists for data structures.

---

### 5. Red flags to use preprocessor instead of CSS.

* Project scope small/simple.
* Team unfamiliar and no time to train.
* Desire for simplicity and zero build step.
* Minimal CSS needed, avoiding complexity.

---
