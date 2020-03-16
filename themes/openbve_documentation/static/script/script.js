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
    var toggle = "responsive-hide";
    var sideBar = document.getElementById("sidebar");
    if (sideBar.className.indexOf(toggle) !== -1){
        var newClassName = "";
        var classes = sideBar.className.split(" ");
        for(var i = 0; i < classes.length; i++)
            if(classes[i] !== toggle) newClassName += classes[i] + " ";
        $("#sidebar").width("0px");
        sideBar.className = newClassName.trim();
        $("#sidebar").animate({width:"240px"}, "fast");
    } else {
        $("#sidebar").animate({width:"0px"}, "fast", function() {
            sideBar.className += " " + toggle;
            $("#sidebar").width("240px");
        });
    }
}

function toggleLanguageMenu() {
    $("#sidebar-language-menu").animate({height:"toggle"});
}

function adaptClientLanguage() {
    var language = (navigator.languages ? navigator.languages[0]
        : (navigator.language || navigator.userLanguage)).replace("-","_").toLowerCase();
    var currentLanguage = document.getElementsByName("langmeta-current")[0].content.toLowerCase();
    var baseURL = location.href.substr(0, location.href.indexOf(currentLanguage)).normalizeURL();
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
        if (chosenLanguage != "") location.href = location.href.replace(currentLanguage, chosenLanguage);
    }
}

adaptClientLanguage();

//In case jQuery failed to load, the language menu will be shown by default.
//Which makes the site even compatible with Netscape Navigator 9.
$(function(){
    $("#sidebar-language-menu").hide();
});