var responses = [];
var currentPage = 0
var maxPages = 0;
var workerId = ""
var assignmentId = ""
var turkSubmitTo = ""

var client = new CrowdSourcingClient(true)

function loadData() {
    let browser = detect.parse(navigator.userAgent)
    if (browser.browser.family == "Safari") {
        let html = "<h1 class='intro'>Sorry!</h1><div>The Safari browser does not work with this experiment. Please use Chrome or Mozilla Firefox</div>"
        document.getElementById('instructions').innerHTML = html;
        return;
    }

    const urlparams = new URLSearchParams(window.location.search);
    workerId = urlparams.get('workerId');
    assignmentId = urlparams.get('assignmentId');
    turkSubmitTo = urlparams.get('turkSubmitTo');

    if (workerId==null) {
        let data = client.GetTasks(10)
        .then(response => response.json())
        .then(function(json_data) {
            welcomeFunction();
            maxPages = json_data.length;
            setupProgressBar(maxPages);
            let maxContextLength = 0;
            for(let i = 0; i < json_data.length; i++) {
                let trial = i+1;
                responses.push(json_data[i]);
                responses[i].annotation = {};
                let contextHtml = setUpHeading(i, trial, 'trial-', maxPages);
                contextHtml += "<div class='top'><div class='float-top'>"+displayContext(i, json_data[i], 'trial-')+"</div>";
                responses[i].context = null;
                contextHtml += "<div class='float-bottom'>"+displayTarget(json_data[i]);
                contextHtml += "<div class='annotationCategory' id='anno"+i+"'>"+ccKind(i, false)+"</div></div>";
                contextHtml += "</div><!-- End Trial " + i + " -->";

                let node = document.createElement('div');
                node.innerHTML = contextHtml;

                document.getElementById('trials').appendChild(node)
            }
        });
    }
    else {
        let unique = client.PostMetadata(workerId)
        .then(response => response.status)
        .then(function (statusCode) {
            if (statusCode == 403) {
                let html = "<h1 class='intro'>Sorry!</h1>"
                html += "You have already completed the maximum number of HITs allowed by this requester. "
                html += "Please click 'Return HIT' to avoid any impact on your approval rating."
                document.getElementById('instructions').innerHTML = html;
                return false;
            }
            else {
                let data = client.GetTasks(10)
                .then(response => response.json())
                .then(function(json_data) {
                    welcomeFunction();
                    maxPages = json_data.length;
                    setupProgressBar(maxPages);
                    let maxContextLength = 0;
                    for(let i = 0; i < json_data.length; i++) {
                        let trial = i+1;
                        responses.push(json_data[i]);
                        responses[i].annotation = {};
                        let contextHtml = setUpHeading(i, trial, 'trial-', maxPages);
                        contextHtml += "<div class='top'><div class='float-top'>"+displayContext(i, json_data[i], 'trial-')+"</div>";
                        responses[i].context = null;
                        contextHtml += "<div class='float-bottom'>"+displayTarget(json_data[i]);
                        contextHtml += "<div class='annotationCategory' id='anno"+i+"'>"+ccKind(i, false)+"</div></div>";
                        contextHtml += "</div><!-- End Trial " + i + " -->";

                        let node = document.createElement('div');
                        node.innerHTML = contextHtml;

                        document.getElementById('trials').appendChild(node)
                    }
                });
                return true;
            }
        })
    }
}

var ccText = ''
var currenti = null
var timeout = null
function listenToTextBox(i,id) {
    currenti = i;
    ccText = document.getElementById(id);
    ccText.onkeyup = function (e) {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            responses[currenti].annotation.cc = ccText.value;
            updateProgress(currenti)
            if (checkCompletion()) {
                document.getElementById('trialControl').disabled = false;
            }
        }, 500)
    }
 
}

