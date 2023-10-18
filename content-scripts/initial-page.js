chrome.runtime.sendMessage(
    {action: 'doSomething'},
    async function () {
        let hasVideoFound = false;
        console.log('hello')


        const interval = setInterval(() => {
            if (!hasVideoFound) {
                const videoElement = document.querySelector('video');

                if (videoElement) {
                    hasVideoFound = true;
                    const sourceLink = videoElement.src;
                    window.open(sourceLink, '_blank');
                }
            } else {
                clearInterval(interval);
            }
        }, 1000);
    }
)
