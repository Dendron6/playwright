import {test, expect, Page} from '@playwright/test';
// import {whatToExpectPage} from '../pages/whatToExpectPage';
import { whatToExpect, } from '../pageObjects/whatToExpect';
import {getStarted} from "../pageObjects/getStarted";
import {getStartedPage} from "../pages/getStartedPage";
import {aboutYouPage} from "../pages/aboutYouPage";
import {aboutYou} from "../pageObjects/aboutYou";
import {calendarPage} from "../pages/calendarPage";
import {calendar} from "../pageObjects/calendar";


let page: Page;


test.describe('Scheduling appointment', async () => {

    //this allows us to run all tests in one session (serial mode)
    test.beforeAll(async ({browser,}) => {
        page = await browser.newPage();
    });

    test.afterAll(async ({browser}) => {
        await page.close();
    });

    test('has title', async () => {
        await page.goto(process.env.BASE_URL);
        await expect(page).toHaveTitle(/What to expect*/);
    });

    test('click on button', async () => {
        const what = new whatToExpect(page)
        await what.clickOnStartButton()
        await expect(page).toHaveTitle(/Get started*/);
        //await page.pause()
    })
    test('Fill in information on get Started page', async () => {
        const get = new getStarted(page)
        await get.cancerSelection("Adrenal Tumors", true)
        //await page.waitForTimeout(3000);
        const locatorH1 = page.getByTestId(aboutYouPage.HEADER_H1)
        await expect(locatorH1).toHaveText(/About you/, {timeout: 5000});
    })
    test('Fill in information on about you page', async () => {
        const about = new aboutYou(page)
        await about.randomPatient({...page})
    })
    test('confirm h1 on schedule page', async () => {
        const locatorH1 = page.getByTestId(calendarPage.HEADER_H1)
        await expect(locatorH1).toHaveText(/Schedule/, {timeout: 5000});
    })

    test('first date on page', async () => {
        const calend = new calendar(page)
        await calend.calendar()
    })

});



