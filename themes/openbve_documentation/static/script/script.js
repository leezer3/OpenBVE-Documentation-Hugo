//Junk Code By zbx1425. https://zbx1425.tk

String.prototype.trimSlash = function(){
    if (this.charAt(this.length-1)=='/'||this.charAt(this.length-1)=='\\')
        return this.substr(0, this.length-1);
    else 
        return this;
}

String.prototype.normalizeURL = function(){
    return this.toLowerCase().trimSlash().replace("index.html","").replace("index.htm","");
}

function toggleMenu() {
    var sideBar = document.getElementById("sidebar");
    sideBar.classList.toggle("responsive-hide");
}

function toggleLanguageMenu() {
    var menu = document.getElementById("sidebar-language-menu");
    if (menu.style.display === "none") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
}

function adaptClientLanguage() {
    var language = (navigator.languages ? navigator.languages[0]
        : (navigator.language || navigator.userLanguage)).replace("-","_").toLowerCase();
    
    var langMeta = document.getElementsByName("langmeta-current")[0];
    if (!langMeta) return;
    var currentLanguage = langMeta.content.toLowerCase();
    
    var iconLink = document.querySelector('link[rel=icon]');
    if (!iconLink) return;
    var baseURL = iconLink.href;
    baseURL = baseURL.substring(0, Math.max(baseURL.lastIndexOf("/"), baseURL.lastIndexOf("\\"))).normalizeURL();
    
    var referrer = document.referrer.normalizeURL();
    if (!referrer) {
        try {
            if (window.opener) referrer = window.opener.location.href.normalizeURL();
        } catch (e) {}
    }
    
    if (!referrer || referrer.indexOf(baseURL)<0 || referrer==baseURL) {
        if (currentLanguage == language) return;
        var thisparts = language.split("_");
        var allLangTags = document.getElementsByName("langmeta-translation");
        var chosenLanguage = "";
        for (var i = 0; i < allLangTags.length; i++){
            var that = allLangTags[i].content.toLowerCase();
            var thatparts = that.split("_");
            if (language == that){
                chosenLanguage = that; break;
            } else if (thatparts[0] == thisparts[0]) {
                chosenLanguage = that;
            }
        }
        if (chosenLanguage != ""){
            location.href = baseURL + 
                location.href.replace(baseURL, "")
                .replace(currentLanguage, chosenLanguage);
        }
    }
}

// Run language adaptation
adaptClientLanguage();

// Hide language menu by default on load
document.addEventListener("DOMContentLoaded", function() {
    var langMenu = document.getElementById("sidebar-language-menu");
    if (langMenu) langMenu.style.display = "none";
});