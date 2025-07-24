
### 🛡️ **1. What is the OWASP Top 10, and why should JavaScript developers be familiar with it?**

The OWASP Top 10 is a **curated list of the ten most critical web application security risks**, updated periodically by the **Open Web Application Security Project (OWASP)**. It is widely regarded as the foundational standard for web security.

JavaScript developers should be familiar with it because:

* Modern web apps are **heavily client-driven**, increasing attack vectors.
* Many of the top 10 risks (e.g., XSS, insecure deserialization, misconfigurations) are directly tied to frontend behavior and API usage.
* It influences **code reviews**, **threat modeling**, and **security audits**.

---

### ✍️ **2. How can OWASP Top 10 influence development practices, especially with data input handling?**

It guides the creation of **secure-by-default applications** by enforcing:

* **Input validation** and sanitization (to avoid XSS/SQLi).
* Use of **secure frameworks and libraries**.
* Avoiding risky patterns (e.g., innerHTML injections, `eval`).
* Using **parameterized queries** and **escaping output**.
* Applying **principle of least privilege** in APIs and data access.

---

### 🔐 **3. Authentication vs Authorization: What's the difference?**

* **Authentication**: Verifying **who you are** (e.g., login process).
* **Authorization**: Verifying **what you're allowed to do** (e.g., access control to a resource).

Handled via:

* Tokens (JWTs, OAuth)
* RBAC/ABAC (Role-/Attribute-based access control)
* Claims inside JWT to map permissions

---

### 🧾 **4. What is JWT (JSON Web Token) and how is it used?**

JWT is a **compact, URL-safe token format**, typically used for **stateless authentication**:

* Consists of **Header**, **Payload**, and **Signature**
* Issued by an **auth server**, stored in **HTTP-only cookies** or `localStorage` (though the latter has risks)
* Used to **verify user identity and claims** on protected routes

Benefits:

* **Scalable**, no session state on server
* **Interoperable** across services

---

### 🌐 **5. When would you use OAuth 2.0?**

**Scenario**: A JS app needs to allow users to log in using Google or GitHub and access their profile.

OAuth 2.0 provides:

* **Delegated access** (user doesn’t share credentials)
* **Token-based architecture** (access and refresh tokens)
* Standardized **authorization flow** (e.g., Authorization Code Flow with PKCE for SPAs)

It helps isolate responsibilities and supports **SSO and 3rd-party integrations**.

---

### 🚫 **6. What is CORS and why is it important?**

**CORS (Cross-Origin Resource Sharing)** is a **browser mechanism** that restricts **cross-origin HTTP requests** from scripts for security reasons.

Importance:

* Prevents **malicious websites** from accessing sensitive resources on other domains.
* Enforced by browsers to avoid **data exfiltration** or **unauthorized API access**.

---

### 🛠️ **7. Handling CORS in a JS application (and headers involved)**

**How to handle**:

* Server must include appropriate headers like:

  * `Access-Control-Allow-Origin`
  * `Access-Control-Allow-Methods`
  * `Access-Control-Allow-Headers`
  * `Access-Control-Allow-Credentials` (if cookies/auth used)

**On frontend**:

* Use `fetch()` with correct mode and credentials if needed:

```js
fetch('https://api.example.com/data', {
  method: 'GET',
  credentials: 'include',
  mode: 'cors',
});
```

---

### 🔐 **8. Is CORS a security feature?**

Yes — but **for browsers only**. It protects **users** from malicious scripts reading data from unauthorized origins.

**It’s not an access control mechanism on the backend** — you should still implement proper **auth and ACLs**.

---

### 🧩 **9. What is Content Security Policy (CSP)? How does it help?**

CSP is a **defense-in-depth HTTP response header** that helps **mitigate XSS** and other code injection attacks.

You can:

* Whitelist trusted sources of scripts, styles, images, etc.
* Disallow `inline-script` or `eval`
* Enforce `strict-dynamic` with nonces for better control

Example:

```http
Content-Security-Policy: default-src 'self'; script-src 'self' cdn.example.com
```

---

### 🛡️ **10. Steps to implement CSP & common directives**

**Steps**:

1. Audit current usage of inline scripts/resources
2. Generate initial policy using tools like **csp-evaluator**
3. Implement CSP headers via server (Apache/Nginx/Express)
4. Monitor using **Content-Security-Policy-Report-Only**

**Common directives**:

* `default-src`
* `script-src`
* `style-src`
* `img-src`
* `connect-src`
* `frame-src`

---

