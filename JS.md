
## **1. Advanced Hoisting Mechanics**
- **Temporal Dead Zone (TDZ) Runtime Behavior**  
  The TDZ exists from block entry until variable initialization. Unlike `var`, `let`/`const` declarations trigger a `ReferenceError` if accessed in TDZ, demonstrating how the JS engine tracks uninitialized bindings at a bytecode level.

- **Function Hoisting Precedence**  
  During the creation phase, function declarations take priority over variable declarations. When conflicts occur, the function binding overwrites the variable binding in the lexical environment record before execution begins.

## **2. Closure Optimization Patterns**
- **V8 Hidden Class Implications**  
  Closures that capture frequently modified variables force V8 to abandon hidden class optimizations, leading to megamorphic property access slowdowns. Senior engineers strategically isolate mutable state.

- **ICU (Inline Cache Unit) Performance**  
  The same closure reused across different calling contexts pollutes the inline cache, causing deoptimization. Solutions involve either:
  - Binding closure context via `Function.prototype.bind`
  - Factory pattern with fresh closures per instance

## **3. `this` Binding Internals**
- **ECMAScript [[ThisMode]] Specification**  
  The `this` resolution algorithm checks three internal slots:
  1. `[[ThisBindingStatus]]` ("lexical", "initialized", "uninitialized")
  2. `[[FunctionKind]]` ("normal", "classConstructor", "generator")
  3. `[[NewTarget]]` for constructor calls

- **Arrow Function Code Generation**  
  Babel's transpilation of arrow functions reveals how `this` is lexically captured:
  ```javascript
  // Original
  const fn = () => this.x;
  
  // Transpiled
  var _this = this;
  var fn = function() { return _this.x; };
  ```

## **4. `new` Operator Bytecode Analysis**
- **V8's `Construct` Builtin**  
  The internal `Construct` operation:
  1. Allocates an object with `FastNewObject`
  2. Invokes `JSConstructStub` for initialization
  3. Handles implicit return via `Return` bytecode

- **Performance Pitfalls**  
  Dynamic constructor invocation (e.g., `new (classMap[name])()`) bypasses V8's constructor inlining optimization, forcing slower megamorphic property access.

## **5. Promise Implementation Deep Dive**
- **Microtask Queue Management**  
  The JS engine maintains a separate microtask queue processed:
  - After each macrotask completes
  - When the call stack empties
  - With higher priority than `setImmediate`

- **Unhandled Rejection Tracking**  
  The host environment (browser/Node) monitors promise rejection events through the `HostPromiseRejectionTracker` implementation hook.

## **6. Async/Await Code Transformation**
- **Generator-Based Desugaring**  
  The Babel transform reveals how async/await becomes generator functions:
  ```javascript
  async function foo() { await bar(); }
  
  // Becomes:
  function foo() {
    return _asyncToGenerator(function*() {
      yield bar();
    })();
  }
  ```

- **Suspension Points**  
  The engine tracks async function execution state via a hidden `[[AsyncContext]]` slot, enabling correct resumption after awaits.

## **7. Prototype Mutation Performance**
- **Hidden Class Transitions**  
  Modifying prototypes (`Obj.prototype.x = 1`) invalidates all inline caches for that prototype chain, forcing V8 to regenerate hidden classes and deoptimize optimized code.

- **`Object.setPrototypeOf` Hazards**  
  This operation triggers:
  1. Map deprecation in V8
  2. Property type confusion checks
  3. Full prototype chain revalidation

## **8. Property Access Optimization**
- **Inline Cache States**  
  V8 tracks property access through four states:
  1. UNINITIALIZED
  2. PREMONOMORPHIC
  3. MONOMORPHIC
  4. POLYMORPHIC → MEGAMORPHIC (slow path)

- **IC Miss Handling**  
  Cache misses trigger the runtime `LoadIC_Miss` handler, which updates the feedback vector and potentially compiles new optimized code.

## **9. Event Loop Phases (libuv Integration)**
- **Phase Execution Order**  
  Node.js extends the browser event loop with additional phases:
  1. Timers (setTimeout)
  2. Pending OS tasks (TCP errors)
  3. Idle/Prepare (internal)
  4. Poll (new I/O events)
  5. Check (setImmediate)
  6. Close (socket cleanup)

