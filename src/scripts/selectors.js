const SELECTORS = {
    profile: {
        css: {
            fullname: "h1"

        },
        xpath: {
            educationItems: '(//section[.//span[contains(text(),"Education")]]//ul)[1]/li//span[@aria-hidden="true"]',
            experiencieItems: '(//section[.//span[contains(text(),"Experience")]]//ul)[1]/li//span[@aria-hidden="true"]',
        }
    },
    search: {
        urlsProfiles: ".search-results-container .ph0 ul.reusable-search__entity-result-list > li span.entity-result__title-text a"
    }

}

export default SELECTORS