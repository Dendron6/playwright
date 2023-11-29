import { type Page } from "@playwright/test";
import {whatToExpectPage} from "../pages/whatToExpectPage";
import moment = require('moment');

export class calendar {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async calendar(){
        // const firstDate= await this.page.getByRole('button').all().
        const firstDate = this.page.locator('//button/abbr')
        console.log("Calendar test")
        console.log(await firstDate.getAttribute('aria-label'))
    }
    // async calendarBeforeAfter(startDate, daysBuffer, beforeAfter) {
    //     let startingDate = new Date();
    //     let endingDate;
    //
    //     if (beforeAfter === 'before') {
    //         startingDate = moment(startDate).subtract(daysBuffer, 'days').startOf('day');
    //         endingDate = moment.utc(startDate).startOf('day');
    //     } else if (beforeAfter === 'after') {
    //         startingDate = moment.utc(startDate).startOf('day');
    //         endingDate = (startDate).add(daysBuffer, 'days').startOf('day');
    //     } else {
    //         startingDate = moment(startDate).subtract(daysBuffer, 'days').startOf('day');
    //         endingDate = moment(startDate).add(daysBuffer, 'days').startOf('day');
    //     }
    //
    //     const disableDateBefore = `//abbr[@aria-label ='${moment.utc(startingDate).subtract(1, 'days').format('LL')}']//parent::button`;
    //     const disableDateAfter = `//abbr[@aria-label ='${moment.utc(endingDate).add(1, 'days').format('LL')}']//parent::button`;
    //
    //     console.log(`This is start date ${startingDate.format('LL')} \nand this is last date ${endingDate.format('LL')}` + "\n___________________________________")
    //     //here we check if one day before first available is not clickable
    //     if (await this.page.locator(disableDateBefore).isEnabled() === true) {
    //         console.error("This button mustn't clickable because it is day before " + moment.utc(startDateOfAppt).subtract(1, 'days').format('LL'))
    //         return false
    //     }
    //     //here we check if all business days are clickable but weekends are not clickable
    //     do {
    //         const elem = `//abbr[@aria-label ='${startingDate.clone().format('LL')}']//parent::button`;
    //         // remove comment when they disable weekends
    //         if (!['Saturday', 'Sunday'].includes(startingDate.clone().format('dddd'))) {
    //             if (await this.page.locator(elem).isEnabled() === true) {
    //                 await this.page.locator(elem).click()
    //             } else {
    //                 console.error("This button is supposed to be clickable as it is workday " + startingDate.clone().format('LL'))
    //                 return false
    //             }
    //         } else {
    //             if (await this.page.locator(elem).isEnabled() === true) {
    //                 console.error("This button mustn't be clickable as it is weekend " + startingDate.clone().format('LL'))
    //                 return false
    //             }
    //         }
    //     } while (startingDate.add(1, 'days').diff(endingDate) <= 0)
    //     //here we check if one day after last available is not clickable
    //     if (await this.page.locator(disableDateAfter).isEnabled() === true) {
    //         console.error("This button mustn't clickable cause it is day after " + moment.utc(endDateOfAppt).add(1, 'days').format('LL'))
    //         return false
    //     }
    //
    //     return true
    // }
    // async appointment() {
    //
    //     await this.page.waitForTimeout(1000)
    //     const time:string = ('//button[contains(text(),".m.")]')
    //     const dateOnCalendar:string = "[data-testid='date_provider_search']"
    //     var date:number = (new Date().getDate() + 1)
    //     var month:number = new Date().getMonth()
    //     var year:number = new Date().getFullYear()
    //     await this.page.waitForTimeout(1000)
    //     let format = new Date(Date.UTC(year, month, date));
    //     let xpath:string = `//*[@aria-label='${format.toLocaleDateString('en-US', {
    //         year: 'numeric',
    //         month: 'long',
    //         day: 'numeric'
    //     })}']//parent::button`
    //     if (await $(dateOnCalendar).isDisplayed() === false) {
    //         if (await $(xpath).isDisplayed() === false) {
    //             let path = "button.react-calendar__tile>abbr"
    //             await $(path).waitForDisplayed()
    //
    //             await this.page.waitForTimeout(1000)
    //             let firstElement = await $(path).getAttribute("aria-label")
    //             let calendar = new Date(firstElement)
    //             var date = calendar.getDate() + 1
    //             var month = calendar.getMonth()
    //             var year = calendar.getFullYear()
    //
    //         }
    //         while (await $(time).isDisplayed() === false) {
    //             const timeOfDay ="[data-testid$='m_slot']"
    //             if(await $(timeOfDay).isDisplayed() === true){
    //                 break;
    //             }
    //             let format = new Date(Date.UTC(year, month, date));
    //             let xpath = `//*[@aria-label='${format.toLocaleDateString('en-US', {
    //                 year: 'numeric',
    //                 month: 'long',
    //                 day: 'numeric'
    //             })}']//parent::button`
    //             const alertMessage = `//*[contains(text(), "${langVersion.alertMessage}")]`
    //             const noTime = `//*[contains(text(), "${langVersion.noTime}")]`
    //             const arrowNext = "//button[contains(text(),'›')]"
    //             if (await $(xpath).isDisplayed() === false) {
    //                 await $(arrowNext).click()
    //             }
    //             await $(xpath).click();
    //             await this.loadingAwait()
    //             switch (true) {
    //                 case await $(xpath).isEnabled() === false:
    //                     break;
    //                 case await $(alertMessage).isDisplayed():
    //                     await this.page.waitForTimeout(300);
    //                     break;
    //                 case await $(noTime).isDisplayed():
    //                     await this.page.waitForTimeout(300);
    //                     break;
    //                 default:
    //                     await this.page.waitForTimeout(2000);
    //             }
    //             date++;
    //             var fullDate = (format.toLocaleDateString('en-US', {
    //                 weekday: 'long',
    //                 year: 'numeric',
    //                 month: 'long',
    //                 day: 'numeric'
    //             }));
    //         }
    //         return (fullDate);
    //     } else {
    //         if (await $(time).isDisplayed() === false) {
    //             await this.loadingAwait()
    //             while (await $(time).isDisplayed() === false) {
    //                 const nextDate = "//button[@data-link='move_calendar_right']"
    //                 await $(nextDate).click();
    //                 await this.loadingAwait()
    //                 await page.waitForTimeout(1200)
    //             }
    //             await $(time).waitForDisplayed({timeout: 5000});
    //             return $(dateOnCalendar).getText();
    //
    //         } else {
    //             let ddd = await $(dateOnCalendar).getText()
    //             console.log(ddd.toLocaleString("Spanish", {
    //                 weekday: 'long',
    //                 year: 'numeric',
    //                 month: 'long',
    //                 day: 'numeric'
    //             }));
    //             return $(dateOnCalendar).getText();
    //         }
    //     }
    // }

    //this function selects available time on the page, and it passes that time as a variable
    async time() {
        await this.page.waitForTimeout(2000);
        const time = ('//button[contains(text(),".m.")]');
        await this.page.locator(time).isVisible({timeout: 9000});
        for (let hours = 7; hours < 23; hours++) {
            for (let minutes = 0; minutes < 60; minutes += 5) {
                const zero = () => {
                    return minutes < 10 ? minutes + "0" : minutes
                };
                const minus = () => {
                    return hours === 12 ? hours : hours - 12
                };
                if (hours < 12) {
                    let timeSlot = `//button[text()='${hours}:${zero()} a.m.']`
                    if (await this.page.locator(timeSlot).isVisible() === true) {
                        return `${hours}:${zero()} a.m.`
                    }
                } else {
                    let timeSlot = `//button[text()='${minus()}:${zero()} p.m.']`
                    if (await this.page.locator(timeSlot).isVisible() === true) {
                        return `${minus()}:${zero()} p.m.`
                    }
                }
            }
        }
    }

}


