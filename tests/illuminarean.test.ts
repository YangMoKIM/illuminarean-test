import {expect, Page, selectors, test} from '@playwright/test';

// describe는 테스트를 묶는 단위
test.describe('일루미나리안 사전과제 테스트', () => {
    let page: Page;

    // beforeAll hook은 최초 딱 한번 실행. initialize 작업 등을 수행
    test.beforeAll(async ({ browser, contextOptions }) => {
        const browserContext = await browser.newContext(contextOptions);
        // 페이지 생성
        page = await browserContext.newPage();

        // goodvibe 링크로 이동
        await page.goto('https://goodvibe.kr/');
    });



    /*test('1. goodvibe접속 확인', async () => {
        // goodvibe접속 확인
        const goodvibe = 'https://goodvibe.kr/'
        await expect(page).toHaveURL(goodvibe);
    });



    test('2. copyright확인', async () => {
        // copyright element를 가져옴
        const copyright = await page.locator('html > body > div > div > div:nth-of-type(3) > section:nth-of-type(1) > footer > div > div:nth-of-type(1) > p');

        const validCopyright = `Copyright © GoodVibe, Inc. 2022. All rights reserved.`;

        // copyright의 text가 올바른 copyright인지 확인
        await expect(copyright).toHaveText(validCopyright);
    });

     test('3. address확인', async () => {
        // address element를 가져옴
        const address = await page.locator('html > body > div > div > div:nth-of-type(3) > section:nth-of-type(1) > footer > div > div:nth-of-type(1) > address');
        const validAddress = '대표자 : KIM SAMUEL SANGCHUL | 주소 : 경기도 용인시 기흥구 죽현로 31, 12층 1208호(보정동, 로얄캠퍼빌) | 사업자 등록번호 : 530-88-02093';

        // address의 text가 올바른 copyright인지 확인
        await expect(address).toHaveText(validAddress);
    });*/

    test('4. 일루미나리안 확인', async () => {

        // 일루미나리안 바로가기 버튼 클릭
        await page.goto('https://goodvibe.kr/')
        await page.goto('https://goodvibe.kr/#page2')
        await page.goto('https://goodvibe.kr/#page3')
        const page1Promise = page.waitForEvent('popup');
        const illuminareanShotcut = page.locator('html > body > div > div > div:nth-of-type(3) > section:nth-of-type(3) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(3) > a > span');
        illuminareanShotcut.click();
        const page1 = await page1Promise;
        await page1.getByLabel('company:close_modal').click();
        await expect(page1).toHaveURL('https://illuminarean.com/')

    });

    test('5. 지원하기 페이지 이동', async () => {

        // 일루미나리안 바로가기 버튼 클릭
        await page.goto('https://goodvibe.kr/')
        await page.goto('https://goodvibe.kr/#page2')
        await page.goto('https://goodvibe.kr/#page3')
        const page1Promise = page.waitForEvent('popup');
        const illuminareanShotcut = page.locator('html > body > div > div > div:nth-of-type(3) > section:nth-of-type(3) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(3) > a > span');
        illuminareanShotcut.click();
        const page1 = await page1Promise;
        await page1.getByLabel('company:close_modal').click();
        await page1.getByLabel('지원하기').click();
        await expect(page1).toHaveURL('https://illuminarean.com/apply/list')
    });
    test('6. 인재풀 등록', async () => {

        // 일루미나리안 바로가기 버튼 클릭
        await page.goto('https://goodvibe.kr/')
        await page.goto('https://goodvibe.kr/#page2')
        await page.goto('https://goodvibe.kr/#page3')
        const page1Promise = page.waitForEvent('popup');
        const illuminareanShotcut = page.locator('html > body > div > div > div:nth-of-type(3) > section:nth-of-type(3) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(3) > a > span');
        illuminareanShotcut.click();
        const page1 = await page1Promise;
        await page1.getByLabel('company:close_modal').click();
        await page1.getByLabel('지원하기').click();
        await page1.getByRole('button', { name: '인재풀 등록' }).click();
        await expect(page1).toHaveURL('https://illuminarean.com/apply/pool')
    });

    test('7. 지원분야 ', async () => {

        // 일루미나리안 바로가기 버튼 클릭
        await page.goto('https://illuminarean.com/apply/pool')
        await page.getByLabel('지원분야').click();
        await page.getByRole('button', { name: 'QA' }).click();
        const buttonDepartment = page.locator("button[id='department']");
        await expect(buttonDepartment).toHaveText('QA');
    });

    test('8. 전화번호 ', async () => {

        // 일루미나리안 바로가기 버튼 클릭
        await page.goto('https://illuminarean.com/apply/pool')
        await page.getByTitle('South Korea (대한민국): +82').click();
        await page.getByText('South Korea (대한민국)+ 82').first().click();
        await page.getByPlaceholder('010-0000-0000').click();
        await page.getByPlaceholder('010-0000-0000').fill('01043193314');
        const phoneNum = page.locator("input[class='form-control']")
        const country = page.locator("div[class='selected-flag'] div[class^='iti-flag']")
        let phoneNumRegex = new RegExp("010\[0-9]{8}");
        await expect(country).toHaveClass('iti-flag kr')
        await expect(phoneNum).toHaveValue(phoneNumRegex);
    });

    test('9. 이메일 ', async () => {

        // 일루미나리안 바로가기 버튼 클릭
        await page.goto('https://illuminarean.com/apply/pool')
        await page.getByLabel('이메일').click();
        await page.getByLabel('이메일').fill('yangmo@kakao.com');
        let emailRegex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

        const inputEmail = page.locator("input[id='email']")

        await expect(inputEmail).toHaveValue(emailRegex);
    });

});
