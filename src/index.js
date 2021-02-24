import p5 from 'p5';

import './assets/index.css';

(function() {
  const sidebar = document.querySelector('#side-bar');
  const p5Container = document.querySelector('#p5-container');
  let module;

  let sketch;
  sidebar.addEventListener('click', async function(e) {
    let target = e.target;
    if (target.nodeName === 'H5') {
      let prevActive = document.querySelector('#side-bar h5.active');
      if (prevActive != null) {
        prevActive.classList.remove('active');
      }
      target.classList.add('active');
      p5Container.innerHTML = '';
      switch(target.id) {
        case 'dijkstra':
          module = await import('./graph/dijkstra');
          const { dijkstraSketch } = module;
          sketch = new p5(dijkstraSketch, 'p5-container');
          break;
        case 'topo-sort':
          module = await import('./graph/topologicalSort');
          const {topologicalSortSketch} = module;
          sketch = new p5(topologicalSortSketch, 'p5-container');
          break;
      }
    }
  });
})();
