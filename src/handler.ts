import { TimeLocalization } from "./localize";

/**
 * Defines the standard time units used by the library handlers.
 * @since 1.1.0
 */
export type HandlerTimeUnit = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second'

/**
 * Describle the structure of a time handler.
 * @property {HandlerTimeUnit} name - The name of the time unit, used to determine localization keys and unit property in `Result` interface.
 * @property {number} threshold - The threshold (in milliseconds) that the time difference must meet or exceed to use this unit.
 * 
 * @since 1.1.0 The redundant `getString` method was removed and its logic centralized in `getTimeDifference` to minimize code duplication.
 */
interface Handler {
    name: HandlerTimeUnit,
    threshold: number
}

/**
 * @constant
 * An Handler array sorted in descending order of their threshold.
 */
export const handlers: Handler[] = [
    { name: 'year', threshold: 31536000000 },
    { name: 'month', threshold: 2592000000 },
    { name: 'week', threshold: 604800000 },
    { name: 'day', threshold: 86400000 },
    { name: 'hour', threshold: 3600000 },
    { name: 'minute', threshold: 60000 },
    { name: 'second', threshold: 1000 },
];

/**
 * Retrieves and formats the localized string based on the count and the key distinction.
 * @param timeLocalize - Localization object.
 * @param count - Count of the time unit.
 * @param singularKey - Singular localization key.
 * @param pluralKey - Plural localization key.
 * @returns Formatted localized string.
 */
export function getLocalizedString(timeLocalize: TimeLocalization, count: number, singularKey: keyof TimeLocalization, pluralKey: keyof TimeLocalization): string {
    return count === 1 ? timeLocalize[singularKey].replace("{c}", "1") : timeLocalize[pluralKey].replace("{c}", String(count))
}