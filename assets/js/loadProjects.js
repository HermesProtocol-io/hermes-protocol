$(document).ready(function () {
    writeHTML("All")
});

function loadTranslations(ready) {
    let data = JSON.parse(sessionStorage.getItem("translations"));
    if (data) { 
        ready(data);
    } else {
        getJSON("/assets/js/translate.json").done( translations => {
            sessionStorage.setItem("translations", JSON.stringify(translations));
            ready(translations);
        }).fail ( function( jqxhr, textStatus, error ) {
            console.log( "Error: " + textStatus +", "+ error );
        });
    };
};



function loadProjects(ready) {
    let data = JSON.parse(sessionStorage.getItem("projectsData"));
    if (data) { 
        ready(data);
    } else {
        getJSON("/assets/js/projects.json").done( projects => {
            sessionStorage.setItem("projectsData", JSON.stringify(projects));
            ready(projects);
        }).fail ( function( jqxhr, textStatus, error ) {
            console.log( "Error: " + textStatus +", "+ error );
        });
    }
};



function writeHTML(selectedChain) {
    loadTranslations(translations => { 
        loadProjects(projects => {
            
            var modal = document.getElementById("myModal");
            if (!modal) return;
            modal.style.display = "none";



            document.getElementById("chain").innerHTML = ``;

            for (const [chain, active] of Object.entries(projects)) {

        
                let trChain = translations[chain];


                if (selectedChain != chain && selectedChain != "All"){
                    continue;
                }
            
                document.getElementById("chain").innerHTML +=  ` 
                <h2 class="my-4 text-2xl font-bold tracking-tight text-muddywaters-500 sm:text-2xl  pb-2 pt-6 xl:text-3xl sm:leading-tight ">
                ${translations[chain]} 
                    <span class="text-gray-500 font-medium text-lg" id="count-${chain}">
                    </span>
                </h2>
                    <div class="pb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" id=${chain} >`
                
                let countprojects = 0;
                
                for (const [activeState , projectType] of Object.entries(active)) {

                    if (activeState == "active"){
                        
                        for (const [projectTypeName, protocol ] of Object.entries(projectType)) {

                            for (const [ projectName, characteristics ] of Object.entries(protocol)) {  
                
                                document.getElementById(chain).innerHTML += `
                                    <div class="relative bg-white dark:bg-gray-700  shadow-xl rounded-xl px-6 py-7" onClick='popUp("${chain}","${projectTypeName}","${projectName}")'; > 
                                        <div class=" flex flex-row content-center">
                                            <img class="w-6 h-auto" src = "${characteristics.img}">
                                            <p class="ml-3 dark:text-white font-bold"> ${projectName} </p>
                                        </div>
                                        <div class="absolute right-4 top-4 ">
                                            <span class="flex h-3 w-3">
                                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                            </span>
                                        </div>
                            
                                    </div>
                                `

                                countprojects++;
                            } 


                        } 
                    } else{

                        for (const [projectTypeName, protocol ] of Object.entries(projectType)) {

                            for (const [ projectName, characteristics ] of Object.entries(protocol)) {  

                
                                document.getElementById(chain).innerHTML += `
                                    <div class="relative bg-white dark:bg-gray-700 shadow-xl rounded-xl px-6 py-7" > 
                                        <div class=" flex flex-row content-center">
                                            <img class="w-6 h-auto" src = "${characteristics.img}">
                                            <p class="ml-3 dark:text-white font-bold"> ${projectName} </p>
                                        </div>
                                        <div class="absolute right-4 top-4 ">
                                            <span class="flex h-3 w-3">
                                                <span class="relative inline-flex rounded-full h-3 w-3 bg-gray-500"></span>
                                            </span>
                                        </div>
                            
                                    </div>
                                `

                                countprojects++;
                            } 


                        }
                    }
                }

                document.getElementById(`count-${chain}`).innerHTML +=`(${countprojects})`;
                document.getElementById("chain").innerHTML +=`</div>`;

            }

            
        });
    });
};


