document.addEventListener("DOMContentLoaded", function() {

  /**
   * Form Select
   */
  class FormSelect {
    constructor($el) {
      this.$el = $el;
      this.options = [...$el.children];
      this.init();
    }

    init() {
      this.createElements();
      this.addEvents();
      this.$el.parentElement.removeChild(this.$el);
    }

    createElements() {
      // Input for value
      this.valueInput = document.createElement("input");
      this.valueInput.type = "text";
      this.valueInput.name = this.$el.name;

      // Dropdown container
      this.dropdown = document.createElement("div");
      this.dropdown.classList.add("dropdown");

      // List container
      this.ul = document.createElement("ul");

      // All list options
      this.options.forEach((el, i) => {
        const li = document.createElement("li");
        li.dataset.value = el.value;
        li.innerText = el.innerText;

        if (i === 0) {
          // First clickable option
          this.current = document.createElement("div");
          this.current.innerText = el.innerText;
          this.dropdown.appendChild(this.current);
          this.valueInput.value = el.value;
          li.classList.add("selected");
        }

        this.ul.appendChild(li);
      });

      this.dropdown.appendChild(this.ul);
      this.dropdown.appendChild(this.valueInput);
      this.$el.parentElement.appendChild(this.dropdown);
    }

    addEvents() {
      this.dropdown.addEventListener("click", e => {
        const target = e.target;
        this.dropdown.classList.toggle("selecting");

        // Save new value only when clicked on li
        if (target.tagName === "LI") {
          this.valueInput.value = target.dataset.value;
          this.current.innerText = target.innerText;
        }
      });
    }
  }
  document.querySelectorAll(".form-group--dropdown select").forEach(el => {
    new FormSelect(el);
  });

  /**
   * Hide elements when clicked on document
   */
  document.addEventListener("click", function(e) {
    const target = e.target;
    const tagName = target.tagName;

    if (target.classList.contains("dropdown")) return false;

    if (tagName === "LI" && target.parentElement.parentElement.classList.contains("dropdown")) {
      return false;
    }

    if (tagName === "DIV" && target.parentElement.classList.contains("dropdown")) {
      return false;
    }

    document.querySelectorAll(".form-group--dropdown .dropdown").forEach(el => {
      el.classList.remove("selecting");
    });
  });

  /**
   * Switching between form steps
   */
  class FormSteps {
    constructor(form) {
      this.$form = form;
      this.$next = form.querySelectorAll(".next-step");
      this.$prev = form.querySelectorAll(".prev-step");
      this.$step = form.querySelector(".form--steps-counter span");
      this.currentStep = 1;

      this.$stepInstructions = form.querySelectorAll(".form--steps-instructions p");
      const $stepForms = form.querySelectorAll("form > div");
      this.slides = [...this.$stepInstructions, ...$stepForms];

      this.init();
    }

    /**
     * Init all methods
     */
    init() {
      this.events();
      this.updateForm();
    }

    /**
     * All events that are happening in form
     */
    events() {
      // Next step
      this.$next.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();
          this.currentStep++;
          this.updateForm();
        });
      });

      // Previous step
      this.$prev.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();
          this.currentStep--;
          this.updateForm();
        });
      });

      // Form submit
      this.$form.querySelector("form").addEventListener("submit", e => this.submit(e));
    }

    /**
     * Update form front-end
     * Show next or previous section etc.
     */
    updateForm() {
      this.$step.innerText = this.currentStep;

      // TODO: Validation

      this.slides.forEach(slide => {
        slide.classList.remove("active");

        if (slide.dataset.step == this.currentStep) {
          slide.classList.add("active");
        }
      });

      this.$stepInstructions[0].parentElement.parentElement.hidden = this.currentStep >= 5;
      this.$step.parentElement.hidden = this.currentStep >= 5;

      // TODO: get data from inputs and show them in summary
      if(this.currentStep >= 5) { //tu dopisać bool by poniższy kod wykonał się tylko jeden raz

        //Tworzymy strukture
        let divFormSection = document.createElement('div');
        divFormSection.classList.add("form-section");

        let h4 = document.createElement('h4');
        h4.innerText = "Oddajesz: ";

        //Tworzymy listę
        let ul = document.createElement('ul');

        //Przygotowujemy informacje o tym co użytkownik oddaje
        //Tworzymy pierwszy element listy
        let firstLi = document.createElement('li');

        let spanIconBag = document.createElement('span');
        spanIconBag.classList.add("icon");
        spanIconBag.classList.add("icon-bag");

        let firstSpanSummary = document.createElement('span');
        firstSpanSummary.classList.add("summary--text");

        let bagQuantity = this.$form.querySelector("#quantity").value;
        let items = "";

        this.$form.querySelectorAll("input[type=\"checkbox\"]:checked").forEach( el => {
          let newVar = el.parentElement.querySelector(".description").textContent;
          items += newVar + " ";
        })

        firstSpanSummary.innerText = "Oddajesz " + bagQuantity.toString();

        if(bagQuantity === 1)
          firstSpanSummary.innerText += " worek: ";
        else
          firstSpanSummary.innerText += " worki: ";

        firstSpanSummary.innerText += items;

        //Przygotowane powyżej dane dopisujemy do pierwszego elementu listy
        firstLi.append(spanIconBag);
        firstLi.append(firstSpanSummary);

        //Dodajemy pierwsze LI do listy a h4 do div
        ul.append(firstLi);
        divFormSection.append(h4);


        //Przygotowujemy teraz informację o instytucji
        //Tworzymy drugie Li
        let secondLi = document.createElement('li');

        let spanIconHand = document.createElement('span');
        spanIconHand.classList.add("icon");
        spanIconHand.classList.add("icon-hand");

        let secondSpanSummary = document.createElement('span');
        secondSpanSummary.classList.add("summary--text");

        let fundationChecked = this.$form.querySelector("input[type=\"radio\"]:checked")
            .parentElement
            .querySelector(".description")
            .querySelector(".title")
            .textContent;

        secondSpanSummary.innerText = "Dla " + fundationChecked;

        //Przygotowane powyżej dane dopisujemy do drugiego elementu listy
        secondLi.append(spanIconHand);
        secondLi.append(secondSpanSummary);

        //Dodajemy drugie Li
        ul.append(secondLi);
        //Gotową już listę ul dopisujemy do div
        divFormSection.append(ul);
        //Przygotowany div dodajemy do rodzica .summary
        document.querySelector(".summary").append(divFormSection);

        //Przygotowujemy strukturę dla adresu odbioru i terminu odbioru
        let firstDiv = document.createElement('div');
        firstDiv.classList.add("form-section");
        firstDiv.classList.add("form-section--columns");

        let secondDiv = document.createElement('div');
        secondDiv.classList.add("form-section--column");

        let secondH4 = document.createElement('h4');
        secondH4.innerText = "Adres odbioru: ";

        //Tworzymy listę
        let secondUl = document.createElement('ul');

        //Przygotowujemy adres odbioru
        let streetLi = document.createElement('li');
        streetLi.innerText = this.$form.querySelector("#street").value;
        let cityLi = document.createElement('li');
        cityLi.innerText = this.$form.querySelector("#city").value;
        let zipCodeLi = document.createElement('li');
        zipCodeLi.innerText = this.$form.querySelector("#zipCode").value;

        //Dopisujemy powyższe dane do listy ul
        secondUl.append(streetLi);
        secondUl.append(cityLi);
        secondUl.append(zipCodeLi);

        //Dodajemy nagłówek h4
        secondDiv.append(secondH4);

        //Przygotowaną listę ul dopisujemy do div
        secondDiv.append(secondUl);
        firstDiv.append(secondDiv);

        //Przygotowujemy termin odbioru
        let thirdDiv = document.createElement('div');
        thirdDiv.classList.add("form-section--column");

        let thirdH4 = document.createElement('h4');
        thirdH4.innerText = "Termin odbioru:";

        //Tworzymy listę
        let thirdUl = document.createElement('ul');

        //Przygotowujemy dane do odbioru
        let pickUpDateLi = document.createElement('li');
        pickUpDateLi.innerText = this.$form.querySelector("#pickUpDate").value;
        let pickUpTimeLi = document.createElement('li');
        pickUpTimeLi.innerText = this.$form.querySelector("#pickUpTime").value;
        let pickUpCommentLi = document.createElement('li');
        pickUpCommentLi.innerText = this.$form.querySelector("#pickUpComment").value;

        //Dopisujemy powyższe dane do listy ul
        thirdUl.append(pickUpDateLi);
        thirdUl.append(pickUpTimeLi);
        thirdUl.append(pickUpCommentLi);

        //Dodajemy nagłówek h4
        thirdDiv.append(thirdH4);

        //Przygotowaną listę ul dopisujemy do div
        thirdDiv.append(thirdUl);
        firstDiv.append(thirdDiv);

        //Przygotowane div firstDiv dodajemy do rodzica .summary
        document.querySelector(".summary").append(firstDiv);

      }
    }
  }
  const form = document.querySelector(".form--steps");
  if (form !== null) {
    new FormSteps(form);
  }
});
