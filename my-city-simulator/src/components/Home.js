import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <section id="about-city" className="info-section city-style">
        <div className="town">🏙️</div>
        <div className="text-content">
          <h2>Моє місто</h2>
          <p>"Моє місто" містить інтерактивну карту з будинками, дорогами, підприємствами та парками. Це головний розділ, де відображається поточний стан розвитку міста.</p>
        </div>
        </section>
        {/* City Grid */}
        <div className="city-grid">
          <div className="tile building residential" data-type="residential">🏡</div>
          <div className="tile road">🛣️</div>
          <div className="tile building residential" data-type="residential">🏘️</div>
          <div className="tile road">🛣️</div>
          <div className="tile building residential" data-type="residential">🏚️</div>
          <div className="tile road">🛤️</div>
          <div className="tile factory industrial" data-type="industrial">🏭</div>
          <div className="tile road">🛤️</div>
          <div className="tile factory industrial" data-type="industrial">🏗️</div>
          <div className="tile road">🛤️</div>
          <div className="tile factory industrial" data-type="industrial">🏬</div>
          <div className="tile road">🛣️</div>
          <div className="tile factory industrial" data-type="industrial">🏢</div>
          <div className="tile road">🛣️</div>
          <div className="tile building residential" data-type="residential">🏡</div>
          <div className="tile factory industrial" data-type="industrial">🏬</div>
          <div className="tile building residential" data-type="residential">🏘️</div>
          <div className="tile road">🛣️</div>
          <div className="tile building residential" data-type="residential">🏠</div>
          <div className="tile road">🛣️</div>
          <div className="tile building residential" data-type="residential">🏡</div>
          <div className="tile road">🛤️</div>
          <div className="tile building residential" data-type="residential">🏚️</div>
          <div className="tile road">🛣️</div>
        </div>

        {/* Filters */}
        <div className="filters">
          <button onClick={() => filterBuildings('all')}>Усі</button>
          <button onClick={() => filterBuildings('residential')}>Житлові</button>
          <button onClick={() => filterBuildings('commercial')}>Комерційні</button>
          <button onClick={() => filterBuildings('industrial')}>Промислові</button>
        </div>
      

      {/* Construction Info */}
      <section id="construction-info" className="info-section alt-style">
        <div className="icon">🏗️</div>
        <div className="text-content">
          <h2>Будівництво</h2>
          <p>Розширюйте місто, додавайте нові об'єкти та керуйте будівельними ресурсами!</p>
          <p>Керуйте плануванням, обирайте ділянки для забудови, контролюйте швидкість будівництва та розподіляйте завдання між робітниками. Оптимальне управління дозволить вам створити сучасне, комфортне та екологічне місто.</p>
          <Link to="/construction" className="btn">Почати будівництво</Link>
        </div>
      </section>

      {/* Resources Info */}
      <section id="resources-info" className="info-section alt-style">
        <div className="icon">💲</div>
        <div className="text-content">
          <h2>Ресурси міста</h2>
          <p>Контролюйте бюджет, ресурси та ефективно управляйте розвитком міста.</p>
          <p>Слідкуйте за рівнем доходів та витрат, використовуйте природні та промислові ресурси, приймайте стратегічні рішення щодо фінансування важливих міських проєктів. Ефективне управління гарантує стабільне зростання вашого міста!</p>
          <Link to="/resources" className="btn">Переглянути ресурси</Link>
        </div>
      </section>
    </>
  );
}

// Filter Functionality
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

export default Home;
