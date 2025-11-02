/**
 * Menghitung selisih tahun dari dua string tahun
 * @param {string} startYear - Tahun awal, misal "2018"
 * @param {string} endYear - Tahun akhir, misal "2025"
 * @returns {number} Selisih tahun
 */
export function countYearLeft(startYear, endYear) {
  const awal = parseInt(startYear, 10);
  const akhir = parseInt(endYear, 10);

  if (isNaN(awal) || isNaN(akhir)) {
    throw new Error('Parameter harus berupa string angka tahun yang valid');
  }

  return akhir - awal;
}
