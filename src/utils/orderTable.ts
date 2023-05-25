type ExcludedMembersType = 'userPasswd' | 'selection';

const orderTable = <T extends object>(
  data: T[],
  order: 'asc' | 'desc',
  field: Exclude<keyof T, ExcludedMembersType>
): T[] =>
  data.sort((a, b) => {
    const aField = a[field] ?? null;
    const bField = b[field] ?? null;
    if (aField === null) return order === 'asc' ? -1 : 1;
    if (bField === null) return order === 'asc' ? 1 : -1;
    let thisOrder = 0;
    String(Number(aField)) === aField && String(Number(bField)) === bField
      ? (thisOrder = Number(aField) > Number(bField) ? 1 : Number(aField) < Number(bField) ? -1 : 0)
      : (thisOrder = aField > bField ? 1 : aField < bField ? -1 : 0);
    return order === 'asc' ? thisOrder : thisOrder * -1;
  });

export default orderTable;
