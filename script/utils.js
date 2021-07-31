const JSONString = data =>
  JSON.stringify(data)
    // Quotes will screw up the JSON
    .replace(/"/g, '&quot;') // careful copy and pasting, I had to use a zero-width space here to get markdown to post this.
    .replace(/'/g, '&apos;')

module.exports = {
  JSONString
}
