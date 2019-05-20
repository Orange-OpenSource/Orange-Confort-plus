const GA_PROPERTY = 'UA-XXXXX-Y'
const GA_COOKIE_NAMES = ['__utma', '__utmb', '__utmc', '__utmz', '_ga', '_gat'];

function startGoogleAnalytics() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  
    ga('create', 'UA-XXXXX-Y', 'auto');
    ga('send', 'pageview');
}

function reject() {
    // création du cookie spécifique empêchant Google Analytics de démarrer
    Cookies.set(`ga-disable-${GA_PROPERTY}`, true, { expires: 395 });
    // insertion de cette valeur dans l'objet window
    window[`ga-disable-${GA_PROPERTY}`] = true;
  
    // création du cookie précisant le choix utilisateur
    Cookies.set('hasConsent', false, { expires: 395 });
  
    // suppression de tous les cookies précédemment créés par Google Analytics
    GA_COOKIE_NAMES.forEach(cookieName => Cookies.remove(cookieName));
}
