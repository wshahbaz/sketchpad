//initialize variables
let resetBtn = document.querySelector("#reset");
let gradBtn = document.querySelector("#gradiant");
let rainBtn = document.querySelector("#rainbow");

let sketchGrid = document.querySelector("#grid");

//event listeners
resetBtn.addEventListener("click", resetGrid);
gradBtn.addEventListener("click", gradiantMode);
rainBtn.addEventListener("click", rainbowMode);


//functions
//populate grid using divs
function getGrid() {
    let numSquares = prompt("Sketch size (length/width in number of squares)?");

    for (var row = 0; row < numSquares; row++) {
        var rowSquares = document.createElement("div");
        rowSquares.classList.add("row-container");
        sketchGrid.appendChild(rowSquares);

        for (var col = 0; col < numSquares; col++) {
            var cell = document.createElement("div");
            cell.classList.add("grid-cell");

            cell.addEventListener("mouseover", activateCell);
            rowSquares.appendChild(cell);
        }
    }
}

function resetGrid() {
    let sketch = document.querySelector("#grid");
    
    while (sketch.firstChild) {
        sketch.removeChild(sketch.firstChild);
    }

    getGrid();
}

function rainbowMode() {
    //reset all cells
    clearGrid();

    // remove initial event listeners and add gradient event listeners
    let cells = document.querySelectorAll(".grid-cell");
    cells.forEach(function(thing) {
        thing.removeEventListener('mouseover', activateCell);
        thing.removeEventListener('mouseover', gradiantCell);
        thing.addEventListener('mouseover', rainbowCell);
    });
};

function gradiantMode() {
    //reset all cells
    clearGrid();

    //remove any previous event listeners and add new event listeners
    let cells = document.querySelectorAll(".grid-cell");

    cells.forEach((cell) => {
        cell.style.backgroundColor= "black";
        cell.style.opacity = "0.0";
        cell.removeEventListener("mouseover", activateCell);
        cell.removeEventListener("mouseover", rainbowCell);
        cell.addEventListener("mouseover", gradiantCell);
    });
};

function activateCell(e) {
    e.target.classList.add("active");
}

function gradiantCell(e) {
    e.target.style.opacity = gradiant(e);
}

function rainbowCell(e) {
    e.target.style.backgroundColor = rainbow(e);
}

function gradiant(e) {
    let style = e.target.style.opacity;
    console.log(style);

    if (style=="1.0") {
        style = "0.0"
    }
    else if (style == "" || style == "0.0"){
        style = "0.1"
    }
    else {
        style = (parseFloat(style) + 0.1)
        style = Math.round(style*10)/10
        style = style.toString()
    }

    return style;
}

function rainbow() {
    let red = parseInt(Math.random() * 255);
    let green = parseInt(Math.random() * 255);
    let blue = parseInt(Math.random() * 255);
    return "rgb("+red+', '+green+', '+blue+")";
    //return “rgb(”+red +’, ‘+green+’, '+blue+")";
}

function clearGrid() {

    let cells = document.querySelectorAll(".grid-cell");
    //make all cells white
    cells.forEach((cell) => {
        cell.classList.remove("active");
        cell.setAttribute("style","backgroundColor: white");
    });
}
