let key = "f619d131289b6dd785232d776e4aa974"
let id = "e66d737b"
let what = "Front End"
let where = "gb"
let perPage = 50
let jobString = ""
let which = 1
let page = 1
//start animation
function start() {
    document.querySelector(".hero h1").style.animation = "forwards startAnimation 2s linear"
}
function end() {
    document.querySelector(".navbar").style.display = "flex"
    document.querySelector(".navbar").style.animation = "appear 2s "
}
setTimeout(end, 2500)
start()

async function locationIP1(){
    const respone  = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_0JkaqkqkiPvQjoT1owk3cgGlTB7km`)
    const data = await respone.json()
    console.log("data-1 :", {data})
    const avalibleCountryCode = ["gb", "at", "au", "br", "ca", "de", "fr", "in", "it", "nl", "nz", "pl", "ru", "sg", "us", "za"]
    avalibleCountryCode.forEach(e => {
        if (e.includes(data?.location.country.toLowerCase())) {
            where = e
        }
    })
   

}
locationIP1()
// async function locationIP2(){

//     const respone  = await fetch(`http://api.positionstack.com/v1/reverse 
//     ?access_key=e04d73a9d07474ca70dcc0c96394caf1&query=40.7638435,-73.9729691`)
//     const data = await respone.json()
    
//     console.log("data-2 :", {data})
   

// }
// locationIP2()
// ip api 
// async function ipApi() {

//     const respone = await fetch('http://www.geoplugin.net/json.gp')
//     const data = await respone.json()

//     const avalibleCountryCode = ["gb", "at", "au", "br", "ca", "de", "fr", "in", "it", "nl", "nz", "pl", "ru", "sg", "us", "za"]
//     avalibleCountryCode.forEach(e => {
//         if (e.includes(data?.geoplugin_countryCode.toLowerCase())) {
//             where = e
//         }
//     })


// }

// ipApi()

function basicSearch() {
    what = document.querySelector(".navbar input").value
    apiData()
}
document.querySelector(".navbar input").addEventListener("change", basicSearch)
// next page and previus page  event function
function next() {
    page++
    apiData()
}
function prev() {
    if (page > 1) {
        page--
        apiData()
    }

}
let savedJobs = []
let isInBookmark = false
function jobSaver(event) {
    if (event.currentTarget.textContent === "Save") {
        savedJobs.unshift(event.currentTarget.parentElement)
        isInBookmark = false
        event.currentTarget.textContent = "Saved"
    }
    else {
        jobRemover(event)

    }
    

    // jobRemover(event)
    bookmarkPageBtn()
}
function jobRemover(event) {
    if (isInBookmark) {
        event.currentTarget.parentElement.remove()

        localStorage.setItem("jobArray", document.querySelector(".jobs").innerHTML)
        //here

    } else {
        let removeTarget = savedJobs.indexOf(event.currentTarget.parentElement)
        event.currentTarget.textContent = "Save"
        savedJobs.splice(removeTarget, removeTarget + 1)
    }

}
function showBookmark() {
    localStorage.setItem("jobArray", savedJobs.map(each => each.outerHTML).join("") + localStorage.getItem("jobArray"))
    savedJobs  =[]
    document.querySelector(".jobs").innerHTML = localStorage.getItem("jobArray") == 'null' ? "" : localStorage.getItem("jobArray")
    document.querySelectorAll(".jobs .btn-save").forEach(e => e.textContent = "remove")
    isInBookmark = true


}

function bookmarkPageBtn() {
    console.log(localStorage.getItem("jobArray")== 'null')
    if (savedJobs.length|| (localStorage.getItem("jobArray")&& !(localStorage.getItem("jobArray")== 'null'))) {
        document.querySelector(".to-up-2").innerHTML = `
        <button onclick="showBookmark()">show bookmark</button>
        
        `
    } else if ( localStorage.getItem("jobArray")== 'null'){
        document.querySelector(".to-up-2").innerHTML = `
        
        `
    }
    
    else {
        document.querySelector(".to-up-2").innerHTML = `
        
        `
    }

}
bookmarkPageBtn()
// map api
function findGeo(lat=51.5,long=-0.09){
    console.log(lat,long)
    document.getElementById('mapfather').innerHTML = "<div id='map'></div>"
    var map = L.map('map').setView([lat, long], 13)
    var marker = L.marker([lat, long]).addTo(map)
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiYWxpcmV6YWhla21hdGkiLCJhIjoiY2wwbm96ZzVqMWdtczNjdW92NXZlemRiOCJ9.xKDc2NCLT3wyMfYSFYb9xA'
        }).addTo(map);
        console.log(map)
}