function welcomeFunction() {
    let html = "<h1 class='intro'>Welcome</h1> "
    html += "Thank you for taking part in our study. In this task, we are interested in understanding how the adjective \"big\" is used when talking to young children."
    html += "<br><br>This HIT is part of a MIT scientific research project. Your decision to complete this HIT is voluntary. "
    html += "There is no way for us to identify you. The only information we will have, in addition to your responses, is the time at which you completed "
    html += "the survey. The results of the research may be presented at scientific meetings or published in scientific journals. Clicking on the 'SUBMIT' "
    html += "button on the bottom of this page indicates that you are at least 18 years of age and agree to complete this HIT voluntarily.<br><br>"
    html += "DO NOT REFRESH THE PAGE at any time during the experiment, as that will reset the HIT.<br>"
    html += "<div class='button-div'><button class='button' id='btn-intro' onclick=introduction()>SUBMIT</button</div>"

    document.getElementById('instructions').innerHTML = html;
}

function introduction() {
    let html = "<h1 class='intro'>Introduction</h1>"
    html += "A \"big car\" is a lot bigger than a \"big cat\": What counts as \"big\" depends on the context. "
    html += "For example, if we are playing with a miniature kitchen set, then a \"big plate\" in the kitchen set might "
    html += "not be considered \"big\" for plates in general.<br><br>"
    html += "In this task, you will see videos of children interacting with their caretaker(s) and a transcript of what is said. "
    html += "We would like you to describe how the word \"big\" is used and if the item being described as \"big\" is physically present, "
    html += "found in a picture book, not present but known to the participants, or something else.<br>"
    html += "The sentence we want you to pay attention to will be <b>bolded</b>. The transcript before and after the <b>bolded</b> sentence "
    html += "is there to provide you some context to better understand what's happening. If the adjective \"big\" appears twice within the bolded "
    html += "statement, only consider the first instance.<br><br>"
    html += "Finally, you will be asked some questions about the properties of the bolded sentence.<br><br>"

    html += "<br>Go on to see the definitions of the possible contexts in which we might use the word \"big\"."
    html += "<div class='button-div'><button class='button' id='btn-definitions' onclick=definitions() disabled>Continue</button></div>"
    document.getElementById('instructions').innerHTML = html;

    setTimeout(function() {
        document.getElementById('btn-definitions').disabled = false;
    }, 10000);
}

function setupProgressBar(numTrials) {
    var html = "<div class='button-div'>"
    html += "<span class='navSpan'><button class='button review' id='def-reminder' onclick=popupDefinitions()>Review Definitions</button></span>"
    for (var i = 0; i < numTrials; i++) {
        html += "<span class='navSpan'><button class='button circle' id='progress"+i+"' onclick=gotoTrial("+i+")>"+(i+1)+"</button></span>"
    }
    html += "<span class='navSpan'><button class='button review' id='def-faq' onclick=faq()>FAQ</button></span>"
    document.getElementById('progress').innerHTML = html;
}

function updateProgress(i, practice) {
    if (practice) {
        if (practice_responses[i].annotation.referentKind != undefined
            && practice_responses[i].annotation.syntacticFrames != undefined
            && practice_responses[i].annotation.sentenceFunction != undefined
            && practice_responses[i].annotation.syntacticProperties != undefined
            && practice_responses[i].annotation.ccKind != undefined && practice_responses[i].annotation.ccKind.length > 0)
        {
            var id = "practice-progress"+i
            document.getElementById(id).style = "background-color:green;"
        }
        else {
            var id = "practice-progress"+i
            document.getElementById(id).style = "background-color:#008CBA;"
        }
    }
    else {
        if (responses[i].annotation.referentKind != undefined
            && responses[i].annotation.syntacticFrames != undefined
            && responses[i].annotation.sentenceFunction != undefined
            && responses[i].annotation.syntacticProperties != undefined
            && responses[i].annotation.ccKind != undefined && responses[i].annotation.ccKind.length > 0)
        {
            var id = "progress"+i
            document.getElementById(id).style = "background-color:green;"
        }
        else {
            var id = "progress"+i
            document.getElementById(id).style = "background-color:#008CBA;"
        }
    }
}

