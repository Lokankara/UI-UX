
## **Component**

### 1. Component Interaction: @Input, @Output

Beyond simple property/event binding, senior devs design **immutable input data** to optimize change detection with OnPush.

* Use **@Input** with **`readonly`** or immutable objects to enable OnPush.
* Use **@Output** with strongly typed EventEmitters, also considering RxJS Subjects for event streams when handling multiple or complex events.
* Understand lifecycle impact: Inputs update trigger `ngOnChanges`; outputs must avoid unnecessary event emissions to prevent performance issues.

### 2. Component Interaction: @ViewChild, @ViewChildren

* Use **`static`** flag properly for lifecycle timing (static=true for `ngOnInit`, false for `ngAfterViewInit`).
* Use QueryLists from @ViewChildren with **`changes`** observable to reactively handle dynamic children.
* Consider alternatives to direct DOM manipulation by abstracting behavior into child components to keep maintainable architecture.

### 3. DOM manipulation: ElementRef, TemplateRef, ViewContainerRef

* Minimize **ElementRef.nativeElement** usage to avoid XSS and rendering side-effects. Use **Renderer2** for safe DOM manipulations.
* Use **TemplateRef** and **ViewContainerRef** for dynamic embedded views (e.g., dynamic forms, modals) with manual change detection and view lifecycle management to avoid memory leaks.

### 4. ng-template, ng-content, ng-container, \*ngTemplateOutlet

* Architect complex reusable UI patterns by combining these: use **ng-template + ngTemplateOutlet** for template reuse, **ng-content** for advanced content projection (multi-slot), **ng-container** to reduce extraneous DOM nodes.
* Advanced: use content projection combined with structural directives for dynamic layout components.

### 5. Custom events with EventEmitter

* EventEmitters can be replaced by **RxJS Subjects/Observables** for more flexible event handling with operators, debouncing, throttling, and backpressure control.
* Carefully manage subscriptions and memory leaks especially in parent-child event chains.

### 6. Dynamic Component Loading

* Architect dynamic component loading with **ComponentFactoryResolver** (Angular <13) or **ViewContainerRef.createComponent()** (Angular 13+) in lazy-loaded feature modules.
* Combine with **Injector.create()** to provide module-scoped services dynamically.
* Manage lifecycle hooks and detaching dynamically created components to avoid leaks.

### 7. Change Detection

* Understand **zone.js** and manual change detection with **ChangeDetectorRef** (detach, detectChanges, markForCheck) to optimize performance.
* OnPush combined with immutable data structures and RxJS observables for pushing change detection only when needed.
* Profiling CD cycles and fixing common pitfalls (e.g., mutable inputs, subscriptions inside templates).

### 8. Component Lifecycle & Metadata

* Use lifecycle hooks to optimize: initialize data in `ngOnInit`, release resources in `ngOnDestroy`.
* Prefer `ngAfterViewInit` for child components or DOM-dependent logic.
* Metadata: use **host bindings** and **listeners** for clean API and encapsulation, declarative styles, and encapsulation settings to avoid global style leakage.

### 9. Interpolation, One- and Two-Way Data Binding

* Avoid overusing two-way binding (`[(ngModel)]`) in large-scale apps due to complexity in tracking state changes; favor uni-directional flow for predictability.
* Use **Reactive Forms** with explicit control to handle complex form state and validation.

### 10. Attribute, class, style bindings

* Prefer binding via **NgClass** and **NgStyle** with objects for conditional styling rather than string concatenations for maintainability.
* Use `host` metadata to bind classes or styles on components themselves, reducing template clutter.

### 11. DOM event binding, \$event object

* Use event delegation patterns in complex UI to improve performance.
* Prevent memory leaks by unsubscribing or using **`takeUntil`** in RxJS event streams.

### 12. Component styles, encapsulation

* Avoid deprecated deep selectors; use **CSS Custom Properties** and design tokens for theme support.
* Use **Shadow DOM encapsulation** for true isolation in web components.
* Architect component styles for scalability using BEM or CSS modules in combination with Angular encapsulation.

### 13. Animation

* Architect performant animations using Angular’s animation DSL with triggers tied to component states.
* Optimize by limiting animation change detection cycles and using the **Web Animations API** where possible.

### 14. Standalone components

* Adopt standalone components to reduce NgModule boilerplate in new projects and micro-frontends.
* Handle dependencies by importing standalone components directly, improving tree shaking.

---

## **Directive**

### 1. Directive Types

