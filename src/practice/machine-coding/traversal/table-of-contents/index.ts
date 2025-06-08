type TOCNode = {
    level: number;
    text: string | null;
    id?: string;
    children: TOCNode[];
}

const headerTagNames = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

/**
 * Generates an HTML Table of Contents from a Document's heading structure.
 *
 * @param doc The Document object to parse.
 * @returns An HTML string representing the nested Table of Contents.
 */
export default function tableOfContents(doc: Document): string {
    // Return empty string if the document body is empty
    if (!doc.body.innerHTML.trim()) {
        return "";
    }

    // The rootNode acts as an invisible parent for all top-level headings (e.g., H1s).
    // This simplifies the stack management by always having a base to push to.
    const rootNode: TOCNode = {
        level: 0,
        text: null, // No text for the dummy root node
        children: [],
    };

    // The stack maintains a reference to the current active TOCNode.
    // The top of the stack is always the most recently added heading node
    // that could potentially be a parent for subsequent deeper headings.
    const stack: TOCNode[] = [rootNode];

    /**
     * Helper function to generate a unique and URL-friendly ID for an HTML element.
     * It reuses an existing ID if present, otherwise creates one from the text content.
     * It ensures the ID is unique within the document to prevent conflicts.
     *
     * @param element The HTMLElement for which to ensure an ID.
     * @param textContent The text content of the element, used for ID generation.
     * @returns The unique ID for the element.
     */
    const ensureUniqueId = (element: HTMLElement, textContent: string): string => {
        if (element.id) {
            return element.id; // Use existing ID if already present
        }

        // Basic slugify logic: convert text to lowercase, replace spaces/special chars with hyphens
        let id = textContent.toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '') // Remove non-word characters except spaces and hyphens
            .replace(/[\s_-]+/g, '-') // Replace sequences of spaces/underscores/hyphens with a single hyphen
            .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

        let counter = 1;
        let originalId = id;
        // Check for uniqueness in the entire document
        while (doc.getElementById(id)) {
            id = `${originalId}-${counter}`;
            counter++;
        }
        element.id = id; // Assign the generated ID to the actual DOM element
        return id;
    };

    /**
     * Recursively traverses the DOM to identify heading elements and build the TOCNode hierarchy.
     *
     * @param element The current HTMLElement being traversed.
     */
    const traverse = (element: HTMLElement) => {
        // Skip if the element is null or doesn't have a tag name
        if (!element || !element.tagName) {
            return;
        }

        const tagName = element.tagName.toLowerCase();
        const headerMatch = tagName.match(/^h([1-6])$/); // Check if it's an h1-h6 tag

        if (headerMatch) {
            const level = parseInt(headerMatch[1], 10); // Extract heading level (e.g., 'h1' -> 1)
            const headingText = element.textContent || '';
            const headingId = ensureUniqueId(element, headingText); // Get/generate a unique ID for this heading

            const newNode: TOCNode = {
                level,
                text: headingText,
                id: headingId, // Store the ID in the TOCNode for later linking
                children: [],
            };

            // Adjust the stack based on the current heading's level relative to the top of the stack.
            // Pop from the stack until we find a node whose level is less than the current heading's level.
            // This handles cases where we're going "shallower" (e.g., from H3 back to H1)
            // or staying at the "same level" (e.g., from H2 to another H2).
            // The `stack.length > 1` condition ensures we never pop the `rootNode`.
            while (stack.length > 1 && stack[stack.length - 1].level >= level) {
                stack.pop();
            }

            // The last element on the stack is now the correct parent for `newNode`.
            // Add `newNode` as a child to its parent.
            stack[stack.length - 1].children.push(newNode);

            // Push `newNode` onto the stack. It becomes the potential parent for any subsequent
            // headings that are of a deeper level (e.g., an H3 following an H2).
            stack.push(newNode);
        }

        // Recursively traverse all children of the current element.
        // Array.from is used to convert HTMLCollection to Array for robust iteration.
        // Type assertion `as HTMLElement` is for TypeScript compatibility.
        for (const child of Array.from(element.children)) {
            traverse(child as HTMLElement);
        }
    };

    // Start the traversal from the document's body.
    traverse(doc.body);

    // After traversal, the `rootNode.children` array contains the complete, nested TOC hierarchy.
    // Call the stringify function to convert this hierarchy into an HTML string.
    return stringify(rootNode);
}

// --- Helper functions for converting the TOCNode tree to an HTML string ---

/**
 * Converts a single TOCNode into an HTML <li> element.
 * Recursively calls stringifyChildren for any nested children.
 *
 * @param node The TOCNode to convert.
 * @returns An HTML string for a list item.
 */
function stringifyNode(node: TOCNode): string {
    // If it's the dummy root node (text is null), just stringify its children directly.
    if (node.text === null) {
        return stringifyChildren(node.children);
    }

    // Determine the href for the link. Use node.id if available, otherwise a '#' fallback.
    const href = node.id ? `#${node.id}` : '#';

    // Construct the <li> element, including the anchor link and any nested children.
    // <a href="${href}">${node.text}</a>
    return `<li>${node.text}${stringifyChildren(node.children)}</li>`;
}

/**
 * Converts an array of TOCNodes (children) into an HTML <ul> element.
 *
 * @param children An array of TOCNode children.
 * @returns An HTML string for an unordered list, or an empty string if no children.
 */
function stringifyChildren(children: TOCNode[]): string {
    return children.length > 0
        ? `<ul>${children.map(stringifyNode).join('')}</ul>`
        : '';
}

/**
 * The main function to initiate the conversion of the TOC hierarchy to HTML.
 * It starts by stringifying the children of the `rootNode`.
 *
 * @param contents The `rootNode` (or any TOCNode) whose children are to be stringified.
 * @returns The final HTML string for the Table of Contents.
 */
function stringify(contents: TOCNode): string {
    // We start from the rootNode's children because the rootNode itself is a conceptual parent
    // and shouldn't generate an extra <ul> wrapper around the entire TOC.
    return stringifyChildren(contents.children);
}