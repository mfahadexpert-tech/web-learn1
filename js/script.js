// Mobile navigation menu

function toggleMenu() {

    const navigation =
        document.getElementById("topNav");

    navigation.classList.toggle("show");

}



// Copy code function
// We will use this on lesson pages later.

function copyCode(elementId) {

    const codeElement =
        document.getElementById(elementId);

    if (!codeElement) {
        return;
    }

    const code =
        codeElement.innerText;

    navigator.clipboard
        .writeText(code)
        .then(function () {

            alert("Code copied!");

        });

}



// ================= CODE PLAYGROUND & DRAGGER =================

function revealCodePlayground() {
    const overlay = document.getElementById("playgroundOverlay");
    const workspace = document.getElementById("splitWorkspace");

    if (overlay && workspace) {
        overlay.classList.add("revealed");
        workspace.classList.add("active");
    }
}

function hideCodePlayground() {
    const overlay = document.getElementById("playgroundOverlay");
    const workspace = document.getElementById("splitWorkspace");

    if (overlay && workspace) {
        overlay.classList.remove("revealed");
        workspace.classList.remove("active");
    }
}

function resetSplitter() {
    const leftPane = document.getElementById("leftPane");
    const rightPane = document.getElementById("rightPane");
    if (leftPane && rightPane) {
        leftPane.style.flex = "1 1 50%";
        rightPane.style.flex = "1 1 50%";
    }
}

// Draggable Splitter Implementation
document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("playgroundOverlay");
    const dragger = document.getElementById("splitDragger");
    const splitContainer = document.getElementById("splitContainer");
    const leftPane = document.getElementById("leftPane");
    const rightPane = document.getElementById("rightPane");

    if (overlay) {
        overlay.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                revealCodePlayground();
            }
        });
    }

    if (dragger && splitContainer && leftPane && rightPane) {
        let isDragging = false;

        function startDrag(e) {
            isDragging = true;
            document.body.classList.add("resizing");
            dragger.classList.add("dragging");
            // Disable pointer events on iframe during drag so drag doesn't get swallowed
            const iframe = document.getElementById("livePreviewFrame");
            if (iframe) iframe.style.pointerEvents = "none";
            e.preventDefault();
        }

        function doDrag(e) {
            if (!isDragging) return;

            const clientX = e.type.startsWith("touch")
                ? e.touches[0].clientX
                : e.clientX;

            const containerRect = splitContainer.getBoundingClientRect();
            const containerWidth = containerRect.width;
            const offsetX = clientX - containerRect.left;

            // Calculate percentage with boundary limits between 20% and 80%
            let leftPercent = (offsetX / containerWidth) * 100;
            if (leftPercent < 20) leftPercent = 20;
            if (leftPercent > 80) leftPercent = 80;

            const rightPercent = 100 - leftPercent;

            leftPane.style.flex = `0 0 ${leftPercent}%`;
            rightPane.style.flex = `0 0 ${rightPercent}%`;
        }

        function stopDrag() {
            if (isDragging) {
                isDragging = false;
                document.body.classList.remove("resizing");
                dragger.classList.remove("dragging");
                const iframe = document.getElementById("livePreviewFrame");
                if (iframe) iframe.style.pointerEvents = "auto";
            }
        }

        dragger.addEventListener("mousedown", startDrag);
        dragger.addEventListener("touchstart", startDrag, { passive: false });

        window.addEventListener("mousemove", doDrag);
        window.addEventListener("touchmove", doDrag, { passive: false });

        window.addEventListener("mouseup", stopDrag);
        window.addEventListener("touchend", stopDrag);
    }
});