function gotoTrial(togo) {
    hideTrial(currentPage)
    showTrial(togo)
    currentPage = togo
    if (currentPage == 0) {
        document.getElementById('prevButton').disabled = true;
    }
    else {
        document.getElementById('prevButton').disabled = false;
    }

    if (currentPage >= maxPages - 1) {
        document.getElementById('nextButton').disabled = true;
    }
    else {
        document.getElementById('nextButton').disabled = false;
    }
}

function getUserName() {
    var userName = document.getElementById('userName').value;
    if (userName != "") {
        createCookie("providenceAnnotatorUserName", userName, 90)
    }
    return userName;
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1)
}

function setCorrectness(id, index, value, section) {
    if (value == true) {
        document.getElementById(id).disabled = false;
        document.getElementById("correctness"+index).innerHTML = "Good job!!"
        document.getElementById("correctness"+index).style.backgroundColor = "green";
    }
    else if (section == "referentKind" && (index == 2 || index == 3)) {
        var almost = false;
        for (var i = 0; i < practice_responses[index].annotation.referentKind.length; i++) {
            if (practice_responses[index].annotation.referentKind[i].includes("Picture book")) {
                document.getElementById(id).disabled = true;
                document.getElementById("correctness"+index).style.backgroundColor = "orange";
                document.getElementById("correctness"+index).innerHTML = "Almost there!"
                almost = true;
                break;
            }
        }
        if (!almost) {
            document.getElementById(id).disabled = true;
            document.getElementById("correctness"+index).style.backgroundColor = "red";
            document.getElementById("correctness"+index).innerHTML = "That's not quite perfect"
        }
    }
    else if (section == "referentKind" && (index == 4 || index == 5 || index == 6)) {
        var almost = false;
        for (var i = 0; i < practice_responses[index].annotation.referentKind.length; i++) {
            if (practice_responses[index].annotation.referentKind[i].includes("Physically copresent")) {
                document.getElementById(id).disabled = true;
                document.getElementById("correctness"+index).style.backgroundColor = "orange";
                document.getElementById("correctness"+index).innerHTML = "Almost there!"
                almost = true;
                break;
            }
        }
        if (!almost) {
            document.getElementById(id).disabled = true;
            document.getElementById("correctness"+index).style.backgroundColor = "red";
            document.getElementById("correctness"+index).innerHTML = "That's not quite perfect"
        }
    }
    else if (section == "ccKind" && index == 3) {
        var almost = false;
        for (var i = 0; i < practice_responses[index].annotation.ccKind.length; i++) {
            if (practice_responses[index].annotation.ccKind[i].includes("perceptual-same") || practice_responses[index].annotation.ccKind[i].includes("direct comparison")) {
                document.getElementById(id).disabled = true;
                document.getElementById("correctness"+index).style.backgroundColor = "orange";
                document.getElementById("correctness"+index).innerHTML = "Almost there!"
                almost = true;
                break;
            }
        }
        if (!almost) {
            document.getElementById(id).disabled = true;
            document.getElementById("correctness"+index).style.backgroundColor = "red";
            document.getElementById("correctness"+index).innerHTML = "That's not quite perfect"
        }
    }
    else if (section == "ccKind" && index == 4) {
        var almost = false;
        for (var i = 0; i < practice_responses[index].annotation.ccKind.length; i++) {
            if (practice_responses[index].annotation.ccKind[i].includes("normative-agent") || practice_responses[index].annotation.ccKind[i].includes("normative-tree")) {
                document.getElementById(id).disabled = true;
                document.getElementById("correctness"+index).style.backgroundColor = "orange";
                document.getElementById("correctness"+index).innerHTML = "Almost there!"
                almost = true;
                break;
            }
        }
        if (!almost) {
            document.getElementById(id).disabled = true;
            document.getElementById("correctness"+index).style.backgroundColor = "red";
            document.getElementById("correctness"+index).innerHTML = "That's not quite perfect"
        }
    }
    else {
        document.getElementById(id).disabled = true;
        document.getElementById("correctness"+index).style.backgroundColor = "red";
        document.getElementById("correctness"+index).innerHTML = "That's not quite perfect"
    }
}

