export const insertLinks = (str: string, phrases: string[]) => {
  // Создаем регулярное выражение для поиска фраз
  const regex = new RegExp(`(${phrases.join("|")})`, "gi");

  return str.split(regex).map((part, index) => {
    // Если часть текста совпала с фразой, оборачиваем ее в ссылку
    if (phrases.some((phrase) => phrase.toLowerCase() === part.toLowerCase())) {
      return (
        <a href={`#${part}`} key={index}>
          {part}
        </a>
      );
    }
    return part;
  });
};