- **Microtask Injection Points**  
  The V8 `MicrotaskQueue` is drained:
  - After each phase completes
  - During `process.nextTick` execution
  - When the call stack unwinds

## **10. WASM-JS Interop Costs**
- **Boundary Crossing Overhead**  
  Parameter marshaling between JS and WASM involves:
  - Type validation
  - Number boxing/unboxing
  - Array buffer detaching/reattaching

- **Optimized Data Transfer**  
  Senior engineers use:
  - SharedArrayBuffer for zero-copy transfer
  - WebIDL type annotations
  - WASM bulk memory operations

## **11. Garbage Collection Strategies**
- **Generational Collection**  
  V8 employs:
  - Scavenger (young generation): Cheney's algorithm
  - Major GC (old generation): Mark-sweep-compact
  - Incremental marking for UI responsiveness

- **Memory Leak Detection**  
  Chrome DevTools heap snapshots reveal:
  - Retainer chains via dominator trees
  - Shallow vs retained size discrepancies
  - Detached DOM node references

## **12. Security Mitigations**
- **Spectre Protections**  
  Modern JS engines implement:
  - Site isolation via process-per-origin
  - SharedArrayBuffer gating
  - High-resolution timer reduction

- **Trusted Types Enforcement**  
  The CSP `require-trusted-types-for` directive:
  1. Validates DOM sink inputs
  2. Enforces type policies
  3. Blocks raw string injection

## **13. JIT Compilation Pipeline**
- **Turbofan Optimization Phases**  
  1. Bytecode graph generation
  2. Typer phase (range analysis)
  3. Simplified lowering
  4. Machine-level optimization
  5. Code generation

- **Deoptimization Triggers**  
  Common causes:
  - Map transitions
  - Unexpected input types
  - Stack overflow checks


---

### ✅ Component – Deep Technical Breakdown

#### 1. **Component Interaction: `@Input`, `@Output`**

* `@Input()` allows parent components to pass data into child components. It triggers `ngOnChanges()` lifecycle when inputs change.
* `@Output()` uses `EventEmitter` to notify the parent of an event occurring in the child. It follows the unidirectional data flow, maintaining component isolation.
* This model ensures decoupling between components and adheres to the “smart” (container) vs “dumb” (presentational) component pattern.

#### 2. **Component Interaction: `@ViewChild`, `@ViewChildren`**

* `@ViewChild` allows access to a single child component, DOM element, or directive instance rendered in the same view.
* `@ViewChildren` retrieves a `QueryList` of multiple matching child components or DOM elements.
* They are resolved **after view initialization** (`ngAfterViewInit`), and are part of the component’s view query mechanism (not content projection).

#### 3. **DOM Manipulation: `ElementRef`, `TemplateRef`, `ViewContainerRef`**

* `ElementRef` gives direct access to a DOM element, bypassing Angular's abstraction, and should be used cautiously to avoid security issues.
* `TemplateRef` represents a `ng-template` block, allowing instantiation of embedded views.
* `ViewContainerRef` acts as an anchor point for inserting, moving, or removing views dynamically at runtime.

#### 4. **`ng-template`, `ng-content`, `ng-container`, `*ngTemplateOutlet`**

* `ng-template` defines embedded templates without rendering them immediately.
* `ng-content` implements content projection, allowing components to receive and render external content.
* `ng-container` acts as a structural placeholder in the DOM without rendering an actual element.
* `ngTemplateOutlet` is a directive to render a `TemplateRef` dynamically with optional context binding.

#### 5. **Custom Events with `EventEmitter`**

* Used within `@Output()` to propagate domain events upward.
* Supports typing, custom payloads, and follows Angular’s reactive pattern.
* Should only be used for communication between tightly coupled components, not for global state.

#### 6. **Dynamic Component Loading**