function annotateReferentKind(index, selectValue, practice) {
    let radios = ["Physically copresent", "Picture book", "Known to both speaker and listener", "Known to just speaker", "Known to just listener", "Known to neither", "Nonspecific referent"]
    if(practice) {
        var checkbox = document.getElementById(selectValue+index);
        var arr = practice_responses[index].annotation.referentKind;
        if (arr == null) {
            practice_responses[index].annotation.referentKind = [];
            arr = practice_responses[index].annotation.referentKind;
        }
        if (selectValue.includes("Physically copresent")) {
            document.getElementById("Picture book someone pointing"+index).checked = false
            document.getElementById("Picture book speaker looking"+index).checked = false
            document.getElementById("Picture book listener looking"+index).checked = false
            document.getElementById("Picture book cant tell"+index).checked = false
            for (var i =0; i < arr.length; i++) {
                if (arr[i] == "Picture book someone pointing" || arr[i] == "Picture book speaker looking" ||arr[i] == "Picture book listener looking" ||arr[i] == "Picture book cant tell") {
                    arr.splice(i,1)
                }
            }
        }
        else if (selectValue.includes("Picture book")) {
            document.getElementById("Physically copresent someone pointing"+index).checked = false
            document.getElementById("Physically copresent speaker looking"+index).checked = false
            document.getElementById("Physically copresent listener looking"+index).checked = false
            document.getElementById("Physically copresent cant tell"+index).checked = false
            for (var i =0; i < arr.length; i++) {
                if (arr[i] == "Physically copresent someone pointing" || arr[i] == "Physically copresent speaker looking" ||arr[i] == "Physically copresent listener looking" ||arr[i] == "Physically copresent cant tell") {
                    arr.splice(i,1)
                }
            }
        }
        if (checkbox.checked == true) {
            if (radios.includes(selectValue)) {
                for (var i=0; i < radios.length; i++) {
                    if (arr.includes(radios[i]) && radios[i] != selectValue) {
                        for (var j=0; j < arr.length; j++) {
                            if (arr[j] == radios[i]) {
                                arr.splice(j,1)
                            }
                        }
                    }
                }
            }
            if (arr.includes(selectValue) == false) {
                arr.push(selectValue);
            }
        }
        else {
            if (arr.includes(selectValue) == true) {
                for (var i=0; i < arr.length; i++) {
                    if (arr[i] == selectValue) {
                        arr.splice(i,1);
                    }
                }
            }
        }
        client.PostPractice(practice_responses[index], "referentKind")
        .then(response => response.json())
        .then(function(json_data) {
            setCorrectness('within-anno', index, json_data, "referentKind")
        })
    }
    else {
        var checkbox = document.getElementById(selectValue+index);
        var arr = responses[index].annotation.referentKind;
        if (arr == null) {
            responses[index].annotation.referentKind = [];
            arr = responses[index].annotation.referentKind;
        }
        if (selectValue.includes("Physically copresent")) {
            document.getElementById("Picture book someone pointing"+index).checked = false
            document.getElementById("Picture book speaker looking"+index).checked = false
            document.getElementById("Picture book listener looking"+index).checked = false
            document.getElementById("Picture book cant tell"+index).checked = false
            for (var i =0; i < arr.length; i++) {
                if (arr[i] == "Picture book someone pointing" || arr[i] == "Picture book speaker looking" ||arr[i] == "Picture book listener looking" ||arr[i] == "Picture book cant tell") {
                    arr.splice(i,1)
                }
            }
        }
        else if (selectValue.includes("Picture book")) {
            document.getElementById("Physically copresent someone pointing"+index).checked = false
            document.getElementById("Physically copresent speaker looking"+index).checked = false
            document.getElementById("Physically copresent listener looking"+index).checked = false
            document.getElementById("Physically copresent cant tell"+index).checked = false
            for (var i =0; i < arr.length; i++) {
                if (arr[i] == "Physically copresent someone pointing" || arr[i] == "Physically copresent speaker looking" ||arr[i] == "Physically copresent listener looking" ||arr[i] == "Physically copresent cant tell") {
                    arr.splice(i,1)
                }
            }
        }
        if (checkbox.checked == true) {
            if (radios.includes(selectValue)) {
                for (var i=0; i < radios.length; i++) {
                    if (arr.includes(radios[i]) && radios[i] != selectValue) {
                        for (var j=0; j < arr.length; j++) {
                            if (arr[j] == radios[i]) {
                                arr.splice(j,1)
                            }
                        }
                    }
                }
            }
            if (arr.includes(selectValue) == false) {
                arr.push(selectValue);
            }
        }
        else {
            if (arr.includes(selectValue) == true) {
                for (var i=0; i < arr.length; i++) {
                    if (arr[i] == selectValue) {
                        arr.splice(i,1);
                    }
                }
            }
        }
        document.getElementById('within-anno').disabled = false;
        if (checkCompletion()) {
            document.getElementById('trialControl').disabled = false;
        }
    }
    updateProgress(index, practice)
}

