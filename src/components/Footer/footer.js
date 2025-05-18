import './footer.css';

const createFooter = () => {
  const footer = document.querySelector('footer');

  footer.innerHTML = `
<section class="footer-section flex-container">
  <div class="who-we-are flex-container">
    <h3>¿Quienes somos?</h3>
    <p>Somos un portal especializado en la gestión integral de eventos. Nuestro objetivo es conectar a personas, empresas y organizaciones con experiencias memorables, personalizadas y eficientes. Contamos con un equipo profesional y tecnología que facilita la planificación, organización y seguimiento de todo tipo de eventos, desde reuniones corporativas hasta celebraciones sociales.</p>
  </div>
  <div class="follow-social-media flex-container">
    <h3>Síguenos en redes!</h3>
    <div class="logo-container flex-container">
    <div class="flex-container">
      <a href="javascript:void(0)"><img src="/footerImg/facebook.svg" alt="facebook"></a>
      </div>
      <div class="flex-container">
      <a href="javascript:void(0)"><img src="/footerImg/instagram.svg" alt="instagram"></a>
      </div>
      <div class="flex-container">
      <a href="javascript:void(0)"><img src="/footerImg/linkedin.svg" alt="linkedin"></a>
      </div>
      <div class="flex-container">
      <a href="javascript:void(0)"><img src="/footerImg/whatsapp.svg" alt="whatsapp"></a>
      </div>
      <div class="flex-container">
      <a href="javascript:void(0)"><img src="/footerImg/x.svg" alt="x"></a>
      </div>
    </div>
  </div>

</section>
<section class="legality">
  <ul class="ul-legality flex-container">
    <li class="legal-advice"><a href="#">Aviso legal</a></li>
    <li class="privacy"><a href="#">Privacidad y Cookies</a></li>
  </ul>
<section>
`;
};

export default createFooter;