* Involves using `ComponentFactoryResolver` (pre-Ivy) or `ViewContainerRef.createComponent` (Ivy) to instantiate components at runtime.
* Requires proper module reference, injector, and optionally manual lifecycle handling.
* Used in plugin systems, modal services, or CMS-style architectures.

#### 7. **Change Detection**

* Angular uses a zone-based mechanism to trigger change detection after async events.
* Each component has a `ChangeDetectorRef` and operates within a tree of change detectors.
* Two strategies:

  * **Default**: full-tree dirty checking (even when inputs don’t change).
  * **OnPush**: triggers change detection only on reference change of inputs or via `markForCheck()`; suitable for immutable data patterns and boosts performance.

#### 8. **What is a Component / Lifecycle Methods / Metadata**

* A component is a directive with a view (template).
* Core lifecycle hooks:

  * `ngOnInit`: after input binding; used for initialization.
  * `ngOnChanges`: on any input change.
  * `ngAfterViewInit`: after view children are initialized.
  * `ngOnDestroy`: for cleanup tasks like unsubscribing or DOM detachment.
* Metadata includes selector, template, styleUrls, encapsulation, animations, providers, etc.

#### 9. **Interpolation and Template Expressions / One- and Two-Way Binding**

* **Interpolation (`{{}}`)**: evaluates expressions in the template, strictly one-way from component to DOM.
* **Property binding**: `[property]` updates DOM properties based on component state.
* **Event binding**: `(event)` listens to DOM events and invokes component methods.
* **Two-way binding (`[(ngModel)]`)**: syntactic sugar for `[value]` + `(input)`; used in template-driven forms.

#### 10. **Attribute, Class, and Style Bindings**

* `[attr.x]`, `[class.x]`, `[style.x]` offer fine-grained control over rendering and styling.
* Provide conditional application based on component logic.
* Preferable to direct DOM manipulation for security and consistency with Angular rendering.

#### 11. **DOM Event Binding / `$event` Object**

* Angular provides a binding syntax `(eventName)="handler($event)"`.
* `$event` exposes the native DOM event object, including metadata such as target, value, timestamp, etc.
* Can be extended with RxJS for advanced event stream handling.

#### 12. **Component Styles: `:host`, `:host()`, `:host-context()` /deep/, >>>, ::ng-deep**

* `:host` styles the component’s outer element.
* `:host(selector)` styles the component when a condition/class is present externally.
* `:host-context()` applies styles when a parent matches a selector, useful for theming.
* `/deep/`, `>>>`, `::ng-deep`: deprecated selectors for piercing view encapsulation; discouraged in modern apps.

#### 13. **View Encapsulation**

* Angular supports three encapsulation modes:

  * **Emulated** (default): scoped CSS using attribute shimming.
  * **None**: global CSS.
  * **ShadowDom**: uses native browser shadow DOM.
* Prevents style leakage and enforces modularity.

#### 14. **Animations in Angular**

* Angular provides a declarative DSL via `@angular/animations`.
* Built on top of Web Animations API.
* Supports triggers, transitions, states, keyframes, staggering, and grouping.
* Integrated with Angular’s change detection and lifecycle.

#### 15. **Standalone Components**

* Introduced to reduce reliance on NgModules.
* Can be declared, imported, and used without being listed in a module’s declarations.
* Promote more lightweight, modular application structure and reduce boilerplate.
* Work seamlessly with `importProvidersFrom` and `provide*` APIs in Angular's new bootstrap model.

---

## 🔷 DIRECTIVES

### 1. What is Directive? Structural and Attribute Directives

* A directive is a class with a `@Directive` decorator that modifies the behavior or appearance of DOM elements.
* **Structural directives** change the DOM layout by adding/removing elements (`*ngIf`, `*ngFor`, `*ngSwitch`). They manipulate the view container and embedded templates.
* **Attribute directives** change the appearance or behavior of an existing element without modifying the DOM structure (e.g., `[ngClass]`, `[ngStyle]`, custom attribute directives).

---

### 2. What \* means in `*ngIf`

* The `*` is syntactic sugar for using `<ng-template>` and `TemplateRef`.
* It instructs Angular to convert the element with `*` into an embedded template, and insert/remove it dynamically based on the directive’s condition.
* This transforms the HTML element into a structural template instruction.