### 🔒 **11. How CSP prevents XSS?**

By disallowing:

* Execution of **unauthorized scripts**
* Inline scripts without nonce or hash

**Example**: If an attacker injects `<script>alert(1)</script>`, but `script-src` only allows `cdn.example.com`, the browser blocks the execution.

---

### 🔁 **12. What is CSRF and how can it affect a web application?**

**Cross-Site Request Forgery** occurs when:

* A user is **logged into a site**, and a malicious site makes a **state-changing request** to it using their credentials.

**Example**: Unintended fund transfer when visiting a malicious image URL.

---

### 🧰 **13. Techniques to prevent CSRF**

* Use **SameSite cookies** (Strict or Lax)
* Require **CSRF tokens** on state-changing operations
* **Double submit cookie pattern**
* Check **Referer** and **Origin** headers server-side

---

### 🧠 **14. XSS vs CSRF**

|                | XSS                                | CSRF                             |
| -------------- | ---------------------------------- | -------------------------------- |
| Vector         | Inject malicious scripts           | Exploit authenticated sessions   |
| Requires user? | No (attacker injects code)         | Yes (user must be authenticated) |
| Target         | Browser                            | Server                           |
| Mitigation     | CSP, output encoding, sanitization | CSRF tokens, SameSite cookies    |

---

### 🕵️ **15. What is a Man-in-the-Middle (MitM) attack and how can it be prevented?**

**MitM** occurs when a third party **intercepts communication** between client and server (e.g., over public Wi-Fi).

**Prevention**:

* Enforce **HTTPS** (TLS 1.3)
* Use **HSTS** headers (`Strict-Transport-Security`)
* Enable **certificate pinning**
* Validate TLS certificates on both ends

---

### 🛡️ **16. How HTTPS helps against MitM?**

HTTPS:

* Encrypts data in transit
* Ensures **server authenticity**
* Prevents packet sniffing or injection

Browsers warn users about **invalid or expired TLS certificates**, further preventing spoofed sites.

---

### 🧠 **17. JS practices to minimize MitM risk**

* Never serve over `http://`, enforce `https://`
* Avoid embedding **third-party scripts** unless trusted
* Use **Subresource Integrity (SRI)** with CDNs
* Implement **CSP** and **HSTS**
* Secure `fetch` or `XHR` with tokens and proper CORS policies

---

### 🧩 **Scenario 1: XSS in a Custom Angular Component**

> You are reviewing a legacy Angular component where user-generated HTML content is rendered using `[innerHTML]`. Some users report that scripts are being executed in their browser.
>
> **Q1:** What is happening here and why?
> **Q2:** How would you fix it without breaking legitimate HTML formatting?
> **Q3:** Are there Angular-specific features you would use to avoid XSS in this context?

✅ **Expected Answer Elements**:

* This is a **stored XSS vulnerability** via unsafe `innerHTML`.
* Angular sanitizes HTML by default, but if `DomSanitizer.bypassSecurityTrustHtml` is used, it may allow dangerous tags.
* Fix by using **Angular’s built-in sanitizer** or restrict content to **safe markdown rendering**.
* Optionally, switch to **third-party markdown-safe parsers** (e.g., `marked` with `DOMPurify`).

---

### 🔐 **Scenario 2: OAuth Misuse in SPA**

> Your team is building a Single Page Application that integrates with a third-party API using OAuth 2.0. The developer implemented the **Implicit Grant flow** and stores access tokens in `localStorage`.
>
> **Q1:** What are the security implications here?
> **Q2:** What changes would you suggest to improve the security model?
> **Q3:** How would you implement it with a modern approach?

✅ **Expected Answer Elements**:

* **Implicit Grant is deprecated**; storing tokens in `localStorage` is **vulnerable to XSS**.
* Use **Authorization Code Flow with PKCE** for SPAs.
* Store tokens in **HTTP-only, SameSite cookies**.
* Use a **token refresh strategy** via backend proxy if possible.

---

### 🌍 **Scenario 3: CORS Issues with External API**

> Your frontend application fails to fetch data from an external API. The browser console shows a CORS error:
> `"No 'Access-Control-Allow-Origin' header is present..."`
>
> **Q1:** What is causing this issue?
> **Q2:** Who can fix it and how?
> **Q3:** Can the frontend "bypass" this limitation somehow?

✅ **Expected Answer Elements**:

* API server didn’t include proper `Access-Control-Allow-Origin` headers.
* Only the **API provider can fix CORS** by adjusting server headers.
* Frontend cannot bypass CORS due to **browser security policy**.
* Workaround: **Use a backend proxy** that communicates with the API (server-side fetch).

