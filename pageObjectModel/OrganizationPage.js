const { expect } = require('@playwright/test');

export class OrganizationPage{
    constructor(page){
        this.page = page
        this.createOrgIcon = "//img[@title='Create Organization...']"
        this.organizationName = "//input[@name='accountname']"
        this.saveBtn = "(//input[@class='crmbutton small save'])[1]"
        this.viewOrgHeader = "//span[@class='dvHeaderText']"
        this.viewOrgName = "//span[@id='dtlview_Organization Name']"
    }
    async createOrganization(orgName){
        await this.page.click(this.createOrgIcon)
        await this.page.fill(this.organizationName,orgName)
        await this.page.click(this.saveBtn)
    }
    async validateCreatedOrg(){
        //expect(await this.page.("//span[@class='dvHeaderText']").textContent()).toContain("Space Corp")
        //expect(await this.page.locator(this.viewOrgHeader).textContent()).toContain(orgName)
        return await this.page.locator(this.viewOrgHeader).textContent()
    }
}