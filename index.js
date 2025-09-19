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
  
  // Numéro de téléphone WhatsApp Business (à modifier avec votre numéro)
  const whatsappNumber = "0769479901"; // Exemple avec le numéro fourni
  
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
      status.textContent = 'Adresse e‑mail invalide.'; 
      status.style.color = '#e74c3c';
      return; 
    }
    
    const phoneOk = /^[+\d][\d\s\-\(\)]{8,}$/.test(phone.replace(/\s/g, ''));
    if(!phoneOk){ 
      status.textContent = 'Numéro de téléphone invalide.'; 
      status.style.color = '#e74c3c';
      return; 
    }
    
    status.textContent = 'Préparation de votre message...';
    status.style.color = '#0077b6';
    
    // Préparer le message pour WhatsApp
    const whatsappMessage = `
Nouveau contact depuis le site Dezignext:

*Nom:* ${name}
*Email:* ${email}
*Téléphone:* ${phone}
${company ? `*Entreprise:* ${company}\n` : ''}
*Service demandé:* ${getServiceName(service)}
*Message:*
${message}

Merci de me recontacter pour discuter de ce projet.
    `.trim();
    
    // Encoder le message pour URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Créer le lien WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Ouvrir WhatsApp dans une nouvelle fenêtre
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
      
      // Créer un élément image
      const img = document.createElement('img');
      img.src = imageName;
      img.alt = "Projet portfolio";
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.borderRadius = '10px';
      
      // Remplacer le texte par l'image
      container.innerHTML = '';
      container.appendChild(img);
      
      // Gestion des erreurs de chargement d'image
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

  // Charger les images lorsque la page est prête
  if (document.querySelector('.portfolio-image')) {
    document.addEventListener('DOMContentLoaded', loadPortfolioImages);
  }
})();