---

### 3. Custom Directive

* Created by applying `@Directive` with a selector.
* Can inject `ElementRef`, `Renderer2`, or `TemplateRef` to manipulate the host element or template.
* Can implement lifecycle hooks (`ngOnInit`, `ngOnChanges`, `ngOnDestroy`) to control directive behavior.
* Used to encapsulate reusable DOM behavior or styling logic.

---

## 🔷 PIPES

### 1. What is Pipe? Pure and Impure Pipes

* Pipes transform displayed values in templates.
* **Pure pipes** are stateless and only re-run when input references change. They are efficient and default in Angular.
* **Impure pipes** run on every change detection cycle regardless of input change. Useful for volatile data but can degrade performance.

---

### 2. Async Pipe

* Subscribes to an `Observable` or `Promise`.
* Automatically manages subscription lifecycle, preventing memory leaks.
* Emits latest values to the template, updating the view reactively.

---

### 3. Custom Pipe

* Created using `@Pipe` decorator with a name.
* Implements `PipeTransform` interface with `transform()` method.
* Can be pure or impure, depending on the `pure` property.
* Encapsulates transformation logic reusable across templates.

---

## 🔷 SERVICE

### 1. Dependency Injection: Where to Provide Services?

* Services can be provided in:

  * Root injector (`providedIn: 'root'`), singleton app-wide.
  * Module injector via providers array.
  * Component injector for scoped instances.
* Choice influences service lifetime and sharing scope.

---

### 2. Dependency Injection

* Angular uses hierarchical injectors.
* When a service is requested, Angular resolves it from the closest injector upward.
* This supports multiple instances (scoped injectors) or singleton services.

---

### 3. Decorator `@Injectable`. Option `providedIn`

* Marks a class as injectable and enables Angular’s DI system.
* `providedIn` configures tree-shakable providers:

  * `'root'`: singleton app-wide service.
  * Specific modules or `'any'`: creates instances per injector.
* Enables optimal bundling and lazy loading.

---

### 4. Decorators `@Self`, `@Optional`, `@Host`

* `@Self`: injects only from the current injector, not from ancestors.
* `@Optional`: injects `null` if dependency is not found instead of throwing error.
* `@Host`: restricts search for dependency to the component’s host and ancestors up to host boundary.

---

## 🔷 MODULES

### 1. How Many Modules Can We Create and Use in Angular App?

* Unlimited number of modules.
* Modules organize functionality by domain, feature, or responsibility.
* Encourage lazy loading, separation of concerns, and maintainability.

---

### 2. Basic Modules: BrowserModule, CommonModule, FormsModule, RouterModule, HttpClientModule. What are NgModules and How to Use Them

* **NgModule**: a decorator that defines a compilation context with declarations, imports, providers, and bootstrap components.
* **BrowserModule**: required for browser apps, includes common directives and platform services.
* **CommonModule**: exports common directives like `NgIf` and `NgFor`; imported by feature modules.
* **FormsModule**: template-driven forms support.
* **RouterModule**: enables routing and navigation.
* **HttpClientModule**: provides HTTP communication capabilities.
* Modules are imported/exported to share and organize code.

---

## 🔷 ROUTING

### 1. Routing & Navigation: How Many Guards Can We Apply on Route State?

* Multiple guards can be chained on the same route.
* Guards run sequentially in the order: `CanActivate`, `CanActivateChild`, `CanDeactivate`, `Resolve`, and `CanLoad`.
* Each guard can cancel or allow navigation.

---

### 2. Router vs ActivatedRoute

* **Router**: service to imperatively navigate, manage routes, or listen to route events.
* **ActivatedRoute**: provides information about the current active route, parameters, query params, and data.
* Both are used complementarily for navigation and state retrieval.

---

### 3. Using 2+ router-outlets in One Component Template

* Yes, multiple `router-outlet`s can coexist for nested or auxiliary routing.
* Each outlet can independently render different routed components.
* Enables complex routing scenarios like side panels or named outlets.

---

### 4. Lazy Loading