* Architect reusable **attribute directives** for cross-cutting concerns like validation or accessibility.
* Use **structural directives** carefully since they fundamentally alter DOM shape—impact on performance and lifecycle hooks.

### 2. \* in \*ngIf

* Understand that `*` is syntactic sugar for template expansion; useful to know when debugging view issues or creating custom structural directives.

### 3. Custom Directive

* Implement advanced directives with input properties and lifecycle hooks to respond to DOM or data changes efficiently.
* Use Renderer2 to modify DOM safely in platform-agnostic way.

---

## **Pipe**

### 1. Pure vs Impure

* Impure pipes should be avoided unless absolutely necessary, as they trigger many change detection cycles, impacting performance.

### 2. Async pipe

* Reduces boilerplate for subscription management and improves performance by unsubscribing automatically on component destruction.

### 3. Custom Pipe

* Optimize pipes by memoizing expensive transformations; ensure pure pipes for deterministic outputs.

---

## **Service and Dependency Injection**

### 1. Service scopes

* Architect service providers at appropriate scope: global singletons, lazy-loaded module scoped, or component scoped services to balance memory use and behavior isolation.

### 2. DI patterns

* Use **InjectionToken** for interface-based injection and to decouple implementations.

### 3. @Injectable and providedIn

* Use `providedIn: 'root'` for tree-shakable singletons; use feature-module-level providers to isolate services per lazy module.

### 4. @Self, @Optional, @Host

* Use these decorators strategically to resolve dependencies with fallback or restrict injection context to avoid injector errors and circular dependencies.

---

## **Modules**

### 1. Modular architecture

* Design feature modules with clear responsibilities, lazy-loaded where applicable to optimize initial bundle size.

### 2. Core and Shared Modules

* Use CoreModule for singleton services, SharedModule for common components/directives/pipes, avoiding circular dependencies.

---

## **Routing**

### 1. Multiple guards

* Compose guards to protect routes with fine-grained control (auth, roles, unsaved changes).

### 2. Router vs ActivatedRoute

* Use Router for imperative navigation, ActivatedRoute for reactive param retrieval; combine with RxJS operators to avoid nested subscriptions.

### 3. Multiple router-outlets

* Architect complex layouts or nested navigation with named outlets.

### 4. Lazy Loading

* Design module boundaries carefully to avoid duplicated services or heavy dependencies.

### 5. Guard types

* Apply appropriate guard for use case; understand lifecycle and asynchronous handling.

### 6. Router Events

* Use router events for analytics, progress bars, or error handling.

---

## **Forms**

### 1. Template-driven vs Reactive

* Reactive forms preferred in large apps for testability, scalability, and reactive patterns.

### 2. FormBuilder

* Use to reduce boilerplate and dynamically build complex forms.

### 3. Custom Validators

* Create reusable validators with parameters; manage async validation for server-side checks.

---

## **Http**

### 1. HttpClient and HttpInterceptor

* Use interceptors to add auth tokens, retry logic, caching, and centralized error handling.

### 2. HttpClient vs fetch

* HttpClient benefits: RxJS integration, automatic JSON parsing, typed responses, interceptors.

---

## **RxJS**

### 1. Reactive programming

* Use reactive streams for UI event handling, HTTP, state management with operators like debounceTime, switchMap for cancelling stale requests.

### 2. Higher-Order Observable Mapping

* Understand implications of **switchMap (cancels old requests)** vs **concatMap (queues)** vs **mergeMap (parallel)** on UI and backend.

### 3. Subject

* Use Subjects or BehaviorSubjects for multicasting and state sharing; avoid memory leaks by unsubscribing.

---

## **Other**

### 1. JIT vs AOT

* Use AOT for production builds, better performance, early error detection; JIT only for dev.

### 2. Performance improvements

* Code splitting, lazy loading, OnPush, trackBy, memoization, SSR, caching strategies.

### 3. Redux and NgRx

* Use for predictable state, undo/redo, time travel debugging; architect with selectors and effects for side effects.

---

## **Component System**

### **1. @Input/@Output Mechanics**
- **@Input**  
  - Under the hood: Uses property binding infrastructure (`BindingFlags` in Ivy)
  - Change detection: Triggers `ngOnChanges` only when reference changes (immutable pattern)
  - Performance: Object references vs primitive values impact change detection
  - Angular 16+:
    - `required: true` enforces compile-time checking
    - `transform` allows input value coercion without setters

- **@Output**  
  - Implementation: Extends `Subject` (not `EventEmitter` directly)
  - Synchronous by default (contrary to common misconception)
  - Memory leaks: Unsubscribing happens automatically in Angular's `EventEmitter` wrapper
  - Best practice: Always `readonly` to prevent external tampering

