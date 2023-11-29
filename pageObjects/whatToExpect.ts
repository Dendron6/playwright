import { type Page } from "@playwright/test";
import {whatToExpectPage} from "../pages/whatToExpectPage";
//import UIActions from "@uiActions/UIActions";

export class whatToExpect {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async clickOnStartButton(){
        await this.page.getByTestId(whatToExpectPage.START_SCHEDULING_BUTTON).click();
    };

}


