export function render(data) {
    const container = document.createElement('div');
    const title = document.createElement('h2');
    title.textContent = 'Каталог эпизодов Star Wars';
    const containerList = document.createElement('div');
    container.classList.add('p-4', 'col-4');
    containerList.classList.add('episodes__list', 'list-group');
    container.append(title);
    container.append(containerList);
    for (const episode of data.results) {
        const link = document.createElement('a');
        link.classList.add('episodes__link', 'list-group-item', 'list-group-item-action', );
        link.textContent = episode.title + ' , episode' + ' ' + episode.episode_id;
        link.setAttribute('href', `?episodeId=${episode.episode_id}`);
        link.onclick = function(e) {
            e.preventDefault;
            link.classList.add('active');
            history.pushState(null, '', `?episodeId=${episode.episode_id}`);
            container.innerHTML = ''
        }
        containerList.append(link);
    }
    return container;
}
