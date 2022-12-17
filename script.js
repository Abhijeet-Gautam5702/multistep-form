/* VARIABLES */
const formData = {
  name: "",
  email: "",
  phone: "",
  plan: 1,
  frequency: "",
  addOn: [],
};

const headerContent = [
  {
    title: "Personal info",
    subtitle: "Please provide your name, email and phone number",
  },
  {
    title: "Page 2",
    subtitle: "Please provide your name, email and phone number",
  },
  {
    title: "Personal info",
    subtitle: "Please provide your name, email and phone number",
  },
  {
    title: "Personal info",
    subtitle: "Please provide your name, email and phone number",
  },
];

const activePage = [1, 0, 0, 0, 0];

const backBtn = document.querySelector(".back-btn");
const nextBtn = document.querySelector(".next-btn");
const serials = document.querySelectorAll(".serial");
const formSeqTextBoxes = document.querySelectorAll("form-sequence-text-box");
const pageHeader = document.querySelector(".page-header");
const pageSubHeader = document.querySelector(".page-subheader");
const pages = document.querySelectorAll(".center-section");
const page1 = document.querySelector(".form-section");
const page2 = document.querySelector(".plan-container");
const page3 = document.querySelector(".add-on-container");
const page4 = document.querySelector(".summary-container");
const page5 = document.querySelector(".confirmation-pg-container");
const toggleSwitch = page2.querySelector("#toggle-switch");
const addOnItems = page3.querySelectorAll(".add-on-item");
const addOns = page3.querySelectorAll("#checkbox");
const subsCards = document.querySelectorAll(".subs-card");
const planSummary = document.querySelector(".plan-summary");
const addOnSummary = document.querySelector(".add-on-summary");
const totalAmtWrapper = document.querySelector(".total-amt-wrapper");

/* EVENT LISTENERS AND FUNCTIONS*/

const changeSerialDesign = (idx) => {
  for (let i = 0; i < 4; i++) {
    if (i === idx) {
      serials[idx].classList.add("changeSerialDesign");
    } else {
      serials[i].classList.remove("changeSerialDesign");
    }
  }
};

const renderHeaderContent = () => {
  for (let i = 0; i < activePage.length; i++) {
    if (activePage[i] === 1) {
      pageHeader.textContent = headerContent[i].title;
      pageSubHeader.textContent = headerContent[i].subtitle;
    }
  }
};

const renderSummary = () => {
  const planType = page4.querySelector(".pg4-plan-type");
  const planDuration = page4.querySelector(".pg4-plan-duration");
  const planAmt = planSummary.querySelector(".pg4-amt");
  const subsCard = subsCards[formData.plan];

  planType.textContent = subsCard.querySelector(".subs-name").textContent;
  planDuration.textContent = `[ ${formData.frequency} ]`;
  planAmt.textContent = subsCard.querySelector(".subs-price").textContent;

  /* Insert addOn Items dynamically on Summary page */
  let x = "";
  for (let i = 0; i < formData.addOn.length; i++) {
    const j = formData.addOn[i];
    const item = addOnItems[j];

    const itemTitle = item.querySelector(".add-on-title").textContent;
    const itemPrice = item.querySelector(".add-on-price").textContent;

    x += `
      <div class="add-on-item-wrapper">
        <p class="pg4-add-on-name">${itemTitle}</p>
        <p class="pg4-amt">${itemPrice}</p>
      </div>
    `;
  }
  addOnSummary.innerHTML = x;
};

const nextPage = (idx) => {
  activePage[idx] = 0;
  //hide nextBtn when at the last page
  if (idx == 3) {
    nextBtn.classList.toggle("hide");
  }
  activePage[idx + 1] = 1;
  const currPage = pages[idx];
  const nextPage = pages[idx + 1];
  currPage.classList.add("hide");
  nextPage.classList.remove("hide");
  backBtn.classList.remove("hide");
  changeSerialDesign(idx + 1);
};

const prevPage = (idx) => {
  activePage[idx] = 0;
  //unhide nextBtn when at the second last page
  if (idx == 4) {
    nextBtn.classList.toggle("hide");
  }
  activePage[idx - 1] = 1;
  const currPage = pages[idx];
  const prevPage = pages[idx - 1];
  currPage.classList.add("hide");
  prevPage.classList.remove("hide");
  if (idx - 1 == 0) {
    backBtn.classList.add("hide");
  }
  changeSerialDesign(idx - 1);
};

//Save data in formData
const save = () => {
  formData.name = page1.querySelector("#username").value;
  formData.email = page1.querySelector("#email").value;
  formData.phone = page1.querySelector("#phone").value;
  //save data for toggle switch
  if (toggleSwitch.checked) {
    formData.frequency = "Yearly";
  } else {
    formData.frequency = "Monthly";
  }
  //save add-ons
  for (let i = 0; i < addOns.length; i++) {
    if (addOns[i].checked && !formData.addOn.includes(i)) {
      formData.addOn.push(i);
    }
  }
  //save plan-type
  subsCards.forEach((item) => {
    // item.classList.remove("changeCardDesign")
    item.addEventListener("click", () => {
      formData.plan = Number(item.getAttribute("subsID"));
      //highlight clicked card and unhighlight other cards
      item.classList.add("changeCardDesign");
      subsCards.forEach((card) => {
        if (card != item) {
          card.classList.remove("changeCardDesign");
        }
      });
    });
  });
};

const saveData = (e) => {
  const pressedBtn = e.currentTarget.className;
  for (let i = 0; i < activePage.length; i++) {
    if (activePage[i] == 1) {
      save();
      renderHeaderContent();

      if (pressedBtn === "next-btn") {
        nextPage(i);
      } else {
        prevPage(i);
      }
      /* render data on SUMMARY PAGE */
      renderSummary();
      return;
    }
  }
};

window.addEventListener("DOMContentLoaded", () => {
  const serial1 = serials[0];
  serial1.classList.toggle("changeSerialDesign");
  backBtn.classList.add("hide");
  renderHeaderContent();
});

nextBtn.addEventListener("click", saveData);
backBtn.addEventListener("click", saveData);