### **2. ViewChild/ViewChildren Deep Technicalities**
- **Query timing**:
  - `static: true` = available in `ngOnInit` (after first check)
  - `static: false` = available in `ngAfterViewInit` (after view checked)
- **Ivy changes**:
  - No longer need `ComponentFactoryResolver`
  - Direct type inference from component class
- **Content vs View**:
  - `@ContentChild` queries projected content (`ng-content`)
  - `@ViewChild` queries component's own template
- **Performance**: Queries are resolved during change detection (not constructor)

### **3. DOM Manipulation: ElementRef vs Renderer2**
- **ElementRef security**:
  - Direct `nativeElement` access bypasses Angular's security sanitization
  - XSS risk with `innerHTML` assignments
- **Renderer2 advantages**:
  - Platform-agnostic (works in SSR, Web Workers)
  - Proper attribute/property distinction
  - Built-in sanitization for dangerous operations
- **ViewContainerRef**:
  - Manages **host views** (components) and **embedded views** (templates)
  - Memory management: `clear()` vs `detach()` vs `remove()`

### **4. Template Concepts (ng-template, ng-content, ng-container)**
- **ng-template**:
  - Compiles into `ɵɵtemplate` instruction in Ivy
  - No DOM footprint until instantiated
- **ng-content**:
  - Projection happens **before** lifecycle hooks
  - `select` uses CSS selector engine (not Angular template syntax)
- **ng-container**:
  - Compiles into comment nodes (`<!--container-->`)
  - Grouping without breaking flex/table layouts
- ***ngTemplateOutlet**:
  - Creates **embedded views** (not components)
  - Context object becomes `$implicit` in `TemplateRef`

### **5. EventEmitter Implementation**
- **Not just a wrapper**:
  - Extends `Subject` but **synchronous** by default
  - Async mode uses `setTimeout(() => {}, 0)`
- **Memory management**:
  - Automatically unsubscribes on component destruction
  - No need for `takeUntil` pattern
- **Best practices**:
  - Avoid complex objects in emissions (serializable only)
  - Prefer synchronous for UI events (better stack traces)

### **6. Dynamic Component Loading (Ivy)**
- **Ivy changes**:
  - No longer requires `ComponentFactory`
  - `createComponent()` now directly accepts component class
- **Dependency injection**:
  - Dynamic components inherit injector from `ViewContainerRef`
  - Custom providers via `Injector.create()`
- **Performance**:
  - Lazy-loading components with `import()` + `createComponent()`
  - `ComponentRef` destruction prevents memory leaks

### **7. Change Detection: Zone.js Internals**
- **Execution flow**:
  1. Zone.js intercepts async API (setTimeout, XHR, etc.)
  2. Patches `globalThis` methods
  3. Triggers `ApplicationRef.tick()`
- **Optimization strategies**:
  - `NgZone.runOutsideAngular()` for canvas/third-party libs
  - `detach()` + `reattach()` for manual control
  - `markForCheck()` vs `detectChanges()` (scope difference)
- **OnPush requirements**:
  - Immutable inputs **or** Observable with `async` pipe
  - Explicit `markForCheck()` for external state changes

### **8. Component Lifecycle: Execution Order**
1. **Constructor**: Pure DI phase (no DOM/bindings)
2. **ngOnChanges**: Inputs initialized (if any)
3. **ngOnInit**: One-time initialization
4. **ngDoCheck**: Custom change detection
5. **Content Projection**:
   - `ngAfterContentInit`
   - `ngAfterContentChecked`
6. **Child Components**:
   - `ngAfterViewInit`
   - `ngAfterViewChecked`
7. **ngOnDestroy**: Cleanup (important for Observables, DOM listeners)

### **9. Data Binding: Compiler Transformations**
- **Interpolation**:
  - `{{ value }}` → `ɵɵtextInterpolate(value)`
  - Sanitization for `innerHTML` vs `textContent`
- **Property binding**:
  - `[prop]="expr"` → `ɵɵproperty('prop', expr)`
  - Special cases: `[attr.]`, `[class.]`, `[style.]`
- **Two-way binding**:
  - `[(ngModel)]` → `[ngModel]` + `(ngModelChange)`
  - Custom two-way bindings require naming convention (`prop` + `propChange`)

### **10. Style/Class Binding: Renderer Internals**
- **Class binding**:
  - `[class]` overwrites all classes
  - `[class.name]` toggles individual classes
  - `NgClass` uses `Renderer2.addClass/removeClass`