---

### 🛡️ **Scenario 4: CSRF Vulnerability in a REST API**

> A developer says, “We don’t need to worry about CSRF because our API is RESTful and uses `Authorization: Bearer <token>`.”
>
> **Q1:** Do you agree?
> **Q2:** Under which conditions would this be insecure?
> **Q3:** How would you ensure protection against CSRF in modern web apps?

✅ **Expected Answer Elements**:

* Correct **only if token is not automatically sent** by the browser (i.e., not in cookie).
* If token is in **cookie**, then CSRF is possible.
* Solutions: Use **SameSite cookies**, **CSRF tokens**, **double-submit cookies**, and check **Referer/Origin** headers.

---

### 🔍 **Scenario 5: CSP Violation Report in Production**

> Your app’s error monitoring shows several **Content Security Policy violation reports** involving inline scripts blocked in production. The error rate increased after the last deployment.
>
> **Q1:** What could cause this?
> **Q2:** How do you investigate?
> **Q3:** How do you fix it while maintaining CSP protection?

✅ **Expected Answer Elements**:

* Possibly new inline scripts or third-party libraries added without updating CSP policy.
* Check `script-src` directive, use **nonces** or **hashes**.
* Review recent code changes with inline JavaScript or dynamically injected content.
* Use **CSP report-uri / report-to** to gather logs.
* Fix: Replace inline scripts with external files + nonce strategy.

---

### 📦 **Scenario 6: External Script Injection Risk**

> Your project includes scripts from a third-party CDN. Recently, a security audit flagged it as a risk for **supply chain attack**.
>
> **Q1:** Why is this a risk, even if the CDN is reputable?
> **Q2:** How can you reduce the risk of malicious code being executed?
> **Q3:** What web platform features can you use to secure external scripts?

✅ **Expected Answer Elements**:

* CDN may be compromised, altering the script payload (supply chain risk).
* Use **Subresource Integrity (SRI)**:

  ```html
  <script src="..." integrity="sha384-..." crossorigin="anonymous"></script>
  ```
* Host critical scripts yourself if feasible.
* Use **CSP to restrict script sources**.

---

### 💣 **Scenario 7: Client-Side Sensitive Data Exposure**

> During a bug bounty review, it was discovered that your application logs `user.email` and `user.token` in the browser console.
>
> **Q1:** Why is this a vulnerability?
> **Q2:** What are the risks?
> **Q3:** What steps should be taken immediately?

✅ **Expected Answer Elements**:

* Logs can be accessed by browser extensions, shared devices, or exposed in screenshots.
* **Sensitive data should never be logged** on the client.
* Immediate actions:

  * Remove all sensitive console logs.
  * Sanitize debug outputs.
  * Audit `console.log` statements in CI.

---

### 🌐 **Scenario 8: Preventing MitM in a Web Application**

> Your SPA sends data via AJAX to a backend API. The team considers using plain HTTP for performance in dev.
>
> **Q1:** Why is this dangerous?
> **Q2:** How does a MitM attack happen here?
> **Q3:** What development and production safeguards should be implemented?

✅ **Expected Answer Elements**:

* HTTP is insecure; can be intercepted or altered.
* MitM attacker on public network can inject malicious content or steal credentials.
* Use:

  * HTTPS with **valid TLS certs**
  * **Strict-Transport-Security (HSTS)** header
  * **Service Workers** with care
  * Dev server with **HTTPS certificates** (e.g., mkcert)

---

## 🔐 **Man-in-the-Middle (MitM) Attacks**

A **Man-in-the-Middle (MitM)** attack happens when a malicious actor intercepts communications between two parties (e.g., your web client and your backend server).

### How it happens:

* On **unsecured connections** (e.g., HTTP instead of HTTPS).
* On **public Wi-Fi**, attackers can spoof DNS, ARP, or use packet sniffers.
* Can **modify** or **steal** data like tokens, passwords, etc.

### Prevention:

* **Always use HTTPS** with a valid TLS certificate.
* Implement **HSTS** (Strict-Transport-Security) header to enforce HTTPS.
* Pin certificates (optional but advanced).
* Never store sensitive tokens (e.g., JWTs) in `localStorage` – use `HttpOnly` cookies if possible.

---

## 🛡️ **OWASP Top 10 (2021)** — Key Items Explained

### 1. **Broken Access Control**