function annotateSyntacticFrames(index, selectValue, practice) {
    annotateRadioBtn(index, selectValue, "syntacticFrames", 'btn-next-practice-'+(index+1), practice)
}

function annotateSentenceFunction(index, selectValue, practice) {
    annotateRadioBtn(index, selectValue, "sentenceFunction", 'within-anno', practice)
}

function annotateRadioBtn(index, selectValue, section, nextButton, practice) {
    if(practice) {
        practice_responses[index].annotation[section] = selectValue;
        client.PostPractice(practice_responses[index], section)
        .then(response => response.json())
        .then(function(json_data) {
            setCorrectness(nextButton, index, json_data, section)
        })
    }
    else {
        annotateSection(index, selectValue, section)
    }
    updateProgress(index, practice)
}

function annotateCategory(index, selectValue, practice) {
    if(practice) {
        practice_responses[index].annotation.category = selectValue;
        if (checkPartialCompletion()) {
            var btnId = 'btn-next-practice-'+(index+1)
            document.getElementById(btnId).disabled = false;
        }
    }
    else {
        annotateSection(index, selectValue, section)
    }
    updateProgress(index, practice)
}

function annotateSection(index, selectValue, section) {
    responses[index].annotation[section] = selectValue;
    if (checkCompletion()) {
        document.getElementById('trialControl').disabled = false;
    }
    if (!section.includes("syntacticFrames")) {
        document.getElementById('within-anno').disabled = false;
    }
}

function annotateCCKind(index, selectValue, practice) {
    var checkbox = document.getElementById(selectValue+index);
    if(practice) {
        var arr = practice_responses[index].annotation.ccKind;
        if (arr == null) {
            practice_responses[index].annotation.ccKind = [];
            arr = practice_responses[index].annotation.ccKind;
        }
        if (checkbox.checked == true) {
            if (arr.includes(selectValue) == false) {
                arr.push(selectValue);
            }
        }
        else {
            if (arr.includes(selectValue) == true) {
                for (var i=0; i < arr.length; i++) {
                    if (arr[i] == selectValue) {
                        arr.splice(i,1);
                    }
                }
            }
        }
        client.PostPractice(practice_responses[index], "ccKind")
        .then(response => response.json())
        .then(function(json_data) {
            setCorrectness('within-anno', index, json_data, "ccKind")
        })
    }
    else {
        var arr = responses[index].annotation.ccKind;
        if (arr == null) {
            responses[index].annotation.ccKind = [];
            arr = responses[index].annotation.ccKind;
        }
        if (checkbox.checked == true) {
            if (arr.includes(selectValue) == false) {
                arr.push(selectValue);
            }
        }
        else {
            if (arr.includes(selectValue) == true) {
                for (var i=0; i < arr.length; i++) {
                    if (arr[i] == selectValue) {
                        arr.splice(i,1);
                    }
                }
            }
        }
        document.getElementById('within-anno').disabled = false;
        if (checkCompletion()) {
            document.getElementById('trialControl').disabled = false;
        }
    }
    updateProgress(index, practice)
}

