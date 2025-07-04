# Table of Contents

On websites, heading tags give a hierarchy to the page and heading information can be used by user agents (including screen readers) to construct a table of contents for a document automatically.

Given a document node, write a function tableOfContents that generates an HTML string representing a table of contents based on the headings (`<h1>, <h2>, ..., <h6>`) in the document. Following the best practices, heading levels won't be skipped, i.e. `<h1>` will be followed by `<h2>` and so on.

The returned string doesn't need to contain any indentation.

## Examples

The example below is shown with indentation to make the output easier to understand.

```js
const doc = new DOMParser().parseFromString(
  `<!DOCTYPE html>
  <body>
    <h1>Heading1</h1>
    <h2>Heading2a</h2>
    <h2>Heading2b</h2>
    <h3>Heading3a</h3>
    <h3>Heading3b</h3>
    <h4>Heading4</h4>
    <h2>Heading2c</h2>
  </body>`,
  'text/html',
);

const htmlString = tableOfContents(doc);
console.log(htmlString);
// Pretty-printed for readability.
`<ul>
  <li>
    Heading1
    <ul>
      <li>Heading2a</li>
      <li>
        Heading2b
        <ul>
          <li>Heading3a</li>
          <li>
            Heading3b
            <ul>
              <li>Heading4</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>Heading2c</li>
    </ul>
  </li>
</ul>`;

```