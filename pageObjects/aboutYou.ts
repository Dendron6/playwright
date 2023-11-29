import {Page} from "@playwright/test";
import {faker} from "@faker-js/faker";
import {codes} from "../utils/areaCodes"
import moment = require('moment');
export class aboutYou {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }


    randomNumber(){
        const random = Math.floor(Math.random() * (459 - 1 + 1) + 1);
        let number:number = Math.floor(Math.random() * 9000000) + 2000001
        return codes[random] + number
    }
    /**
     * Creating a new User
     * @param firstName - name of the user
     * @param lastName - last name of the user
     * @param dob
     * @param gender
     * @param sex
     * @param address
     * @param zip
     * @param phone
     * @param email
     * @returns
     */
    async randomPatient(param:object){
        console.log(JSON.stringify(param))
        const data = {firstName:faker.person.firstName(), lastName:faker.person.lastName(),
            dob: moment(faker.date.birthdate({min: 1950, max: 2001, refDate: '20.11.1990', mode: 'year'})).format('YYYY-MM-DD'),
            gender: 'Man', sex: "Male", address: faker.location.buildingNumber()+ " " + faker.location.street(), zip: '10001',
            phone: this.randomNumber(), email: process.env.EMAIL,
            ...param}

            console.log(`Information about user:\nFirst name: ${data.firstName} Last name: ${data.lastName}
            DOB: ${data.dob}, Gender: ${data.gender}, Sex: ${data.sex}
            Address: ${data.address}, ZIP: ${data.zip}`)
        await this.page.getByTestId('textInput_altFirstName').fill(data.firstName);
        await this.page.getByTestId('textInput_altLastName').fill(data.lastName);
        await this.page.getByTestId('textInput_altDatePicker').fill(data.dob);

        await this.page.locator('#altGenderSelector_SelectInput').fill(data.gender);
        await this.page.getByLabel('Gender *').press('Tab');
        if(data.sex === "Male"){
            await this.page.locator('#radio-altAssignedSexAtBirth-0').click();
        }else{
            await this.page.locator('#radio-altAssignedSexAtBirth-1').click();
        }
        await this.page.getByTestId('textInput_address').fill(data.address);
        await this.page.getByTestId('zipCode_zipCode').fill(data.zip);
        await this.page.getByPlaceholder('1 (702) 123-').fill(data.phone);
        await this.page.getByTestId('emailInput_altEmailInput').fill(data.email);
        await this.page.waitForTimeout(2000);
        await this.page.getByTestId('next').click({timeout: 5000});
        // await this.page.pause();
    };

}