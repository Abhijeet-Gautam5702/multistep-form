/*

const items = [
    {
        name: "Abhijeet gautam",
        email: "abhijeetgautam572@gmail.com",
        phone: "8299492217"
        plan: "arcade",
        frequency: "monthly"
        add-on: ["online service", "larger storage","custom profile"]
    }
]

*/

/* VARIABLES */

const activePage = [1, 0, 0, 0, 0];

const backBtn = document.querySelector(".back-btn");
const nextBtn = document.querySelector(".next-btn");
const serials = document.querySelectorAll(".serial");
const formSeqTextBoxes = document.querySelectorAll("form-sequence-text-box");
const pageHeader = document.querySelector(".page-header");
const pageSubHeader = document.querySelectorAll("page-subheader");
const pages = document.querySelectorAll(".center-section");
const page1 = document.querySelector(".form-section");
const page2 = document.querySelector(".plan-container");
const page3 = document.querySelector(".add-on-container");
const page4 = document.querySelector(".summary-container");
const page5 = document.querySelector(".confirmation-pg-container");
const subsCards = document.querySelectorAll(".subs-card");
const toggleBtn = document.querySelector(".switch");
const addOnItems = document.querySelectorAll(".add-on-item");
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

const nextPage = (idx) => {
  activePage[idx + 1] = 1;
  const currPage = pages[idx];
  const nextPage = pages[idx + 1];
  currPage.classList.add("hide");
  nextPage.classList.remove("hide");
  backBtn.classList.remove("hide");
  changeSerialDesign(idx + 1);
};

const prevPage = (idx) => {
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

const saveData = (e) => {
  const pressedBtn = e.currentTarget.className;
  for (let i = 0; i < activePage.length; i++) {
    if (activePage[i] == 1) {
      /*
        Write function to save data on current page
      */

      activePage[i] = 0;
      if (pressedBtn === "next-btn") {
        nextPage(i);
      } else {
        prevPage(i);
      }
      return;
    }
  }
};

window.addEventListener("DOMContentLoaded", () => {
  const serial1 = serials[0];
  serial1.classList.toggle("changeSerialDesign");
  backBtn.classList.add("hide");
});

nextBtn.addEventListener("click", saveData);
backBtn.addEventListener("click", saveData);

/* LOCAL STORAGE */
