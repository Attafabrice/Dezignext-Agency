(function(){
  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  navToggle.addEventListener('click', function(){
    siteNav.classList.toggle('open');
  });

  // Set copyright year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const hash = this.getAttribute('href');
      if(hash.length>1){
        e.preventDefault();
        const el = document.querySelector(hash);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
        if(siteNav.classList.contains('open')) siteNav.classList.remove('open');
      }
    })
  });

  // WhatsApp Business integration
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  
  // Numéro WhatsApp destinataire (format international)
  const whatsappNumber = "225769479901"; // Ton numéro cible (fixe)

  form.addEventListener('submit', function(e){
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const company = document.getElementById('company').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();
    
    // Validation
    if(!name || !email || !phone || !service || !message){
      status.textContent = 'Veuillez remplir tous les champs requis.';
      status.style.color = '#e74c3c';
      return;
    }
    
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if(!emailOk){ 
      status.textContent = 'Adresse e-mail invalide.'; 
      status.style.color = '#e74c3c';
      return; 
    }
    
    status.textContent = 'Préparation de votre message...';
    status.style.color = '#0077b6';
    
    // Conversion du numéro saisi vers format international (Côte d'Ivoire : 225)
    let cleanedNumber = phone.replace(/\s/g, ''); // enlève espaces
    if (cleanedNumber.startsWith("0")) {
      cleanedNumber = "225" + cleanedNumber.substring(1); 
    } else if (!cleanedNumber.startsWith("225")) {
      cleanedNumber = "225" + cleanedNumber; 
    }

    // Préparer le message pour WhatsApp
    const whatsappMessage = `
Nouveau contact depuis le site Dezignext:

*Nom:* ${name}
*Email:* ${email}
*Téléphone (fourni):* ${phone}
${company ? `*Entreprise:* ${company}\n` : ''}
*Service demandé:* ${getServiceName(service)}
*Message:*
${message}

Merci de me recontacter pour discuter de ce projet.
    `.trim();
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Lien WhatsApp avec conversion du numéro
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      status.textContent = 'Redirection vers WhatsApp... Vous pouvez maintenant envoyer le message.';
      status.style.color = '#27ae60';
      form.reset();
    }, 1500);
  });
  
  // Helper function to get service name
  function getServiceName(serviceKey) {
    const services = {
      'web': 'Développement Web',
      'mobile': 'Application Mobile',
      'design': 'Design Graphique',
      'autre': 'Autre service'
    };
    return services[serviceKey] || serviceKey;
  }

  // Load and display portfolio images
  function loadPortfolioImages() {
    const imageContainers = document.querySelectorAll('.portfolio-image');
    
    imageContainers.forEach(container => {
      const imageName = container.getAttribute('data-image');
      const img = document.createElement('img');
      img.src = imageName;
      img.alt = "Projet portfolio";
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.borderRadius = '10px';
      
      container.innerHTML = '';
      container.appendChild(img);
      
      img.onerror = function() {
        container.innerHTML = 'Image non disponible';
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';
        container.style.backgroundColor = '#ececec';
        container.style.color = '#999';
      };
    });
  }

  if (document.querySelector('.portfolio-image')) {
    document.addEventListener('DOMContentLoaded', loadPortfolioImages);
  }
})();
