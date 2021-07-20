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

    console.log(this.currentSectionIndex);
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
    this.sections[this.currentSectionIndex].scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
}
