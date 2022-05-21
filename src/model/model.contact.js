class Contact {
    constructor(urlProfile, webSite, email, social) {
        this.urlProfile = (urlProfile) ? urlProfile : 'none'
        this.webSite = (webSite) ? webSite : 'none'
        this.email = (email) ? email : 'none'
        this.social = (social) ? social : 'none'
    }

}


export default Contact