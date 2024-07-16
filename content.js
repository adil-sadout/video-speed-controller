// content.js
function createSpeedDisplay(video) {
    let speedDisplay = document.createElement('div');
    speedDisplay.style.position = 'absolute';
    speedDisplay.style.top = '10px';
    speedDisplay.style.right = '10px';
    speedDisplay.style.backgroundColor = 'white';
    speedDisplay.style.color = 'black';
    speedDisplay.style.padding = '2px 5px';
    speedDisplay.style.zIndex = '9999';
    speedDisplay.style.fontSize = '14px';
    speedDisplay.style.borderRadius = '3px';
    speedDisplay.style.fontFamily = 'Arial, sans-serif';
    speedDisplay.style.display = 'flex';
    speedDisplay.style.alignItems = 'center';
    
    let speedText = document.createElement('span');
    speedText.innerText = `Speed: ${video.playbackRate.toFixed(2)}x`;
    speedDisplay.appendChild(speedText);

    let plusButton = document.createElement('button');
    plusButton.innerText = '+';
    plusButton.style.marginLeft = '5px';
    plusButton.style.padding = '2px 5px';
    plusButton.style.cursor = 'pointer';
    plusButton.style.border = 'none';
    plusButton.style.background = 'transparent';
    plusButton.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        video.playbackRate = Math.min(video.playbackRate + 0.25, 10);
        updateSpeedDisplay(video);
    });
    plusButton.addEventListener('dblclick', function(event) {
        event.preventDefault();
        event.stopPropagation();
    });
    speedDisplay.appendChild(plusButton);

    let minusButton = document.createElement('button');
    minusButton.innerText = '-';
    minusButton.style.marginLeft = '5px';
    minusButton.style.padding = '2px 5px';
    minusButton.style.cursor = 'pointer';
    minusButton.style.border = 'none';
    minusButton.style.background = 'transparent';
    minusButton.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        video.playbackRate = Math.max(video.playbackRate - 0.25, 0.25);
        updateSpeedDisplay(video);
    });
    minusButton.addEventListener('dblclick', function(event) {
        event.preventDefault();
        event.stopPropagation();
    });
    speedDisplay.appendChild(minusButton);

    let container = video.closest('div');
    container.style.position = 'relative';
    container.appendChild(speedDisplay);

    video.dataset.speedDisplay = true;
    video.speedDisplay = speedDisplay;
    video.speedText = speedText;
}

function updateSpeedDisplay(video) {
    video.speedText.innerText = `Speed: ${video.playbackRate.toFixed(2)}x`;
}

document.addEventListener('keydown', function(event) {
    let videos = document.querySelectorAll('video');
    if (videos.length === 0) return;

    videos.forEach(video => {
        if (!video.dataset.speedDisplay) {
            createSpeedDisplay(video);
        }
        
        if (event.key === '+') {
            video.playbackRate = Math.min(video.playbackRate + 0.25, 10);
        } else if (event.key === '-') {
            video.playbackRate = Math.max(video.playbackRate - 0.25, 0.25);
        }

        updateSpeedDisplay(video);
    });
});

// For dynamically loaded videos, e.g., on YouTube
const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
            let videos = mutation.target.querySelectorAll('video');
            videos.forEach(video => {
                if (!video.dataset.speedDisplay) {
                    createSpeedDisplay(video);
                    updateSpeedDisplay(video);
                }
            });
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });
