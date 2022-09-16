const cssPromises = {};
async function loadResource(src) {
    if (src.endsWith('.js')) {
        return import (src);
    }
    if (src.endsWith('.css')) {
        if (!cssPromises[src]) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = src;
            cssPromises[src] = new Promise(resolve => {
                link.addEventListener('load', () => resolve());
            });
            document.head.append(link);
        }
        return cssPromises[src];
    }
    return await fetch(src).then(res => res.json());
}

const appContainer = document.getElementById('app');
async function renderPage(moduleName, apiUrl, css) {
    Promise.all([moduleName, apiUrl, css, ].map(src => loadResource(src)))
        .then(([pageModule, data]) => {
            appContainer.innerHTML = '';
            appContainer.append(pageModule.render(data));
        })
}

function init() {
    const searchParams = new URLSearchParams(window.location.search);
    const episodeId = searchParams.get('episodeId');
    if (episodeId) {
        renderPage(
            './episode.js',
            `https://swapi.dev/api/films/${episodeId}`,
            `https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css`,
        )
    } else {
        renderPage(
            './episodes-list.js',
            `https://swapi.dev/api/films`,
            `https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css`,
        )
    };
}
init();

window.addEventListener('popstate', () => {
    init();
});
