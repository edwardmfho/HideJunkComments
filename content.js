const basePhrases = [
    "Always remember",
    "Always remember that",
];

// Adding a dynamic pattern for the specific phrase involving any team or subject name
const dynamicPhrase = "Being a[n]? [\\w\\s]+ fan is one of the best decisions I’ve ever made";

// Combine all phrases into a single regex pattern
const regexPattern = basePhrases.map(phrase => 
phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')  // Escape special regex characters
).concat(dynamicPhrase).join('|');

const regex = new RegExp(regexPattern, 'gi');  // 'gi' for global and case-insensitive matching

(function (){// This script injects when the user clicks the extension icon

    function removeOuterDivIfTextFound() {
        // Select all inner div elements within the specific class
        const innerDivs = document.querySelectorAll('div.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x1vvkbs div');

        innerDivs.forEach(div => {
            // Check if the div's text content matches any of the specified phrases
            if (regex.test(div.textContent)) {
                // Find the outer div with the specific class and remove it if found
                let outerDiv = div.closest('div.x1n2onr6.x1swvt13.x1iorvi4.x78zum5.x1q0g3np.x1a2a7pz');
                if (outerDiv) {
                    outerDiv.remove();
                }
            }
            // Reset the regex lastIndex because of 'g' flag usage
            regex.lastIndex = 0;
        });
}

// Run removeOuterDivIfTextFound on invocation
removeOuterDivIfTextFound();
})();
// Optionally observe the DOM for changes and remove outer divs dynamically
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1 && node.querySelector('div.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x1vvkbs div')) {
                    const innerDiv = node.querySelector('div.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x1vvkbs div');
                    if (regex.test(innerDiv.textContent)) {
                        let outerDiv = innerDiv.closest('div.x1n2onr6.x1swvt13.x1iorvi4.x78zum5.x1q0g3np.x1a2a7pz');
                        if (outerDiv) {
                            outerDiv.remove();
                        }
                        // Reset the regex lastIndex because of 'g' flag usage
                        regex.lastIndex = 0;
                    }
                }
            });
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });
