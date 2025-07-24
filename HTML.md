
### 1. HTML5 Semantic Elements

Semantic elements clearly describe their meaning both to the browser and developers. Examples:
`<header>`, `<footer>`, `<main>`, `<article>`, `<section>`, `<nav>`, `<aside>`, `<figure>`, `<figcaption>`, `<mark>`, `<time>`, `<address>`.
Using these improves accessibility, SEO, and code maintainability.

---

### 2. How to Check HTML Markup Validity

Use validators like the [W3C Markup Validation Service](https://validator.w3.org/). They parse HTML against the specification, detecting missing tags, attribute errors, or deprecated elements. IDEs and linters (e.g., HTMLHint) also provide real-time validation.

---

### 3. Use Cases for EventTarget, Node, Element, HTMLElement, HTMLInputElement Classes

* **EventTarget**: Base interface for objects that can receive events and may have listeners. Used by DOM nodes, `window`, and `document`.
* **Node**: Base class for all DOM nodes (elements, text, comments). Defines common properties like `childNodes`, `parentNode`.
* **Element**: Extends Node; represents any element in the DOM tree. Provides element-specific methods like `getAttribute`.
* **HTMLElement**: Extends Element; base class for all HTML elements. Adds HTML-specific properties, e.g., `innerHTML`, `style`.
* **HTMLInputElement**: Extends HTMLElement; specific to `<input>` tags, exposing properties like `value`, `checked`.

Use these classes for type-checking, DOM manipulation, or event handling depending on granularity.

---

### 4. Dataset Element Attribute

`dataset` is a read/write object exposing all `data-*` attributes on an element, e.g., `<div data-user-id="123"></div>` is accessible via `element.dataset.userId`. It's a safe way to embed custom data without polluting HTML attributes or relying on class names.

---

### 5. Async / Defer Attributes on `<script>` Tag

* `async`: Script downloads asynchronously and executes **immediately after download**, possibly before HTML parsing finishes. Execution order is **not guaranteed**.
* `defer`: Script downloads asynchronously but execution is **deferred until after HTML parsing completes**. Scripts with defer are executed in order.

Use `defer` for scripts that manipulate DOM after full parsing, and `async` for independent scripts like analytics.

---

### 6. Simple SVG Image Example

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>
```

This draws a red circle with black border, centered at (50,50) with radius 40.

---

### 7. Difference Between Canvas and SVG

* **Canvas**: Bitmap-based, immediate mode. Suitable for fast, pixel-level drawing and dynamic animations (e.g., games). Low-level API.
* **SVG**: Vector-based, retained mode. DOM elements representing shapes. Better for scalable graphics, complex interactivity, and CSS styling.

Use **Canvas** for pixel manipulation and intensive animations; use **SVG** for resolution-independent graphics, UI icons, charts.

---

### 8. What is `<doctype>`?

The `<!DOCTYPE html>` declaration tells the browser to render the page in **standards mode** using HTML5 spec. It prevents quirks mode rendering (legacy behavior for older browsers). It must be the very first line in an HTML document.

---

### 9. `<head>` Tag and Its Content

The `<head>` contains metadata about the document, including:

* `<title>`: Page title
* `<meta>`: Charset, viewport, description, SEO tags
* `<link>`: Stylesheets, icons
* `<style>`: Internal CSS
* `<script>`: Scripts (typically deferred)
* `<base>`: Base URL for relative links

No visible content; only metadata and resources.

---

### 10. HTML Form Basics

Forms collect user input. Use `<form>` with inputs (`<input>`, `<select>`, `<textarea>`) and buttons. Key attributes: `action` (server URL), `method` (`GET` or `POST`). Forms support validation via attributes (`required`, `pattern`). Form data is serialized and submitted to the server.

---

### 11. Media Elements

* `<img>` for images
* `<audio>` and `<video>` for media playback with controls, autoplay, loop, muted attributes
* Media can be manipulated via JS API (play, pause, seek)

---

### 12. Relative URL vs Absolute URL

* **Relative URL**: Path relative to current document or base URL, e.g., `./images/logo.png`
* **Absolute URL**: Full path including scheme and domain, e.g., `https://example.com/images/logo.png`

Relative URLs adapt to different environments; absolute URLs are fixed.

---

### 13. Responsive Images

Use `<picture>`, `srcset`, and `sizes` attributes to serve different images based on viewport width or pixel density for performance and user experience.

---

### 14. Element Attributes vs DOM Properties

* **Attributes**: Defined in HTML markup, static, string values (e.g., `<input disabled>`).
* **Properties**: Represent current DOM state, can be dynamic and typed (e.g., `input.disabled` boolean).

Changing an attribute doesn’t always update the property and vice versa; properties reflect current state.

---

### 15. Difference Between ChildNodes / Children etc.

| Property             | Description                                     |
| -------------------- | ----------------------------------------------- |
| `childNodes`         | All child nodes (elements, text, comments)      |
| `children`           | Only element child nodes                        |
| `parentNode`         | Parent node (could be element or document)      |
| `parentElement`      | Parent element only (null if no element parent) |
| `firstChild`         | First child node (any type)                     |
| `firstElementChild`  | First child element                             |
| `nextSibling`        | Next sibling node (any type)                    |
| `nextElementSibling` | Next sibling element                            |

---

### 16. DOM Events and Examples

A DOM event is a signal that something happened (user action, timer, network). Examples:

* `click`, `submit`, `keydown`, `mouseover`, `resize`

---

### 17. Difference Between Click, Mousedown, Mouseup, Mouseover, Mouseenter

* `mousedown`: Press mouse button down
* `mouseup`: Release mouse button
* `click`: Full click (mousedown + mouseup on same element)
* `mouseover`: Fired when mouse enters an element or its children
* `mouseenter`: Fired only when mouse enters the element (no bubbling)

---

### 18. Drag and Drop API Basics

Enables dragging elements and dropping them onto targets using events:

* `dragstart`, `dragover`, `drop`
  Use `event.dataTransfer` to transfer data during drag.

---

### 19. Three Phases of DOM Event Propagation

1. **Capturing phase**: Event propagates from window down to target's parent
2. **Target phase**: Event reaches the target element
3. **Bubbling phase**: Event bubbles up from target to window

Event listeners can be registered for capture or bubble phase.
