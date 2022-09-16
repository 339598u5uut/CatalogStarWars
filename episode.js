export function render(data) {
    const container = document.createElement('div');
    Promise.all([
        Promise.all(data.species.map((url) => fetch(url).then(res => res.json()))),
        Promise.all(data.planets.map((url) => fetch(url).then(res => res.json())))
    ]).then(responses => {
        container.classList.add('p-4', 'col-6');
        const title = document.createElement('h1');
        title.textContent = data.title;
        const paragraph = document.createElement('p');
        paragraph.textContent = data.opening_crawl;
        const titlePlanets = document.createElement('h2');
        titlePlanets.classList.add('title-planets');
        titlePlanets.textContent = 'Planets';
        const listPlanets = document.createElement('ul');
        listPlanets.classList.add('list-planets', 'col-6');
        listPlanets.id = 'listPlanets';
        const titleSpecies = document.createElement('h2');
        titleSpecies.classList.add('title-species');
        titleSpecies.textContent = 'Species';
        const listSpecies = document.createElement('ul');
        listSpecies.classList.add('list-planets', 'col-6');
        listSpecies.id = 'listSpecies';

        responses[0].forEach(species => { drawDetales(species, listSpecies) });
        responses[1].forEach(planets => { drawDetales(planets, listPlanets) });

        const button = document.createElement('button');
        button.classList.add('episodes__btn-back', 'btn', 'btn-link');
        button.style.cssText = `background-image: url('./image/arrow.png');
                    background-repeat: no-repeat; background-position: left 57%; padding-left: 25px; color: rgb(136, 135, 135);`
        button.textContent = 'Back to episodes';
        button.setAttribute('type', 'button');
        button.addEventListener('click', function() {
            history.back();
        })

        container.append(title)
        container.append(paragraph)
        container.append(titlePlanets)
        container.append(listPlanets)
        container.append(titlePlanets);
        container.append(listPlanets);
        container.append(titleSpecies);
        container.append(listSpecies);
        container.append(button);
    })
    return container;
}

function drawDetales(element, list) {
    const item = document.createElement('li');
    item.classList.add('list-group-item');
    item.innerHTML = element.name;
    list.appendChild(item);
    return list;
}
