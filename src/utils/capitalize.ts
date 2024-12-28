const exceptions = [
  "a",
  "an",
  "and",
  "the",
  "but",
  "or",
  "nor",
  "for",
  "so",
  "yet",
  "to",
  "of",
  "in",
  "on",
  "at",
  "by",
  "with",
  "about",
  "against",
  "between",
  "into",
  "through",
  "during",
  "before",
  "after",
  "above",
  "below",
  "from",
  "up",
  "down",
  "out",
  "over",
  "under",
  "again",
  "further",
  "then",
  "once",
];

export function capitalizeTitle(title: string): string {
  return title
    .split(" ")
    .map((word, index) => {
      if (exceptions.includes(word.toLowerCase()) && index !== 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}
