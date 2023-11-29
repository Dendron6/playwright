import {test, expect, Page} from '@playwright/test';
import { readExcelFile } from '../utils/excelReader';
let page: Page;

test.describe('testing xlsx', async () => {
    const uploadedFile = await readExcelFile('testData.xlsx', "LoginTest");
    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto("https://the-internet.herokuapp.com/login")
    });

    for(let i = 0; i < uploadedFile.length; i++){
        test(`${uploadedFile[i]['TestID']} - ${uploadedFile[i]['Description']}`, async () => {
            await page.getByLabel('Username').fill(uploadedFile[i]['UserName']);
            await page.getByLabel('Password').fill(uploadedFile[i]['Password']);
            await page.getByRole('button').click();
            const locator = page.locator('#flash');
            await expect(locator).toContainText(uploadedFile[i]['ErrorMessage']);
            await page.close()
        })
    }
});

