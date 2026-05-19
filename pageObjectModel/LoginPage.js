export class LoginPage{
    constructor(page){
        this.page = page
        this.userName = "//input[@name='user_name']"
        this.password = "//input[@name='user_password']"
        this.submitBtn = "//input[@id='submitButton']"
    }
    async login(uName,pwd){
        await this.page.fill(this.userName, uName)
        await this.page.fill(this.password, pwd)
        await this.page.click(this.submitBtn)
    }
}