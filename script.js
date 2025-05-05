document.addEventListener("DOMContentLoaded", function () {
    const buildButton = document.getElementById("build-button");
    const grid = document.getElementById("grid");
    let selectedMaterial = null;

    // Вибір матеріалу
    document.querySelectorAll(".material-option").forEach(option => {
        option.addEventListener("click", function () {
            selectedMaterial = this.dataset.material;
            document.querySelectorAll(".material-option").forEach(el => el.classList.remove("selected"));
            this.classList.add("selected");
            buildButton.disabled = false; // Активуємо кнопку
        });
    });

    // Ціни матеріалів
    const materialPrices = {
        brick: 10, // $ за м³
        wood: 5,   // $ за м³
        steel: 20, // $ за м³
        sand: 2,   // $ за м³
        glass: 15, // $ за м³
        slate: 12  // $ за м³
    };

    // Створення сітки для будівництва
    function createGrid(rows = 16, cols = 29) {
        grid.innerHTML = "";
        grid.style.display = "grid";
        grid.style.gridTemplateColumns = `repeat(${cols}, 30px)`;
        grid.style.gridTemplateRows = `repeat(${rows}, 30px)`;
        grid.style.gap = "2px";

        for (let i = 0; i < rows * cols; i++) {
            let cell = document.createElement("div");
            cell.classList.add("grid-cell");
            cell.style.width = "30px";
            cell.style.height = "30px";
            cell.style.border = "1px solid #ccc";
            cell.style.background = "#f0f0f0";
            cell.style.cursor = "pointer";
            cell.addEventListener("click", () => placeMaterial(cell)); // Додано слухач для кліку
            grid.appendChild(cell);
        }
    }

    // Функція для розміщення матеріалів
    function placeMaterial(cell) {
        if (!selectedMaterial) {
            alert("❌ Оберіть матеріал перед розміщенням!");
            return;
        }
        cell.dataset.material = selectedMaterial;
        cell.style.background = getMaterialColor(selectedMaterial);
    }

    // Отримання кольору для кожного матеріалу
    function getMaterialColor(material) {
        const colors = {
            brick: "#b33c2f", wood: "#8d6e63", steel: "#9d9d9d",
            sand: "#f4a261", glass: "#64b5f6", slate: "#363636"
        };
        return colors[material] || "#ffffff";
    }

    // Запуск будівництва та перехід на сторінку ресурсів
    function startConstruction() {
        const materials = ["brick", "wood", "steel", "sand", "glass", "slate"];
        let resourceAmounts = {};

        // Підрахунок кількості кожного матеріалу в сітці
        materials.forEach(material => {
            resourceAmounts[material] = [...document.querySelectorAll(".grid-cell")]
                .filter(cell => cell.dataset.material === material).length;
        });

        // Якщо хоча б один матеріал вибраний, переходимо на ресурсну сторінку
        if (Object.values(resourceAmounts).some(amount => amount > 0)) {
            localStorage.setItem("resources", JSON.stringify(resourceAmounts));
            console.log("Перехід на сторінку resources.html...");
            window.location.href = "resources.html"; // Перехід на сторінку resources
        } else {
            alert("❌ Ви не вибрали матеріали для будівництва!");
        }
    }

    createGrid(); // Створюємо сітку
    buildButton.addEventListener("click", startConstruction); // Додаємо слухач подій для кнопки
});

function filterBuildings(category) {
    const tiles = document.querySelectorAll('.tile');
    
    tiles.forEach(tile => {
    const type = tile.dataset.type;
     if (category === 'all') {
      tile.classList.remove('hide');
      } else if (type === category || tile.classList.contains('road')) {
     tile.classList.remove('hide');
      } else {
     tile.classList.add('hide');
     }
    });
    }
