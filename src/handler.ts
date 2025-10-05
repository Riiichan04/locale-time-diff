import Localization, { TimeLocalization } from "./localize";

function getLocalizedString(timeLocalize: TimeLocalization, count: number, singularKey: keyof TimeLocalization, pluralKey: keyof TimeLocalization): string {
    return count === 1 ? timeLocalize[singularKey].replace("{c}", "1") : timeLocalize[pluralKey].replace("{c}", String(count))
}

export const handlers = [
    {
        name: 'year',
        threshold: 31536000000,
        getString: (s: Localization, c: number, isFuture: boolean) => {
            const timeLocalize = isFuture ? s.futureTimeLocalization : s.pastTimeLocalization
            return getLocalizedString(timeLocalize, c, "year", "years")
        }
    },
    {
        name: 'month',
        threshold: 2592000000,
        getString: (s: Localization, c: number, isFuture: boolean) => {
            const timeLocalize = isFuture ? s.futureTimeLocalization : s.pastTimeLocalization
            return getLocalizedString(timeLocalize, c, "month", "months")
        }
    },
    {
        name: 'week',
        threshold: 604800000,
        getString: (s: Localization, c: number, isFuture: boolean) => {
            const timeLocalize = isFuture ? s.futureTimeLocalization : s.pastTimeLocalization
            return getLocalizedString(timeLocalize, c, "week", "weeks")
        }
    },
    {
        name: 'day',
        threshold: 86400000,
        getString: (s: Localization, c: number, isFuture: boolean) => {
            const timeLocalize = isFuture ? s.futureTimeLocalization : s.pastTimeLocalization
            return getLocalizedString(timeLocalize, c, "day", "days")
        }
    },
    {
        name: 'hour',
        threshold: 3600000,
        getString: (s: Localization, c: number, isFuture: boolean) => {
            const timeLocalize = isFuture ? s.futureTimeLocalization : s.pastTimeLocalization
            return getLocalizedString(timeLocalize, c, "hour", "hours")
        }
    },
    {
        name: 'minute',
        threshold: 60000,
        getString: (s: Localization, c: number, isFuture: boolean) => {
            const timeLocalize = isFuture ? s.futureTimeLocalization : s.pastTimeLocalization
            return getLocalizedString(timeLocalize, c, "minute", "minutes")
        }
    },
    {
        name: 'second',
        threshold: 1000,
        getString: (s: Localization, c: number, isFuture: boolean) => {
            const timeLocalize = isFuture ? s.futureTimeLocalization : s.pastTimeLocalization
            return getLocalizedString(timeLocalize, c, "second", "seconds")
        }
    },
];