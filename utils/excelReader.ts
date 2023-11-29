import xlsx = require('xlsx');
export const readExcelFile = async (fileName: string, SheetName: string) => {
    try {
        const path: string = './testData';
        const file = xlsx.readFile(`${path}/${fileName}`);
        const sheet = xlsx.utils.sheet_to_json(file.Sheets[SheetName])
        return sheet;
    } catch (err) {
        console.log(err);
    }
};