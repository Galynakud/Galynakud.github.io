import React, { useState, useEffect } from 'react';

function Resources() {
    const materialPrices = {
        brick: 500,
        wood: 300,
        steel: 100,
        sand: 200,
        glass: 150,
        slate: 120
    };

    const maxResources = {
        brick: 20000,
        wood: 10000,
        steel: 50000,
        sand: 15000,
        glass: 5000,
        slate: 8000
    };

    const buildingMaterials = {
        house: { brick: 66, wood: 6, steel: 3, sand: 17, glass: 6, slate: 40 },
        factory: { brick: 0, wood: 0, steel: 10, sand: 0, glass: 14, slate: 73 },
        hotel: { brick: 92, wood: 0, steel: 0, sand: 4, glass: 18, slate: 14 },
        school: { brick: 0, wood: 0, steel: 85, sand: 16, glass: 27, slate: 32 }
    };

    const [resources, setResources] = useState({ ...maxResources });
    const [budget, setBudget] = useState(10000000);
    const [buildingType, setBuildingType] = useState("house");
    const [feedback, setFeedback] = useState(null);



    useEffect(() => {
        Object.keys(resources).forEach(updateProgressBar);
    }, [resources]);

    useEffect(() => {
        updateBudgetProgress();
    }, [budget]);

    const updateProgressBar = (material) => {
        const percentage = (resources[material] / maxResources[material]) * 100;
        document.getElementById(`${material}-bar`).style.width = `${percentage}%`;
        document.getElementById(`${material}-bar`).textContent = `${percentage.toFixed(2)}%`;
        document.getElementById(material).textContent = resources[material];
    };

    const updateBudgetProgress = () => {
        const percentage = (budget / 10000000) * 100;
        document.getElementById("budget-bar").style.width = `${percentage}%`;
        document.getElementById("budget-bar").textContent = `${percentage.toFixed(2)}%`;
        document.getElementById("budget").textContent = budget.toLocaleString();
    };

    const calculateTotalCost = () => {
        const used = (id) => parseInt(document.getElementById(id).value) || 0;
        const total = used("brick-used") * materialPrices.brick +
                    used("wood-used") * materialPrices.wood +
                    used("steel-used") * materialPrices.steel +
                    used("sand-used") * materialPrices.sand +
                    used("glass-used") * materialPrices.glass +
                    used("slate-used") * materialPrices.slate;
        document.getElementById("cost").textContent = total.toLocaleString() + " $";
        return total;
    };

    const handleBuildingChange = (event) => {
        const type = event.target.value;
        setBuildingType(type);
        if (buildingMaterials[type]) {
            const mat = buildingMaterials[type];
            for (const key in mat) {
                document.getElementById(`${key}-used`).value = mat[key];
            }
            calculateTotalCost();
        }
    };

    const handlePayButtonClick = () => {
        const total = calculateTotalCost();
        if (total > budget) {
            alert("❌ Недостатньо коштів.");
            return;
        }

        const check = (key) => parseInt(document.getElementById(`${key}-used`).value) || 0;
        for (const key in resources) {
            if (check(key) > resources[key]) {
                alert("❌ Недостатньо ресурсу: " + key);
                return;
            }
        }

        document.getElementById("confirmation-modal").style.display = "flex";
    };

    const handleConfirmPayButtonClick = () => {
        const used = (key) => parseInt(document.getElementById(`${key}-used`).value) || 0;
        const totalCost = calculateTotalCost();
    
        setBudget(prevBudget => prevBudget - totalCost);
    
        setResources(prevResources => {
            const updated = { ...prevResources };
            for (const key in updated) {
                updated[key] -= used(key);
            }
            return updated;
        });
    
        alert("✅ Оплата проведена!");
        document.getElementById("confirmation-modal").style.display = "none";
        document.getElementById("feedback-section").style.display = "block";
    };
    
    
    const handleCancelPayButtonClick = () => {
        document.getElementById("confirmation-modal").style.display = "none";
    };

    const handleEmojiClick = (selectedFeedback) => {
        setFeedback(selectedFeedback);
      };

    const handleSubmitFeedback = () => {
        if (!feedback) {
            alert("Будь ласка, оберіть ваш відгук!");
            return;
        }

        console.log("Відгук на будівництво:", feedback); 
        document.getElementById("feedback-section").style.display = "none";
        document.getElementById("thank-you-modal").style.display = "flex";
        const comment = document.getElementById("feedback-comment").value;
        console.log("Коментар:", comment);
        

    };

    const handleCloseThankYouModal = () => {
        document.getElementById("thank-you-modal").style.display = "none"; 
    };

    return (
        <main>
            <section id="resources" className="info-section city-style">
                <div className="icon">💰</div>
                <div className="text-content">
                    <h2>Ресурси міста</h2>
                    <p>Ось поточний бюджет міста, наявні матеріали та їх об’єм.</p>
                </div>
            </section>

            <section className="resources-info">
                <h3>Поточні ресурси</h3>
                <div className="resources-list">
                    <div className="resource-item">
                        <h4>Бюджет міста:</h4>
                        <p>💲<span id="budget">{budget.toLocaleString()}</span></p>
                        <div className="progress-bar">
                            <div className="progress" id="budget-bar" style={{ width: "100%" }}>100%</div>
                        </div>
                    </div>
                    <div className="resource-item">
                        <h4>Матеріали:</h4>
                        <ul>
                            <li>🧱 Цегла: <span id="brick">{resources.brick}</span> м³</li>
                            <div className="progress-bar">
                                <div className="progress" id="brick-bar" style={{ width: "100%" }}>100%</div>
                            </div>
                            <li>🪵 Дерево: <span id="wood">{resources.wood}</span> м³</li>
                            <div className="progress-bar">
                                <div className="progress" id="wood-bar" style={{ width: "100%" }}>100%</div>
                            </div>
                            <li>🪨 Сталь: <span id="steel">{resources.steel}</span> м³</li>
                            <div className="progress-bar">
                                <div className="progress" id="steel-bar" style={{ width: "100%" }}>100%</div>
                            </div>
                            <li>🏖️ Пісок: <span id="sand">{resources.sand}</span> м³</li>
                            <div className="progress-bar">
                                <div className="progress" id="sand-bar" style={{ width: "100%" }}>100%</div>
                            </div>
                            <li>🪟 Скло: <span id="glass">{resources.glass}</span> м³</li>
                            <div className="progress-bar">
                                <div className="progress" id="glass-bar" style={{ width: "100%" }}>100%</div>
                            </div>
                            <li>🪶 Шифер: <span id="slate">{resources.slate}</span> м³</li>
                            <div className="progress-bar">
                                <div className="progress" id="slate-bar" style={{ width: "100%" }}>100%</div>
                            </div>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="building-selection">
                <h3>Оберіть тип будівлі</h3>
                <div className="select-wrapper">
                    <select id="building-type" onChange={handleBuildingChange}>
                        <option value="">-- Оберіть будівлю --</option>
                        <option value="house">Будинок</option>
                        <option value="factory">Фабрика</option>
                        <option value="hotel">Готель</option>
                        <option value="school">Школа</option>
                    </select>
                </div>
            

            <section className="resources-input">
                <h3>Використані матеріали</h3>
                <div className="resource-container">
                    <label htmlFor="brick-used">🧱 Цегла: </label>
                    <input type="number" id="brick-used" defaultValue="0" min="0" />
                    </div>
                    <div className="resource-container">
                    <label htmlFor="wood-used">🪵 Дерево: </label>
                    <input type="number" id="wood-used" defaultValue="0" min="0" />
                    </div>
                    <div className="resource-container">
                    <label htmlFor="steel-used">🪨 Сталь: </label>
                    <input type="number" id="steel-used" defaultValue="0" min="0" />
                    </div>
                    <div className="resource-container">
                    <label htmlFor="sand-used">🏖️ Пісок: </label>
                    <input type="number" id="sand-used" defaultValue="0" min="0" />
                    </div>
                    <div className="resource-container">
                    <label htmlFor="glass-used">🪟 Скло: </label>
                    <input type="number" id="glass-used" defaultValue="0" min="0" />
                    </div>
                    <div className="resource-container">
                    <label htmlFor="slate-used">🪶 Шифер: </label>
                    <input type="number" id="slate-used" defaultValue="0" min="0" />
                </div>
            </section>
            </section>

            <section className="construction-cost">
                <h3>Інформація про будівництво</h3>
                <p>🔨 <strong>Вартість будівництва:</strong> <span id="cost">0</span></p>
                <button className ="btn2"  onClick={handlePayButtonClick}>Оплатити будівництво</button>
            </section>

            <div id="confirmation-modal" className="modal">
                <div className="modal-content">
                <h2>Підтвердження оплати</h2>
                <p>Ви готові здійснити оплату за будівництво?</p>
                    <button onClick={handleConfirmPayButtonClick}>Так, оплатити</button>
                    <button onClick={handleCancelPayButtonClick}>Скасувати</button>
                </div>
            </div>

            <section id="feedback-section" style={{ display: 'none', textAlign: 'center', marginTop: '20px' }}>
                <h3>🗣️ Як ви оцінюєте це будівництво?</h3>
                <div id="emoji-feedback" style={{ fontSize: '2rem', marginBottom: '15px' }}>
                <span
          className={`emoji-option ${feedback === 'good' ? 'selected' : ''}`}
          onClick={() => handleEmojiClick('good')} > 😍 </span>
        <span
          className={`emoji-option ${feedback === 'ok' ? 'selected' : ''}`}
          onClick={() => handleEmojiClick('ok')} > 🙂 </span>
        <span
          className={`emoji-option ${feedback === 'bad' ? 'selected' : ''}`}
          onClick={() => handleEmojiClick('bad')} > 😡 </span>
      </div>
      <textarea
  id="feedback-comment"
  placeholder="Напишіть свій відгук тут..."
  style={{ width: '80%', padding: '10px', marginTop: '10px', fontSize: '1rem' }}></textarea>

      <button
        id="submit-feedback"
        style={{ padding: '10px 20px', fontSize: '1rem' }}
        onClick={handleSubmitFeedback}> Надіслати відгук </button>
</section>

<div id="thank-you-modal" className="modal" style={{ display: "none" }}>
                <div className="modal-content">
                    <h2>Дякуємо за ваш відгук!</h2>
                    <p>🎉 Вашу думку дуже цінуємо! Будь ласка, слідкуйте за оновленнями в нашому місті.</p>
                    <button id="close-thank-you-modal" onClick={handleCloseThankYouModal}>Закрити</button>
                </div>
            </div>


        </main>
    );
}

export default Resources;