* Loads feature modules asynchronously when route is accessed.
* Reduces initial bundle size and improves app load performance.
* Configured via `loadChildren` with dynamic import syntax.

---

### 5. Guards: Types and Differences

* **CanActivate**: controls if route can be activated.
* **CanActivateChild**: controls access to child routes.
* **CanDeactivate**: prevents leaving a route/component.
* **Resolve**: pre-fetch data before route activation.
* **CanLoad**: controls if a lazy-loaded module can be loaded.

---

### 6. Router Events

* Events emitted during the routing lifecycle.
* Include `NavigationStart`, `RoutesRecognized`, `NavigationEnd`, `NavigationCancel`, `NavigationError`.
* Useful for logging, loading indicators, or analytics.

---

## 🔷 FORM

### 1. Template-driven vs Reactive Forms

* **Template-driven**: simpler, declarative in templates, suitable for simple forms.
* **Reactive forms**: programmatic, explicit control over form state and validation, better for complex forms.

---

### 2. Benefits of Using FormBuilder

* Provides a fluent API for building reactive forms.
* Simplifies form control, group, and array creation with less boilerplate.

---

### 3. Built-in and Custom Validation

* Angular provides built-in validators (`required`, `minLength`, etc).
* Custom validators can be synchronous or asynchronous, implemented as functions returning validation errors or null.
* Validators can be attached to controls or groups.

---

## 🔷 HTTP

### 1. HttpClient and HttpInterceptor

* **HttpClient**: modern, typed, observable-based HTTP API.
* Supports interceptors for modifying requests/responses globally.

---

### 2. Why Use HttpClient Instead of Fetch?

* Integrated with Angular's dependency injection.
* Supports interceptors for cross-cutting concerns (auth, caching, error handling).
* Typed responses with RxJS observable streams.
* Automatic JSON parsing and request cancellation support.

---

## 🔷 RxJS

### 1. Reactive Programming, Observables, RxJS

* RxJS enables asynchronous and event-based programs using observable sequences.
* Observables represent streams of data/events over time.
* Angular heavily integrates RxJS for state, HTTP, and event handling.

---

### 2. Higher-Order Observable Mapping (e.g., concatMap)

* Operators like `concatMap`, `switchMap`, `mergeMap` handle mapping from one observable to another.
* Control concurrency, order, and cancellation of inner observables.

---

### 3. Subject

* A special observable that is also an observer.
* Used to multicast values to multiple subscribers.
* Variants include `BehaviorSubject`, `ReplaySubject`, `AsyncSubject`.

---

## 🔷 OTHER

### 1. JIT vs AOT Compilation – How It Works, Pros and Cons

* **JIT** (Just-in-time): compiles templates in the browser at runtime; slower initial load; easier debugging.
* **AOT** (Ahead-of-time): compiles templates during build time; faster startup; smaller bundles; better security.

---

### 2. Ways to Improve Angular App Performance

* Use **OnPush** change detection strategy.
* Implement **lazy loading** modules.
* Employ **trackBy** for ngFor.
* Use **pure pipes** and memoized selectors.
* Minimize watchers and bindings.
* Use **server-side rendering** or pre-rendering.
* Optimize bundle size via **tree shaking** and differential loading.

---

### 3. Redux Pattern and NgRx

* Centralized state container with immutable state.
* State modified only through dispatched actions and pure reducers.
* Side effects handled with effects.
* Predictable state management enabling time-travel debugging and testing.

---

### 1. Key Differences Between OOP and FP, and JavaScript Support

* **OOP (Object-Oriented Programming)** centers on organizing code via objects that encapsulate state (data) and behavior (methods). It promotes concepts like inheritance, encapsulation, polymorphism, and abstraction.

* **FP (Functional Programming)** focuses on pure functions, immutability, stateless computations, and declarative coding with higher-order functions and function composition. It avoids side effects and mutable state.

* **JavaScript Support:**

  * JS is a multi-paradigm language supporting both:

    * OOP via prototypes, ES6 classes, constructors, and encapsulation patterns.
    * FP via first-class functions, closures, higher-order functions, and array methods (map, reduce, filter).

