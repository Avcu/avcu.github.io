// let DATA = 'http://127.0.0.1:8000/data.json'
let DATA = 'data.json'

async function fetchData() {
const response = await fetch(DATA);

// let gd = await response.text(); // also try .json()
let gd = await response.json();

//prtt(gd);
console.log(gd);

console.log(typeof gd);
console.log(Object.keys(gd));
console.log(gd.section2);
// return gd;

console.log('Starting here');
render(gd);
}// fetchData()

function render(content){
  // Section 2
  let section2Content = content.section2
  const div2 = document.getElementById("section2");
  for (const element of section2Content){

    let newSubDiv = document.createElement('div');
    newSubDiv.classList.add('flex_element');

    let subDivIm = document.createElement('img');
    subDivIm.src = 'imgs/' + element.image;
    subDivIm.style.cssText = 'width:auto; height:250px; display: block; margin-left: auto; margin-right: auto';

    let subDivHeading = document.createElement('h2');
    subDivHeading.innerText = element.heading;
    subDivHeading.style.cssText = 'color:#FFFFFF';

    let subDivText = document.createElement('p');
    subDivText.innerText = element.text;
    subDivText.style.cssText = 'color:#FFFFFF';

    newSubDiv.appendChild(subDivIm);
    newSubDiv.appendChild(subDivHeading);
    newSubDiv.appendChild(subDivText);

    div2.appendChild(newSubDiv);
  }
  // Section 3
  let section3Content = content.section3;
  const div3Text = document.getElementById("section3_text");

  let divText = document.createElement('p');
  divText.innerText = section3Content.text;
  divText.style.cssText = 'color:#FFFFFF; font-size: 18px;';

  div3Text.appendChild(divText);

  const div3Im = document.getElementById("section3_im");

  let subDivIm = document.createElement('img');
  subDivIm.src = 'imgs/' + 'lasky.png';
  subDivIm.style.cssText = 'width:auto; height:400px; display: block; margin-left: auto; margin-right: auto';

  div3Im.appendChild(subDivIm);

  // Section 4
  let section4Content = content.section4
  const div4 = document.getElementById("section4");
  let idx = 0
  for (const element of section4Content){
    let newDiv = document.createElement('div');
    newDiv.classList.add('flex_container');

    // Text
    let subDivOne = document.createElement('div');
    subDivOne.classList.add('flex_element');

    let subDivHeading = document.createElement('p');
    subDivHeading.innerText = element.heading;
    subDivHeading.style.cssText = 'color:#FFFFFF; font-size: 18px;';

    let subDivText = document.createElement('p');
    subDivText.innerText = element.text;
    subDivText.style.cssText = 'color:#FFFFFF; font-size: 18px;';

    subDivOne.appendChild(subDivHeading)
    subDivOne.appendChild(subDivText)

    // Image
    let newSubDivTwo= document.createElement('div');
    newSubDivTwo.classList.add('flex_element');

    let subDivIm = document.createElement('img');
    subDivIm.src = 'imgs/' + element.image;
    subDivIm.style.cssText = 'width:auto; height:300px; display: block; margin-left: auto; margin-right: auto';

    newSubDivTwo.appendChild(subDivIm)

    // Merge
    if (idx == 0){
      newDiv.appendChild(newSubDivTwo)
      newDiv.appendChild(subDivOne)
      idx++
    } else {
      newDiv.appendChild(subDivOne)
      newDiv.appendChild(newSubDivTwo)
    }

    div4.appendChild(newDiv)
  }
}

fetchData();
