const openDialog = (videoElement, previousVideoSrc) => {
    previousVideoSrc(videoElement.src);
    videoElement.pause();

    const container = document.createElement('div');
    container.classList.add('container');

    const title = document.createElement('h1');
    title.textContent = document.querySelector('h1').textContent;
    title.classList.add('title');

    const video = document.createElement('video');
    video.classList.add('video')
    video.src = previousVideoSrc();
    video.controls = true;
    video.autoplay = true;

    const answersContainer = document.createElement('div');
    answersContainer.classList.add('answers-container');

    Array.from(document.querySelectorAll('form li')).forEach((answer) => {
        const isAnswerSelected = !!answer.querySelector('svg');
        const button = document.createElement('button');
        button.classList.add('answer');
        if (isAnswerSelected) {
            button.classList.add('selected');
        }
        button.textContent = answer.textContent;
        button.addEventListener('click', () => {
            answer.querySelector('label').dispatchEvent(new MouseEvent('click'));
            button.classList.toggle('selected');
        });

        answersContainer.appendChild(button);
    });

    container.appendChild(title);
    container.appendChild(video);
    container.appendChild(answersContainer);

    container.addEventListener('click', (event) => {
        if (![video, ...document.querySelectorAll('.answers-container .answer')].includes(event.target)) {
            container.remove();
        }
    });

    document.querySelector('body').appendChild(container);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            container.remove();
        }
    });
};

chrome.runtime.sendMessage(
    {action: 'doSomething'},
    async function () {
        let _previousVideoSrc;

        const previousVideoSrc = (newSrc) => {
            if (newSrc) {
                _previousVideoSrc = newSrc;
            }

            return _previousVideoSrc;
        };

        setInterval(() => {
            const videoElement = document.querySelector('video');
            if (videoElement && videoElement.src !== previousVideoSrc()) {
                // TODO [izerozlu] video could be the same one, but still need to add the event listener
                videoElement?.addEventListener('click', () => openDialog(videoElement, previousVideoSrc))
            }
            if (videoElement && videoElement.src !== previousVideoSrc()) {
                openDialog(videoElement, previousVideoSrc);
            }
        }, 1000);
    }
)