function annotateSyntacticProperties(index, selectValue, practice) {
    let radios = ["no noun", "basic", "sub", "super", "pronoun"]
    if(practice) {
        var checkbox = document.getElementById(selectValue+index);
        var arr = practice_responses[index].annotation.syntacticProperties;
        if (arr == null) {
            practice_responses[index].annotation.syntacticProperties = [];
            arr = practice_responses[index].annotation.syntacticProperties;
        }
        if (checkbox.checked == true) {
            if (radios.includes(selectValue)) {
                for (var i=0; i < radios.length; i++) {
                    if (arr.includes(radios[i]) && radios[i] != selectValue) {
                        for (var j=0; j < arr.length; j++) {
                            if (arr[j] == radios[i]) {
                                arr.splice(j,1)
                            }
                        }
                    }
                }
            }
            if (arr.includes(selectValue) == false) {
                arr.push(selectValue);
            }
        }
        else {
            if (arr.includes(selectValue) == true) {
                for (var i=0; i < arr.length; i++) {
                    if (arr[i] == selectValue) {
                        arr.splice(i,1);
                    }
                }
            }
        }
        client.PostPractice(practice_responses[index], "syntacticProperties")
        .then(response => response.json())
        .then(function(json_data) {
            setCorrectness('within-anno', index, json_data)
        })
    }
    else {
        var checkbox = document.getElementById(selectValue+index);
        var arr = responses[index].annotation.syntacticProperties;
        if (arr == null) {
            responses[index].annotation.syntacticProperties = [];
            ;arr = responses[index].annotation.syntacticProperties;
        }
        if (checkbox.checked == true) {
            if (radios.includes(selectValue)) {
                for (var i=0; i < radios.length; i++) {
                    if (arr.includes(radios[i]) && radios[i] != selectValue) {
                        for (var j=0; j < arr.length; j++) {
                            if (arr[j] == radios[i]) {
                                arr.splice(j,1)
                            }
                        }
                    }
                }
            }
            if (arr.includes(selectValue) == false) {
                arr.push(selectValue);
            }
        }
        else {
            if (arr.includes(selectValue) == true) {
                for (var i=0; i < arr.length; i++) {
                    if (arr[i] == selectValue) {
                        arr.splice(i,1);
                    }
                }
            }
        }
        document.getElementById('within-anno').disabled = false;
        if (checkCompletion()) {
            document.getElementById('trialControl').disabled = false;
        }
    }
    updateProgress(index, practice)
}

function checkPartialCompletion(caller, index) {
    if (caller == undefined) { return false}
    else { return true; }
}

function checkCompletion() {
    for (let i = 0; i < responses.length; i++) {
        if (responses[i].annotation.referentKind == undefined
           || responses[i].annotation.syntacticFrames == undefined
           || responses[i].annotation.sentenceFunction == undefined
           || responses[i].annotation.ccKind == undefined
           || responses[i].annotation.syntacticProperties == undefined)
        {
            return false
        }
    }
    return true;
}

function next() {
    if (currentPage < maxPages) {
        if (document.getElementById('prevButton').disabled) {
            document.getElementById('prevButton').disabled = false
        }
        if (currentPage >= 0) {
            hideTrial(currentPage)
        }
        currentPage += 1;

        if (currentPage >= maxPages - 1) {
            document.getElementById('nextButton').disabled = true;
        }

        showTrial(currentPage)
    }
}

