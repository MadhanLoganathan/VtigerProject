import {expect, test} from '@playwright/test'
import contactmodule from '../../testData/contactmodule.json'
import {selectDropdown, utils} from '../../utils/utils'


test("VTiger Creating Contact", async({page})=>{
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
    await page.locator("//table[@class='hdrTabBg']//a[text()='Contacts']").click()
    //Clicking Add Organisation icon
    await page.locator("//img[@title='Create Contact...']").click()
    //Entering Contact First name & Last name
    let fName = "John"
    let lName = "Mathew"
    await page.locator("//select[@name='salutationtype']").selectOption({value:"Mr."})
    await page.locator("//input[@name='firstname']").fill(fName)
    await page.locator("//input[@name='lastname']").fill(lName)
    //Clicking save button
    await page.locator("(//input[@class='crmbutton small save'])[1]").click()
    //Verifying the Created Contact header, First name & last name
    expect(await page.locator("//span[@class='dvHeaderText']").textContent()).toContain(`${lName} ${fName}`)
    expect(await page.locator("//span[@id='dtlview_First Name']").textContent()).toBe(fName)
    expect(await page.locator("//span[@id='dtlview_Last Name']").textContent()).toBe(lName)
    //Clicking Sign out button
    await page.locator("//img[@src='themes/softed/images/user.PNG']").hover()
    await page.locator("//a[text()='Sign Out']").click()
})

test.only("VTiger Creating Contact with Test Data", async({page})=>{
    //Opening the VTiger app in browser
    await page.goto("http://localhost:8888/index.php?action=Login&module=Users")
    //Entering the Username
    await page.locator("//input[@name='user_name']").fill(contactmodule.userName)
    //Entering the Password
    await page.locator("//input[@name='user_password']").fill(contactmodule.password)
    //Clicking Login button
    await page.locator("//input[@id='submitButton']").click()
    //Verifying the Home page link
    expect((await page.locator("//a[@class='hdrLink']").textContent()).trim()).toBe("Home")
    //Clicking Organisation link
    await page.locator("//table[@class='hdrTabBg']//a[text()='Contacts']").click()
    //Clicking Add Organisation icon
    await page.locator("//img[@title='Create Contact...']").click()
    //Entering Contact First name & Last name
    const firstName = contactmodule.firstName + Date.now()
    const lastName = contactmodule.lastName + Date.now()
    await selectDropdown(page, "//select[@name='salutationtype']", "Mr.")
    await page.locator("//input[@name='firstname']").fill(firstName)
    await page.locator("//input[@name='lastname']").fill(lastName)
    //Clicking save button
    await page.locator("(//input[@class='crmbutton small save'])[1]").click()
    //Verifying the Created Contact header, First name & last name
    expect(await page.locator("//span[@class='dvHeaderText']").textContent()).toContain(`${lastName} ${firstName}`)
    await page.waitForSelector("text='Contact Information'")
    const actualFirstName = await page.locator("//span[@id='dtlview_First Name']").textContent()
    const actualLastName = await page.locator("//span[@id='dtlview_Last Name']").textContent()
    await expect(actualFirstName).toContain(firstName)
    await expect(actualLastName).toContain(lastName)
    //Clicking Sign out button
    await page.locator("//img[@src='themes/softed/images/user.PNG']").hover()
    await page.locator("//a[text()='Sign Out']").click()
})