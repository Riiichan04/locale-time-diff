import Localization from "./localize";

/**
 * An object containing default localization strings for various languages.
 * Each top-level key represents a language code (e.g., 'en', 'vi').
 * This object is designed to be extensible, allowing more languages to be added in the future.
 *
 * @property justNow - The localization string for time differences that are "just now".
 * @property pastTimeLocalization - An object containing localization strings for time differences in the past.
 * @property futureTimeLocalization - An object containing localization strings for time differences in the future.
 * @see Localization
 * @see TimeLocalization
 */
export const defaultLocalization: { [lang: string]: Localization } = {
    'en': {
        justNow: 'Just now',
        pastTimeLocalization: {
            second: '{c} second ago',
            seconds: '{c} seconds ago',
            minute: '{c} minute ago',
            minutes: '{c} minutes ago',
            hour: '{c} hour ago',
            hours: '{c} hours ago',
            day: '{c} day ago',
            days: '{c} days ago',
            month: '{c} month ago',
            months: '{c} months ago',
            week: '{c} week ago',
            weeks: '{c} weeks ago',
            year: '{c} year ago',
            years: '{c} years ago',
        },
        futureTimeLocalization: {
            second: 'In {c} second',
            seconds: 'In {c} seconds',
            minute: 'In {c} minute',
            minutes: 'In {c} minutes',
            hour: 'In {c} hour',
            hours: 'In {c} hours',
            day: 'In {c} day',
            days: 'In {c} days',
            month: 'In {c} month',
            months: 'In {c} months',
            week: 'In {c} week',
            weeks: 'In {c} weeks',
            year: 'In {c} year',
            years: 'In {c} years',
        }
    },
    'vi': {
        justNow: 'vừa xong',
        pastTimeLocalization: {
            second: '{c} giây trước',
            seconds: '{c} giây trước',
            minute: '{c} phút trước',
            minutes: '{c} phút trước',
            hour: '{c} giờ trước',
            hours: '{c} giờ trước',
            day: '{c} ngày trước',
            days: '{c} ngày trước',
            week: '{c} tuần trước',
            weeks: '{c} tuần trước',
            month: '{c} tháng trước',
            months: '{c} tháng trước',
            year: '{c} năm trước',
            years: '{c} năm trước',
        },
        futureTimeLocalization: {
            second: 'Sau {c} giây',
            seconds: 'Sau {c} giây',
            minute: 'Sau {c} phút',
            minutes: 'Sau {c} phút',
            hour: 'Sau {c} giờ',
            hours: 'Sau {c} giờ',
            day: 'Sau {c} ngày',
            days: 'Sau {c} ngày',
            week: 'Sau {c} tuần',
            weeks: 'Sau {c} tuần',
            month: 'Sau {c} tháng',
            months: 'Sau {c} tháng',
            year: 'Sau {c} năm',
            years: 'Sau {c} năm',

        }
    },
}