- **Style binding**:
  - `[style.prop]` handles units automatically (`px`, `%`, etc.)
  - `NgStyle` uses `Renderer2.setStyle`
- **Performance**:
  - Inline bindings faster than `NgClass/NgStyle`
  - Prefer static classes where possible

### **11. Event Binding: $event Analysis**
- **DOM events**:
  - `$event` = native `Event` object
  - `stopPropagation()` and `preventDefault()` patterns
- **Custom events**:
  - `$event` = whatever `EventEmitter` emits
  - Type safety via generic `EventEmitter<T>`
- **Key events**:
  - `(keydown.enter)` uses Angular's `KeyEventsPlugin`
  - Custom key codes via `(keydown.$event.code)`

### **12. Component Styles: Shadow DOM Strategies**
- **:host**:
  - Targets component's host element
  - `:host(.active)` conditionally styles host
- **:host-context()**:
  - Checks **ancestor** elements (not just host)
  - Useful for theme propagation
- **View Encapsulation**:
  - `Emulated`: Adds `_ngcontent-*` attributes
  - `ShadowDom`: Uses browser's shadow root
  - `None`: Global styles (dangerous)

### **13. View Encapsulation: CSS Isolation**
- **Emulated mode**:
  - Generates unique attributes (`_nghost-*`, `_ngcontent-*`)
  - Scopes styles via attribute selectors
- **Shadow DOM**:
  - True style isolation
  - Slower in some browsers due to polyfill
- **Performance**:
  - `Emulated` has minimal overhead
  - `ShadowDom` impacts rendering performance

### **14. Animation: State Machine**
- **Trigger**:
  - Defines animation states (`void`, `*`, custom)
  - Uses `trigger()` function
- **Transition**:
  - Defines timing between states
  - `:enter`/`:leave` aliases for `void => *` and `* => void`
- **Implementation**:
  - Uses Web Animations API
  - Fallback to CSS animations

### **15. Standalone Components (Angular 16+)**
- **Key features**:
  - No `NgModule` required
  - Direct `imports` in component
  - Lazy-loadable via router
- **Dependency injection**:
  - Uses hierarchical injector
  - Can import providers directly
- **Migration path**:
  - Compatible with NgModule system
  - Gradual adoption recommended

---


### 1. Component Interaction: @Input, @Output

**@Input**:
- Mechanism for parent-to-child communication
- Uses property binding syntax in parent template: `<child [inputProp]="parentValue">`
- Can use setters/getters for input properties to add logic:
  ```typescript
  @Input() set data(value: T) {
    this._data = value;
    // Additional logic
  }
  ```
- `OnChanges` lifecycle hook is triggered when input values change

**@Output**:
- Mechanism for child-to-parent communication
- Uses EventEmitter with DOM events syntax in parent template: `<child (outputEvent)="parentHandler($event)">`
- Should always initialize EventEmitter:
  ```typescript
  @Output() eventName = new EventEmitter<T>();
  ```
- Best practice is to emit only when truly needed to avoid unnecessary change detection cycles

**Advanced Patterns**:
- Input transforms (Angular 16+):
  ```typescript
  @Input({ transform: booleanAttribute }) disabled = false;
  ```
- Input required flag (Angular 16+):
  ```typescript
  @Input({ required: true }) id: string;
  ```

### 2. Component Interaction: @ViewChild, @ViewChildren

**@ViewChild**:
- Accesses a single child component, directive, or DOM element
- Options:
  ```typescript
  @ViewChild(ChildComponent, { static: false }) child: ChildComponent;
  ```
  - `static: true` - available in ngOnInit
  - `static: false` - available in ngAfterViewInit
