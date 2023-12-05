import { type Page } from "@playwright/test";
import {whatToExpectPage} from "../pages/whatToExpectPage";
import moment = require('moment');
import {ne, tr} from "@faker-js/faker";

export class calendar {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async calendar(){
        const locator= this.page.locator('//button/abbr').first()
        const firstDate = await locator.getAttribute('aria-label', {timeout: 3000})
        await this.page.waitForTimeout(3000);
        const availableTimes: string = "[data-testid='calendarPage_timesMessage']"
        const confirm: string = "[data-testid='confirm']"
        let i: number = 0
        const time: string = "//button[contains(text(),'.m.')]"
        while(await this.page.locator(availableTimes).isVisible()===false){
            let nextDate: string = `//abbr[@aria-label ='${moment.utc(firstDate).add(i, 'days').format('LL')}']//parent::button`;
            if(await this.page.locator(nextDate).isEnabled()===true){
                await this.page.locator(nextDate).click({timeout:3000})
                await this.page.waitForTimeout(1000);
                if(await this.page.locator(availableTimes).isVisible() ===true){
                    await this.page.locator(time).first().click({timeout:3000})
                }
            }
            i+=1
        }
        await this.page.locator(confirm).first().click({timeout:3000})
    }
    async feedback(rating, experience, textArea){
        const starRating = `//input[@value="${rating}"]//parent::label`
        await await this.page.locator(starRating).click()
        await this.page.waitForTimeout(500)
        const experienceBox = `//input[@value="${experience}"]`
        await await this.page.locator(experienceBox).click()
        await this.page.waitForTimeout(500)
        const textField = `textarea`
        await await this.page.locator(textField).fill(textArea)
        const submitButton = '//input[@value="Submit"]'
        await await this.page.locator(submitButton).click()
    }
}