// job api 
async function apiData() {
    
    document.querySelector(".searchUx").classList.add("inSearch")
    const respone = await fetch(`https://api.adzuna.com/v1/api/jobs/${where}/search/${page}?app_id=${id}&app_key=${key}&what=${what}&results_per_page=${perPage}`)
    const data = await respone.json()
    console.log(data)

    jobString = data.results.map(each => {
        
        
        return `
        <div class="job">
            <h2>${each.title}</h2>
            <h4>company :${each.company.display_name}</h4>
            <h4>created at :${each.created}</h4>
            <p>contract_time:${each.contract_time ?? "not mentioned"}</p>
            <p>contract_type :${each.contract_type ?? "not mentioned"}</p>
            <p>description:${each.description} at :  ${each.location.area[0]}</p>
            <button onclick= "jobSaver(event)" class="btn-save">Save</button>
            <button onclick="findGeo(${each.latitude} ,${each.longitude})">Show in map</button>
            <a href="${each.redirect_url}"  target="_blank">click here for appy</a>
            
        </div>
        `
    }).join("")

    document.querySelector(".pages").innerHTML = `
    <button class="prev" onclick="prev()">previus</button>
    <span>${page}</span>
    <button class="next" onclick="next()">next</button>

    `
    document.querySelector(".jobs").innerHTML = jobString
    document.getElementById(`contactChoice${which}`).checked = true

    document.querySelector(".jobs").scrollIntoView();
    document.querySelector(".searchUx").classList.remove("inSearch")
}
document.querySelectorAll("input[name='contact']").forEach(each => {
})
function clicker(e) {
    if (e.target.classList[0]?.includes("UnitedKingdomofGreatBritain")) {
        where = "gb"
        which = 1
    }
    if (e.target.classList[0]?.includes("Singapore")) {
        where = "sg"
        which = 2
    }
    if (e.target.classList[0]?.includes("SouthAfrica")) {
        where = "za"
        which = 3
    }
    if (e.target.classList[0]?.includes("Russian")) {
        where = "ru"
        which = 4
    }
    if (e.target.classList[0]?.includes("Poland")) {
        where = "pl"
        which = 5
    }
    if (e.target.classList[0]?.includes("NewZealand")) {
        where = "nz"
        which = 6
    }
    if (e.target.classList[0]?.includes("Netherlands")) {
        where = "nl"
        which = 7
    }
    if (e.target.classList[0]?.includes("Italy")) {
        where = "it"
        which = 8
    }
    if (e.target.classList[0]?.includes("India")) {
        where = "in"
        which = 9
    }
    if (e.target.classList[0]?.includes("Germany")) {
        where = "de"
        which = 10
    }
    if (e.target.classList[0]?.includes("Canada")) {
        where = "ca"
        which = 11
    }
    if (e.target.classList[0]?.includes("Australia")) {
        where = "au"
        which = 12
    }
    if (e.target.classList[0]?.includes("Austria")) {
        where = "at"
        which = 13
    }
    if (e.target.classList[0]?.includes("UnitedStatesofAmerica")) {
        where = "us"
        which = 14
    }
    if (e.target.classList[0]?.includes("France")) {
        where = "fr"
        which = 15
    }
    if (e.target.classList[0]?.includes("Brazil")) {
        where = "br"
        which = 16
    }
}
document.addEventListener("mousedown", clicker)

// text input
function log() {
    what = document.querySelector(".jobsearch input").value
    if (what) {
        apiData()
    }


}
function exsist() {
    document.querySelector(".jobsearch input").addEventListener("change", log)
    document.querySelector(".jobsearch button").addEventListener("click", log)
}
document.querySelector(".jobsearch").addEventListener("mouseover", exsist)
let isPlaying = false
function playSou() {
    // document.querySelector(".sou").volume = 0.5
    if (!isPlaying) {
        document.querySelector(".sou").play()
        document.querySelector(".volume").style.animation = "volumerange 1s forwards"
        document.querySelector(":root").style.setProperty('--clr-red', "transparent");
    } else {
        document.querySelector(".sou").pause()
        document.querySelector(":root").style.setProperty('--clr-red', "red");
    }
    isPlaying = !isPlaying
}
let isDark = false
function lightToggle() {
    if (!isDark) {
        document.body.style.backgroundImage = ` url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b819c' fill-opacity='0.05'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E"), linear-gradient(to right , #171718,  #1b0d18)
    `
        document.body.style.color = "hsla(0,0%,100%,.6)"
        document.querySelector(".hero").style.filter = "brightness(0.7)"
        document.querySelector(".light").style.color = "black"
        document.querySelector(".music").style.color = "black"
        document.querySelectorAll(".job").forEach(each => each.style.backgroundColor = "hsl(0,0%,5%)")

    }

    else {
        document.body.style.backgroundImage = `   url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E"), linear-gradient(to right , #9383c7,  #d785c3)
        `
        document.querySelector(".hero").style.filter = "brightness(1)"
        document.body.style.color = "black"
        document.querySelectorAll(".job").forEach(each => each.style.backgroundColor = "hsl(0,0%,90%)")
        // document.querySelectorAll(".job").style.backgroundColor="hsl(0,0%,90%)"

    }
    isDark = !isDark
}
function volumeChanger() {
    document.querySelector(".sou").volume = (document.querySelector(".volume").value) / 10
}
document.querySelector(".music").addEventListener("click", playSou)
document.querySelector(".light").addEventListener("click", lightToggle)
document.querySelector(".volume").addEventListener("input", volumeChanger)