* Users can access **data or actions not meant for them**.
* Example: Changing URL `/api/users/123` to `/api/users/124`.
* Mitigation: Backend **must** verify ownership/roles on each request.

### 2. **Cryptographic Failures (Sensitive Data Exposure)**

* Failure to encrypt sensitive data (PII, credentials, tokens).
* Using **weak algorithms**, hardcoded keys, or storing passwords in plaintext.
* Use **TLS everywhere**, **strong ciphers**, **bcrypt/argon2** for passwords.

### 3. **Injection (e.g., SQLi, XSS)**

* Malicious input **modifies queries or scripts**.
* XSS (Cross-Site Scripting): Injecting JS into HTML, often via input fields.
* Prevent by **escaping**, **validating inputs**, using frameworks like Angular (with XSS prevention built-in).

### 4. **Insecure Design**

* Security was **not planned or considered during system design**.
* Example: Allowing too many permissions by default.
* Use **threat modeling**, **secure design patterns**, **zero trust approach**.

### 5. **Security Misconfiguration**

* Default credentials, open ports, verbose error messages, insecure headers.
* Always **harden servers**, disable debug mode, set proper **CSP, CORS, HSTS** headers.

### 6. **Vulnerable and Outdated Components**

* Using old Angular versions, or npm packages with known CVEs.
* Automate dependency checks using tools like `npm audit`, `Snyk`, `OWASP Dependency-Check`.

### 7. **Identification and Authentication Failures**

* Weak login mechanisms, no brute-force protection, predictable session IDs.
* Enforce **multi-factor auth**, **password policies**, **rate limiting**.

### 8. **Software and Data Integrity Failures**

* Trusting third-party scripts without checks (CDNs, packages).
* Mitigation: Use **Subresource Integrity (SRI)**, signed packages, **supply chain validation**.

### 9. **Security Logging and Monitoring Failures**

* No logs for critical events → delayed response to breaches.
* Ensure **audit trails**, **log tamper detection**, and **real-time alerts**.

### 10. **Server-Side Request Forgery (SSRF)**

* App fetches a URL supplied by user → attacker can access internal network.
* Prevent by **blocking internal IPs**, **whitelisting domains**, using **firewalls/WAFs**.

---

## 🌍 **CORS (Cross-Origin Resource Sharing)**

**CORS** is a **browser-side security feature** that restricts JavaScript from making HTTP requests to different origins (domain, port, protocol).

### Problem it solves:

Prevent a malicious site from reading sensitive data from another domain in a user’s browser.

### How it works:

* The browser sends a **preflight request (OPTIONS)** if the actual request is not simple.
* Server must respond with headers like:

```http
Access-Control-Allow-Origin: https://trusted-client.com
Access-Control-Allow-Methods: GET, POST
Access-Control-Allow-Headers: Authorization, Content-Type
```

### Who controls it?

**The backend API** must return the correct CORS headers.

### Dev Tip:

* CORS is **not a security mechanism against attacks** like XSS or CSRF.
* Use it to control **who is allowed to access your APIs**.

---

## 🧱 **CSP (Content Security Policy)**

**CSP** is a browser mechanism that **restricts where resources can be loaded from** and what JavaScript can run.

### Purpose:

Mitigates **XSS, clickjacking, and injection attacks** by blocking unauthorized scripts/styles.

### How it works:

Set an HTTP header:

```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.com; object-src 'none';
```

This blocks:

* Inline `<script>` blocks (unless whitelisted with nonce/hash)
* Scripts from unknown origins

### Common directives:

* `default-src`: fallback for all types
* `script-src`, `style-src`: sources for scripts/styles
* `img-src`, `font-src`, `frame-ancestors`: content-specific
* `report-uri`: send violation reports to this URL

### Preventing XSS:

* Disallows inline JavaScript.
* Forces devs to load scripts from trusted sources.

---

## 🔄 **CSRF (Cross-Site Request Forgery)**

**CSRF** tricks a user’s browser into submitting a **state-changing request** (like POST/PUT/DELETE) to a site where they’re logged in.

### Example attack:

User is logged into `bank.com`. A malicious page sends:

```html
<img src="https://bank.com/transfer?to=attacker&amount=1000" />
```

Browser includes **session cookie**, and the request succeeds if not protected.

### Protection Strategies:

* **SameSite Cookies**: Mark cookies as `SameSite=Strict` or `Lax`
* **CSRF Tokens**: Generate random tokens per session, validate on each request.
* **Double-submit**: Include token in cookie + header and verify both.
* Check **Referer/Origin headers** on sensitive requests.

---

