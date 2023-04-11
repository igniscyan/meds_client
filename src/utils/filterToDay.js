function filterByCurrentDay(obj) {
  const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
  const filteredResults = [];

  for (let result of obj) {
    const resultDate = result.date.slice(0, 10); // Get date from result in YYYY-MM-DD format
    if (resultDate === currentDate) {
      filteredResults.push(result);
    }
  }

  return filteredResults;
}
