const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
  const data = await res.json()
  const phones = data.data
  // console.log(phones);
  displayPhones(phones, isShowAll)
  if (phones.length === 0) {
    alert("No matching phones found.");
  } else {
    displayPhones(phones, isShowAll);
  }
}


const displayPhones = (phones, isShowAll) => {
  // console.log(phones);
  const phoneContainer = document.getElementById('phone-container')

  phoneContainer.textContent = ''
  /* display show all button if there are more than 12 phones */
  const showaAll = document.getElementById('show-all-container')
  if (phones.length > 12 && !isShowAll) {
    showaAll.classList.remove('hidden')
  }
  else {
    showaAll.classList.add('hidden')
  }

  // console.log('show all:', isShowAll);

  // display only first 12 phones
  if (!isShowAll) {
    phones = phones.slice(0, 12)

  }
  phones.forEach(phone => {
    // console.log(phone);
    /* 2 creat a div */
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card p-4  shadow-xl`
    /* 3 set inner html */
    phoneCard.innerHTML = `
    <figure class="bg-[#F3F8FF] p-[32px] " ><img src="${phone.image}" alt="Shoes" /></figure>
         <div class="card-body">
            <h2 class="card-title flex justify-center ">${phone.phone_name}</h2>
            <h2 class="card-title flex justify-center">$999</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions flex justify-center">
              <button onclick=" handelShowDetails('${phone.slug}')" class="btn btn-primary ">Show Details</button>
            </div>
          </div
    `
    // onclick = "handelShowDetails('${phone.slug}')"
    /* 4 append child */
    phoneContainer.appendChild(phoneCard)


  });

  toggolLoadingSpiner(false)
}
// show details
const handelShowDetails = async (id) => {
  // console.log(id);
  // load data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json()
  const phone = data.data
  showPhonedetails(phone)
}

const showPhonedetails = (phone) => {
  console.log(phone);


  const showDetailContainer = document.getElementById('show-detail-container')
  showDetailContainer.innerHTML = `
  <figure class="bg-[#F3F8FF] flex justify-center p-[24px] "><img src="${phone.image}" alt="">
   <div class = "py-10"></figure>
    <h2 class = "text-2xl font-semibold" >${phone.name}</h2>
    <p><span class ="font-bold mt-[14px] ">Storage: </span>${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information '}</p>
    <p class ="mt-[13px] mb-[8px]"><span class ="font-bold mt-[13px] mb-[8px]">Display Size: </span> ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'No Storage Information '}</p>
    <p  class ="mt-[13px] mb-[8px]"> <span class ="font-bold ">Chipset: </span>  ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'No Chipset Information '}</p>
    <p class ="mt-[13px] mb-[8px]"><span class ="font-bold ">memory: </span>  ${phone.mainFeatures ? phone.mainFeatures.memory : 'No memory Information '}</p>
    <p class ="mt-[13px] mb-[8px]"><span class ="font-bold ">sensors:  </span>  ${phone.mainFeatures ? phone.mainFeatures.sensors : 'No sensors Information '}</p>
    <p  class ="mt-[13px] mb-[8px]"><span class ="font-bold">releaseDate: </span> ${phone.releaseDate}</p>
    <p class ="mt-[13px] mb-[8px]"><span class ="font-bold">brand:</span> ${phone.brand}</p>
    <p class=" mt-[13px] mb-[8px]"><span class ="font-bold ">slug:</span> ${phone.slug}</p>
    <p class ="mt-[13px] mb-[8px]"><span class ="font-bold">GPS::</span> ${phone.others ? phone.others.GPS : 'No sensors Information '}</p>
   </div>

   `
  // show modal
  my_modal_1.showModal()
}

// handler search button
const handlerSearch = (isShowAll) => {
  const searchField = document.getElementById('search-Field')
  toggolLoadingSpiner(true)
  const searchText = searchField.value
  console.log(searchText);
  loadPhone(searchText, isShowAll)
}


/* loder */

const toggolLoadingSpiner = (isloading) => {
  const ladingSpniner = document.getElementById('loadingSpiner')
  if (isloading) {
    ladingSpniner.classList.remove('hidden')
  }
  else {
    ladingSpniner.classList.add('hidden')
  }

}
// show all
const handelShowall = () => {
  handlerSearch(true)
}

// JavaScript for opening and closing the Sign In modal

// Function to open the Sign In modal
const openSignInModal = () => {
  const signinModal = document.getElementById('signin_modal');
  signinModal.showModal();
};

// Function to close the Sign In modal
const closeSignInModal = () => {
  const signinModal = document.getElementById('signin_modal');
  signinModal.close();
};

// Event listener to open the Sign In modal when the "Sign Up" button is clicked
const signUpButton = document.querySelector('#signup_button');
signUpButton.addEventListener('click', openSignInModal);

// Event listener to close the Sign In modal when the close button is clicked
const closeSignInButton = document.querySelector('#close_signin_modal');
closeSignInButton.addEventListener('click', closeSignInModal);


// loadPhone()
