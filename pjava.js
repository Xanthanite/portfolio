let header = document.querySelectorAll(".headText");

let introText = document.getElementById("typed");

let introSub = document.getElementById("subTyped")

let finalText = "Michael Martinez.";

let subEnd = "I'm a web developer from New York that has a passion for creativity and efficiency. I have a strong focus in front-end development and I really enjoy the visual aspect of things but I also know my way around back-end components."

let pages = ["pageOne", "pageTwo", "pageThree"]

let pageOn = document.getElementById("pageOn")

let sitePreview = document.getElementById("site");

var idleListener;

var currentIdle = ""

var lastIdle = ""

let nameLetters = 0

let x = {//Sets x to be a variable with a consistent listener on it.
    pageselectInternal: "Introduction",
    
    pageselectListener: function(str) {},
    
    set pageselect(str) {
            this.pageselectInternal = str;    
            this.pageselectListener(str);
    },

    get pageselect() {
        return this.pageselectInternal;
    },    

    registerListener: function(listener) {
        this.pageselectListener = listener;
    }
}

x.registerListener(function(str) {//Takes x and registers the listener to then run functions

    async function fader() {//this async function ensures that it will check the page that it's on before fading out.
        let promise = new Promise((resolve, reject) => {
            pageOn.classList.add("fadeOut");
            
            setTimeout (() => {
                pageOn.innerHTML = str;

                if (str == pageOn.innerHTML) {
                    resolve("Faded");
                }
            }, 1300);
        });

        let result = await promise;
        
        console.log(result);
        
        pageOn.classList.remove("fadeOut");
    }
    
    fader()
});

function fadeIn(item) {//A simple fade in function
    item.classList.add("fadeIn");
};

setTimeout(function() {//Fade in the introductory text
    fadeIn(header[0])
}, 100)

function typer() {//Typer for my name
    if (nameLetters < finalText.length) {
        introText.innerHTML += finalText.charAt(nameLetters);
        nameLetters++;
        setTimeout(typer, 100);
        
        if (nameLetters == finalText.length) {
            introSub.innerHTML += subEnd;
            fadeIn(header[2]);
        }
    } 
}

setTimeout(typer, 1200);//timeout on the typer (so that it works properly)

function colorChanger(page) {//Take the page name passed in to clear that page from the menu bar
    document.getElementById(page).style.color = "transparent";

    document.getElementById(page).classList.add("unselectable");

    pages.forEach(function(ea) {
        if (ea !== page) {
            document.getElementById(ea).style.color = ""
            document.getElementById(ea).classList.remove("unselectable")
        }
    })
}

window.addEventListener("scroll", function() {
    setTimeout(function() {
        var currentPage = "";
        var i = 0;

        if (window.scrollY < 347) { //if window.scrollY (Scroll position) is less than 347 (Desired page position) 
            i = window.scrollY;//then set scrollY to i to freeze it in i

            if (i < 347) {//then we double check that i < 347 (to make sure it wasn't scrolled past immediately after)
                currentPage = "Introduction"
                x.pageselect = currentPage;
                colorChanger("pageOne");
            }
        }
        
        if (window.scrollY > 347 && window.scrollY < 1241) {//if window.scrollY is greater than 347 but less than 1241
            i = window.scrollY//log the current scroll position in i then changes pageselect to the currentPage
            
            if (i < 1241) {
                currentPage = "Skills"
                x.pageselect = currentPage;
                colorChanger("pageTwo");
                console.log("yike");
            }
        }

        if (window.scrollY > 1241) {//and finally the last page
            i = window.scrollY

            if (i > 1241) {
                currentPage = "Projects";
                x.pageselect = currentPage
                colorChanger("pageThree");
            }
        }
    }, 500)
});

sitePreview.addEventListener("mousemove", function() {
    
    sitePreview.addEventListener("mouseout", function() {
        clearTimeout(idleListener);
        topOverlay.style.opacity = "0";
        bottomOverlay.style.opacity = "0";
    });

    if (topOverlay.style.opacity !== "1" && bottomOverlay.style.opacity !=="1"); {
        lastIdle = currentIdle;
        clearTimeout(idleListener);
        console.log("removed the overlay idle" + idleListener);
        topOverlay.style.opacity = "1";
        bottomOverlay.style.opacity = "1";
        topOverlay.classList.toggle("top-overlay");
        bottomOverlay.classList.toggle("bottom-overlay");
        
    };

    idleListener = setTimeout(function() {
        if(topOverlay.style.opacity !== "0" && bottomOverlay.style.opacity !=="0"){
            currentIdle = idleListener;
            // console.log("added the idle class");
            topOverlay.style.opacity = "0";
            bottomOverlay.style.opacity = "0";
            topOverlay.classList.toggle("top-overlay");
            bottomOverlay.classList.toggle("bottom-overlay");
        }
    }, 1500);
});

var infoStatus = "closed"

$(".moreInfo").click(function() {
    if (infoStatus == "closed") {
        $("#siteDesc1").slideDown();
        moreInfo1.style.transform = "rotate(180deg)";
        return(infoStatus = "open");
    };

    if (infoStatus == "open") {
        $("#siteDesc1").slideUp();
        moreInfo1.style.transform = "";
        return(infoStatus = "closed");
    }
})
