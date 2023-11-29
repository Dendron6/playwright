import {Page} from "@playwright/test";
import { getStartedPage } from "../pages/getStartedPage";

export class getStarted {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async cancerSelection(cancerType:string, mySelf: boolean = true){
        await (await this.page.$(getStartedPage.CANCER_SELECT_DROPDOWN)).fill(cancerType)
        await this.page.keyboard.press('Tab')
        if(mySelf === true){
            await this.page.getByTestId(getStartedPage.FOR_MYSELF_RADIOBUTTON).click()
        }else{
            await this.page.getByTestId(getStartedPage.FOR_SOMEONE_ELSE_RADIOBUTTON).click()
        }
        await this.page.getByTestId(getStartedPage.NEXT_BUTTON).click()
    };

}