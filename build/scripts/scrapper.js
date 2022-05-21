(() => {
  // src/functions/autoscrolling.js
  var autoscrolling = (pixels) => new Promise((resolve, reject) => {
    let pixelstoScroll = pixels;
    console.log(pixelstoScroll);
    const idInterval = setInterval(() => {
      window.scrollTo(0, pixelstoScroll);
      pixelstoScroll += pixels;
      if (pixelstoScroll > document.body.scrollHeight) {
        clearInterval(idInterval);
        resolve(true);
      }
    }, 100);
  });
  var autoscrolling_default = autoscrolling;

  // src/model/model.education.js
  var Education = class {
    constructor(place, degree, period) {
      this.place = place;
      this.degree = degree;
      this.period = period;
    }
  };
  var model_education_default = Education;

  // src/model/model.experience.js
  var Experience = class {
    constructor(rol, place, period, country, description) {
      this.rol = rol ? rol : "none";
      this.place = place ? place : "none";
      this.period = period ? period : "none";
      this.country = country ? country : "none";
      this.description = description ? description : "none";
    }
  };
  var model_experience_default = Experience;

  // src/model/model.contact.js
  var Contact = class {
    constructor(urlProfile, webSite, email, social) {
      this.urlProfile = urlProfile ? urlProfile : "none";
      this.webSite = webSite ? webSite : "none";
      this.email = email ? email : "none";
      this.social = social ? social : "none";
    }
  };
  var model_contact_default = Contact;

  // src/functions/selector.js
  var $ = (selector, node = document) => node.querySelector(selector);
  var $$ = (selector, node = document) => [...node.querySelectorAll(selector)];
  var $x = (xpath, node = document) => {
    const collection = document.evaluate(xpath, node, null, XPathResult.ANY_TYPE, null);
    let result = collection.iterateNext();
    const elements = [];
    while (result) {
      elements.push(result);
      result = collection.iterateNext();
    }
    return elements;
  };

  // src/functions/getData.js
  function checkRegex(regex, value) {
    if (regex.test(value)) {
      return value;
    } else {
      return "none";
    }
  }
  function getEducation(array) {
    const arr2 = [];
    for (i = 0; i < array.length; i += 3) {
      arr2.push(new model_education_default(array[i], array[i + 1], array[i + 2]));
    }
    return arr2;
  }
  function getExperience(array) {
    const experience = new model_experience_default();
    array.map((element) => {
      switch (element) {
        case checkRegex(/[a-z]/ig, element):
          return experience.rol = element;
          break;
        case checkRegex(/[a-z]/ig, element):
          return experience.place = element;
          break;
        case checkRegex(/^(199\d|200\d|2021)$/i, element):
          return experience.period = element;
          break;
        case checkRegex([a - zA - Z], element):
          return experience.country = element;
          break;
        case element.length > 10:
          return experience.description = element;
          break;
        default:
          return null;
          break;
      }
    });
    for (i = 0; i < array.length; i += 5) {
      arr.push();
    }
    return arr;
  }
  function getContactArray() {
    $("#top-card-text-details-contact-info").click();
    const links = $$(".pv-contact-info__contact-link").map((element) => element.href);
    $(".artdeco-modal__dismiss").click();
    return links;
  }
  var getContactInfo = (array) => new Promise((resolve, reject) => {
    const contact = new model_contact_default();
    array.map((element) => {
      switch (element) {
        case checkRegex(/linkedin/, element):
          return contact.urlProfile = element;
          break;
        case checkRegex(/@/, element):
          return contact.email = element;
          break;
        case checkRegex(/www/, element):
          return contact.webSite = element;
          break;
        case checkRegex(/twitter|facebook|instagram/, element):
          return contact.social = element;
          break;
        default:
          return null;
          break;
      }
    });
    resolve(contact);
  });

  // src/functions/waitForElement.js
  var waitForElement = (selector) => new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (!$(selector).element) {
        clearInterval(interval);
        resolve();
      }
    }, 10);
    setTimeout(() => {
      reject();
    }, 1e4);
  });
  var waitForElement_default = waitForElement;

  // src/model/model.profile.js
  var Profile = class {
    constructor(fullName, contactInfo, experience, education) {
      this.fullName = fullName;
      this.contactInfo = contactInfo;
      this.experience = experience;
      this.education = education;
    }
  };
  var model_profile_default = Profile;

  // src/scripts/selectors.js
  var SELECTORS = {
    profile: {
      css: {
        fullname: "h1"
      },
      xpath: {
        educationItems: '(//section[.//span[contains(text(),"Education")]]//ul)[1]/li//span[@aria-hidden="true"]',
        experiencieItems: '(//section[.//span[contains(text(),"Experience")]]//ul)[1]/li//span[@aria-hidden="true"]'
      }
    },
    search: {
      urlsProfiles: ".search-results-container .ph0 ul.reusable-search__entity-result-list > li span.entity-result__title-text a"
    }
  };
  var selectors_default = SELECTORS;

  // src/scripts/scrapper.js
  waitForElement_default("h1").then(() => {
    autoscrolling_default(30).then(() => {
      const contactList = getContactArray();
      getContactInfo(contactList);
    }).then((contact) => {
      const fullName = $(selectors_default.profile.css.fullname).textContent;
      const experienceItems = $x(selectors_default.profile.xpath.experiencieItems);
      const educationItems = $x(selectors_default.profile.xpath.educationItems);
      const expMap = experienceItems.map((element) => element?.textContent);
      const eduMap = educationItems.map((element) => element?.textContent);
      const profile = new model_profile_default(fullName, contact, getExperience(expMap), getEducation(eduMap));
      chrome.runtime.connect({ name: "safePort" }).postMessage(profile);
    }).catch(() => {
      console.log("intentelo mas tarde");
    });
  });
})();
