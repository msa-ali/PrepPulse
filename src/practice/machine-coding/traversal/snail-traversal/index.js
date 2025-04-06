/**
 * @param {number} rowsCount
 * @param {number} colsCount
 * @return {Array<Array<number>>}
 */
Array.prototype.snail = function(rowsCount, colsCount) {
    if (rowsCount * colsCount !== this.length) return [];
    
    const res = new Array(rowsCount).fill(null).map(() => new Array(colsCount).fill(null));

    const directions = [1, -1] // down, up
    let directionIndex = 0;
    let row = 0;
    let col = 0;

    for (let i = 0; i < this.length; i++) {
        res[row][col] = this[i];
        let nextRow = row + directions[directionIndex];
        let nextCol = col;

        if (nextRow < 0 || nextRow == rowsCount) {
            directionIndex = (directionIndex + 1) % 2; // change direction
            nextRow = row;
            nextCol = col + 1;
        }

        row = nextRow;
        col = nextCol;
    }

    return res;
}