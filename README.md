# UITestingPlayground — Playwright + TypeScript (POM)

End-to-end automation suite for [uitestingplayground.com](http://uitestingplayground.com/)
written in **Playwright + TypeScript** with the **Page Object Model** pattern.

Each of the 29 playground sections gets its own:

- a dedicated POM class in [`pages/`](pages/)
- a dedicated test file in [`tests/`](tests/)

---

## Project Layout

```
playwrihgt_ts_playground/
├── pages/                          # Page Object Model classes
│   ├── BasePage.ts
│   ├── DynamicIdPage.ts
│   ├── ClassAttributePage.ts
│   ├── HiddenLayersPage.ts
│   ├── LoadDelayPage.ts
│   ├── AjaxDataPage.ts
│   ├── ClientSideDelayPage.ts
│   ├── ClickPage.ts
│   ├── TextInputPage.ts
│   ├── ScrollbarsPage.ts
│   ├── DynamicTablePage.ts
│   ├── VerifyTextPage.ts
│   ├── ProgressBarPage.ts
│   ├── VisibilityPage.ts
│   ├── SampleAppPage.ts
│   ├── MouseOverPage.ts
│   ├── NonBreakingSpacePage.ts
│   ├── OverlappedElementPage.ts
│   ├── ShadowDomPage.ts
│   ├── AlertsPage.ts
│   ├── FileUploadPage.ts
│   ├── AnimatedButtonPage.ts
│   ├── DisabledInputPage.ts
│   ├── AutoWaitPage.ts
│   ├── FramesPage.ts
│   ├── GeoLocationPage.ts
│   ├── ClearInputPage.ts
│   ├── ScrollToClickPage.ts
│   ├── CssSelectorsPage.ts
│   └── SelectPage.ts
├── tests/                          # Test specs (one per section)
│   ├── 01-dynamic-id.spec.ts
│   ├── 02-class-attribute.spec.ts
│   ├── ... (29 files total)
│   └── 29-select.spec.ts
├── utils/
│   └── testData.ts                 # Routes, sample creds, timeouts
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install
```

---

## Running the Suite

```bash
# Run everything
npm test

# Run a single section
npm run test:dynamic-id
npm run test:progress-bar
npm run test:sample-app
# ... one script per section

# Headed (visible browser)
npm run test:headed

# Debug mode
npm run test:debug

# UI mode (interactive test runner)
npm run test:ui

# View the HTML report
npm run test:report
```

The default config runs against **Chromium**, **Firefox**, and **WebKit** in
parallel. To run a single browser, pass `--project`:

```bash
npx playwright test --project=chromium
```

---

## Sections Covered

| # | Section                 | POM class               | Test file                          |
|---|-------------------------|-------------------------|------------------------------------|
| 1 | Dynamic ID              | `DynamicIdPage`         | `01-dynamic-id.spec.ts`            |
| 2 | Class Attribute         | `ClassAttributePage`    | `02-class-attribute.spec.ts`       |
| 3 | Hidden Layers           | `HiddenLayersPage`      | `03-hidden-layers.spec.ts`         |
| 4 | Load Delay              | `LoadDelayPage`         | `04-load-delay.spec.ts`            |
| 5 | AJAX Data               | `AjaxDataPage`          | `05-ajax-data.spec.ts`             |
| 6 | Client Side Delay       | `ClientSideDelayPage`   | `06-client-side-delay.spec.ts`     |
| 7 | Click                   | `ClickPage`             | `07-click.spec.ts`                 |
| 8 | Text Input              | `TextInputPage`         | `08-text-input.spec.ts`            |
| 9 | Scrollbars              | `ScrollbarsPage`        | `09-scrollbars.spec.ts`            |
| 10 | Dynamic Table          | `DynamicTablePage`      | `10-dynamic-table.spec.ts`         |
| 11 | Verify Text             | `VerifyTextPage`        | `11-verify-text.spec.ts`           |
| 12 | Progress Bar            | `ProgressBarPage`       | `12-progress-bar.spec.ts`          |
| 13 | Visibility              | `VisibilityPage`        | `13-visibility.spec.ts`            |
| 14 | Sample App              | `SampleAppPage`         | `14-sample-app.spec.ts`            |
| 15 | Mouse Over              | `MouseOverPage`         | `15-mouse-over.spec.ts`            |
| 16 | Non-Breaking Space      | `NonBreakingSpacePage`  | `16-non-breaking-space.spec.ts`    |
| 17 | Overlapped Element      | `OverlappedElementPage` | `17-overlapped-element.spec.ts`    |
| 18 | Shadow DOM              | `ShadowDomPage`         | `18-shadow-dom.spec.ts`            |
| 19 | Alerts                  | `AlertsPage`            | `19-alerts.spec.ts`                |
| 20 | File Upload             | `FileUploadPage`        | `20-file-upload.spec.ts`           |
| 21 | Animated Button         | `AnimatedButtonPage`    | `21-animated-button.spec.ts`       |
| 22 | Disabled Input          | `DisabledInputPage`     | `22-disabled-input.spec.ts`        |
| 23 | Auto Wait               | `AutoWaitPage`          | `23-auto-wait.spec.ts`             |
| 24 | Frames                  | `FramesPage`            | `24-frames.spec.ts`                |
| 25 | Geo Location            | `GeoLocationPage`       | `25-geo-location.spec.ts`          |
| 26 | Clear Input             | `ClearInputPage`        | `26-clear-input.spec.ts`           |
| 27 | Scroll to Click         | `ScrollToClickPage`     | `27-scroll-to-click.spec.ts`       |
| 28 | CSS Selectors           | `CssSelectorsPage`      | `28-css-selectors.spec.ts`         |
| 29 | Select                  | `SelectPage`            | `29-select.spec.ts`                |

---

## POM Conventions

- Every page object **extends** `BasePage`, which provides `goto()`,
  `getTitle()`, and shared helpers.
- Locators are declared as `readonly` fields on the page object — never in
  tests. This keeps selectors in one place per page.
- High-level actions (`login()`, `selectByValue()`, `uploadSampleFile()`)
  are exposed by the page object so tests read like a checklist of intent.
- The test layer asserts on the **return value of POM actions** rather than
  poking at the DOM directly. Tests stay short and read top-to-bottom.

Example — [`tests/14-sample-app.spec.ts`](tests/14-sample-app.spec.ts):

```ts
test('valid credentials produce a welcome message', async () => {
  const status = await page.loginWithValidCredentials();
  expect(status).toMatch(/Welcome/i);
  expect(status).toContain(SAMPLE_APP.validUser);
});
```

---

## Notes on Trickier Sections

- **Dynamic ID** — assertions are written against the button *visible text*,
  not the id, because the id changes between reloads.
- **Hidden Layers** — `force: true` is used to verify Playwright's
  overlap-detection works. A regular `click()` would otherwise time out.
- **Verify Text** / **Non-Breaking Space** — `innerText` collapses `&nbsp;`
  into a regular space, so assertions read naturally.
- **Progress Bar** — uses `expect.poll(...)` to wait for the bar to reach the
  target percentage before stopping it.
- **Geo Location** — the BrowserContext grants permissions and sets mocked
  coordinates **before** the page loads, so the API resolves immediately.
- **Sample App** — credentials and password live in `utils/testData.ts`,
  keeping the test body free of magic strings.
- **Frames** — `FrameLocator` reaches inside the iframe without losing
  the outer page context.
- **Shadow DOM** — Playwright pierces open shadow roots automatically; the
  POM simply chains `.locator()` from the shadow host.

---

## Useful npm Scripts

| Script                       | What it does                              |
|------------------------------|-------------------------------------------|
| `npm test`                   | Run all tests (Chromium + Firefox + WebKit)|
| `npm run test:headed`        | Run all tests in headed mode              |
| `npm run test:debug`         | Run all tests in debug mode               |
| `npm run test:ui`            | Open Playwright's interactive UI          |
| `npm run test:report`        | Open the last HTML report                 |
| `npm run test:<section>`     | Run a single section (one script per name)|
| `npm run lint`               | TypeScript type-check only                |