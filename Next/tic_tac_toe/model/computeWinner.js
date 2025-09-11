export function computeWinner({ cells }, siquenceSize = 5, fieldsSize = 19) {
  const gap = Math.floor(siquenceSize / 2);

  const compireElements = (indexes) => {
    let result = true;

    for (let i = 1; i < indexes.length; i++) {
      result &&= !!cells[indexes[i]];
      result &&= cells[indexes[i]] === cells[indexes[i - 1]];
    }

    return result;
  };

  const getSiauenceIndexes = (i) => {
    const res = [
      [], // -
      [], // /
      [], // \
      [], // |
    ];

    for (let j = 0; j < siquenceSize; j++) {
      res[0].push(j - gap + i);
      res[1].push(fieldsSize * (j - gap) + (j - gap) + i);
      res[2].push(-fieldsSize * (j - gap) + (j - gap) + i);
      res[3].push(fieldsSize * (j - gap) + i);
    }

    const x = i % fieldsSize;
    if (x < gap || x >= fieldsSize - gap) {
      res.shift();
      res.shift();
      res.shift();
    }

    return res;
  };

  for (let i = 0; i < cells.length; i++) {
    if (cells[i]) {
      const indexRows = getSiauenceIndexes(i);

      const winnerIndexes = indexRows.find((row) => compireElements(row));

      if (winnerIndexes) {
        return winnerIndexes;
      }
    }
  }

  return undefined;
}
