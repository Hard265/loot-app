function getFileExtension(filename: string): string | null {
  const match = filename.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
  return match ? match[1] : null;
}

export { getFileExtension }
