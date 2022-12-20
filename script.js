/* VARIABLES */
const formData = {
  name: "",
  email: "",
  phone: "",
  plan: 1,
  frequency: "",
  addOn: [0],
};

const headerContent = [
  {
    title: "Personal info",
    subtitle: "Please provide your name, email address and phone number",
  },
  {
    title: "Select your plan",
    subtitle: "You have the option of monthly or yearly billing",
  },
  {
    title: "Pick add-ons",
    subtitle: "Add-ons help enhance your gaming experience",
  },
  {
    title: "Finishing up",
    subtitle: "Double check everything looks OK before confirming",
  },
  {
    title: "",
    subtitle: "",
  },
];

const addOnContent = [
  {
    title: "Online service",
    desc: "Access to multiplayer games",
    price: 2,
  },
  {
    title: "Larger storage",
    desc: "Extra 1TB of cloud save",
    price: 3,
  },
  {
    title: "Customizable profile",
    desc: "Custom theme on your profile",
    price: 1,
  },
];

const planContent = [
  {
    type: "Arcade",
    icon: "./images/icon-arcade.svg",
    monthlyPrice: 9,
    yearlyPrice: 8,
  },
  {
    type: "Advanced",
    icon: "./images/icon-advanced.svg",
    monthlyPrice: 12,
    yearlyPrice: 10,
  },
  {
    type: "Pro",
    icon: "./images/icon-pro.svg",
    monthlyPrice: 15,
    yearlyPrice: 12,
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
const formItems = page1.querySelectorAll(".form-item");
const toggleSwitch = page2.querySelector("#toggle-switch");
const addOnItems = page3.querySelectorAll(".add-on-item");
const addOns = page3.querySelectorAll("#checkbox");
const subsCards = document.querySelectorAll(".subs-card");
const planSummary = document.querySelector(".plan-summary");
const addOnSummary = document.querySelector(".add-on-summary");
const totalAmtWrapper = document.querySelector(".total-amt-wrapper");
const tqTitle = document.querySelector(".tq-title");
const tqText = document.querySelector(".tq-text");

/* EVENT LISTENERS AND FUNCTIONS */

const changeSerialDesign = (idx) => {
  for (let i = 0; i < 4; i++) {
    if (i === idx) {
      serials[idx].classList.add("changeSerialDesign");
    } else {
      serials[i].classList.remove("changeSerialDesign");
    }
  }
};

const renderAddOnContent = () => {
  addOnItems.forEach((item, idx) => {
    const itemTitle = item.querySelector(".add-on-title");
    const itemDesc = item.querySelector(".add-on-desc");
    const itemPrice = item.querySelector(".add-on-price");
    itemTitle.textContent = addOnContent[idx].title;
    itemDesc.textContent = addOnContent[idx].desc;
    itemPrice.textContent = `+$${addOnContent[idx].price}/mo`;
  });
};

const renderPlanContent = () => {
  // console.log(subsCards)
  subsCards.forEach((card, i) => {
    const icon = card.querySelector(".subs-icon");
    const subsName = card.querySelector(".subs-name");
    const subsPrice = card.querySelector(".subs-price");

    icon.src = planContent[i].icon;
    subsName.textContent = planContent[i].type;

    if (toggleSwitch.checked) {
      subsPrice.textContent = `$${planContent[i].yearlyPrice}/mo`;
    } else {
      subsPrice.textContent = `$${planContent[i].monthlyPrice}/mo`;
    }
  });
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

  //Insert addOn Items dynamically on Summary page
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

  //Compute and display total amount
  let totalAmt = 0;
  if (formData.frequency === "Monthly") {
    totalAmt += planContent[formData.plan].monthlyPrice;
  } else {
    totalAmt += planContent[formData.plan].yearlyPrice;
  }
  formData.addOn.forEach((item) => {
    totalAmt += addOnContent[item].price;
  });
  const finalAmt = totalAmtWrapper.querySelector(".pg4-amt");
  finalAmt.textContent = `$${totalAmt}/mo`;
};

const nextPage = (idx) => {
  //check if form(page-1) is filled or not
  let isFormComplete = true;
  if (idx === 0) {
    formItems.forEach((item) => {
      const inputItem = item.querySelector(".formInputItem");
      if (!inputItem.value) {
        isFormComplete = false;
        return;
      }
      // console.log(inputItem.value)
    });
  }
  if (!isFormComplete) {
    window.alert("Please enter all details.");
    return;
  }
  activePage[idx] = 0;
  //hide nextBtn when at the last page
  if (idx === 3) {
    nextBtn.classList.toggle("hide");
  }
  activePage[idx + 1] = 1;
  const currPage = pages[idx];
  const nextPage = pages[idx + 1];
  currPage.classList.add("hide");
  nextPage.classList.remove("hide");
  backBtn.classList.remove("hide");
  changeSerialDesign(idx + 1);
  renderHeaderContent();
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
  renderHeaderContent();
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
  formData.addOn.length = 0; //reset addOn-array in formData
  for (let i = 0; i < addOns.length; i++) {
    if (addOns[i].checked) {
      formData.addOn.push(i);
    }
  }
  //save plan-type
  subsCards.forEach((item) => {
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
    if (activePage[i] === 1) {
      //save data in formData
      save();
      if (pressedBtn === "next-btn") {
        nextPage(i);
      } else {
        prevPage(i);
      }
      // render data on SUMMARY PAGE
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
  renderAddOnContent();
  renderPlanContent();
});

nextBtn.addEventListener("click", saveData);
backBtn.addEventListener("click", saveData);
toggleSwitch.addEventListener("click", renderPlanContent);
