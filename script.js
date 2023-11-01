const aiApi = () => {
  fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then((res) => res.json())
    .then((data) => loadAi(data.data.tools));
};

let show = false;

const loadAi = (ArreyofAi) => {
  spinnerBodyStatus(false);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const cardNumber = show ? ArreyofAi : ArreyofAi.slice(0, 6);
  for (ai of cardNumber) {
    const div = document.createElement("div");
    div.classList.add(
      "col-span-1",
      "p-6",
      "flex",
      "flex-col",
      "gap-6",
      "border",
      "rounded-xl"
    );
    div.innerHTML = `
        <div class=" flex flex-col gap-6">
                    <img class="object-fill w-full rounded-lg" src="${ai.image}" alt=''>
                    <div class="flex flex-col gap-2">
                        <h1 class="font-bold text-2xl">Features</h1>
                        <ul class="text-[#585858] list-decimal list-inside text-base">
                            <li>${ai.features[0]}</li>
                            <li>${ai.features[1]}</li>
                            <li>${ai.features[2]}</li>
                        </ul>
                    </div>
                </div>
                <hr>
                <!-- card bottom section  -->
                <div class="flex justify-between align-middle items-center">
                    <div class="flex flex-col gap-2">
                        <h1 class="text-black font-bold text-2xl"> ${ai.name}</h1>
                        <span> ${ai.published_in} </span>
                    </div>
                    <label onclick="cardDetails('${ai.id}')" for="tw-modal" class="cursor-pointer">

            <span class="flex justify-center items-center bg-[#FEF7F7] rounded-full w-10 h-10 text-[#EB5757] font-bold text-2xl">→</span>
          </label>
                </div>
        
        `;
    cardContainer.appendChild(div);
  }
  spinnerBodyStatus(true);
};

const cardDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then((res) => res.json())
    .then((data) => modalInput(data.data));
  spinnerStatus(false);
};

const modalInput = (data) => {
  document.getElementById("modal-title").innerText = data.description;
  document.getElementById("modal-img").src = data.image_link[0];
  document.getElementById("modal-pricing-1").innerText = data.pricing[0].price;
  document.getElementById("modal-pricing-name-1").innerText =
    data.pricing[0].plan;
  document.getElementById("modal-pricing-2").innerText = data.pricing[1].price;
  document.getElementById("modal-pricing-name-2").innerText =
    data.pricing[1].plan;
  document.getElementById("modal-pricing-3").innerText = data.pricing[2].price;
  document.getElementById("modal-pricing-name-3").innerText =
    data.pricing[2].plan;
  const featuresList = document.getElementById("features-list");
  featuresList.innerHTML = "";
  for (useCases of data.use_cases) {
    const li = document.createElement("li");
    li.innerText = useCases.name;
    featuresList.appendChild(li);
  }
  const IntregationList = document.getElementById("intregation-list");
  IntregationList.innerHTML = "";
  for (Intregation of data.integrations) {
    const li = document.createElement("li");
    console.log(Intregation);
    li.innerText = Intregation;
    IntregationList.appendChild(li);
  }

  const randomNumber = Math.round(Math.random());

  if (randomNumber === 0) {
    document.getElementById("input-example").innerText =
      data.input_output_examples[1].input;
    document.getElementById("output-example").innerText =
      data.input_output_examples[1].output;
    }
  else {
    document.getElementById("input-example").innerText =
    data.input_output_examples[0].input;
  document.getElementById("output-example").innerText =
    data.input_output_examples[0].output;
    }

  spinnerStatus(true);
};

aiApi();

function closeModal() {
  const checkbox = document.getElementById("tw-modal");
  checkbox.checked = false;
}
const spinner = document.getElementById("spinner");
const spinnerBody = document.getElementById("spinner-body");

const spinnerStatus = (show) => {
  if (show) {
    spinner.classList.add("hidden");
  } else {
    spinner.classList.remove("hidden");
  }
};
const spinnerBodyStatus = (show) => {
  if (show) {
    spinnerBody.classList.add("hidden");
  } else {
    spinnerBody.classList.remove("hidden");
  }
};

const toggleShowAll = () => {
  show = !show;

  aiApi();
};
