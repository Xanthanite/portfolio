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

let moreInfoButtons = document.querySelectorAll(".moreInfo");

let siteSelectItem = document.querySelectorAll(".siteSelectItem");

let siteIMG = document.querySelectorAll(".siteIMG")

let imageGroup0 = document.querySelectorAll(".imgGroup0");

let imageGroup1 = document.querySelectorAll(".imgGroup1");

let x = {//Sets x to be a variable with a consistent listener on it. It expects the variable it's listening on to be a string
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

x.registerListener(function(str) {//Registers a listener function which runs when the listener we previously set is triggered

    async function fader() {//this async function ensures that it will check the page that it's on before fading out.
        let promise = new Promise((resolve, reject) => {
            pageOn.classList.add("fadeOut");
            
            setTimeout (() => {
                pageOn.innerHTML = str;

                if (str == pageOn.innerHTML) {
                    resolve();
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

setTimeout(typer, 1200);//timeout on the typer from outside the function (so that it works properly)

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
                // console.log("page2selected");
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
        // console.log("removed the overlay idle" + idleListener);
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

// var infoStatus = "closed"

// $(".moreInfo").click(function() {
//     if (infoStatus == "closed") {
//         $("#siteDesc1").slideDown();
//         moreInfo1.style.transform = "rotate(180deg)";
//         return(infoStatus = "open");
//     };

//     if (infoStatus == "open") {
//         $("#siteDesc1").slideUp();
//         moreInfo1.style.transform = "";
//         return(infoStatus = "closed");
//     }
// })


let siteList = [//a list of sites as the objects so we can maintain a flow of what's open and what's not
    {name:"selectItem0", listNumber: "0", status:"closed", active: true, group: "imgGroup0", description:"siteDesc0", button:"moreInfo0", siteName:"Infinite Sushiyomi"},
    {name:"selectItem1", listNumber: "1", status:"closed", active: false, group: "imgGroup1", description:"siteDesc1", button:"moreInfo1", siteName:"U-Magine Interior Design"},
    {name:"selectItem2", listNumber: "2", status:"closed", active: false, group: "imgGroup2", description:"siteDesc2", button:"moreInfo2", siteName:"Third Project"}
]

function siteImageSelect(siteGroupName) {//checks the currently selected sitegroup and sets image on carousel based off the group
    siteIMG.forEach(function(imgOfSite) {

        if(imgOfSite.classList.contains(siteGroupName) == true) {
            console.log("selected" + imgOfSite.classList)
            imgOfSite.style.display = "block"
        } else if (imgOfSite.classList.contains(siteGroupName) !== true) {
            imgOfSite.style.display = "none";
        }
    })
}

// function siteDescSelect(descGroupName) {//checks the currently selected site description and slides the correct one down
//     let descNum = descGroupName.charAt("8");
//     // let descName = descGroupName 
//     // console.log("style" + $("#" + descGroupName))
//     // console.log("num" + descNum);
//     // console.log("name" + descGroupName)

//     if (siteList[descNum].status == "closed") {
//         $("#" + descGroupName).slideDown();
//         // console.log("." + descName);
//         $("#moreInfo" + descNum).css("transform", "rotate(180deg)")
//         // descGroupName.style.transform = "rotate(180deg)";
//         // console.log("opened the" + item);
//         // console.log(whichDesc.target.id + "from inside the if statement");
//         return(siteList[descNum].status = "open");
//     }
        
//     if (siteList[descNum].status == "open") {
//         $("#" + descGroupName).slideUp();
//         $("#moreInfo" + descNum).css("transform", "")
//         return(siteList[descNum].status = "closed");
//     }
// }

function openCloseHandler(descGroupName) {
    let descNum = descGroupName.charAt("8");;
    return new Promise(resolve => {
        
        setTimeout(() => {
            // console.log("test async");
            
            if (siteList[descNum].status == "closed") {
                $("#" + descGroupName).slideDown();
                // console.log("." + descName);
                $("#moreInfo" + descNum).css("transform", "rotate(180deg)")
                // descGroupName.style.transform = "rotate(180deg)";
                // console.log("opened the" + item);
                // console.log(whichDesc.target.id + "from inside the if statement");
                siteList[descNum].status = "open";
            }
                
            else if (siteList[descNum].status == "open") {
                $("#" + descGroupName).slideUp();
                $("#moreInfo" + descNum).css("transform", "")
                siteList[descNum].status = "closed";
            }

            resolve()
        }, 10)
    })
}

async function siteDescSelect(whichDesc){
    let a = await openCloseHandler(whichDesc)
    siteList.forEach(function(site) {
        
        if (site.active !== true && site.status == "open") {
            // console.log(site.name)
            $("#" + site.description).slideUp()
            site.status = "closed";
            $("#" + site.button).css("transform", "")
            // console.log("finished the resolve");
        }
    })
}

// moreInfoButtons.forEach(function(arrowButton) {
//     arrowButton.addEventListener("click", function(whichDesc) {
//         let descNum = whichDesc.target.id.charAt("8")
//         let descName = "siteDesc" + descNum
//         // console.log(whichDesc.target.id + "from inside event listener");

//             if (siteList[descNum].status == "closed") {
//                 $("#" + descName).slideDown();
//                 console.log("." + descName);
//                 whichDesc.target.style.transform = "rotate(180deg)";
//                 // console.log("opened the" + item);
//                 // console.log(whichDesc.target.id + "from inside the if statement");
//                 return(siteList[descNum].status = "open");
//             }

//             if (siteList[descNum].status == "open") {
//                 $("#" + descName).slideUp();
//                 whichDesc.target.style.transform = "";
//                 return(siteList[descNum].status = "closed");
//             }
//     });
// });

var pageGroup = "0";

function setPageName(pageID) {
    setTimeout(function(){
        var alt = $('.active').find('img')[pageID]
        var poop = alt.attributes.alt.textContent
        console.log(poop)
        $("#bottomOverlayText").html(alt.attributes.alt.textContent)
      }, 500)
}

$('.carousel').on('slide.bs.carousel', function () { 
    setTimeout(function(){
      setPageName(pageGroup);
    }, 100);
});

siteSelectItem.forEach(function(theSite) {
    $("#topOverlayText").html(siteList[0].siteName);
    $(".carousel").on("slid.bs.carousel", function() {
        setTimeout(function(){
            var alt = $('.active').find('img')[0]
            $("#bottomOverlayText").html(alt.attributes.textContent)
          }, 100)
    })

    theSite.addEventListener("click", function(whichSite){
        let siteNum = whichSite.target.parentNode.id.charAt("10");
        let imgName = "imgGroup" + siteNum;
        let descName = "siteDesc" + siteNum;
        $(".carousel").carousel(0);
        siteDescSelect(descName);
        // console.log("Site num is" + siteNum)

        siteList.forEach(function(siteObject){
            
            if (siteObject.group == imgName) {
                // console.log("selected good " + imgName + "vs" + siteObject.group)
                siteObject.active = true;
                pageGroup = siteObject.listNumber
                $("#topOverlayText").html(siteObject.siteName)
                $("#bottomOverlayText").html()

                // $("#bottomOverlayText").html($(imgName.));
                siteImageSelect(siteObject.group);

                // siteIMG.forEach(function(currIMG) {
                //     console.log("loopy selected" + currIMG.classList);
                //     if (currIMG.classList.contains(currentSiteGroup) == true) {

                //         // console.log("the classes of current selected image are: " + currIMG.classList);
                //         // console.log("The current image aka " + currIMG.classList + "contained: " + siteObject.group + "so we changed op to 1 for it")
                //         currIMG.style.display = "block";
                //     };
                // })
            }
                
            else if (siteObject.group !== imgName) {
                // console.log("unselected good " + siteObject.group + "vs" + imgName)
                // console.log("CURRENT SITE GROUP IS" + currentSiteGroup)

                siteObject.active = false;

                // siteIMG.forEach(function(currIMG) {
                //     console.log("loopy unselected" + currIMG.classList);
                //     if (currIMG.classList.contains(currentSiteGroup) !== true) {
                //         console.log("post loop unselected" + currIMG.classList)
                //         // console.log("The current image aka " + currIMG.classList + "didn't contain: " + siteObject.group + "so we changed op to 0 for it")
                //         currIMG.style.display = "none";
                //     }
                // })
            }
            
        })
        // siteList.forEach(function(site) {
        //     if (site.active !== true && site.status == "open") {
        //         console.log(site.name)
        //         $("#" + site.description).slideUp()
        //         $("#" + site.button).css("transform", "")
        //     }
        // })
        setPageName(pageGroup)
    })
})


