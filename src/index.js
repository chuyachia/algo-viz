import p5 from 'p5';

import './assets/index.css';

(function () {
  const sidebar = document.querySelector('#side-bar');
  const p5Container = document.querySelector('#p5-container');
  const explain = document.querySelector('#explain');

  async function dynamicLoadModule(path) {
    let module = await import(`./graph/${path}`);

    const { sketch, explainText } = module;
    canvas = new p5(sketch, 'p5-container');
    explain.innerHTML = explainText;
  }

  let module;

  let canvas;
  sidebar.addEventListener('click', async function (e) {
    let target = e.target;
    if (target.nodeName === 'H5') {
      let prevActive = document.querySelector('#side-bar h5.active');
      if (prevActive != null) {
        prevActive.classList.remove('active');
      }
      target.classList.add('active');
      p5Container.innerHTML = '';
      switch (target.id) {
        case 'dijkstra':
          await dynamicLoadModule('dijkstra');
          break;
        case 'topo-sort':
          await dynamicLoadModule('topologicalSort');
          break;
        case 'tarjan':
          await dynamicLoadModule('tarjan');
          break;
      }
    }
  });
})();
