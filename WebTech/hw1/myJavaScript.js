// let DATA = 'http://127.0.0.1:8000/data.json'
let DATA = 'data.json'

async function fetchData() {
const response = await fetch(DATA);

// let gd = await response.text(); // also try .json()
let gd = await response.json();
render(gd);
}// fetchData()

function render(content){
  // Section 2
  let section2Content = content.section2
  const div2 = document.getElementById("section2");
  for (const element of section2Content){

    let newSubDiv = document.createElement('div');
    newSubDiv.classList.add('section2_flex_element');

    let subDivIm = document.createElement('img');
    subDivIm.src = 'imgs/' + element.image;
    subDivIm.classList.add('section2_image_style');

    let subDivHeading = document.createElement('p');
    subDivHeading.classList.add('heading')
    subDivHeading.innerText = element.heading;

    let subDivSpaceOne = document.createElement('br');
    let subDivSpaceTwo = document.createElement('br');
    let subDivSpaceThree = document.createElement('br');
    let subDivSpaceFour = document.createElement('br');

    let subDivText = document.createElement('p');
    subDivText.innerText = element.text;

    newSubDiv.appendChild(subDivSpaceOne);
    newSubDiv.appendChild(subDivIm);
    newSubDiv.appendChild(subDivSpaceTwo);
    newSubDiv.appendChild(subDivHeading);
    newSubDiv.appendChild(subDivSpaceThree);
    newSubDiv.appendChild(subDivText);
    newSubDiv.appendChild(subDivSpaceFour);

    div2.appendChild(newSubDiv);
  }
  // Section 3
  let section3Content = content.section3;
  const div3Text = document.getElementById("section3_text");

  let subDivSpaceOne = document.createElement('br');
  let subDivSpaceTwo = document.createElement('br');

  let divText = document.createElement('p');
  divText.innerText = section3Content.text;
  divText.classList.add('section3_text_style')
  divText.classList.add('default_text')

  div3Text.appendChild(subDivSpaceOne);
  div3Text.appendChild(subDivSpaceTwo);
  div3Text.appendChild(divText);

  const div3Im = document.getElementById("section3_im");

  let subDivIm = document.createElement('img');
  subDivIm.src = 'imgs/' + 'lasky.png';
  subDivIm.classList.add('section3_image_style');

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
    subDivOne.classList.add('flex_element_two_column');

    let subDivHeading = document.createElement('p');
    subDivHeading.classList.add('heading')
    subDivHeading.innerText = element.heading;

    let subDivSpace = document.createElement('br');

    let subDivText = document.createElement('p');
    subDivText.classList.add('default_text')
    subDivText.innerText = element.text;

    subDivOne.appendChild(subDivHeading)
    subDivOne.appendChild(subDivSpace)
    subDivOne.appendChild(subDivText)

    // Image
    let newSubDivTwo= document.createElement('div');
    newSubDivTwo.classList.add('flex_element');

    let subDivIm = document.createElement('img');
    subDivIm.src = 'imgs/' + element.image;
    subDivIm.classList.add('section4_image_style');

    newSubDivTwo.appendChild(subDivIm)

    // Merge
    if (idx == 0){
      // start with image and put the text to the left
      subDivOne.style.cssText = 'text-align:left;';
      newDiv.appendChild(newSubDivTwo);
      newDiv.appendChild(subDivOne);
      idx++
    } else {
      subDivOne.style.cssText = 'text-align: right;';
      newDiv.appendChild(subDivOne);
      newDiv.appendChild(newSubDivTwo);
    }

    div4.appendChild(newDiv)
  }
}

fetchData();
