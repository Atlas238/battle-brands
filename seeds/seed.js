const allSeeds = require('./all-seeds.json');
const fs = require('fs');

const getCard = (type,brand,icon,name) => {
    return `<button class="col-2 m-3 btn card" data-type="${type}" data-brand="${brand}">
    <div class="d-flex flex-column align-items-center card-body">
      <i
        id="icon"
        class="fab fa-solid ${icon} fa-8x"
        aria-hidden="true"
      ></i>
      <h5 class="card-title mt-4">${name}</h5>
    </div>
  </button>
  `;
}

const buildCards = () => {
    let htmlOut = '';
    // Business - 1
    for(let ele of allSeeds){
        htmlOut += getCard(ele.type,ele.id,ele.icon,ele.title);
    }
    return htmlOut;
}

const htmlOut = () => {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Temp Cards</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossorigin="anonymous"
        />
        <!-- <script src="https://kit.fontawesome.com/3dafd30171.js" crossorigin="anonymous"></script> -->
        <script
          defer
          src="https://kit.fontawesome.com/812ecae711.js"
          crossorigin="anonymous"
        ></script>
      </head>
      <body>
        <main class="d-flex flex-wrap p-2">
        ${buildCards()}
        </main>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
    `;
}

const htmlText = htmlOut();
fs.writeFile('temp.html',htmlText,'utf-8',err => {
    if(err){
        console.log('Something went wrong');
    }
})