function popUp(chain , type , project ){
    loadTranslations(translations => { 
        loadProjects(projects => {
            
            let projectInfo = projects[chain]["active"][type][project]; 
            let modal = document.getElementById("projectModel");
        

        
            let newtext=``

            for (const [support, AlertType] of Object.entries(projectInfo["support"])){
                
                
                let app= "times",
                    disc="times",
                    tele="times",
                    twit="times"
                

                if(AlertType.includes("app")){
                    app="check"
                };
                if(AlertType.includes("discord")){
                    disc="check"
                };
                if(AlertType.includes("telegram")){
                    tele="check"
                };
                if(AlertType.includes("twitter")){
                    twit="check"
                };

        

                newtext +=`<div class="rounded-lg bg-muddywaters-400 p-2"><a class="font-bold text-white">${translations[support]}</a></div>                        

                                    <div class="flex rounded-lg items-center  bg-muddywaters-400 p-2">
                                        <i class="fa fa-${app} text-white m-auto" aria-hidden="true"></i>
                                    </div>
                                    <div class="flex rounded-lg items-center  bg-muddywaters-400 p-2">
                                        <i class="fa fa-${disc} text-white m-auto" aria-hidden="true"></i>
                                    </div>
                                    <div class="flex rounded-lg items-center  bg-muddywaters-400 p-2">
                                        <i class="fa fa-${tele} text-white m-auto" aria-hidden="true"></i>
                                    </div>
                                    <div class="flex rounded-lg items-center bg-muddywaters-400 p-2">
                                        <i class="fa fa-${twit} text-white m-auto" aria-hidden="true"></i>
                                    </div>`

            } 
            
            

            modal.innerHTML =`
            
            <div class="relative p-4  m-auto  flex items-center w-full max-w-2xl h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                        <div class="flex flex-row">
                            <img class="w-auto h-6 mr-2" src = "${projectInfo["img"]}"> 
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                ${project}
                            </h3>
                        </div>
                        <button onClick="popUpClose()"; type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="p-6 space-y-6">
                        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Our platform currently supports these features from ${project}:
                        </p>
                        <div class="grid grid-cols-5 gap-1">
                            <div class="rounded-lg bg-muddywaters-600 p-2"><a class="font-bold text-white">Alert Type</a></div>                        
                            <div class="rounded-lg bg-muddywaters-600 p-1">
                                <img class="text-white object-contain m-auto  w-8 h-8" src="assets/images/icon_blank.svg">
                            </div>
                            <div class="rounded-lg bg-muddywaters-600 p-2 items-center">                
                                <a 
                                class="text-white ">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 m-auto" fill="currentColor" viewBox="0 0 18 18">
                                    <path
                                        d="M15.8 4.2c-1.2-1-2.7-1.5-4.3-1.6l-.2.2c1.4.4 2.7 1.1 3.8 2-1.4-.8-3-1.3-4.6-1.5-1-.1-2.1-.1-3.1 0h-.3c-1.2.2-2.4.5-3.5 1-.6.3-1 .4-1 .4 1.2-1 2.5-1.6 4-2l-.1-.1c-1.6 0-3.1.6-4.3 1.6C.8 6.9 0 10 0 13.1c1.1 1.5 2.8 2.4 4.7 2.4 0 0 .6-.7 1-1.3-1.1-.3-2-.9-2.7-1.8.1.1.3.2.4.3h.1l.1.1c.4.2.7.4 1.1.5.7.3 1.5.6 2.3.8 1.3.2 2.7.2 4 0 .8-.1 1.5-.4 2.2-.7.6-.2 1.2-.5 1.8-.9-.7.9-1.7 1.6-2.8 1.8l1 1.2c1.9 0 3.6-.8 4.7-2.4 0-3.1-.7-6.2-2.1-8.9zm-9.7 7.5c-.9 0-1.6-.8-1.6-1.7 0-.9.7-1.7 1.6-1.7h.1c.8 0 1.5.7 1.5 1.6v.1c0 .9-.7 1.6-1.6 1.7zm5.7 0c-.9 0-1.6-.8-1.6-1.7 0-.9.6-1.7 1.5-1.7s1.6.8 1.6 1.7c.1.9-.7 1.6-1.5 1.7z">
                                    </path>
                                </svg>
                                </a>
                            </div>                        
                            <div class="rounded-lg bg-muddywaters-600 p-2">
                                <a 
                                    class="text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 m-auto" fill="currentColor" viewBox="0 0 24 24">
                                        <defs></defs>
                                        <path fill-rule="evenodd"
                                            d="M18.4 21.8c.3.2.7.3 1.1.1.4-.1.6-.5.7-.8.9-4.1 3-14.4 3.8-18.1.1-.3 0-.6-.3-.8-.2-.2-.5-.3-.8-.2C18.7 3.6 5.8 8.4.5 10.4c-.3.1-.5.4-.5.8s.2.7.6.8c2.4.7 5.5 1.7 5.5 1.7s1.5 4.4 2.2 6.6c.1.3.3.5.6.6.3.1.6 0 .8-.2 1.2-1.1 3.1-2.9 3.1-2.9s3.6 2.5 5.6 4zm-11-8.7l1.7 5.5.4-3.5S16 9.2 19.7 5.9c.1-.1.1-.3 0-.4-.1-.1-.3-.1-.4-.1C15 8.2 7.4 13.1 7.4 13.1z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </a>
                            </div>
                            <div class="rounded-lg bg-muddywaters-600 p-2">
                                <a 
                                    class="text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 m-auto" fill="currentColor" viewBox="0 0 18 18">
                                        <path
                                            d="M5.9 15.7c5.3 0 9.6-4.2 9.7-9.5v-.1-.4c.7-.5 1.2-1.1 1.7-1.8-.6.3-1.3.5-2 .5.7-.4 1.2-1.1 1.5-1.8-.7.4-1.4.7-2.2.8C13.3 2 11.1 2 9.8 3.3c-.6.6-1 1.5-1 2.3 0 .3 0 .5.1.8-2.7-.1-5.3-1.4-7-3.5-.9 1.6-.5 3.5 1 4.5-.5 0-1-.1-1.5-.4 0 1.6 1.1 3 2.7 3.3-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.4 1.7 2.3 3.2 2.3-1.2.9-2.7 1.4-4.2 1.4H.8c1.5 1.2 3.3 1.7 5.1 1.7">
                                        </path>
                                    </svg>
                                </a>
                            </div>

                                ${newtext}
                        </div>
                    </div>
                </div>
            </div>
            `;       

            modal.style.display = "block"; 

        });
    });

};

function popUpClose(){

        let modal = document.getElementById("projectModel");
               
        modal.style.display = "none"; 

};
