import {expect, test} from '@playwright/test'

test("VTiger Creating Leads", async({page})=>{
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
    //Clicking Leads link
    await page.locator("//table[@class='hdrTabBg']//a[text()='Leads']").click()
    //Clicking Add Leads icon
    await page.locator("//img[@title='Create Lead...']").click()
    //Entering Lead First name,Last name and company name
    let fName = "Akagami"
    let lName = "Shanks"
    let compName = "Red Hair Comp"
    await page.locator("//select[@name='salutationtype']").selectOption({value:"Mr."})
    await page.locator("//input[@name='firstname']").fill(fName)
    await page.locator("//input[@name='lastname']").fill(lName)
    await page.locator("//input[@name='company']").fill(compName)
    //Clicking save button
    await page.locator("(//input[@class='crmbutton small save'])[1]").click()
    //Verifying the Created Contact header, First name & last name
    expect(await page.locator("//span[@class='dvHeaderText']").textContent()).toContain(`${lName} ${fName}`)
    expect(await page.locator("//span[@id='dtlview_First Name']").textContent()).toBe(fName)
    expect(await page.locator("//span[@id='dtlview_Last Name']").textContent()).toBe(lName)
    expect(await page.locator("//span[@id='dtlview_Company']").textContent()).toBe(compName)
    //Clicking Sign out button
    await page.locator("//img[@src='themes/softed/images/user.PNG']").hover()
    await page.locator("//a[text()='Sign Out']").click()
})