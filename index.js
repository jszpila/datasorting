(function() {
  const data = window.data || {}
  const numTotal = data.length;
  let numFiltered, start;

  function makeList(data) {
    const table = document.getElementById("results");
    const meta = document.getElementById("meta");
    let tr, td, txt, elapsed;

    elapsed = (Date.now() - start) / 1000;

    txt = document.createTextNode(`${numFiltered} valid items; ${numTotal} total, grouped by listId & sorted by name; took ${elapsed} seconds`);
    meta.appendChild(txt);
  
    data.forEach(item => {
      tr = document.createElement("TR");
      td = document.createElement("TD");
      txt = document.createTextNode(`${item.listId}`);
      td.appendChild(txt);
      tr.appendChild(td);

      td = document.createElement("TD");
      txt = document.createTextNode(`${item.name}`);
      td.appendChild(txt)
      tr.appendChild(td);

      table.appendChild(tr);
    });
  };

  function sortData(data) {
    numFiltered = data.length;

    return data.sort((a, b) => {
      if (a.listId > b.listId) {
        return 1;
      } else if (a.listId < b.listId) {
        return -1;
      } else {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        } else {
          return 0;
        }
      }
    });
  };

  function filterData(data) {
    return data.filter(item => 
      item.name !== "" 
      && item.name !== null)
  };

  if (data) {
    start = Date.now();
    makeList(sortData(filterData(data.slice())));
  } else {
    console.error("Unable to read data");
  }
})();
