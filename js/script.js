/**
 * WebLearn - Practice Lab & Draggable Split-Pane Workspace Controller
 * Allows interactive code inspection, draggable horizontal splitter resizing,
 * live preview loading, and clipboard copying.
 */

// Function to reveal the split-pane workspace from the preview overlay
function revealPlayground(id) {
    const overlay = document.getElementById('overlay-' + id);
    if (overlay) {
        overlay.classList.add('revealed');
    }
}

// Function to hide the playground and return to the output preview image
function hidePlayground(id) {
    const overlay = document.getElementById('overlay-' + id);
    if (overlay) {
        overlay.classList.remove('revealed');
    }
}


// Function to copy code from the pre block to clipboard
function copyCode(codeElementId, btnElement) {
    const codeBlock = document.getElementById(codeElementId);
    if (!codeBlock) return;

    const codeText = codeBlock.innerText || codeBlock.textContent;
    navigator.clipboard.writeText(codeText).then(() => {
        const originalText = btnElement.innerHTML;
        btnElement.innerHTML = '&#10003; Copied!';
        btnElement.style.backgroundColor = '#16a34a';

        setTimeout(() => {
            btnElement.innerHTML = originalText;
            btnElement.style.backgroundColor = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy code: ', err);
    });
}

// Initialize Draggable Splitters on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    const splitContainers = document.querySelectorAll('.split-container');

    splitContainers.forEach((container) => {
        const dragger = container.querySelector('.split-dragger');
        const leftPane = container.querySelector('.left-pane');
        const rightPane = container.querySelector('.right-pane');
        const iframes = container.querySelectorAll('iframe');

        if (!dragger || !leftPane || !rightPane) return;

        let isDragging = false;

        const startDragging = (e) => {
            // Prevent text selection during drag
            e.preventDefault();
            isDragging = true;
            dragger.classList.add('dragging');
            document.body.classList.add('resizing');

            // Temporarily disable iframe events so mouse drag is fluid across iframe boundary
            iframes.forEach(iframe => iframe.style.pointerEvents = 'none');
        };

        const stopDragging = () => {
            if (isDragging) {
                isDragging = false;
                dragger.classList.remove('dragging');
                document.body.classList.remove('resizing');
                iframes.forEach(iframe => iframe.style.pointerEvents = 'auto');
            }
        };

        const onDrag = (e) => {
            if (!isDragging) return;

            // Support touch and mouse
            const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : null);
            if (clientX === null) return;

            const containerRect = container.getBoundingClientRect();
            const totalWidth = containerRect.width;
            const mouseOffset = clientX - containerRect.left;

            // Calculate percentage width of left pane
            let leftPercent = (mouseOffset / totalWidth) * 100;

            // Clamping bounds between 18% and 82% to prevent collapsing panes
            leftPercent = Math.max(18, Math.min(82, leftPercent));
            const rightPercent = 100 - leftPercent;

            leftPane.style.flex = `0 0 ${leftPercent}%`;
            rightPane.style.flex = `0 0 ${rightPercent}%`;
        };

        // Attach mouse events
        dragger.addEventListener('mousedown', startDragging);
        window.addEventListener('mouseup', stopDragging);
        window.addEventListener('mousemove', onDrag);

        // Attach touch events for tablet / mobile devices
        dragger.addEventListener('touchstart', startDragging, { passive: false });
        window.addEventListener('touchend', stopDragging);
        window.addEventListener('touchmove', onDrag, { passive: false });
    });
});
