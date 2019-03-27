import jQuery from "jquery"

const el = document.querySelector(".tabbed-schedule"),
      tabs = document.querySelectorAll("#slider-tab .nav-link")

// 45 degrees
const ANGLE_THRESHOLD = Math.PI / 4,
      DIST_THRESHOLD = window.innerWidth / 5

// This will keep the coordinates of touchstart events
let x0 = null,
    y0 = null

/**
 * Given y, x coordinates this function calculates
 * the angle measured from the horizontal level
 * in absolute value.
 * @param {Number} angle
 */
const angleFromHLevel = (y, x) => {
    /**
     * Calculate atan2 angle. Takes values in [-180, 180] like this:
     *          -90
     *  -135 / ‾‾‾‾‾‾‾‾ \ -45
     * ∓180 |        | ∓0
     *  +135 \ _____ / +45
     *          +90
     */
    let angle = Math.atan2(y, x)
    /**
     * Enforce vertical symmetry
     *          +90
     *  +135 / ‾‾‾‾‾‾‾‾ \ +45
     * +180 |         | +0
     *  +135 \ _____ / +45
     *          +90
     */
    angle = Math.abs(angle)
    /**
     * Enforce horizontal symmetry
     *         +90
     *  +45 / ‾‾‾‾‾‾‾‾ \ +45
     *  +0 |         | +0
     *  +45 \ _____ / +45
     *         +90
     */
    if (angle > Math.PI / 2) {
        angle = Math.PI - angle
    }
    return angle
}

/**
 * Swipe tab
 * @param {Number} dir Direction: -1 (left) or 1 (right).
 */
const swipeTab = (dir) => {
    let curr = null
    tabs.forEach((tab, i) => tab.classList.contains("active") && (curr = i))

    if (dir === -1 && curr - 1 >= 0) {
        jQuery(tabs[curr - 1]).tab("show")
    }
    if (dir === 1 && curr + 1 < tabs.length) {
        jQuery(tabs[curr + 1]).tab("show")
    }
}

const bindTouchEvents = () => {
    el.addEventListener("touchstart", e => {
        x0 = e.changedTouches[0].clientX
        y0 = e.changedTouches[0].clientY
    })

    el.addEventListener("touchend", e => {
        let x = e.changedTouches[0].clientX,
            y = e.changedTouches[0].clientY,
            dx = x - x0,
            dy = y - y0

        let angle = angleFromHLevel(dy, dx)

        if (angle < ANGLE_THRESHOLD && Math.abs(dx) > DIST_THRESHOLD) {
            // dx > 0 means direction to the right; that is equivalent to a left swipe
            let direction = -Math.sign(dx)
            swipeTab(direction)
        }
    })
}

/**
 * Given a location hash, it checks if a tab exists with
 * that hash as href and if so, it shows it.
 * @param {String} hash
 */
const handleHash = (hash) => {
    let whichTab = null
    tabs.forEach((tab, i) => tab.getAttribute("href") === hash && (whichTab = i))
    if (whichTab !== null) {
        jQuery(tabs[whichTab]).tab("show")
    }
}

// Apply only on pages where the elements exist
if (el && tabs.length) {
    bindTouchEvents()
    handleHash(location.hash)
}
