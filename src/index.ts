import { defaultLocalization } from "./defaultLocalization";
import { getLocalizedString, handlers } from "./handler";
import Localization, { TimeLocalization, TimeLocalizationKeys } from "./localize";

export { Localization, TimeLocalization }

/**
 * Interface representing the options for the `getTimeDifference` function.
 * @property locale - Specifies the desired localization. Can be a string key (e.g., 'en', 'vi') for
 * predefined localizations in `defaultLocalization`, or a custom `Localization` object to override or extend default settings.
 * @property compareTime - The reference time against which `dateInput` will be compared. 
 * If not provided, the current time (`new Date()`) will be used.
 * @see Localization For the structure of localization objects.
 * @see defaultLocalization For the default available localization.
 */
export interface Option {
    locale?: string | Localization,
    compareTime?: Date | number
}

/**
 * Interface representing the dertailed result returned by `getTimeDifference` function.
 * @property text - The formatted string indicating how long ago or in the future the `dateInput` is (e.g., "5 minutes ago", "1 year ago").
 * @property unit - The time unit used in the `text`.
 * @property rawDiffMiliseconds - The exact difference in miliseconds between `dateInput` and `compareTime`. A negative value indicates `dateInput` in the future.
 * @property diffMiliseconds - The absolute value of `rawDiffMiliseconds`, representing the magnitude of the time difference.
 * @property isFuture - A boolean flag indicating whether the `dateInput` is in the future relative to `compareTime`.
 */
export interface Result {
    text: string;
    unit: string;
    rawDiffMiliseconds: number;
    diffMiliseconds: number;
    isFuture: boolean;
}

/**
 * Calculate the time difference between a given `dateInput` and a `compareTime` (or current time if not specified),
 * and return a localized string describing how long a go or in the future that time is.
 * 
 * @param dateInput - The target time to be evaluated. Can be a `Date` object, a Unix timestamp, or a date string parseable by `new Date()`.
 * @param option - Configuration options for the calculation, including localization and comparison time.
 * @returns An object containing the formatted text, time unit, raw and absolute milisecond differences, and a future flag.
 * @see Option For available configuration options.
 * @see Result For the structure of the returned object.
 * 
 * @example
 * ```ts
 * //How long ago was yesterday?
 * const yesterday = new Date();
 * yesterday.setDate(yesterday.getDate() - 1);
 * console.log(getTimeDifference(yesterday, {locale: 'en'}))
 * 
 * //Expected output:
 * //{ text: '1 day ago', unit: 'day', ... }
 * ```
 * 
 * @example
 * ```ts
 * // How long until tomorrow?
 * const tomorrow = new Date();
 * tomorrow.setDate(tomorrow.getDate() + 1);
 * console.log(getTimeDifference(tomorrow, { locale: 'vi' }));
 * 
 * // Expected output: 
 * //{ text: 'Sau 1 ngày', unit: 'day', ... }
 * ```
 */
export default function getTimeDifference(dateInput: Date | number | string, option?: Option): Result {
    const date = new Date(dateInput)
    const currentOption: Option = option ? option : {}
    const now = currentOption.compareTime ? new Date(currentOption.compareTime) : new Date()

    let localization: Localization
    if (typeof currentOption.locale === 'string') {
        localization = defaultLocalization[currentOption.locale] || defaultLocalization['en']
    }
    else if (typeof currentOption.locale === 'object' && currentOption.locale !== null) {
        localization = { ...defaultLocalization['en'], ...currentOption.locale }  //If input locale has not enough fields
    }
    else localization = defaultLocalization['en']   //Default to English if no locale is specified

    const diffMilisecond = Math.floor(now.getTime() - date.getTime())
    const isFuture = diffMilisecond < 0
    const absDiffMilisecond = isFuture ? -diffMilisecond : diffMilisecond

    const defaultResult = {
        isFuture: isFuture,
        rawDiffMiliseconds: diffMilisecond,
        diffMiliseconds: absDiffMilisecond,
        text: localization.justNow,
        unit: 'Just now'
    }

    //If the difference is within 5 seconds, return "Just now"
    if (absDiffMilisecond <= 5000) return defaultResult

    for (let handler of handlers) {
        if (absDiffMilisecond >= handler.threshold) {
            const count = Math.floor(absDiffMilisecond / handler.threshold)
            const timeLocalize = isFuture ? localization.futureTimeLocalization : localization.pastTimeLocalization

            const keys = TimeLocalizationKeys[handler.name]
            const singularKey = keys.singular
            const pluralKey = keys.plural

            const textHandler = getLocalizedString(timeLocalize, count, singularKey, pluralKey)

            return {
                isFuture: isFuture,
                text: textHandler,
                rawDiffMiliseconds: diffMilisecond,
                diffMiliseconds: absDiffMilisecond,
                unit: handler.name,
            }
        }
    }

    //Fallback to "Just now" if no handler matched
    return defaultResult
}

/**
 * An object containing partial or complete localization for the specified name.
 */
type PartialLocalization = {
    justNow?: string;
    pastTimeLocalization?: Partial<TimeLocalization>;
    futureTimeLocalization?: Partial<TimeLocalization>;
}

/**
 * Extends the `defaultLocalization` object with a new custom localization.
 * This function allows you to add or override localization settings for specific languages.
 * When a partial `localize` object is provided, it will be merged with the default English localization
 * to ensure all fields are present, preventing missing translations.
 * @param name - The unique key (e.g., 'fr', 'jp') for the new localization to be added or updated.
 * @param localize - An object containing partial or complete localization for the specified name.
 * @see defaultLocalization For the structure of localization objects.
 * @see PartialLocalization
 */
export function addLocale(name: string, localize: PartialLocalization) {
    const baseLocale = defaultLocalization[name] || defaultLocalization['en']

    defaultLocalization[name] = {
        ...baseLocale,   //Start with the determined base locale (existing 'name' locale or 'en')
        //Override those fields by custom localization
        ...localize,
        pastTimeLocalization: { ...baseLocale.pastTimeLocalization, ...(localize.pastTimeLocalization || {}) },
        futureTimeLocalization: { ...baseLocale.futureTimeLocalization, ...(localize.futureTimeLocalization || {}) },
    };
}

