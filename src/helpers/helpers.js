function compareCertifications(a, b) {
  if (a.order > b.order) return 1;
  else if (a.order < b.order) return -1;
  return 0;
}

function compareMoviesDates(a, b) {
  const y1 = new Date(a.release_date).getFullYear();
  const y2 = new Date(b.release_date).getFullYear();
  
  if(isNaN(y1)) return -1;
  if(isNaN(y2)) return 1;

  if (y1 > y2) return 1;
  else if (y1 < y2) return -1;
  return 0;
}

module.exports = {
  compareCertifications,
  compareMoviesDates,
}
