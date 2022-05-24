/* eslint-disable no-undef */
import {
  templates,
  select,
  classNames
} from '../settings.js';


class Home {
  constructor(element) {
    const thisHome = this;
    thisHome.render(element);
    thisHome.initLinks();
    thisHome.initWidgets();
  }

  render(element) {
    const thisHome = this;
    const generatedHTML = templates.homeWidget();
    thisHome.dom = {};
    thisHome.dom.wrapper = element;
    thisHome.dom.wrapper.innerHTML = generatedHTML;
    thisHome.links = thisHome.dom.wrapper.querySelectorAll(select.home.links);
    thisHome.pages = document.querySelector(select.containerOf.pages).children;
    thisHome.navLinks = document.querySelectorAll(select.nav.links);
    thisHome.carousel = document.querySelector(select.home.carousel);
  }

  initLinks() {
    const thisHome = this;
    const idFromHash = window.location.hash.replace('#/', '');
    let pageMatchingHash = thisHome.pages[0].id;

    for (let page of thisHome.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }
    thisHome.activatePage(pageMatchingHash);

    for (let link of thisHome.links) {
      link.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();
        /* get page id from href attribute*/
        const id = clickedElement.getAttribute('href').replace('#', '');

        /*run thisApp.activatePage with that id*/
        thisHome.activatePage(id);

        /* change URL hash*/
        window.location.hash = '#/' + id;
      });
    }
  }

  activatePage(pageId) {
    const thisHome = this;
    /* add class "active" to matching pages, remove from non-matching */
    for (let page of thisHome.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
    /* add class "active" to matching links, remove from non-matching */
    for (let link of thisHome.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  }


  initWidgets() {
    const thisHome = this;
    // eslint-disable-next-line no-unused-vars
    const flkty = new Flickity(thisHome.carousel, {
      // options
      cellAlign: 'left',
      contain: true,
      autoPlay: true,
      wrapAround: true,
      prevNextButtons: false,

    });
    console.log(thisHome);

  }
}
export default Home;