function previous() {
    if (currentPage > 0) {
        if (document.getElementById('nextButton').disabled) {
            document.getElementById('nextButton').disabled = false
        }
        if (currentPage < maxPages) {
            hideTrial(currentPage)
        }
        currentPage -= 1;

        if (currentPage == 0) {
            document.getElementById('prevButton').disabled = true;
        }

        showTrial(currentPage)
    }
}

function hideTrial(trialNumber, practice) {
    if (practice) {
        let toHide = 'practice-trial-'+trialNumber
        let videoToPause = 'video-practice-trial-'+trialNumber
        document.getElementById(toHide).hidden = true;
        document.getElementById(videoToPause).pause()
    }
    else {
        let toHide = 'trial-'+trialNumber
        let videoToPause = 'video-trial-'+trialNumber
        document.getElementById(toHide).hidden = true;
        document.getElementById(videoToPause).pause()
    }
}

function showTrial(trialNumber, practice) {
    if (practice) {
        let toShow = 'practice-trial-' + trialNumber
        document.getElementById(toShow).hidden = false;
    }
    else {
        let toShow = 'trial-' + trialNumber
        document.getElementById(toShow).hidden = false;
    }
}


function startTrial() {
    document.getElementById('instructions').hidden = true;
    document.getElementById('practice').hidden = true;
    document.getElementById('practice-progress').hidden = true;
    document.getElementById('progress').hidden = false;
    document.getElementById('navigation').hidden = false;
    showTrial(currentPage);
}

