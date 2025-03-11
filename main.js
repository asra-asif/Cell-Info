// toogle 
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggleDarkMode");
  const modeIcon = document.getElementById("modeIcon");

  // Local Storage se check karein pehle kaunsa mode set hai
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark") {
      document.body.classList.add("dark-mode");
      modeIcon.classList.replace("fa-sun", "fa-moon");
  }

  // Button click par toggle karega
  toggleButton.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");

      if (document.body.classList.contains("dark-mode")) {
          modeIcon.classList.replace("fa-sun", "fa-moon"); // Sun to Moon
          localStorage.setItem("theme", "dark");
      } else {
          modeIcon.classList.replace("fa-moon", "fa-sun"); // Moon to Sun
          localStorage.setItem("theme", "light");
      }
  });
});

// comparision 
let mobiles = {
    "Samsung S23": { image: "imgs/samsung s23.jpg", processor: "Snapdragon 8 Gen 2", ram: "8GB", battery: "3900mAh", camera: "50MP" },
    "iPhone 14": { image: "imgs/iphone 14.jpg", processor: "A15 Bionic", ram: "6GB", battery: "3279mAh", camera: "48MP" },
    "OnePlus 11": { image: "imgs/oneplus 1.jpg", processor: "Snapdragon 8 Gen 2", ram: "12GB", battery: "5000mAh", camera: "50MP" },
    "Google Pixel 7": { image: "imgs/google pixel 7.jpg", processor: "Google Tensor G2", ram: "8GB", battery: "4355mAh", camera: "50MP" },
    "Xiaomi 13 Pro": { image: "imgs/xiaomi13pro.jpg", processor: "Snapdragon 8 Gen 2", ram: "12GB", battery: "4820mAh", camera: "50MP" },
    "Sony Xperia 1 IV": { image: "imgs/sonyxperia1iv.jpg", processor: "Snapdragon 8 Gen 1", ram: "12GB", battery: "5000mAh", camera: "12MP" },
    "Asus ROG Phone 6": { image: "imgs/asusrogphone 6.jpg", processor: "Snapdragon 8+ Gen 1", ram: "16GB", battery: "6000mAh", camera: "50MP" },
    "Realme GT 3": { image: "imgs/realme gt 3.jpg", processor: "Snapdragon 8+ Gen 1", ram: "16GB", battery: "4600mAh", camera: "50MP" },
    "Motorola Edge 30 Ultra": { image: "imgs/motorolaedge 30ultra.jpg", processor: "Snapdragon 8+ Gen 1", ram: "12GB", battery: "4610mAh", camera: "200MP" },
    "Vivo X90 Pro": { image: "imgs/vivo x90pro.jpg", processor: "Dimensity 9200", ram: "12GB", battery: "4870mAh", camera: "50MP" },
    "Oppo Find X5 Pro": { image: "imgs/oppofind x5pro.jpg", processor: "Snapdragon 8 Gen 1", ram: "12GB", battery: "5000mAh", camera: "50MP" },
    "Honor Magic 5 Pro": { image: "imgs/honor magic5pro.jpg", processor: "Snapdragon 8 Gen 2", ram: "12GB", battery: "5100mAh", camera: "50MP" },
    "Nothing Phone 2": { image: "imgs/nothing phone 2.jfif", processor: "Snapdragon 8+ Gen 1", ram: "12GB", battery: "4700mAh", camera: "50MP" },
    "Samsung Galaxy Z Fold 5": { image: "imgs/samsungzfold5.jfif", processor: "Snapdragon 8 Gen 2", ram: "12GB", battery: "4400mAh", camera: "50MP" },
    "Redmi K60 Pro": { image: "imgs/redmik60pro.jfif", processor: "Snapdragon 8 Gen 2", ram: "16GB", battery: "5000mAh", camera: "54MP" },
    "iQOO 11": { image: "imgs/iqoo11.jfif", processor: "Snapdragon 8 Gen 2", ram: "16GB", battery: "5000mAh", camera: "50MP" }
};

