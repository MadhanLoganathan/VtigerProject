import {expect, test} from '@playwright/test'

test("VTiger Creating Product", async({page})=>{
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
    //Clicking Organisation link
    await page.locator("//table[@class='hdrTabBg']//a[text()='Products']").click()
    //Clicking Add Organisation icon
    await page.locator("//img[@title='Create Product...']").click()
    //Entering Product name
    await page.locator("//input[@name='productname']").fill("Sample Prod")
    //Clicking save button
    await page.locator("(//input[@class='crmbutton small save'])[1]").click()
    //Verifying the Created Product header and product name
    expect(await page.locator("//span[@class='lvtHeaderText']").textContent()).toContain("Sample Prod")
    expect(await page.locator("//span[@id='dtlview_Product Name']").textContent()).toBe("Sample Prod")
    //Clicking Sign out button
    await page.locator("//img[@src='themes/softed/images/user.PNG']").hover()
    await page.locator("//a[text()='Sign Out']").click()
})