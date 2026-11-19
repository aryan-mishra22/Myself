// Undirected connections describe tools that work together, not proficiency levels.
const connections: Record<string, string[]> = {
  Python: ["Django", "Pandas", "NumPy", "Machine Learning", "NLP", "Lambda"],
  SQL: ["MySQL", "Athena", "ETL"],
  Django: ["Django REST Framework", "MySQL", "Docker"],
  "Django REST Framework": ["REST APIs"],
  "REST APIs": ["Docker"],
  "Machine Learning": ["NumPy", "Pandas", "NLP", "Hugging Face Transformers"],
  NLP: ["Hugging Face Transformers", "spaCy", "Sentence Transformers"],
  Pandas: ["NumPy", "ETL"],
  ETL: ["Data Pipelines", "Glue"],
  "Data Pipelines": ["AWS S3", "Lambda", "Glue", "Athena"],
  "AWS S3": ["Lambda", "Glue", "Athena"],
  Glue: ["Athena"],
  Git: ["GitHub"],
  GitHub: ["Docker"],
  Linux: ["Docker", "Python", "Git"],
};

export function getConnectedSkills(skill: string): string[] {
  return [...new Set([
    ...(connections[skill] ?? []),
    ...Object.entries(connections).filter(([, related]) => related.includes(skill)).map(([name]) => name),
  ])];
}
