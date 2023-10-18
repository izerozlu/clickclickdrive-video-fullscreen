chrome.runtime.sendMessage(
    {action: 'doSomething'},
    async function () {
        let hasVideoFound = false;

        const interval = setInterval(() => {
            if (!hasVideoFound) {
                const videoElement = document.querySelector('video');

                if (videoElement && videoElement.requestFullscreen) {
                    try {
                        videoElement.requestFullscreen();
                        hasVideoFound = true;
                    } catch (e) {
                    }
                }
            } else {
                clearInterval(interval);
            }
        }, 500);
    }
)
