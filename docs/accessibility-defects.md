# Accessibility Defects

## AD-001 — Missing Main Landmark

- **Page:** Login
- **Rule:** landmark-one-main
- **Severity:** Moderate
- **Status:** Open
- **Affected Browsers:** Chromium, Firefox, WebKit

### Description
The Login page does not contain a main landmark.

### Impact
Screen reader users may have difficulty identifying the primary content area of the page.

### Expected Result
The page should contain one main landmark that identifies the primary content.

### Actual Result
The accessibility scan reports that the document does not have a main landmark.

---

## AD-002 — Missing Level-One Heading

- **Page:** Login
- **Rule:** page-has-heading-one
- **Severity:** Moderate
- **Status:** Open
- **Affected Browsers:** Chromium, Firefox, WebKit

### Description
The Login page does not contain a level-one heading.

### Impact
Users relying on heading navigation may have difficulty understanding the page structure.

### Expected Result
The page should contain a meaningful level-one heading describing the page.

### Actual Result
The accessibility scan reports that the page does not contain a level-one heading.

---

## AD-003 — Content Not Fully Contained Within Landmarks

- **Page:** Login
- **Rule:** region
- **Severity:** Moderate
- **Status:** Open
- **Affected Browsers:** Chromium, Firefox, WebKit

### Description
Some page content is not contained within appropriate landmark regions.

### Impact
Assistive technology users may have difficulty navigating the page structure efficiently.

### Expected Result
All meaningful page content should be contained within appropriate landmark regions.

### Actual Result
The accessibility scan identified four affected elements that are outside appropriate landmarks.