$(document).ready(function () {
    let gridContainer = $(".mobiles-grid");
    let comparisonContainer = $(".comparison-container");
    let comparisonTable = $(".comparison-table");
    let selectedMobiles = [];

    // Populate mobile cards
    $.each(mobiles, function (key, specs) {
        let mobileCard = `<div class="col">
                            <div class="mobile-card" data-name="${key}">
                                <img src="${specs.image}" alt="${key}">
                                <h5>${key}</h5>
                            </div>
                        </div>`;
        gridContainer.append(mobileCard);
    });

    // Add mobile to comparison
    $(document).on("click", ".mobile-card", function () {
        let name = $(this).attr("data-name");
        if (!selectedMobiles.includes(name) && selectedMobiles.length < 5) {
            selectedMobiles.push(name);
            let specs = mobiles[name];
            let compareCard = `<div class='col-md-4'>
                                <div class='mobile-card p-3'>
                                    <img src='${specs.image}' alt='${name}'>
                                    <h5>${name}</h5>
                                    <p>Processor: ${specs.processor}</p>
                                    <p>RAM: ${specs.ram}</p>
                                    <p>Battery: ${specs.battery}</p>
                                    <p>Camera: ${specs.camera}</p>
                                    <button class='btn btn-danger remove-btn' data-name='${name}'>Remove</button>
                                </div>
                            </div>`;
            comparisonContainer.append(compareCard);
            updateComparisonTable();
        }
    });

    // Remove mobile from comparison
    $(document).on("click", ".remove-btn", function () {
        let name = $(this).attr("data-name");
        selectedMobiles = selectedMobiles.filter(mobile => mobile !== name);
        $(this).closest(".col-md-4").remove();
        updateComparisonTable();
    });

    // Update comparison table
    function updateComparisonTable() {
        let tableHead = "<tr><th>Feature</th>";
        let tableBody = "";

        selectedMobiles.forEach(mobile => {
            tableHead += `<th>${mobile}</th>`;
        });
        tableHead += "</tr>";

        let features = ["Processor", "RAM", "Battery", "Camera"];
        features.forEach(feature => {
            tableBody += `<tr><td>${feature}</td>`;
            selectedMobiles.forEach(mobile => {
                tableBody += `<td>${mobiles[mobile][feature.toLowerCase()]}</td>`;
            });
            tableBody += "</tr>";
        });

        comparisonTable.html(`<thead>${tableHead}</thead><tbody>${tableBody}</tbody>`);
    }
});


// animation
document.addEventListener("DOMContentLoaded", function () {
    let elements = document.querySelectorAll("section, div, img, p, h1, h2, h3, h4, h5, h6");
  
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("scroll-visible");
          observer.unobserve(entry.target); 
        }
      });
    }, { threshold: 0.2 }); 
  
    elements.forEach(el => {
      el.classList.add("scroll-hidden");
      observer.observe(el);
    });
  });
    

// contact 
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    document.getElementById("nameError").innerText = "";
    document.getElementById("phoneError").innerText = "";
    document.getElementById("emailError").innerText = "";
    
    var nameInput = document.getElementById("nameInput");
    var phoneInput = document.getElementById("phoneInput");
    var emailInput = document.getElementById("emailInput");
    var emailContainer = document.getElementById("emailContainer");
    var submitButton = document.getElementById("submitButton");
    var thankYouMessage = document.getElementById("thankYouMessage");

    var namePattern = /^[A-Za-z\s]+$/;
    var phonePattern = /^[0-9]{10,15}$/;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    var valid = true;

    if (!namePattern.test(nameInput.value.trim())) {
      document.getElementById("nameError").innerText = "Please enter a valid name (letters and spaces only).";
      valid = false;
    }
    if (!phonePattern.test(phoneInput.value.trim())) {
      document.getElementById("phoneError").innerText = "Please enter a valid phone number (10 to 15 digits).";
      valid = false;
    }
    if (!emailPattern.test(emailInput.value.trim())) {
      document.getElementById("emailError").innerText = "Please enter a valid email address.";
      valid = false;
    }

    if (!valid) {
      return;
    }

    submitButton.style.display = "none";
    thankYouMessage.classList.remove("hidden");
    setTimeout(() => {
      thankYouMessage.style.opacity = "1";
    }, 100);
  });


//   tooogle 
