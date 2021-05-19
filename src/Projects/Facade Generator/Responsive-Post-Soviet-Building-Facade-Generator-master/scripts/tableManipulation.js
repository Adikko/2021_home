function expandVertically() {
    let table = document.getElementById("tableGrid"); //accessing the table
    let addOneRow = table.insertRow(0); //adding a row
    let howManyCells = table.rows[1].cells.length; //checking the first row, since shrinkVertically() does not allow for it to disappear
    for (i = 0; i < howManyCells; i++) { //adding as many cells, as we need to keep the table matrix intact. This procedure loops over the quantity of cells in the first row
        let addOneCell = addOneRow.insertCell(i);
        addOneCell.innerHTML = appendRandomPicture();
    }
}
  
function shrinkVertically() {
    let table = document.getElementById("tableGrid"); //accessing the table
    let howManyRows = table.rows.length; //checking how many rows are there
    if (howManyRows <= 1) { //we don't want to completely erase our table
        alert("You have to have at least one floor!")
    } else {
        let deleteOneRow = table.deleteRow(0);
    }
}

function expandHorizontally() {
    let table = document.getElementById("tableGrid"); //accessing the table
    let howManyRows = table.rows.length; //checking how many rows are there
    for (i = 0; i <= howManyRows; i++) {
        let addCellToEveryRow = table.rows[i].insertCell(-1);
        addCellToEveryRow.innerHTML = appendRandomPicture();
    }
}

function shrinkHorizontally() {
    let table = document.getElementById("tableGrid"); //accessing the table
    let howManyRows = table.rows.length; //checking how many rows are there
    let howManyCells = table.rows[0].cells.length;
    for (i = 0; i <= howManyRows; i++) {
        if (howManyCells <= 1) {
            alert("You have to have at least one residental gate!")
            break
        } else {
            let deleteCellToEveryRow = table.rows[i].deleteCell(-1);
        }
    }
}