chrome.runtime.sendMessage(
    {action: 'doSomething'},
    async function () {
        let hasVideoFound = false;
        let previousVideoSrc;

        setInterval(() => {
            const videoElement = document.querySelector('video');

            if (videoElement?.src !== previousVideoSrc) {
                previousVideoSrc = videoElement.src;
                // window.open(previousVideoSrc, '_blank');

                const container = document.createElement('div');
                container.style.position = 'fixed';
                container.style.top = '0';
                container.style.left = '0';
                container.style.width = '100vw';
                container.style.height = '100vh';
                container.style.background = 'rgba(0, 0, 0, 0.8)';
                container.style.display = 'flex';
                container.style.flexDirection = 'column';
                container.style.justifyContent = 'center';
                container.style.alignItems = 'center';
                container.style.padding = '20px';

                const video = document.createElement('video');
                video.src = previousVideoSrc;
                video.controls = true;
                video.autoplay = true;
                video.style.width = '100%';
                video.style.borderRadius = '10px';
                video.style.maxWidth = '80vw';

                const answersContainer = document.createElement('div');
                answersContainer.style.display = 'flex';
                answersContainer.style.justifyContent = 'space-between';
                answersContainer.style.alignItems = 'center';
                answersContainer.style.width = '100%';
                answersContainer.style.paddingTop = '32px';
                answersContainer.style.gap = '32px';

                Array.from(document.querySelectorAll('form li')).forEach((answer) => {
                    const span = document.createElement('span');
                    span.textContent = answer.textContent;
                    span.style.background = 'rgba(255, 255, 255, 0.8)';
                    span.style.padding = '16px';
                    span.style.borderRadius = '5px';
                    span.style.display = 'flex';
                    span.style.justifyContent = 'center';
                    span.style.alignItems = 'center';
                    span.style.height = '120px';
                    span.style.textAlign = 'center';

                    answersContainer.appendChild(span);
                });
                container.appendChild(video);
                container.appendChild(answersContainer);

                container.addEventListener('click', (event) => {
                    if (event.target === container) {
                        container.remove();
                    }
                });

                document.querySelector('body').appendChild(container);

                document.addEventListener('keydown', (event) => {
                    if (event.key === 'Escape') {
                        container.remove();
                    }
                });
            }
        }, 1000);
    }
)
