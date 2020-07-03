let header = document.querySelectorAll(".headText");

let introText = document.getElementById("typed");

let introSub = document.getElementById("subTyped")

let finalText = "Michael Martinez.";

let subEnd = "I'm a web developer from New York that has a passion for creativity and efficiency. I have a strong focus in front-end development and I really enjoy the visual aspect of things but I also know my way around backend components."

var pages = ["pageOne", "pageTwo", "pageThree"]

let pageOn = document.getElementById("pageOn")

let x = {   
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

x.registerListener(function(str) {

    async function fader() {
        let promise = new Promise((resolve, reject) => {
            pageOn.classList.add("fadeOut");
            setTimeout (() => {
                pageOn.innerHTML = str;
                if (str == pageOn.innerHTML) {
                    resolve("Done");
                }
            }, 1300);
        });

        let result = await promise;
        
        console.log(result);
        
        pageOn.classList.remove("fadeOut");
    }
    
    fader()
});

function fadeIn(item) {
    item.classList.add("fadeIn");
};

setTimeout(function() {
    fadeIn(header[0])
}, 100)

let e = 0

function typer() {
    if (e < finalText.length) {
        introText.innerHTML += finalText.charAt(e);
        e++;
        setTimeout(typer, 100);
        if (e == finalText.length) {
            introSub.innerHTML += subEnd;
            fadeIn(header[2]);
        }
    } 
}

setTimeout(typer, 1200);

function colorChanger(page, num) {
    document.getElementById(page).style.color = "transparent";

    document.getElementById(page).classList.add("unselectable");

    pages.forEach(function(ea) {
        if (ea !== page) {
            document.getElementById(ea).style.color = "Maroon"
            document.getElementById(ea).classList.remove("unselectable")
        }
    })
}

window.addEventListener("scroll", function() {
    setTimeout(function() {
        var currentPage = "";
        var i = 0;

        if (window.scrollY < 347) { //if window.scrollY (Scroll position) is less than 347 (Desired page position) 
            i = window.scrollY;//then set scrollY to i to freeze it

            if (i < 347) {//then we double check that i < 347 (to make sure it wasn't scrolled past immediately after)
                currentPage = "Introduction"
                x.pageselect = currentPage;
                colorChanger("pageOne", 0);
            }
        }
        
        if (window.scrollY > 347 && window.scrollY < 1241) {
            i = window.scrollY
            
            if (i < 1241) {
                currentPage = "Skills"
                x.pageselect = currentPage;
                colorChanger("pageTwo", 1);
                console.log("yike");
            }
        }

        if (window.scrollY > 1241) {
            i = window.scrollY

            if (i > 1241) {
                currentPage = "Projects";
                x.pageselect = currentPage
                colorChanger("pageThree", 2);
            }
        }
    }, 500)
});