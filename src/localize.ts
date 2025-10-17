import { HandlerTimeUnit } from "./handler";

/**
 * @constant
 * A static map that links the Handler name (e.g., 'year') to the coressponding singular and plural keys.
 * This type ensures that every unit defined in `HandlerTimeUnit` has both singular and plural keys defined in `TimeLocalization`.
 * @since 1.1.0
 */
export const TimeLocalizationKeys: {
    [K in HandlerTimeUnit]: {
        singular: K & keyof TimeLocalization,
        //To make sure the 's' suffix correctly coressponds to an existing property in TimeLocalization.
        plural: TimeLocalization[K extends keyof TimeLocalization ? `${K}s` : never] extends string ? `${K}s` & keyof TimeLocalization : never
    }
} = {
    year: { singular: 'year', plural: 'years' },
    month: { singular: 'month', plural: 'months' },
    week: { singular: 'week', plural: 'weeks' },
    day: { singular: 'day', plural: 'days' },
    hour: { singular: 'hour', plural: 'hours' },
    minute: { singular: 'minute', plural: 'minutes' },
    second: { singular: 'second', plural: 'seconds' },
} as const;

/**
 * Defines the structure for a complete localization object, containing strings for "just now", past tense, and future tense time differences.
 * @property {string} justNow - The string used for immediate time differences (e.g., "Just now").
 * @property {TimeLocalization} pastTimeLocalization - An object mapping time units to their localized strings for past times.
 * @property {TimeLocalization} futureTimeLocalization - An object mapping time units to their localized strings for future times.
 * @see TimeLocalization
 */
export default interface Localization {
    justNow: string;
    pastTimeLocalization: TimeLocalization,
    futureTimeLocalization: TimeLocalization
}

/**
 * Defines the localization strings for various time units,
 * differentiating between singular and plural forms where applicable.
 * The placeholder `{c}` in the string will be replaced by the count of the time unit.
 *
 * @property {string} second - Singular form for "second" (e.g., "1 second ago").
 * @property {string} seconds - Plural form for "second" (e.g., "5 seconds ago").
 * @property {string} minute - Singular form for "minute".
 * @property {string} minutes - Plural form for "minute".
 * @property {string} hour - Singular form for "hour".
 * @property {string} hours - Plural form for "hour".
 * @property {string} day - Singular form for "day".
 * @property {string} days - Plural form for "day".
 * @property {string} week - Singular form for "week".
 * @property {string} weeks - Plural form for "week".
 * @property {string} month - Singular form for "month".
 * @property {string} months - Plural form for "month".
 * @property {string} year - Singular form for "year".
 * @property {string} years - Plural form for "year".
 */
export interface TimeLocalization {
    second: string;
    seconds: string;
    minute: string;
    minutes: string;
    hour: string;
    hours: string;
    day: string;
    days: string;
    week: string;
    weeks: string;
    month: string;
    months: string;
    year: string;
    years: string;
}