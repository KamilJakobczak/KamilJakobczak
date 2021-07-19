document.addEventListener('DOMContentLoaded', function () {
  console.log('Hello world');

  const rootElement = document.querySelector('#id');
  const sections = [...document.querySelectorAll('section')];
  let currentSectionIndex = 0;
  let isThrottled = false;

  document.addEventListener('wheel', function (e) {
    if (isThrottled) return;
    isThrottled = true;

    setTimeout(function () {
      isThrottled = false;
    }, 1000);
    // console.log(e.wheelDelta);
    const direction = e.wheelDelta < 0 ? 1 : -1;

    if (direction === 1) {
      const isLastSection = currentSectionIndex === sections.length - 1;
      if (isLastSection) return;
    } else if (direction === -1) {
      const isfirstSection = currentSectionIndex === 0;
      if (isfirstSection) return;
    }

    currentSectionIndex += direction;
    sections[currentSectionIndex].scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});
