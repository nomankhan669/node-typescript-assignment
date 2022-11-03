import fs from 'fs';

export const readJsonFile = (filePath: string): any[] => {
    const file = fs.readFileSync(filePath).toString();
    const data = JSON.parse(file);

    return data;
}