let metadata = []
function complete() {
    hideTrial(currentPage);

    client.PostTasks(responses, workerId, assignmentId)
    .then(function() {
        metadata.push({})
        metadata[0].annotation = {}
        document.getElementById('navigation').hidden = true;
        document.getElementById('progress').hidden = true;
        let html = "<h1>Thank you!</h1>"
        html += "<h2 id='postQuestion'>Optional Post Questionnaire</h2>"
        let onclickRadio = "'recordMetadata(this.value,this.name)'";
        let onclickText = "'recordMetadataText(this.id,this.name)'";
        let buttonSet1 = new InputSet()
        buttonSet1.AddLabeledItem("radio", "yesMeta", "comprehension", "Yes", onclickRadio, "Yes")
        buttonSet1.AddLabeledItem("radio", "noMeta" , "comprehension", "No",  onclickRadio, "No")
        buttonSet1.AddLabeledItem("radio", "confusedMeta"   , "comprehension", "I was confused",    onclickRadio, "I was confused")

        html += "<div id='comprehensionMeta'>"
                        + "Did you read the instructions and do you think you completed the experiment to the best of your abilities?"
                        + "<br>"
                        + buttonSet1.ToHtml()
                        + "<br></div>"

        html += "<div id='ageMeta'><label for='age'>Age: </label><input type='number' id='age' min='18' max='110' name='age' onclick="+onclickText+"/><br><br></div>"

        let buttonSet2 = new InputSet()
        buttonSet2.AddLabeledItem("radio", "maleMeta", "sex", "Male", onclickRadio, "Male")
        buttonSet2.AddLabeledItem("radio", "femaleMeta" , "sex", "Female",  onclickRadio, "Female")
        buttonSet2.AddLabeledItem("radio", "otherMeta"   , "sex", "Other",    onclickRadio, "Other")

        html += "<div id='sexMeta'>"
                        + "Sex:"
                        + "<br>"
                        + buttonSet2.ToHtml()
                        + "<br></div>"
        let buttonSet3 = new InputSet()
        buttonSet3.AddLabeledItem("radio", "someHighMeta", "edu", "Some High School", onclickRadio)
        buttonSet3.AddLabeledItem("radio", "gradHighMeta" , "edu", "Graduated High School",  onclickRadio)
        buttonSet3.AddLabeledItem("radio", "someCollegeMeta"   , "edu", "Some College",    onclickRadio)
        buttonSet3.AddLabeledItem("radio", "gradCollegeMeta", "edu", "Graduated College", onclickRadio)
        buttonSet3.AddLabeledItem("radio", "higherMeta", "edu", "Higher Degree", onclickRadio)

        html += "<div id='eduMeta'>"
                        + "Level of Education:"
                        + "<br>"
                        + buttonSet3.ToHtml()
                        + "<br></div>"

        html += "<div id='langMeta'><label for='lang'>Native Languages (i.e. the language(s) spoken at home when you were a child) </label>"
        html += "<input type='text' id='lang' name='lang' onclick=" + onclickText + " /><br></div>"
        let buttonSet4 = new InputSet()
        buttonSet4.AddLabeledItem("radio", "worseMeta", "enjoy", "Worse than the Average Experiment", onclickRadio)
        buttonSet4.AddLabeledItem("radio", "avgMeta" , "enjoy", "An Average Experiment",  onclickRadio)
        buttonSet4.AddLabeledItem("radio", "betterMeta"   , "enjoy", "Better than the Average Experiment",    onclickRadio)

        html += "<div id='enjoyMeta'>"
                        + "Did you enjoy the experiment?"
                        + "<br>"
                        + buttonSet4.ToHtml()
                        + "<br></div>"
        html += "<div id='priceMeta'><label for='price'>What do you think is a fair amount of compensation for your participation in this experiment?</label>"
        html += "<input type='number' id='price' min='0' max='100' name='price' onclick="+onclickText+"/><br><br></div>"
        html += "<div id='problemsMeta'><label for='problems'>Were there any problems or glitches in the experiment? </label>"
        html += "<textarea id='problems' rows='2' cols='50' name='problems' onclick="+onclickText+" ></textarea><br><br></div>"
        html += "<div id='commentsMeta'><label for='comments'>Further comments </label>"
        html += "<textarea id='comments' rows='2' cols='50' name='comments' onclick="+onclickText+" ></textarea><br></div>"
        html += "<button class='button' id='finishMeta' onclick='submitMeta()'>Finish</button>"

        document.getElementById('submission').innerHTML = html;
        document.getElementById('submission').hidden = false;
    })
}

function recordMetadata(value, dictKey) {
    metadata[0].annotation[dictKey] = value;
}

function recordMetadataText(id, dictKey) {
    let curText = document.getElementById(id)
    curText.onkeyup = function (e) {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            metadata[0].annotation[dictKey] = curText.value;
        },500)
    }
}

function submitMeta() {
    client.PostMetadata(workerId, metadata)
    .then(response => response)
    .then(function() {
        document.getElementById('commentsMeta').hidden = true
        document.getElementById('problemsMeta').hidden = true
        document.getElementById('finishMeta').hidden = true
        document.getElementById('priceMeta').hidden = true
        document.getElementById('enjoyMeta').hidden = true
        document.getElementById('langMeta').hidden = true
        document.getElementById('eduMeta').hidden = true
        document.getElementById('sexMeta').hidden = true
        document.getElementById('ageMeta').hidden = true
        document.getElementById('comprehensionMeta').hidden = true
        document.getElementById('postQuestion').hidden = true

        let form = document.createElement('form');
        form.action = turkSubmitTo + "/mturk/externalSubmit?assignmentId=" + assignmentId + "&foo=bar";
        form.method = 'POST';
        form.innerHTML = '<input id="assignmentId" value="'+assignmentId+'">';
        document.body.append(form);
        form.submit()
}

function displayData() {
    if (currentPage > 0 && currentPage < maxPages) {
        document.getElementById('prevButton').disabled = false;
        document.getElementById('nextButton').disabled = false;
    }
}

document.onload = loadData()
