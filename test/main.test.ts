import howLongAgo, { addLocale, Option, Result } from '../src/index';
import { defaultLocalization } from '../src/defaultLocalization';
import { TimeLocalization } from '../src/localize';

const MOCK_CURRENT_TIME = new Date('2023-10-27T10:00:00.000Z')

describe('howLongAgo', () => {

    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(MOCK_CURRENT_TIME);
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    // Test case 1: "Just now"
    test('should return "Just now" for times within 5 seconds', () => {
        const past = new Date(MOCK_CURRENT_TIME.getTime() - 3000); // 3 seconds ago
        const future = new Date(MOCK_CURRENT_TIME.getTime() + 4000); // 4 seconds in future

        const resultPast = howLongAgo(past, { locale: 'en' });
        expect(resultPast.text).toBe('Just now');
        expect(resultPast.unit).toBe('Just now');
        expect(resultPast.isFuture).toBe(false);

        const resultFuture = howLongAgo(future);
        expect(resultFuture.text).toBe('Just now');
        expect(resultFuture.unit).toBe('Just now');
        expect(resultFuture.isFuture).toBe(true);
    });

    // Test case 2: Past - English
    test('should correctly format past times in English', () => {
        const oneSecondAgo = new Date(MOCK_CURRENT_TIME.getTime() - 6000); // 6 seconds ago (past 5s threshold)
        const fiveMinutesAgo = new Date(MOCK_CURRENT_TIME.getTime() - 5 * 60 * 1000 - 1000); // 5 minutes and 1 second ago
        const oneHourAgo = new Date(MOCK_CURRENT_TIME.getTime() - 60 * 60 * 1000 - 1000); // 1 hour and 1 second ago
        const twoDaysAgo = new Date(MOCK_CURRENT_TIME.getTime() - 2 * 24 * 60 * 60 * 1000 - 1000); // 2 days and 1 second ago
        const threeMonthsAgo = new Date(MOCK_CURRENT_TIME.getTime() - 3 * 30 * 24 * 60 * 60 * 1000 - 1000); // 3 months and 1 second ago (approx)
        const oneYearAgo = new Date(MOCK_CURRENT_TIME.getTime() - 365 * 24 * 60 * 60 * 1000 - 1000); // 1 year and 1 second ago

        expect(howLongAgo(oneSecondAgo, { locale: 'en' }).text).toBe('6 seconds ago');
        expect(howLongAgo(fiveMinutesAgo, { locale: 'en' }).text).toBe('5 minutes ago');
        expect(howLongAgo(oneHourAgo, { locale: 'en' }).text).toBe('1 hour ago');
        expect(howLongAgo(twoDaysAgo, { locale: 'en' }).text).toBe('2 days ago');
        expect(howLongAgo(threeMonthsAgo, { locale: 'en' }).text).toBe('3 months ago');
        expect(howLongAgo(oneYearAgo, { locale: 'en' }).text).toBe('1 year ago');
    });

    // Test case 3: Future - English
    test('should correctly format future times in English', () => {
        const oneSecondInFuture = new Date(MOCK_CURRENT_TIME.getTime() + 6000); // 6 seconds in future
        const fiveMinutesInFuture = new Date(MOCK_CURRENT_TIME.getTime() + 5 * 60 * 1000 + 1000);
        const oneHourInFuture = new Date(MOCK_CURRENT_TIME.getTime() + 60 * 60 * 1000 + 1000);
        const twoDaysInFuture = new Date(MOCK_CURRENT_TIME.getTime() + 2 * 24 * 60 * 60 * 1000 + 1000);
        const threeMonthsInFuture = new Date(MOCK_CURRENT_TIME.getTime() + 3 * 30 * 24 * 60 * 60 * 1000 + 1000);
        const oneYearInFuture = new Date(MOCK_CURRENT_TIME.getTime() + 365 * 24 * 60 * 60 * 1000 + 1000);

        expect(howLongAgo(oneSecondInFuture, { locale: 'en' }).text).toBe('In 6 seconds');
        expect(howLongAgo(fiveMinutesInFuture, { locale: 'en' }).text).toBe('In 5 minutes');
        expect(howLongAgo(oneHourInFuture, { locale: 'en' }).text).toBe('In 1 hour');
        expect(howLongAgo(twoDaysInFuture, { locale: 'en' }).text).toBe('In 2 days');
        expect(howLongAgo(threeMonthsInFuture, { locale: 'en' }).text).toBe('In 3 months');
        expect(howLongAgo(oneYearInFuture, { locale: 'en' }).text).toBe('In 1 year');
    });

    // Test case 4: Past - Vietnamese
    test('should correctly format past times in Vietnamese', () => {
        const oneSecondAgo = new Date(MOCK_CURRENT_TIME.getTime() - 6000);
        const fiveMinutesAgo = new Date(MOCK_CURRENT_TIME.getTime() - 5 * 60 * 1000 - 1000);
        const oneHourAgo = new Date(MOCK_CURRENT_TIME.getTime() - 60 * 60 * 1000 - 1000);

        expect(howLongAgo(oneSecondAgo, { locale: 'vi' }).text).toBe('6 giây trước');
        expect(howLongAgo(fiveMinutesAgo, { locale: 'vi' }).text).toBe('5 phút trước');
        expect(howLongAgo(oneHourAgo, { locale: 'vi' }).text).toBe('1 giờ trước');
    });

    // Test case 5: Future - Vietnamese
    test('should correctly format future times in Vietnamese', () => {
        const oneSecondInFuture = new Date(MOCK_CURRENT_TIME.getTime() + 6000);
        const fiveMinutesInFuture = new Date(MOCK_CURRENT_TIME.getTime() + 5 * 60 * 1000 + 1000);
        const oneHourInFuture = new Date(MOCK_CURRENT_TIME.getTime() + 60 * 60 * 1000 + 1000);

        expect(howLongAgo(oneSecondInFuture, { locale: 'vi' }).text).toBe('Sau 6 giây');
        expect(howLongAgo(fiveMinutesInFuture, { locale: 'vi' }).text).toBe('Sau 5 phút');
        expect(howLongAgo(oneHourInFuture, { locale: 'vi' }).text).toBe('Sau 1 giờ');
    });

    // Test case 6: Using custom compareTime
    test('should use custom compareTime if provided', () => {
        const customCompareTime = new Date('2023-10-27T10:30:00.000Z'); // 30 minutes after MOCK_CURRENT_TIME
        const targetTime = new Date('2023-10-27T10:00:00.000Z'); // 30 minutes before customCompareTime

        const result = howLongAgo(targetTime, { locale: 'en', compareTime: customCompareTime });
        expect(result.text).toBe('30 minutes ago');
        expect(result.isFuture).toBe(false);
    });

    // Test case 7: Using custom Localization object
    test('should use custom Localization object if provided', () => {
        const customLocale = {
            justNow: 'Vừa mới đây',
            pastTimeLocalization: {
                ...defaultLocalization['en'].pastTimeLocalization, // Kế thừa các trường khác
                minutes: '{c} phút trước (custom)',
            },
            futureTimeLocalization: {
                ...defaultLocalization['en'].futureTimeLocalization,
                minutes: 'Trong {c} phút nữa (custom)',
            }
        };

        const fiveMinutesAgo = new Date(MOCK_CURRENT_TIME.getTime() - 5 * 60 * 1000 - 1000);
        const fiveMinutesInFuture = new Date(MOCK_CURRENT_TIME.getTime() + 5 * 60 * 1000 + 1000);

        expect(howLongAgo(fiveMinutesAgo, { locale: customLocale }).text).toBe('5 phút trước (custom)');
        expect(howLongAgo(fiveMinutesInFuture, { locale: customLocale }).text).toBe('Trong 5 phút nữa (custom)');
    });

    // Test case 8: `addLocale` function
    describe('addLocale', () => {
        const initialViLocale = { ...defaultLocalization['vi'] };

        afterEach(() => {
            defaultLocalization['vi'] = initialViLocale;
            delete defaultLocalization['fr'];
        });

        test('should add a new locale to defaultLocalization', () => {
            const frLocale = {
                justNow: 'À l\'instant',
                pastTimeLocalization: {
                    ...defaultLocalization['en'].pastTimeLocalization,
                    minutes: '{c} minutes auparavant',
                },
                futureTimeLocalization: {
                    ...defaultLocalization['en'].futureTimeLocalization,
                    minutes: 'Dans {c} minutes',
                }
            };
            addLocale('fr', frLocale);
            expect(defaultLocalization['fr']).toBeDefined();
            expect(defaultLocalization['fr'].justNow).toBe('À l\'instant');

            const fiveMinutesAgo = new Date(MOCK_CURRENT_TIME.getTime() - 5 * 60 * 1000 - 1000);
            expect(howLongAgo(fiveMinutesAgo, { locale: 'fr' }).text).toBe('5 minutes auparavant');
        });

        test('should override an existing locale in defaultLocalization', () => {
            addLocale('vi', { justNow: 'Vừa mới' });
            expect(defaultLocalization['vi'].justNow).toBe('Vừa mới');
        });

        test('should deep merge partial localization correctly', () => {
            const partialViLocale = {
                pastTimeLocalization: {
                    minute: 'một phút trước (override)',
                },
            } ;
            addLocale('vi', partialViLocale);
            expect(defaultLocalization['vi'].justNow).toBe('vừa xong');
            expect(defaultLocalization['vi'].pastTimeLocalization.minute).toBe('một phút trước (override)');
            expect(defaultLocalization['vi'].pastTimeLocalization.seconds).toBe('{c} giây trước');
        });
    });

});