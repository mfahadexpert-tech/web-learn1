// ==========================================================================
// WebLearn - JavaScript Main Logic & Interactivity
// ==========================================================================

// ==========================================================================
// 1. MOBILE NAVIGATION MENU
// Toggles the mobile dropdown navigation on smaller screen sizes.
// ==========================================================================
function toggleMenu() {
    const navigation = document.getElementById("topNav");
    if (navigation) {
        navigation.classList.toggle("show");
    }
}


// ==========================================================================
// 2. CLIPBOARD CODE COPYING
// Copies the innerText of a specified code element to the user's clipboard.
// ==========================================================================
function copyCode(elementId) {
    const codeElement = document.getElementById(elementId);
    if (!codeElement) return;

    const code = codeElement.innerText;
    navigator.clipboard.writeText(code).then(function () {
        alert("Code copied!");
    });
}


// ==========================================================================
// 3. CODE SHOWCASE PLAYGROUND (SPLIT-SCREEN & DRAGGER)
// Controls revealing, hiding, and resizing the interactive code preview editor.
// ==========================================================================

// Reveals the interactive code split-view workspace
function revealCodePlayground() {
    const overlay = document.getElementById("playgroundOverlay");
    const workspace = document.getElementById("splitWorkspace");

    if (overlay && workspace) {
        overlay.classList.add("revealed");
        workspace.classList.add("active");
    }
}

// Hides the split-view workspace and restores the preview image
function hideCodePlayground() {
    const overlay = document.getElementById("playgroundOverlay");
    const workspace = document.getElementById("splitWorkspace");

    if (overlay && workspace) {
        overlay.classList.remove("revealed");
        workspace.classList.remove("active");
    }
}

// Resets split-pane proportions to equal 50% - 50%
function resetSplitter() {
    const leftPane = document.getElementById("leftPane");
    const rightPane = document.getElementById("rightPane");
    if (leftPane && rightPane) {
        leftPane.style.flex = "1 1 50%";
        rightPane.style.flex = "1 1 50%";
    }
}

// Initializes the draggable split resizer on DOM content load
document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("playgroundOverlay");
    const dragger = document.getElementById("splitDragger");
    const splitContainer = document.getElementById("splitContainer");
    const leftPane = document.getElementById("leftPane");
    const rightPane = document.getElementById("rightPane");

    // Enable keyboard access (Enter / Space) to reveal playground
    if (overlay) {
        overlay.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                revealCodePlayground();
            }
        });
    }

    // Set up dragging listeners for mouse and touch inputs
    if (dragger && splitContainer && leftPane && rightPane) {
        let isDragging = false;

        // Drag start event
        function startDrag(e) {
            isDragging = true;
            document.body.classList.add("resizing");
            dragger.classList.add("dragging");

            // Disable iframe pointer events during drag so dragging is smooth
            const iframe = document.getElementById("livePreviewFrame");
            if (iframe) iframe.style.pointerEvents = "none";
            e.preventDefault();
        }

        // Drag move event: calculates percentage width for left and right panes
        function doDrag(e) {
            if (!isDragging) return;

            const clientX = e.type.startsWith("touch")
                ? e.touches[0].clientX
                : e.clientX;

            const containerRect = splitContainer.getBoundingClientRect();
            const containerWidth = containerRect.width;
            const offsetX = clientX - containerRect.left;

            // Constrain left pane width between 20% and 80%
            let leftPercent = (offsetX / containerWidth) * 100;
            if (leftPercent < 20) leftPercent = 20;
            if (leftPercent > 80) leftPercent = 80;

            const rightPercent = 100 - leftPercent;

            leftPane.style.flex = `0 0 ${leftPercent}%`;
            rightPane.style.flex = `0 0 ${rightPercent}%`;
        }

        // Drag stop event
        function stopDrag() {
            if (isDragging) {
                isDragging = false;
                document.body.classList.remove("resizing");
                dragger.classList.remove("dragging");

                const iframe = document.getElementById("livePreviewFrame");
                if (iframe) iframe.style.pointerEvents = "auto";
            }
        }

        // Event listeners for desktop mouse
        dragger.addEventListener("mousedown", startDrag);
        window.addEventListener("mousemove", doDrag);
        window.addEventListener("mouseup", stopDrag);

        // Event listeners for mobile / touch devices
        dragger.addEventListener("touchstart", startDrag, { passive: false });
        window.addEventListener("touchmove", doDrag, { passive: false });
        window.addEventListener("touchend", stopDrag);
    }
});


// ==========================================================================
// 4. USEFUL EXAMPLES: INTERACTIVE FORM TO TABLE OUTPUT
// Captures values from the Registration Form (Name, Email, Gender, Course)
// and updates the adjacent Form Output Table dynamically.
// ==========================================================================
function registerUser(event) {
    // Prevent default form submission and page reload
    event.preventDefault();

    // 1. Get entered values from form inputs
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const course = document.getElementById("regCourse").value;

    // 2. Validate and display output on the right side
    if (name && email) {
        document.getElementById("outName").textContent = name;
        document.getElementById("outEmail").textContent = email;
        document.getElementById("outGender").textContent = gender;
        document.getElementById("outCourse").textContent = course;

        // 3. Clear text input fields for next entry
        document.getElementById("regName").value = "";
        document.getElementById("regEmail").value = "";
    }
}