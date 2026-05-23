export function convertToSerializeableObject(doc) {
  if (!doc || typeof doc !== 'object') return doc;

  for (const key of Object.keys(doc)) {
    const value = doc[key];

    // Only convert MongoDB ObjectId to string, not plain objects or arrays
    if (value && value._bsontype === 'ObjectId') {
      doc[key] = value.toString();
    }
  }

  return doc;
}
