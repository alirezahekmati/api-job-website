let key =  "f619d131289b6dd785232d776e4aa974"
let id = "e66d737b"
let what = "Front End"
let where = "gb"
let perPage = 50
let jobString = ""
let which =1
let page =1
//start animation
function start(){
    document.querySelector(".hero h1").style.animation="forwards startAnimation 2s linear"
}
function end(){
    document.querySelector(".navbar").style.display="flex"
    document.querySelector(".navbar").style.animation="appear 2s "
}
setTimeout(end,2500)
start()


// ip api 
async function ipApi(){
    
    const respone = await fetch('http://www.geoplugin.net/json.gp')
    const data = await respone.json()
    
    const avalibleCountryCode =["gb","at","au","br","ca","de","fr","in","it","nl","nz","pl","ru","sg","us","za"]
    avalibleCountryCode.forEach(e =>{
        if(e.includes(data?.geoplugin_countryCode.toLowerCase())){
            where = e
        }
    })

    
}
ipApi()
function basicSearch(){
    what = document.querySelector(".navbar input").value
    apiData()
}
document.querySelector(".navbar input").addEventListener("change",basicSearch)
// next page and previus page  event function
function next(){
    page++
    apiData()
}
function prev(){
    if(page >1){
        page--
        apiData()
    }
    
}
// job api 
async function apiData(){
    const respone = await fetch(`https://api.adzuna.com/v1/api/jobs/${where}/search/${page}?app_id=${id}&app_key=${key}&what=${what}&results_per_page=${perPage}`)
    const data =await respone.json()
    jobString = data.results.map(each => {
        return `
        <div class="job">
            <h2>${each.title}</h2>
            <h4>company :${each.company.display_name}</h4>
            <h4>created at :${each.created}</h4>
            <p>contract_time:${each.contract_time ?? "not mentioned"}</p>
            <p>contract_type :${each.contract_type ?? "not mentioned"}</p>
            <p>description:${each.description } at :  ${each.location.area[0]}</p>
            <a href="${each.redirect_url}"  target="_blank">click here for appy</a>
        </div>
        `       
    }).join("")
    document.body.innerHTML= `
    <div class="container">
        <div class="pages">
            <button class="prev" onclick="prev()">previus</button>
            <span>${page}</span>
            <button class="next" onclick="next()">next</button>
        </div>       
        <div class="jobs">
            ${jobString}
        </div>
    </div
    `
    document.getElementById(`contactChoice${which}`).checked= true
}
document.querySelectorAll("input[name='contact']").forEach(each => {
})
function  clicker(e){
    if( e.target.classList[0]?.includes("UnitedKingdomofGreatBritain")) {
        where = "gb"
        which =1
    } 
    if( e.target.classList[0]?.includes("Singapore")){
        where = "sg"
        which =2
    }
    if( e.target.classList[0]?.includes("SouthAfrica")){
        where = "za"
        which =3
    }
    if( e.target.classList[0]?.includes("Russian")){
        where = "ru"
        which =4
    }
    if( e.target.classList[0]?.includes("Poland")){
        where = "pl"
        which =5
    }
    if( e.target.classList[0]?.includes("NewZealand")){
        where = "nz"
        which =6
    }
    if( e.target.classList[0]?.includes("Netherlands")){
        where = "nl"
        which =7
    }
    if( e.target.classList[0]?.includes("Italy")){
        where = "it"
        which =8
    }
    if( e.target.classList[0]?.includes("India")){
        where = "in"
        which =9
    }
    if( e.target.classList[0]?.includes("Germany")){
        where = "de"
        which =10
    }
    if( e.target.classList[0]?.includes("Canada")){
        where = "ca"
        which =11
    }
    if( e.target.classList[0]?.includes("Australia")){
        where = "au"
        which =12
    }
    if( e.target.classList[0]?.includes("Austria")){
        where = "at"
        which =13
    }
    if( e.target.classList[0]?.includes("UnitedStatesofAmerica")){
        where = "us"
        which =14
    }
    if( e.target.classList[0]?.includes("France")){
        where = "fr"
        which =15
    }
    if( e.target.classList[0]?.includes("Brazil")){
        where = "br"
        which =16
    }
}
document.addEventListener("mousedown",clicker)

// text input
function log(){
    what = document.querySelector(".jobsearch input").value
    if(what){
        apiData()
    }
    
    
}
function exsist(){
document.querySelector(".jobsearch input").addEventListener("change",log)
document.querySelector(".jobsearch button").addEventListener("click",log)
}
document.querySelector(".jobsearch").addEventListener("mouseover",exsist)
