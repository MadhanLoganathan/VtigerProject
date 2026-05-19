import {expect, test} from '@playwright/test'

test("Vtiger Login and Logout", async({page})=>{
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
    //Clicking Sign out button
    await page.locator("//img[@src='themes/softed/images/user.PNG']").hover()
    await page.locator("//a[text()='Sign Out']").click()
})

