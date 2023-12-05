import {test, expect, Page} from '@playwright/test';
// import {whatToExpectPage} from '../pages/whatToExpectPage';
import {whatToExpect,} from '../pageObjects/whatToExpect';
import {getStarted} from "../pageObjects/getStarted";
import {getStartedPage} from "../pages/getStartedPage";
import {aboutYouPage} from "../pages/aboutYouPage";
import {aboutYou} from "../pageObjects/aboutYou";
import {calendarPage} from "../pages/calendarPage";
import {calendar} from "../pageObjects/calendar";
import sqlQuery = require("../utils/sql");


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
    test('Get Started page cancer info', async () => {
        const get = new getStarted(page)
        await get.cancerSelection("Adrenal Tumors", true)
        //await page.waitForTimeout(3000);
        const locatorH1 = page.getByTestId(aboutYouPage.HEADER_H1)
        await expect(locatorH1).toHaveText(/About you/, {timeout: 4000});
    })
    test('Fill in information on About you page', async () => {
        const about = new aboutYou(page)
        await about.randomPatient({...page})
    })
    test('Confirm h1 on schedule page', async () => {
        const locatorH1 = page.getByTestId(calendarPage.HEADER_H1)
        await expect(locatorH1).toHaveText(/Schedule/, {timeout: 5000});
    })

    test('first date on page', async () => {
        const calend = new calendar(page)
        await calend.calendar()
        // await page.waitForTimeout(1000);
    })

    test("sql test", async () => {
        const calend = new calendar(page)
        const rating: string = "4"
        const experience: string = "Overall experience"
        const textArea: string = "Right test on " + new Date()
        const appointmentId: number = 0
        await calend.feedback(rating, experience, textArea)
        const table = await sqlQuery.returnOfQuery()
        console.log("Date of appointment submission " + await table[0].SubmissionDate)
        console.log("Rating: " + await table[0].Rating)
        console.log("Comment: " + await table[0].Comments)
        console.log("Appointment Type: " + await table[0].AppointmentTypeID)
        // expect(await table[0].Rating).toStrictEqual(rating)
        // expect(await table[0].Comments).toStrictEqual(textArea)
        // expect(await table[0].AppointmentTypeID).toStrictEqual(appointmentId)

    })

});



