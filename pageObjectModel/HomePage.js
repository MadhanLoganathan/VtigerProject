export class HomePage{
    constructor(page){
        this.page = page
        this.organizationLink = "//table[@class='hdrTabBg']//a[text()='Organizations']"
        this.userIcon = "//img[@src='themes/softed/images/user.PNG']"
        this.signOutBtn = "//a[text()='Sign Out']"
    }
    async goToOrganisation(){
        await this.page.click(this.organizationLink)
    }
    async signOut(){
        await this.page.hover(this.userIcon)
        await this.page.click(this.signOutBtn)
    }
}