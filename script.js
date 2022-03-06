let key =  "f619d131289b6dd785232d776e4aa974"
let id = "e66d737b"
let what = "Front End"
let where = "gb"
let perPage = 50
let jobString = ""
let which =1
let page =1
function start(){

    document.querySelector(".hero h1").style.animation="forwards startAnimation 2s linear"
}
function end(){
    document.querySelector(".navbar").style.display="flex"
    document.querySelector(".navbar").style.animation="appear 2s "
}
setTimeout(end,2500)
start()
async function apiData(){
    const respone = await fetch(`https://api.adzuna.com/v1/api/jobs/${where}/search/1?app_id=${id}&app_key=${key}&what=${what}&results_per_page=${perPage}`)
    const data =await respone.json()
    console.log(data.results)
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
    })
    document.body.innerHTML= `
    <div class="container">
        <div>
            <p>choose the contry</p>
            <div class="british">
                <input  class="british" type="radio" id="contactChoice1"
                name="contact" value="email"  >
                <label for="contactChoice1"  class="british">british</label>
            </div>
            <div class="usa">
                <input  class="usa" type="radio" id="contactChoice2"
                name="contact" value="phone">
                <label for="contactChoice2"  class="usa" >usa</label>
            </div>
            <div class="france">
                <input  class="france" type="radio" id="contactChoice3"
                name="contact" value="mail">
                <label   class="france"  label for="contactChoice3">france</label>
            </div>            
        </div>       
        <div class="jobs">
            ${jobString}
        </div>
    </div
    `
    document.getElementById(`contactChoice${which}`).checked= true
}
document.querySelectorAll("input[name='contact']").forEach(each => {
    console.log(each.value)
})
function  clicker(e){
    // console.log( e.target.classList[0].includes("british"))
    if( e.target.classList[0].includes("UnitedKingdomofGreatBritain")) {
        // console.log("br")
        where = "gb"
        which =1
        apiData()
        
        
    } 
    if( e.target.classList[0].includes("Singapore")){
        // console.log("us")
        where = "sg"
        which =2
        apiData()
        
    }
    if( e.target.classList[0].includes("SouthAfrica")){
        // console.log("fr")
        where = "za"
        which =3
        apiData()
    }
    if( e.target.classList[0].includes("Russian")){
        // console.log("fr")
        where = "ru"
        which =4
        apiData()
    }
    if( e.target.classList[0].includes("Poland")){
        // console.log("fr")
        where = "pl"
        which =5
        apiData()
    }
    if( e.target.classList[0].includes("NewZealand")){
        // console.log("fr")
        where = "nz"
        which =6
        apiData()
    }
    if( e.target.classList[0].includes("Netherlands")){
        // console.log("fr")
        where = "nl"
        which =7
        apiData()
    }
    if( e.target.classList[0].includes("Italy")){
        // console.log("fr")
        where = "it"
        which =8
        apiData()
    }
    if( e.target.classList[0].includes("India")){
        // console.log("fr")
        where = "in"
        which =9
        apiData()
    }
    if( e.target.classList[0].includes("Germany")){
        // console.log("fr")
        where = "de"
        which =10
        apiData()
    }
    if( e.target.classList[0].includes("Canada")){
        // console.log("fr")
        where = "ca"
        which =11
        apiData()
    }
    if( e.target.classList[0].includes("Australia")){
        // console.log("fr")
        where = "au"
        which =12
        apiData()
    }
    if( e.target.classList[0].includes("Austria")){
        // console.log("fr")
        where = "at"
        which =13
        apiData()
    }
    if( e.target.classList[0].includes("UnitedStatesofAmerica")){
        // console.log("fr")
        where = "us"
        which =14
        apiData()
    }
    if( e.target.classList[0].includes("France")){
        // console.log("fr")
        where = "fr"
        which =15
        apiData()
    }
    if( e.target.classList[0].includes("Brazil")){
        // console.log("fr")
        where = "br"
        which =16
        apiData()
    }
}
document.addEventListener("mousedown",clicker)