---

### 2. Implementing Encapsulation and Polymorphism in JavaScript (Conceptual)

* **Encapsulation:** Achieved by controlling access to an object's internal state through closures, symbols, or ES private fields (`#field`). Public methods serve as the interface to manipulate the internal state, hiding implementation details.

* **Polymorphism:** Realized via method overriding in prototypal inheritance or class-based inheritance. Objects sharing the same interface can have different underlying implementations (subtyping and dynamic dispatch).

---

### 3. Scenario Favoring Functional Programming Over OOP

* FP is preferred when the problem domain benefits from predictable, stateless operations, easier concurrency, and testability—such as data transformation pipelines, event streams, or when immutability and pure functions reduce bugs and complexity.

---

### 4. Single Responsibility Principle (SRP)

* **Definition:** Each module/class/function should have one and only one reason to change, meaning it should focus on a single functionality or responsibility.

* **Benefit:** This separation improves maintainability, readability, and testability by decoupling concerns, reducing side effects, and easing refactoring.

---

### 5. Open/Closed Principle (OCP)

* **Definition:** Software entities (classes, functions, modules) should be open for extension but closed for modification, allowing behavior to be extended without altering existing code.

* **Approach:** Achieved via abstractions, interfaces, or higher-order functions that allow new functionality to be plugged in without modifying the original implementation, thereby reducing regression risk.

---

### 6. Liskov Substitution Principle (LSP)

* **Definition:** Subtypes must be substitutable for their base types without altering correctness, ensuring that derived types honor the contract of their base types.

* **Violation Impact:** When a subtype breaks expected behavior or invariants, it can lead to runtime errors, unexpected behavior, or failures in code relying on base type abstractions.

---

### 7. Interface Segregation Principle (ISP) in JavaScript

* **Concept:** Clients should not be forced to depend on interfaces they do not use.

* **Applicability:** Despite lack of static interfaces, JS achieves this through small, focused objects or modules with minimal method sets. Composing behavior via mixins or smaller modules prevents bloated APIs and improves modularity.

---

### 8. Dependency Inversion Principle (DIP)

* **Definition:** High-level modules should not depend on low-level modules but both should depend on abstractions; abstractions should not depend on details.

* **Achieved in JS:** Via dependency injection (passing dependencies as parameters), inversion of control containers, or factory functions. This decouples components, enhances testability, and flexibility.

---

### 9. DRY Principle (Don't Repeat Yourself)

* **Definition:** Avoid duplicating code or logic.

* **Benefits:** Reduces maintenance overhead, minimizes bugs, and centralizes changes, improving code quality and developer productivity.

---

### 10. KISS Principle (Keep It Simple, Stupid)

* **Definition:** Code should be as simple as possible, avoiding unnecessary complexity.

* **Ensuring Compliance:** Write clear, readable code; prefer straightforward logic over clever tricks; refactor complexity; and document intent.

---

### 11. YAGNI Principle (You Aren't Gonna Need It)

* **Definition:** Do not implement features until they are necessary.

* **Benefit:** Saves development time and resources by avoiding speculative design and over-engineering, enabling faster delivery and adaptability.

---

### 12. Module Design Pattern

* **Purpose:** Encapsulates private variables and exposes a public API, controlling namespace pollution.

* **Benefit:** Organizes large codebases into isolated, reusable, and maintainable units with clear interfaces.

---

### 13. Singleton Pattern

* **Purpose:** Ensures a class or module has only one instance globally accessible.

* **Problems Solved:** Manages shared resources, configuration, or state consistently across the app and controls lifecycle.

---

### 14. Observer Pattern

* **Concept:** Defines a one-to-many dependency where observers subscribe to and react to changes/events in a subject.

* **Use in JS:** Enables event-driven architectures, reactive UI updates, or pub-sub communication between loosely coupled components.

---

### 15. Factory Method Pattern

* **Concept:** Defines an interface for creating objects but allows subclasses or functions to decide which class to instantiate.

* **Benefit:** Abstracts and centralizes object creation, supporting extensibility and encapsulating instantiation logic.

---
