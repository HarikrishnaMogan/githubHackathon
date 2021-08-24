
let namesearch = document.createElement("div");
namesearch.innerHTML=`
<input class="namesearch" type="text" placeholder="search Name(Hari)">
<button class="namebtn" onclick="userid()">Search </button>
`;

document.body.append(namesearch);
namesearch.setAttribute("class","searchname");
let container = document.createElement("div");
container.setAttribute("class","container");



//fetch by username
async function userid()
{   try{
    let name = document.querySelector(".namesearch");
    const data = await fetch(`https://api.github.com/users/${name.value}`);
    const user = await data.json();
    container.innerHTML="";
    createUser(user);
   }
   catch(err)
   {
       console.log(err);
   }
}

//create user data and calls repo to fetch
function createUser(user)
{
   console.log(user);
   container.innerHTML=`
   <div class="title">
   <img class="image" src="${user.avatar_url}"  alt="UserImage">
   <p class="name">${user.login}</p>
   </div>
   <div class="reposearch">
   <input class="repotxt" type="text" placeholder="search Repo">
   <button class="repobtn" onclick="searchRepo()">Search</button>
   </div>
   <div class="repocontainer">
   <p id="title">Repositories</p>
   </div>
   `;
   
   document.body.append(container);
   Repo(user.repos_url);
   getname(user.login);
}

//fetch repo
async function Repo(repo)
{
   try{
    const data = await fetch(`${repo}`);
    const repos = await data.json();
    createRepo(repos);
   }
   catch(err)
   {
       console.log(err);
   }
    
}

//creates repo data
function createRepo(repos)
{
    console.log(repos);
  let repocontainer = document.querySelector(".repocontainer");

    repos.forEach(r=>{
        repocontainer.innerHTML +=`
        <div class="repos">
        <div id="image1"><img src="${r.owner.avatar_url}" alt="owner"></div>
          <div id="reponame"><a href="${r.html_url}">${r.name}</a></div>
          <div class="icons" id="fork"><img src="/icons/share.png" alt="fork"><span>${r.forks_count}</span></div>
          <div class="icons"id="star"><img src="/icons/star.png" alt="star"><span>${r.stargazers_count}</span></div>
          </div>
        `;
    })
}



//to take the name outside of async function
let username=[];
function getname(name)
{
   username.push(name);
}



//to search the repo by fetching
async function searchRepo()
{
    try{
        let repoinput = document.querySelector(".repotxt");
        let repocontainer = document.querySelector(".repocontainer");
        const data = await fetch(`https://api.github.com/repos/${username}/${repoinput.value}`);
        const repo = await data.json();
       let arrayRP =[];
       arrayRP.push(repo);
        repocontainer.innerHTML ="";
        createRepo(arrayRP);
    }
    catch(err)
    {
        console.log(err);

    }
   

}