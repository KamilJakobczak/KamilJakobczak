document.addEventListener('DOMContentLoaded', function () {
  console.log('Hello world');

  const rootElement = document.querySelector('#id');
  const sections = document.querySelectorAll('section');

  document.addEventListener('wheel', function (e) {
    console.log(e.wheelDelta);
  });
});
