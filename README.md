# Locale Time Diff

![npm-version](https://img.shields.io/npm/v/locale-time-diff)
![license](https://img.shields.io/npm/l/locale-time-diff)
![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

A lightweight and customizable utility to format time differences into phrases with built-in support for multiple languages and easy extensibility.

## Features

*   **Human-Readable Output**: Converts raw time differences into easy-to-understand strings.
*   **Localization Support**: Comes with English (`en`) and Vietnamese (`vi`) locales out-of-the-box.
*   **Customizable Locales**: Easily add new languages or override existing localization strings.
*   **Future and Past Time**: Handles both past and future time differences.
*   **Flexible Input**: Accepts `Date` objects, Unix timestamps, or date strings.
*   **Custom Comparison Time**: Allows comparison against a specified time instead of always `now`.

## Installation

```bash
npm install locale-time-diff
```

## Usage

### Basic usage
Import the `getTimeDifference` function:
```ts
import getTimeDifference from 'locale-time-diff';

const now = new Date();
const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000); // 1 hour ago
const twoDaysLater = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 days from now

console.log(getTimeDifference(oneHourAgo, { locale: 'en' }).text);
// Output (approx.): "1 hour ago"

console.log(getTimeDifference(twoDaysLater, { locale: 'en' }).text);
// Output (approx.): "In 2 days"

const justNow = new Date(now.getTime() - 3000); // 3 seconds ago
console.log(getTimeDifference(justNow, { locale: 'en' }).text);
// Output: "Just now"
```

### Custom Comparison Time
You can specify a compareTime instead of using the current time:
code

```ts
import getTimeDifference from 'locale-time-diff';

const eventTime = new Date('2023-01-15T10:00:00Z');
const customComparisonPoint = new Date('2023-01-15T10:30:00Z'); // 30 minutes after eventTime

const result = getTimeDifference(eventTime, {
  locale: 'en',
  compareTime: customComparisonPoint
});

console.log(result.text);
// Output: "30 minutes ago"
```

### Adding or Overriding Locales

Use the `addLocale` function to extend defaultLocalization with new languages or customize existing ones.

```ts
import { addLocale, getTimeDifference } from 'locale-time-diff';

// Add a new French locale
addLocale('fr', {
  justNow: "À l'instant",
  pastTimeLocalization: {
    second: '{c} seconde auparavant',
    seconds: '{c} secondes auparavant',
    minute: '{c} minute auparavant',
    minutes: '{c} minutes auparavant',
    // ... other time units, inheriting from 'en' if not specified
  },
  futureTimeLocalization: {
    second: 'Dans {c} seconde',
    seconds: 'Dans {c} secondes',
    minute: 'Dans {c} minute',
    minutes: 'Dans {c} minutes',
    // ...
  }
});

const now = new Date();
const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);

console.log(getTimeDifference(tenMinutesAgo, { locale: 'fr' }).text);
// Output (approx.): "10 minutes auparavant"

// Override a specific string in an existing locale (e.g., Vietnamese)
addLocale('vi', {
  justNow: 'Vừa mới đây!' // Custom "just now" for Vietnamese
});

console.log(getTimeDifference(now, { locale: 'vi' }).text);
// Output: "Vừa mới đây!"
```


### Full Result Object
The `getTimeDifference` function returns a comprehensive Result object:

```ts
import getTimeDifference from 'locale-time-diff';

const now = new Date();
const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000 - 15000); // 10 minutes 15 seconds ago

const result = getTimeDifference(tenMinutesAgo, { locale: 'en' });

console.log(result);
/*
Output (approx.):
{
  text: '10 minutes ago',
  unit: 'minute',
  rawDiffMiliseconds: 615000, // Difference in milliseconds
  diffMiliseconds: 615000,   // Absolute difference
  isFuture: false
}
*/
```

## API 
#### `howLongAgo(dateInput: Date | number | string, option: Option): Result`
Calculates the time difference and returns a localized string.
dateInput: The target time.

- option: An object configuring the calculation:
- locale?: `string | Localization`: A locale key ('en', 'vi', etc.) or a custom Localization object.
compareTime?: `Date | number`: The reference time for comparison. Defaults to `new Date()`.
- **Returns:** A `Result` object.

#### `addLocale(name: string, localize: PartialLocalization): void`

Adds a new localization or updates an existing one in defaultLocalization.
- name: The key for the locale (e.g., 'fr').
- localize: An object containing localization strings. Unspecified fields will be inherited from the base locale.

## License
This project is licensed under the `MIT License`