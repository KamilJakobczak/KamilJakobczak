class Scroller {
  constructor(rootSelector) {
    const rootElement = document.querySelector(rootSelector);
    this.sections = document.querySelectorAll('section');
    const sectionsArr = [...this.sections];
    const currentSectionIndex = sectionsArr.findIndex(this.isScrolledIntoView);
    // console.log(currentSectionIndex);
    // this.currentSectionIndex =
    //   currentSectionIndex < 0 ? 0 : currentSectionIndex;

    this.currentSectionIndex = Math.max(currentSectionIndex, 0);

    this.isThrottled = false;
    this.drawNav();

    // console.log(this.currentSectionIndex);
  }

  isScrolledIntoView(item) {
    const elementPosition = item.getBoundingClientRect();
    const positionTop = elementPosition.top;
    const positionBottom = elementPosition.bottom;
    // console.log(positionTop, positionBottom, window.innerHeight);
    const isVisible = positionTop >= 0 && positionBottom <= window.innerHeight;
    return isVisible;
  }

  listenScroll = e => {
    if (this.isThrottled) return;
    this.isThrottled = true;

    setTimeout(() => {
      this.isThrottled = false;
    }, 1000);

    const direction = e.wheelDelta < 0 ? 1 : -1;

    this.scroll(direction);
  };
  scroll = direction => {
    if (direction === 1) {
      const isLastSection =
        this.currentSectionIndex === this.sections.length - 1;
      if (isLastSection) return;
    } else if (direction === -1) {
      const isfirstSection = this.currentSectionIndex === 0;
      if (isfirstSection) return;
    }

    this.currentSectionIndex += direction;
    this.scrollToCurrentSection();
  };
  scrollToCurrentSection = () => {
    this.selectedNavItem();
    this.sections[this.currentSectionIndex].scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  drawNav = () => {
    this.navigationContainer = document.createElement('aside');
    this.navigationContainer.setAttribute('class', 'scroller__navigation');
    const list = document.createElement('ul');

    this.sections.forEach((section, index) => {
      const listItem = document.createElement('li');
      listItem.addEventListener('click', () => {
        this.currentSectionIndex = index;
        this.scrollToCurrentSection();
      });

      list.appendChild(listItem);
    });
    this.navigationContainer.appendChild(list);

    document.body.appendChild(this.navigationContainer);
    this.selectedNavItem();
  };

  selectedNavItem = () => {
    if (this.navigationContainer) {
      const navItems = this.navigationContainer.querySelectorAll('li');

      navItems.forEach((item, index) => {
        if (index === this.currentSectionIndex) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  };
}
