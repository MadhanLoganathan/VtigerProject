import {expect, test} from '@playwright/test'

test("VTiger Creating Campaign", async({page})=>{
    //Opening the VTiger app in browser
    await page.goto("http://localhost:8888/index.php?action=Login&module=Users")
    //Entering the Username
    await page.locator("//input[@name='user_name']").fill("admin")
    //Entering the Password
    await page.locator("//input[@name='user_password']").fill("admin")
    //Clicking Login button
    await page.locator("//input[@id='submitButton']").click()
    //Verifying the Home page link
    expect((await page.locator("//a[@class='hdrLink']").textContent()).trim()).toBe("Home")
    //Clicking Campaigns
    await page.locator("//a[text()='More']").hover()
    await page.locator("//table[@class='allMnuTable']//a[text()='Campaigns']").click()
    //Clicking Add Campaigns icon
    await page.locator("//img[@title='Create Campaign...']").click()
    //Entering Campaigns name
    await page.locator("//input[@name='campaignname']").fill("Moon Corp")
    //Clicking save button
    await page.locator("(//input[@class='crmbutton small save'])[1]").click()
    //Verifying the Created Organisation
    expect(await page.locator("//span[@class='dvHeaderText']").textContent()).toContain("Moon Corp")
    //Verifyin the Organisation name
    expect(await page.locator("//span[@id='dtlview_Campaign Name']").textContent()).toBe("Moon Corp")
    //Clicking Sign out button
    await page.locator("//img[@src='themes/softed/images/user.PNG']").hover()
    await page.locator("//a[text()='Sign Out']").click()
})