- Can query by:
  - Component/Directive type
  - Template reference variable (#var)
  - Provider token (with read option)

**@ViewChildren**:
- Accesses multiple children as a QueryList
- QueryList is iterable and has changes observable:
  ```typescript
  @ViewChildren(ChildComponent) children: QueryList<ChildComponent>;
  
  ngAfterViewInit() {
    this.children.changes.subscribe(() => { /* handle changes */ });
  }
  ```

**Advanced Usage**:
- ContentChild vs ViewChild (projected content vs view children)
- Using read option to get specific instances:
  ```typescript
  @ViewChild('tpl', { read: ViewContainerRef }) vcr: ViewContainerRef;
  ```

### 3. DOM Manipulation with ElementRef, TemplateRef, ViewContainerRef

**ElementRef**:
- Wrapper around native DOM element
- Direct access via `elementRef.nativeElement`
- Security risk: Potential XSS vulnerability if not properly sanitized
- Prefer Angular templating and data binding over direct manipulation

**TemplateRef**:
- Represents an embedded template (`<ng-template>`)
- Used with structural directives or dynamic component creation
- Contains the blueprint for creating views

**ViewContainerRef**:
- Container where one or more views can be attached
- Key methods:
  - `createEmbeddedView()` - for TemplateRef
  - `createComponent()` - for dynamic components
  - `clear()`, `length`, `get()`, etc.

**Advanced Pattern**:
```typescript
constructor(
  private vcr: ViewContainerRef,
  private templateRef: TemplateRef<any>
) {}

ngOnInit() {
  this.vcr.createEmbeddedView(this.templateRef);
}
```

### 4. ng-template, ng-content, ng-container, *ngTemplateOutlet

**ng-template**:
- Defines a template that isn't rendered by default
- Used with structural directives or template references
- Can have context variables:
  ```html
  <ng-template let-item let-i="index">
    {{i}}: {{item.name}}
  </ng-template>
  ```

**ng-content**:
- Projects content from parent into child component
- Can be selective with `select` attribute:
  ```html
  <ng-content select="[special]"></ng-content>
  ```
- Content is evaluated in parent's context

**ng-container**:
- Logical container that doesn't render to DOM
- Useful for grouping elements without adding extra nodes
- Common use with *ngIf and *ngFor together

***ngTemplateOutlet**:
- Instantiates a template dynamically
- Can provide context:
  ```html
  <ng-container *ngTemplateOutlet="tmpl; context: {$implicit: data}">
  ```

**Advanced Usage**:
- Template references with complex contexts
- Multi-slot content projection patterns

### 5. Custom Events with EventEmitter

**EventEmitter**:
- Extends RxJS Subject
- Should only be used for @Output events
- Best practices:
  - Always declare as readonly
  - Prefer synchronous events unless good reason for async
  ```typescript
  @Output() readonly itemSelected = new EventEmitter<Item>();
  ```
- Unidirectional data flow: events up, props down

**Advanced Patterns**:
- Custom DOM events with EventEmitter
- Event payload design patterns (small, serializable objects)
- Error handling in event chains

### 6. Dynamic Component Loading

**Process**:
1. Get ViewContainerRef
2. Create component factory (or use ComponentFactoryResolver pre-Ivy)
3. Create component instance
4. Insert into view container

**Modern Ivy Approach**:
```typescript
@Component({ /* ... */ })
export class DynamicHostComponent {
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  async loadComponent() {
    this.container.clear();
    const { DynamicComponent } = await import('./dynamic.component');
    const componentRef = this.container.createComponent(DynamicComponent);
    componentRef.setInput('someInput', value);
  }
}
```

**Advanced Considerations**:
- Input/output binding setup
- Lifecycle management
- Memory leak prevention
- AOT compilation compatibility

### 7. Change Detection: How It Works and Strategies

**Change Detection Mechanism**:
- Tree-walking process that checks all bindings
- Triggered by:
  - Async events (click, timer, XHR)
  - Explicit calls to `ApplicationRef.tick()`
  - ChangeDetectorRef.detectChanges()

**Strategies**:
- `Default`: Checks all components on every change
- `OnPush`: Only checks when:
  - Input references change
  - Async pipe receives new value
  - Event originates from component
  - Change detection triggered manually

**Optimization Techniques**:
- Immutable data structures
- Observable patterns with async pipe
- `markForCheck()` vs `detectChanges()`
- `detach()` and `reattach()`

**Advanced Topics**:
- Zone.js optimization (zone-less operation)
- Change detection profiling
- ExpressionChangedAfterCheckedError understanding

### 8. Component: Definition, Lifecycle, Metadata

**Component Definition**:
- Decorated class with template and behavior
- Angular's fundamental UI building block
- Composable and reusable

**Lifecycle Hooks**:
1. `ngOnChanges`: Input changes (first before ngOnInit)
2. `ngOnInit`: Initial setup
3. `ngDoCheck`: Custom change detection
4. `ngAfterContentInit`: Projected content initialized
5. `ngAfterContentChecked`: After projected content check
6. `ngAfterViewInit`: Child views initialized
7. `ngAfterViewChecked`: After child views check
8. `ngOnDestroy`: Cleanup

**Component Metadata**:
- `selector`: CSS selector for template
- `template/templateUrl`: View definition
- `styles/styleUrls`: Component-scoped styles
- `changeDetection`: Strategy
- `providers`: Component-level services
- `encapsulation`: View encapsulation mode
- `standalone`: Angular 14+ standalone flag

### 9. Interpolation and Data Binding

**Interpolation**:
- `{{expression}}` in templates
- One-way binding from component to view
- Supports pipes and safe navigation operator (?.)
- Avoid complex expressions (move to component)

**One-way Binding**:
- Property binding: `[property]="expression"`
- Attribute binding: `[attr.aria-label]="expression"`
- Class binding: `[class.active]="isActive"`
- Style binding: `[style.width.px]="width"`

**Two-way Binding**:
- `[(ngModel)]="property"` (requires FormsModule)
- Banana-in-a-box syntax
- Equivalent to:
  ```html
  [value]="property" (valueChange)="property=$event"
  ```

**Advanced Patterns**:
- Custom two-way bindable properties
- ControlValueAccessor for custom form controls
- Performance implications of binding expressions

### 10. Attribute, Class, and Style Bindings

**Attribute Binding**:
- For non-DOM properties (ARIA, data-*)
- Syntax: `[attr.attributeName]="expression"`
- Differs from property binding (attributes vs properties)

**Class Binding**:
- Single class: `[class.active]="isActive"`
- Multiple: `[class]="classExpression"` (overwrites all)
- NgClass directive for complex scenarios

**Style Binding**:
- Single style: `[style.width.px]="width"`
- Multiple: `[style]="styleExpression"`
- NgStyle directive for complex scenarios
- Unit handling: `[style.width.px]` vs `[style.width]="width + 'px'"`

**Advanced Usage**:
- Dynamic theme switching
- Animation preparation with styles
- Performance considerations

### 11. DOM Event Binding and $event

**Event Binding**:
- Syntax: `(event)="handler($event)"`
- `$event` contains DOM event or custom emitted value
- Can pass additional parameters:
  ```html
  (click)="handleClick($event, item)"
  ```

**Event Modifiers**:
- Angular doesn't have Vue-like modifiers but:
  - `(keyup.enter)` - specific key events
  - Custom directives can implement modifier behavior

**Best Practices**:
- Avoid complex logic in templates
- Consider event delegation for performance
- Prevent default/stop propagation judiciously

**Advanced Patterns**:
- Custom events with EventEmitter
- Global event listeners with Renderer2
- Event bus patterns with services

### 12. Component Styles: Host Selectors and Deep Access

**:host**:
- Targets the host element of the component
- `:host` - styles the component's host element
- `:host(.active)` - conditional based on host classes
- `:host-context(.theme-dark)` - based on ancestor context

**Deep Access (Deprecated)**:
- `/deep/`, `>>>`, `::ng-deep` - pierce view encapsulation
- All deprecated but `::ng-deep` still widely used
- Best practice: prefer component architecture over deep selectors
- Current alternative: use CSS variables for theming

**Modern Approaches**:
- CSS custom properties for theming
- View encapsulation modes
- Shared style libraries

### 13. View Encapsulation

**Modes**:
1. `Emulated` (default): Scoped styles via unique attributes
2. `None`: Global styles without encapsulation
3. `ShadowDom`: Native shadow DOM encapsulation

**Tradeoffs**:
- `Emulated`: Good balance, works everywhere
- `None`: Risk of style collisions
- `ShadowDom`: True encapsulation but polyfill needed for some browsers

**Advanced Usage**:
- Mixing encapsulation modes
- Shadow DOM slot projection
- Theming strategies across encapsulation boundaries

### 14. Animation in Angular

**Animation System**:
- Built on Web Animations API
- Declarative approach with `@Component.animations`
- State-based transitions

**Key Concepts**:
- `trigger()`: Animation entry point
- `state()`: Defined styles for states
- `transition()`: How to move between states
- `animate()`: Timing and easing
- `keyframes()`: Complex multi-step animations

**Advanced Patterns**:
- Route transition animations
- Dynamic animations with parameters
- Animation callbacks
- Performance optimization

### 15. Standalone Components

**Angular 14+ Feature**:
- Components that don't belong to any NgModule
- Can import dependencies directly
- Simplifies application structure

**Key Aspects**:
- `standalone: true` in component metadata
- Imports declared directly:
  ```typescript
  @Component({
    standalone: true,
    imports: [CommonModule, RouterModule]
  })
  ```
- Can be lazily loaded directly by router

**Migration Path**:
- Gradual adoption alongside modules
- Can import existing modules into standalone components
- Future direction of Angular

## Directive

### 1. Directives: Structural and Attribute

**Attribute Directives**:
- Change appearance/behavior of elements
- Examples: NgClass, NgStyle
- Applied as attributes: `<div myDirective>`

**Structural Directives**:
- Change DOM layout by adding/removing elements
- Examples: *ngIf, *ngFor
- Prefix with *: `<div *ngIf="condition">`

**Custom Directives**:
- Create with `@Directive` decorator
- Can inject ElementRef, Renderer2
- HostListener for events, HostBinding for properties

### 2. The * in *ngIf

**Microsyntax**:
- * is syntactic sugar for `<ng-template>`
- `*ngIf="condition"` becomes:
  ```html
  <ng-template [ngIf]="condition">
    <!-- content -->
  </ng-template>
  ```
- Similar transformation happens for all structural directives

### 3. Custom Directives

**Creation Process**:
1. Define directive with `@Directive`
2. Selector should be camelCase in TS, kebab-case in HTML
3. Implement desired behavior

**Example**:
```typescript
@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input() appTooltip: string;
  
  @HostListener('mouseenter') show() { /* ... */ }
  @HostListener('mouseleave') hide() { /* ... */ }
}
```

**Advanced Patterns**:
- Directive composition
- Host element manipulation
- Dynamic inputs/outputs
- Services integration

## Pipe

### 1. Pipes: Pure and Impure

**Pure Pipes**:
- Only recalculates when input changes (immutable)
- Default for all pipes
- Must be pure functions (no side effects)

**Impure Pipes**:
- Recalculates on every change detection
- Marked with `pure: false`
- Performance intensive, use sparingly

### 2. Async Pipe

**Key Features**:
- Subscribes to Observable/Promise
- Unsubscribes automatically
- Marks component for check (works with OnPush)
- Handles null/undefined safely

**Usage**:
```html
<div>{{ data$ | async }}</div>
```

### 3. Custom Pipes

**Creation**:
```typescript
@Pipe({ name: 'custom' })
export class CustomPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    // transformation logic
  }
}
```

**Advanced Patterns**:
- Parameterized pipes
- Stateful impure pipes
- Pipe combinations
- Performance optimization

## Service

### 1-2. Dependency Injection and Providers

**Injection Hierarchy**:
1. Component (and its view children)
2. Module (declaring or importing)
3. Root injector

**Provider Scopes**:
- `providedIn: 'root'`: Singleton app-wide
- Component providers: Instance per component
- Module providers: Shared within module

### 3. @Injectable and providedIn

**@Injectable**:
- Marks class as participating in DI
- `providedIn` determines scope
- Modern approach replaces NgModule providers

**Options**:
- `'root'`: Application-level singleton
- `'platform'`: Shared across applications
- `'any'`: New instance in every module
- Specific NgModule: Scoped to that module

### 4. Parameter Decorators

**@Self**:
- Only look in current injector
- Throws error if not found

**@Optional**:
- Returns null if provider not found
- Prevents errors for optional dependencies

**@Host**:
- Stops searching at host component
- Useful for directive/component communication

**Advanced Patterns**:
- Hierarchical injectors
- Injection tokens
- Factory providers
- Value providers

## Modules

### 1. Module System

**Module Types**:
- Root module (AppModule)
- Feature modules
- Shared modules
- Core modules (singleton services)
- Routing modules

**Design Principles**:
- Lazy-loaded feature boundaries
- Shared modules for common components
- Core module for singletons
- Avoid circular dependencies

### 2. Common Modules

**BrowserModule**:
- Required in root module
- Includes CommonModule, platform directives
- Only import once (in root)

**CommonModule**:
- Common directives (ngIf, ngFor)
- Needed in feature modules

**FormsModule**:
- Template-driven forms
- NgModel, NgForm

**ReactiveFormsModule**:
- Model-driven forms
- FormGroup, FormControl

**RouterModule**:
- Routing functionality
- RouterOutlet, RouterLink

**HttpClientModule**:
- HTTP client services
- HttpClient service

## Routing

### 1. Routing Guards

**Guard Types**:
1. CanActivate: Route navigation
2. CanActivateChild: Child routes
3. CanDeactivate: Prevent leaving
4. CanLoad: Prevent lazy-loading
5. Resolve: Pre-fetch data

**Implementation**:
```typescript
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    return checkAuth();
  }
}
```

### 2. Router vs ActivatedRoute

**Router**:
- Navigation control (`navigate`, `navigateByUrl`)
- Event observation (`events` observable)
- State inspection

**ActivatedRoute**:
- Current route information
- Access to params, data, queryParams
- Component-specific route info

### 3. Multiple Router Outlets

**Named Outlets**:
- Primary outlet (unnamed)
- Secondary outlets: `<router-outlet name="sidebar">`
- Navigation:
  ```typescript
  this.router.navigate([{outlets: {sidebar: ['path']}}]);
  ```
  
**Use Cases**:
- Master-detail layouts
- Modal dialogs
- Sidebar content

### 4. Lazy Loading

**Implementation**:
```typescript
{
  path: 'feature',
  loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)
}
```

**Benefits**:
- Smaller initial bundle
- Faster startup
- On-demand loading

### 5. Guards

**Common Patterns**:
- Authentication checks
- Permission verification
- Unsaved changes confirmation
- Data pre-fetching

### 6. Router Events

**Event Sequence**:
1. NavigationStart
2. RouteConfigLoadStart
3. RouteConfigLoadEnd
4. RoutesRecognized
5. GuardsCheckStart
6. ChildActivationStart
7. ActivationStart
8. GuardsCheckEnd
9. ResolveStart
10. ResolveEnd
11. ActivationEnd
12. ChildActivationEnd
13. NavigationEnd/NavigationCancel/NavigationError

**Usage**:
```typescript
this.router.events.pipe(
  filter(e => e instanceof NavigationEnd)
).subscribe(/* ... */);
```

## Forms

### 1. Template-driven vs Reactive Forms

**Template-driven**:
- Declarative approach
- Two-way binding
- Less explicit
- Good for simple forms

**Reactive Forms**:
- Imperative approach
- Immutable data model
- More control
- Better for complex forms

### 2. FormBuilder Benefits

**Advantages**:
- Cleaner syntax
- Type safety
- Group organization
- Validation setup

**Example**:
```typescript
this.form = this.fb.group({
  name: ['', [Validators.required]],
  email: ['', [Validators.required, Validators.email]]
});
```

### 3. Validation

**Built-in Validators**:
- required, requiredTrue
- min, max, minLength, maxLength
- pattern, email
- compose (combine validators)

**Custom Validators**:
```typescript
function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control) => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}
```

**Cross-field Validation**:
- Group-level validators
- Compare fields in validator

## HTTP

### 1. HttpClient and Interceptors

**HttpClient**:
- Typed methods (get<T>, post<T>)
- Interceptor support
- Progress events
- JSON by default

**Interceptors**:
```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'token')
    });
    return next.handle(authReq);
  }
}
```

### 2. HttpClient vs Fetch

**Advantages**:
- Type safety
- Interceptor pipeline
- RxJS integration
- Testing utilities
- Progress events
- Simplified error handling
- Automatic JSON handling

## RxJS

### 1. Observables and Reactive Programming

**Core Concepts**:
- Observable: Event stream
- Observer: Consumer
- Subscription: Execution control
- Operators: Transformation tools

**Angular Integration**:
- Async pipe
- HttpClient
- Router
- Forms

### 2. Higher-Order Observable Mapping

**Operators**:
- `concatMap`: Sequential, ordered
- `mergeMap`: Parallel, unordered
- `switchMap`: Cancel previous
- `exhaustMap`: Ignore new while busy

**Use Cases**:
- Typeahead (switchMap)
- Save operations (concatMap)
- Parallel requests (mergeMap)
- Login clicks (exhaustMap)

### 3. Subjects

**Types**:
- `Subject`: No initial value, multicasts
- `BehaviorSubject`: Initial value, current value
- `ReplaySubject`: Buffers previous values
- `AsyncSubject`: Only emits on completion

**Angular Usage**:
- State management
- Component communication
- Event buses

## Other Advanced Topics

### 1. JIT vs AOT Compilation

**JIT (Just-in-Time)**:
- Compiles in browser
- Larger bundle
- Slower startup
- Easier debugging
- Development default

**AOT (Ahead-of-Time)**:
- Compiles during build
- Smaller bundle
- Faster rendering
- Template errors caught early
- Production default

### 2. Performance Optimization

**Techniques**:
- OnPush change detection
- Lazy loading
- TrackBy in ngFor
- Pure pipes
- Memoization
- Virtual scrolling
- Server-side rendering
- Web workers for CPU-intensive tasks

### 3. Redux and NgRx

**Redux Pattern**:
- Single source of truth
- Immutable state
- Actions describe changes
- Reducers pure functions

**NgRx Implementation**:
- Store: State container
- Actions: Events
- Reducers: State changers
- Selectors: Memoized queries
- Effects: Side effects

**Alternatives**:
- NgXs
- Akita
- Component store

