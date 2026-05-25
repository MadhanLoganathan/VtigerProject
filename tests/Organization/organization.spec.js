import {expect, test} from '@playwright/test'
import { LoginPage } from '../../pageObjectModel/LoginPage'
import { HomePage } from '../../pageObjectModel/HomePage'
import { OrganizationPage } from '../../pageObjectModel/OrganizationPage'
import { getOrgName } from '../../utils/utils'
import organization from '../../testData/organization.json'


// test("VTiger Creating Organisation", async({page})=>{
//     //Opening the VTiger app in browser
//     await page.goto("http://localhost:8888/index.php?action=Login&module=Users")
//     //Entering the Username
//     await page.locator("//input[@name='user_name']").fill("admin")
//     //Entering the Password
//     await page.locator("//input[@name='user_password']").fill("admin")
//     //Clicking Login button
//     await page.locator("//input[@id='submitButton']").click()
//     //Verifying the Home page link
//     expect((await page.locator("//a[@class='hdrLink']").textContent()).trim()).toBe("Home")
//     //Clicking Organisation link
//     await page.locator("//table[@class='hdrTabBg']//a[text()='Organizations']").click()
//     //Clicking Add Organisation icon
//     await page.locator("//img[@title='Create Organization...']").click()
//     //Entering Organisation name
//     await page.locator("//input[@name='accountname']").fill("Space Corp")
//     //Clicking save button
//     await page.locator("(//input[@class='crmbutton small save'])[1]").click()
//     //Verifying the Created Organisation
//     expect(await page.locator("//span[@class='dvHeaderText']").textContent()).toContain("Space Corp")
//     //Verifyin the Organisation name
//     expect(await page.locator("//span[@id='dtlview_Organization Name']").textContent()).toBe("Space Corp")
//     //Clicking Sign out button
//     await page.locator("//img[@src='themes/softed/images/user.PNG']").hover()
//     await page.locator("//a[text()='Sign Out']").click()
// })

// test("VTiger Creating Organisation with Industry and Type", async({page})=>{
//     //Opening the VTiger app in browser
//     await page.goto("http://localhost:8888/index.php?action=Login&module=Users")
//     //Entering the Username
//     await page.locator("//input[@name='user_name']").fill("admin")
//     //Entering the Password
//     await page.locator("//input[@name='user_password']").fill("admin")
//     //Clicking Login button
//     await page.locator("//input[@id='submitButton']").click()
//     //Verifying the Home page link
//     expect((await page.locator("//a[@class='hdrLink']").textContent()).trim()).toBe("Home")
//     //Clicking Organisation link
//     await page.locator("//table[@class='hdrTabBg']//a[text()='Organizations']").click()
//     //Clicking Add Organisation icon
//     await page.locator("//img[@title='Create Organization...']").click()
//     //Entering Organisation name
//     await page.locator("//input[@name='accountname']").fill("Moon Corp")
//     //Selecting Industry
//     await page.locator("//select[@name='industry']").selectOption({value:"Engineering"})
//     //Selecting Type
//     await page.locator("//select[@name='accounttype']").selectOption({value:"Partner"})
//     //Clicking save button
//     await page.locator("(//input[@class='crmbutton small save'])[1]").click()
//     //Verifying the Created Organisation
//     expect(await page.locator("//span[@class='dvHeaderText']").textContent()).toContain("Moon Corp")
//     //Verifyin the Organisation name
//     expect(await page.locator("//span[@id='dtlview_Organization Name']").textContent()).toBe("Moon Corp")
//     //Clicking Sign out button
//     await page.locator("//img[@src='themes/softed/images/user.PNG']").hover()
//     await page.locator("//a[text()='Sign Out']").click()
// })

test("VTiger Creating Organisation with POM", async({page})=>{
    const orgName = getOrgName(organization.orgName)
    const loginPage = new LoginPage(page)
    const homePage = new HomePage(page)
    const organizationPage = new OrganizationPage(page)
    await page.goto(organization.url)
    await loginPage.login(organization.userName,organization.password)
    await homePage.goToOrganisation()
    await organizationPage.createOrganization(orgName)
    expect(await organizationPage.validateCreatedOrg()).toContain(orgName)
    await homePage.signOut()
})