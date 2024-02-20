import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [displayText, setDisplayText] = useState('');
  const [showImage, setShowImage] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  //Navbar
  const handleWhatWeDoClick = () => {
    setIsTransitioning(false); // Reiniciar la transición
    setTimeout(() => setIsTransitioning(true), 100); // Activar la transición después de un pequeño retraso
    setDisplayText('There is a lot of people in this planet that are lonelly or overwellmed and need to talk to someone, some of them just dont dare, other cant afford it. We create an alternative solution implementing technology and a volunteer program...');
    setShowImage(false);
  };

  const handleHowWeDoItClick = () => {
    setIsTransitioning(false); // Reiniciar la transición
    setTimeout(() => setIsTransitioning(true), 100); // Activar la transición después de un pequeño retraso
    setDisplayText('Througout a volunteer program...');
    setShowImage(false);
  };

  const handleDonateClick = () => {
    setIsTransitioning(false); // Reiniciar la transición
    setTimeout(() => setIsTransitioning(true), 100); // Activar la transición después de un pequeño retraso
    setDisplayText('ETH: 0xc502975b49398f9754AFC4E9693Cf0e1594f3275');
    setShowImage(true);
  };
  const [showVideoCall, setShowVideoCall] = useState(false);
  //SnowFlakes
  useEffect(() => {
    // Generar copos de nieve cuando se monta el componente
    generateSnowflakes();
  }, []);

  const generateSnowflakes = () => {
    // Generar copos de nieve
    const section = document.querySelector('.main-section');
    const snowflakesCount = 50;

    for (let i = 0; i < snowflakesCount; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.style.left = `${Math.random() * 100}vw`; // Posición horizontal aleatoria
      snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`; // Duración de la animación aleatoria
      snowflake.style.width = `${Math.random() * 3}px`; // Tamaño aleatorio
      snowflake.style.height = `${Math.random() * 3}px`; // Tamaño aleatorio
      section.appendChild(snowflake);
    }
  };
  const [currentSection, setCurrentSection] = useState('main');
  //Section 1
  const handleStartVideoCall = () => {
    // Crear una instancia de JitsiMeetExternalAPI con la URL del servidor de Jitsi
    const domain = 'meet.jit.si';
    const options = {
      roomName: 'TuNombreDeSala',
      width: 800,
      height: 600,
      parentNode: document.querySelector('#jitsi-container'),
      userInfo: {
        displayName: 'Usuario Invitado' // Nombre del usuario en la videollamada
      }
    };

    // Inicializar la videollamada
    const api = new window.JitsiMeetExternalAPI(domain, options);
    // Mostrar el contenedor del recuadro de la llamada
    setShowVideoCall(true);

  };
  const handleBecomeVolunteerClick = () => {
    setCurrentSection('volunteerForm');
  };

  const handleBackToMainClick = () => {
    setCurrentSection('main');
  };

  return (
    <div className="App">
      <nav>
        <ul>
          <li onClick={handleWhatWeDoClick}>What we do</li>
          <li onClick={handleHowWeDoItClick}>How we do it</li>
          <li onClick={handleDonateClick}>Donate</li>
        </ul>
        <div className="logo-container">
          <p>Powered by Decentraland</p>
          <img src="https://cryptologos.cc/logos/decentraland-mana-logo.png" alt="Ejemplo de imagen" className="logo-img" />
        </div>
      </nav>

      {currentSection === 'main' && (
        <section className="main-section">
          <div className={`text-container ${isTransitioning ? 'active' : ''}`}>
            <p>{displayText}</p>
            {showImage && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Codigo_QR.svg/1200px-Codigo_QR.svg.png" alt="Descripción de la imagen" style={{ width: '70px', height: '70px' }} />}
          </div>
          <header className="App-header">
            <h1>Welcome to OpenTalk</h1> { }
            <img src={logo} className="App-logo" alt="logo" />
            <div className="button-container">
              <button className="big-button" onClick={handleStartVideoCall}>Talk to someone</button>
              <button className="big-button pink-button" onClick={handleBecomeVolunteerClick}>Become a Volunteer</button>
            </div>
          </header>
          <div className={showVideoCall ? 'show-video-call' : 'hide-video-call'} id="jitsi-container"></div>
        </section>
      )}

      {currentSection === 'volunteerForm' && (
        <section className="volunteer-form-section">
          
          <form>
            {/* Campo Full Name */}
            <label htmlFor="fullName">Full Name:</label>
            <input type="text" id="fullName" name="fullName" />

            {/* Campo E-mail */}
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" name="email" />

            {/* Campo Phone Contact Number */}
            <label htmlFor="phone">Phone Contact Number:</label>
            <input type="tel" id="phone" name="phone" />

            {/* Campo Why you want to join */}
            <label htmlFor="reason">Why you want to join?</label>
            <textarea id="reason" name="reason" rows="4" />

            {/* Botón de envío */}
            <button className="big-button">Submit</button>
            <button className="big-button" onClick={handleBackToMainClick}>Back to Main</button>
          </form>
        </section>
      )}
    </div>
  );
}

export default App;
