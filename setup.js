var currentDefinition = 0
var maxDefinitions = 7;
var maxPracticeTrials = 0;

function example() {
    document.getElementById('instructions').hidden = true;
    document.getElementById('example').hidden = false;
}

function definitions() {
    document.getElementById('instructions').hidden = true;
    document.getElementById('definitions').hidden = false;
    document.getElementById("def-navigation").hidden = false;

    let norm = "<div id='def-0'><img src='static/normative_example.jpg' alt='normative example'><br>"
    norm += "Some uses of \"big\" are when the speaker compares the object to the object's category in general (\"snowmen\").<br>"
    norm += "In this example, the speaker is pointing out a \"big snowman\" to say that the present snowman is larger than other snowmen "
    norm += "in general. We will call these uses of big in comparison to the <b>Category</b>."

    let normNode = document.createElement('div');
    normNode.innerHTML = norm;
    document.getElementById('definitions').appendChild(normNode)
    let normModalNode = normNode.cloneNode(true);
    normModalNode.children[0].hidden = false;
    document.getElementById('modal-content-def').appendChild(normModalNode)

    let norm_agent = "<div id='def-1' hidden=true><img src='static/normative_agent_example.jpg' alt='normative agent example'><br>"
    norm_agent += "Sometimes the speaker may be talking to a child and call something \"big\" if the object is big given the child's "
    norm_agent += "size or abilities, but this object would not normally be considered big.<br>"
    norm_agent += "In this example, perhaps the child constructed the snowman, and even though it might be a rather small snowman, the speaker "
    norm_agent += "may tell the child that it is a \"big\" snowman compared to what the child could have made. We will call these uses "
    norm_agent += "<b>Big for the Child</b>."

    let normAgentNode = document.createElement('div');
    normAgentNode.innerHTML = norm_agent;
    document.getElementById('definitions').appendChild(normAgentNode)
    let normAgentModalNode = normAgentNode.cloneNode(true);
    normAgentModalNode.children[0].hidden = false;
    document.getElementById('modal-content-def').appendChild(normAgentModalNode)

    let percSame = "<div id='def-2' hidden=true><img src='static/perceptual_same_example.jpg' alt='perceptual same example'><br>"
    percSame += "<b>Perceptual - Same Category</b> uses of an adjective are when the object is physically present in the context along with "
    percSame += "other instances of the same kind of object, and the object the speaker is referring to is bigger than those around it. <br>"
    percSame += "In this example, the speaker is pointing out that the blue snowman is bigger than the other ones in the context.<br>"
    percSame += "Notice that something can be perceptually bigger and <i>also</i> big for its <b>Category</b>, if that object on its own would still be "
    percSame += "considered big."

    let percSameNode = document.createElement('div');
    percSameNode.innerHTML = percSame;
    document.getElementById('definitions').appendChild(percSameNode)
    percSameModalNode = percSameNode.cloneNode(true);
    percSameModalNode.children[0].hidden = false;
    document.getElementById('modal-content-def').appendChild(percSameModalNode)

    let percDiff = "<div id='def-3' hidden=true><img src='static/perceptual_diff_example.jpg' alt='perceptual diff example'><br>"
    percDiff += "<b>Perceptual - Different Category</b> uses of an adjective are when the object is physically present in the context together "
    percDiff += "with other kinds of objects, and the object the speaker is referring to is bigger than those around it. <br>"
    percDiff += "In this example, the speaker is pointing out that the snowman is big, given the tree that is next to it.<br>"
    percDiff += "Again, an object may be big for its <b>Category</b> and <b>Perceptually</b> big at the same time, but this is not necessarily the case (the tree could "
    percDiff += "be a very small tree and the snowman a normal sized snowman, which would make the snowman perceptually big, but not compared to its category."

    let percDiffNode = document.createElement('div');
    percDiffNode.innerHTML = percDiff;
    document.getElementById('definitions').appendChild(percDiffNode)
    let percDiffModalNode = percDiffNode.cloneNode(true);
    percDiffModalNode.children[0].hidden = false;
    document.getElementById('modal-content-def').appendChild(percDiffModalNode)

    let func = "<div id='def-4' hidden=true><img src='static/functional_example.jpg' alt='function example'><br>"
    func += "<b>Functional</b> uses of an adjective are when there is an implicit goal or task to be achieved and the object is somehow not "
    func += "suitable for that task.<br> In this example, the speaker implies that the goal is to put the snowman in the basket, but this "
    func += "cannot be achieved because the snowman is too big to fit in that basket."

    let funcNode = document.createElement('div');
    funcNode.innerHTML = func;
    document.getElementById('definitions').appendChild(funcNode)
    let funcModalNode = funcNode.cloneNode(true);
    funcModalNode.children[0].hidden = false;
    document.getElementById('modal-content-def').appendChild(funcModalNode)

    let direct = "<div id='def-5' hidden=true><img src='static/direct_comparison_example.jpg' alt='direct comparison example'><br>"
    direct += "<b>Direct Comparison</b> uses are when the object is explicitly compared to another object.<br>"
    direct += "In this example, the speaker is explicitly pointing out the big snowman and the little snowman, thus comparing them by size.<br>"
    direct += "Most <b>Direct Comparisons</b> are also examples of <b>Perceptual-Same</b> uses."

    let directNode = document.createElement('div');
    directNode.innerHTML = direct
    document.getElementById('definitions').appendChild(directNode)
    let directModalNode = directNode.cloneNode(true);
    directModalNode.children[0].hidden = false;
    document.getElementById('modal-content-def').appendChild(directModalNode)

    let referentDefinition = "<div id='def-6' hidden=true><h2>The object being described as \"big\" could be one of the following:</h2><br>"
    referentDefinition += "<b>Physically present</b> - This means the object is something tangible that both speaker and listener can see. "
    referentDefinition += "We also want you to pay attention if someone is pointing at the object, if the speaker is looking at the object "
    referentDefinition += "when speaking, and if the listener is looking at the object when the speaker is speaking. If the video is not clear, "
    referentDefinition += "then you can say that you can't tell.<br><br>"
    referentDefinition += "<b>Picture book</b> - The object is drawn or described in a book the child is reading. "
    referentDefinition += "We also want you to pay attention if someone is pointing at the object, if the speaker is looking at the object "
    referentDefinition += "when speaking, and if the listener is looking at the object when the speaker is speaking. If the video is not clear, "
    referentDefinition += "then you can say that you can't tell.<br><br>"
    referentDefinition += "<b>Known to both speaker and listener</b> - The object being discussed is not physically present, but both participants in the "
    referentDefinition += "conversation know what that object is.<br><br>"
    referentDefinition += "<b>Known to just speaker</b> - The object the speaker is talking about is not known to the listener. For example, if the mother is "
    referentDefinition += "talking about badminton, the child (the listener) may not know what that is and this might be evident by the child explicitly "
    referentDefinition += "asking what badminton is or not engaging in the conversation. If the child is not engaging, we can make a reasonable assumption "
    referentDefinition += "that something like badminton would not be known to a toddler, but objects like balls or trucks would be known.<br><br>"
    referentDefinition += "<b>Known to just listener</b> - In this case, the speaker is repeating back to the listener the object, perhaps with a questioning "
    referentDefinition += "tone, indicating that the listener knows what the object is, but the speaker might not. Consider the following exchange: <br>"
    referentDefinition += "&emsp;&emsp;Person A: \"Look at this big gloop!\"<br>"
    referentDefinition += "&emsp;&emsp;Person B: \"big gloop? What's that?\"<br>In this case, when Person B is the speaker, "
    referentDefinition += "the object \"gloop\" is known only to the listener.<br><br>"
    referentDefinition += "<b>Known to neither</b> - This is a similar categorization as above, but in this case, neither speaker nor listener know what the "
    referentDefinition += "object is.<br><br>"
    referentDefinition += "<b>Something nonspecific</b> - Perhaps the object being called \"big\" doesn't fit nicely into any of the above categories. It "
    referentDefinition += "might be something nonspecific. Consider the following sentence, \"Her big thing these days is eating cheese.\" In this case, "
    referentDefinition += "\"thing\" is rather vague and would be considered something nonspecific. Often, objects that are nonspecific, would be paired with "
    referentDefinition += "non-size uses of the word \"big\"."

    let referentNode = document.createElement('div');
    referentNode.innerHTML = referentDefinition
    document.getElementById('definitions').appendChild(referentNode)
    let referentModalNode = referentNode.cloneNode(true);
    referentModalNode.children[0].hidden = false;
    document.getElementById('modal-content-def').appendChild(referentModalNode)

    let annoDiagram = "<div id='def-7' hidden=true><h2>Here's what the trials will look like</h2>"
    annoDiagram += "<img src='static/annotation_help.png' alt='annotation example'>"

    let annoNode = document.createElement('div');
    annoNode.innerHTML = annoDiagram
    document.getElementById('definitions').appendChild(annoNode)

    setTimeout(function() {
        document.getElementById('nextButtonDef').disabled = false;
    }, 10000);
}

function nextDefinition() {
    document.getElementById('nextButtonDef').disabled = true;
    let timerAmount = 10000;
    if (currentDefinition < maxDefinitions) {
        if (document.getElementById('prevButtonDef').disabled) {
            document.getElementById('prevButtonDef').disabled = false
        }
        if (currentDefinition >= 0) {
            let toHide = "def-"+currentDefinition
            document.getElementById(toHide).hidden = true
        }
        currentDefinition += 1;
        if (currentDefinition == 6) {
            timerAmount = 30000;
        }

        if (currentDefinition >= maxDefinitions) {
            document.getElementById('nextButtonDef').onclick = practice;
            document.getElementById('nextButtonDef').innerHTML = "Practice &raquo;"
        }

        let toShow = "def-"+currentDefinition
        document.getElementById(toShow).hidden = false
    }
    setTimeout(function() {
        document.getElementById('nextButtonDef').disabled = false;
    }, timerAmount);
}


function previousDefinition() {
    if (currentDefinition > 0) {
        if (document.getElementById('nextButtonDef').disabled) {
            document.getElementById('nextButtonDef').disabled = false
        }
        if (currentDefinition <= maxDefinitions) {
            let toHide = 'def-'+currentDefinition
            document.getElementById(toHide).hidden = true
        }
        currentDefinition -= 1;

        if (currentDefinition < maxDefinitions) {
            document.getElementById('nextButtonDef').onclick = nextDefinition;
            document.getElementById('nextButtonDef').innerHTML = "Next &raquo;"
        }
        if (currentDefinition == 0) {
            document.getElementById('prevButtonDef').disabled = true;
        }

        let toShow = "def-"+currentDefinition
        document.getElementById(toShow).hidden = false
    }
}

let practice_responses = [];
function practice() {
    let data = client.GetPractice()
    .then(response => response.json())
    .then(function(json_data_p) {
        maxPracticeTrials = json_data_p.length;
        for(let i = 0; i < json_data_p.length; i++) {
            let trial = i+1;
            practice_responses.push(json_data_p[i]);
            practice_responses[i].annotation = {};

            contextHtml = setUpHeading(i, trial, 'practice-trial-', maxPages);
            contextHtml += "<div class='top'><div class='float-top'>"+displayContext(i, json_data_p[i], 'practice-trial-')+"</div>"
            // we do not need to send the context back.
            practice_responses[i].context = null;
            contextHtml += "<div class='float-bottom'>"+displayTarget(json_data_p[i])
            contextHtml += "<div class='annotationCategory' id='trueanno"+i+"'>"+ccKind(i, true)+"</div></div>"
            nextButton = "<div class='button-div' id='btn-next-practice'>"+
                         "<button class='button' id='btn-next-practice-"+trial+"' onclick=gotoNextPractice("+i+") disabled=true>Next &raquo;</button>"+
                         "</div>"
            contextHtml += nextButton;
            contextHtml += "</div><!-- End Trial " + i + " -->";

            let node = document.createElement('div');
            node.innerHTML = contextHtml;

            document.getElementById('practice').appendChild(node)
            if (i == 0) {
                document.getElementById("functional0").checked = true;
                practice_responses[i].annotation["ccKind"] = ["functional"]
                document.getElementById("correctness0").innerHTML = "The goal is to fit the hat on the potato head, but this hat is too big."
                document.getElementById("correctness0").style.backgroundColor = "green";
                document.getElementById("within-anno").disabled = false;
            }
        }
        document.getElementById('practice').hidden = false
        document.getElementById('practice-trial-0').hidden = false
        document.getElementById('example').hidden = true;
        document.getElementById('btn-next-practice').hidden = false
        document.getElementById('definitions').hidden = true;
        document.getElementById('def-navigation').hidden = true;
        document.getElementById('practice').hidden = false;
        document.getElementById('practice-progress').hidden = false;

        var html = "<div class='button-div'>"
        html += "<span class='navSpan'><button class='button review' id='def-reminder' onclick=popupDefinitions()>Review Definitions</button></span>"
        for (var i = 0; i < json_data_p.length; i++) {
            html += "<span class='navSpan'><button class='button circle' id='practice-progress"+i+"'>"+(i+1)+"</button></span>"
        }
        html += "<span class='navSpan'><button class='button review' id='def-faq' onclick=faq()>FAQ</button></span>"

        document.getElementById('practice-progress').innerHTML = html;
    });
}

function popupDefinitions() {
    document.getElementById("modal-def").style.display = "block";
}

function faq() {
    document.getElementById("modal-faq").style.display = "block";
}

function closeModal() {
    document.getElementById("modal-def").style.display = "none";
    document.getElementById("modal-faq").style.display = "none";
}

window.onclick = function(event) {
    if(event.target == document.getElementById("modal-def")) {
        document.getElementById("modal-def").style.display = "none";
    }
    if(event.target == document.getElementById("modal-faq")) {
        document.getElementById("modal-faq").style.display = "none";
    }
}

function setUpHeading(i, trial, base_id, maxPages) {
    let html = '<div id="' + (base_id+i) + '" hidden=true>';
    if (base_id.includes('practice') && i == 0) {
        html += '<h1>This one is done for you</h1>';
    }
    else if (base_id.includes('practice')){
        html += '<h1>Your turn!</h1>';
    }
    return html;
}

function displayContext(i, data, base_id) {
    let html = '<div class="context" id="' + (base_id+i) + '-context">'
    let address = "https://crowdsourcing.sinelki.com:60985/api/tasks/media/?mediaId="+data.id
    html += '<video id="video-' + (base_id+i) + '" src="' + address + '" width="480" height="320" controls playsinline>'
    html += '<source src="'+address+'" type="video/mp4"> '
    html += '<p>Your browser does not support HTML5 videos</p>'
    html += '</video>'
    for(j = 0; j < data.context.context.length; j++) {
        if (j == data.context.focusBegin) {
            html += '<div><b>'+data.context.context[j]+'</b></div>';
        }
        else {
            html += '<div>'+data.context.context[j]+'</div>'
        }
    }

    html += '</div><!-- End trial context -->'
    return html;
}

function displayTarget(data) {
    return "<br><div class='question'>Thinking about the sentence<br><b>" + data.phrase.phrase + "</b>:<br><br></div>"
}


function referentKind(i, practice) {
    let buttonSet1 = new InputSet()
    let refName = "ref"+i
    let onclick = "'annotateReferentKind("+i+", this.value,"+practice+")'";

    buttonSet1.AddLabeledItem("radio", "Physically copresent"+i, refName, "Physically copresent"              , onclick, "Physically present")

    let fieldset1 = new InputSet()
    fieldset1.AddItem("checkbox", "Physically copresent someone pointing" + i, "Physically copresent someone pointing", onclick, "Someone is pointing at the object")
    fieldset1.AddItem("checkbox", "Physically copresent speaker looking" + i, "Physically copresent speaker looking", onclick, "Speaker is looking at the object")
    fieldset1.AddItem("checkbox", "Physically copresent listener looking" + i, "Physically copresent listener looking", onclick, "Listener is looking at the object")
    fieldset1.AddItem("checkbox", "Physically copresent cant tell" + i, "Physically copresent cant tell", onclick, "Can't tell")

    let buttonSet2 = new InputSet()
    buttonSet2.AddLabeledItem("radio", "Picture book"+i        , refName, "Picture book"                      , onclick)

    let fieldset2 = new InputSet()
    fieldset2.AddItem("checkbox", "Picture book someone pointing" + i, "Picture book someone pointing", onclick, "Someone is pointing at the object")
    fieldset2.AddItem("checkbox", "Picture book speaker looking" + i, "Picture book speaker looking", onclick, "Speaker is looking at the object")
    fieldset2.AddItem("checkbox", "Picture book listener looking" + i, "Picture book listener looking", onclick, "Listener is looking at the object")
    fieldset2.AddItem("checkbox", "Picture book cant tell" + i, "Picture book cant tell", onclick, "Can't tell")

    let buttonSet3 = new InputSet()
    buttonSet3.AddLabeledItem("radio", "Known to both speaker and listener"+i, refName, "Known to both speaker and listener", onclick)
    buttonSet3.AddLabeledItem("radio", "Known to just speaker"+i    , refName, "Known to just speaker"             , onclick)
    buttonSet3.AddLabeledItem("radio", "Known to just listener"+i   , refName, "Known to just listener"            , onclick)
    buttonSet3.AddLabeledItem("radio", "Known to neither"+i    , refName, "Known to neither"                  , onclick)
    buttonSet3.AddLabeledItem("radio", "Nonspecific referent"+i, refName, "Nonspecific referent"              , onclick, "Something nonspecific")

    let selection = "<div class='referentKind' id='referentKind-"+i+"'>"
                    + "The object described as \"big\" is..."
                    + "<br>"
                    + buttonSet1.ToHtml()
                    + "<div style='text-align:right;padding:none'><i>In the moment right before the bolded sentence is spoken, which is true?</i><br></div>"
                    + fieldset1.ToHtml(true) + "<hr>"
                    + buttonSet2.ToHtml()
                    + "<div style='text-align:right;padding:none'><i>In the moment right before the bolded sentence is spoken, which is true?</i><br></div>"
                    + fieldset2.ToHtml(true) + "<hr>"
                    + buttonSet3.ToHtml(false, true)
                    + "</div>"
                    + "<div class='intra-anno-btn'><div id='correctness"+i+"'></div>"
                    + "<button class='button' id='prev-within-anno' onclick='ccKind("+i+","+practice+", true)'>&laquo;</button>"
                    + "<button class='button' id='within-anno' onclick=sentenceFunction("+i+","+practice+") disabled=true>&raquo;</button></div>"
    if (practice) {
        document.getElementById(practice.toString()+"anno"+i).innerHTML = selection;
        if (practice_responses[i].annotation['referentKind'] != undefined) {
            let selectedItem = practice_responses[i].annotation['referentKind']
            document.getElementById(selectedItem+i).checked = true;
            annotateReferentKind(i,selectedItem,practice)
        }
        if (i == 0) {
            practice_responses[i].annotation['referentKind'] = "Physically copresent"
            document.getElementById("Physically copresent0").checked = true;
            document.getElementById("Physically copresent speaker looking0").checked = true;
            document.getElementById("Physically copresent listener looking0").checked = true;
            document.getElementById("correctness0").innerHTML = "The toy potato and toy hat are physically present, and both speaker and listener are looking at the hat."
            document.getElementById("correctness0").style.backgroundColor = "green";
            document.getElementById("within-anno").disabled = false;
        }
    }
    else {
        document.getElementById('anno'+i).innerHTML = selection;
        if (responses[i].annotation['referentKind'] != undefined) {
            document.getElementById('within-anno').disabled = false;
            let selectedItem = responses[i].annotation['referentKind']
            document.getElementById(selectedItem+i).checked = true;
        }
    }
    return selection;
}

function ccKind(i, practice, reset) {
    let onclick = "'annotateCCKind("+i+", this.value,"+practice+")'";
    let fieldset = new InputSet()
    fieldset.AddItem("checkbox", "perceptual-same" + i, "perceptual-same", onclick, "Other objects of the same type, physically present<br>(Perceptual - Same Category)")
    fieldset.AddItem("checkbox", "perceptual-diff" + i, "perceptual-diff", onclick, "Other objects of a different type, physically present<br>(Perceptual - Different Category)")
    fieldset.AddHtmlTag("<hr>")
    fieldset.AddItem("checkbox", "normative-agent" + i, "normative-agent", onclick, "The child's size or capabilities<br>(Big for the Child)")
    fieldset.AddItem("checkbox", "normative-tree" + i, "normative-tree", onclick, "The typical object<br>(Category)")
    fieldset.AddHtmlTag("<hr>")
    fieldset.AddItem("checkbox", "functional" + i, "functional", onclick, "The ideal object for the specified task<br>(Functional)")
    fieldset.AddHtmlTag("<hr>")
    fieldset.AddItem("checkbox", "direct comparison" + i, "direct comparison", onclick, "Direct Comparison (object is directly contrasted with another object)")
    fieldset.AddItem("checkbox", "none" + i, "none", onclick, "Not applicable - this is not a reference to the size of an object.")

    let selection = "<div class='ccKind' id=ccKind-"+i+"'>"
                    + fieldset.ToFieldsetHtml("The speaker is comparing the object to")
                    + "</div>"
                    + "<div class='intra-anno-btn'><div id='correctness"+i+"'></div><button class='button' id='within-anno' onclick=referentKind("+i+","+practice+") disabled=true>&raquo;</button></div>"
    if (practice) {
        if (reset) { 
            document.getElementById(practice.toString()+"anno"+i).innerHTML = selection; 
        }
        if (practice_responses.length > 0 && practice_responses[i].annotation['ccKind'] != undefined) {
            for (let j = 0; j < practice_responses[i].annotation['ccKind'].length; j++) {
                let selectedItem = practice_responses[i].annotation['ccKind'][j]
                document.getElementById(selectedItem+i).checked = true;
                annotateCCKind(i,selectedItem,practice)
            }
        }
    }
    else {
        if (reset) { document.getElementById('anno'+i).innerHTML = selection; }
        if (responses.length > 0 && responses[i].annotation['ccKind'] != undefined) {
            document.getElementById('within-anno').disabled = false;
            for (let j = 0; j < responses[i].annotation['ccKind'].length; j++) {
                let selectedItem = responses[i].annotation['ccKind'][j]
                document.getElementById(selectedItem+i).checked = true;
            }
        }
    }

    return selection;
}

function syntacticFrames(i,practice) {
    let onclick = "'annotateSyntacticFrames("+i+", this.value,"+practice+")'";
    let buttonSet = new InputSet()
    buttonSet.AddLabeledItem("radio", "Prenominal"+i, "sf"+i, "Prenominal", onclick, "\"big\" directly before modified object (i.e. 'big dog')")
    buttonSet.AddLabeledItem("radio", "Predicate" +i, "sf"+i, "Predicate" , onclick, "\"big\" separated from modified object (i.e. 'dog is big')")
    buttonSet.AddLabeledItem("radio", "Other"     +i, "sf"+ i, "Other"    , onclick, "Other")

    let selection = "<div class='referentKind' id='referentKind-"+i+"'>"
                    + "The sentence form is closest to..."
                    + "<br>"
                    + buttonSet.ToHtml()
                    + "</div>"
                    + "<div class='intra-anno-btn'><div id='correctness"+i+"'></div>"
                    + "<button class='button' id='prev-within-anno' onclick=syntacticProperties("+i+","+practice+")>&laquo;</button>"
                    + "</div>"
    if (practice) {
        document.getElementById(practice.toString() +'anno'+i).innerHTML = selection;
        if (practice_responses[i].annotation['syntacticFrames'] != undefined) {
            let selectedItem = practice_responses[i].annotation['syntacticFrames']
            document.getElementById(selectedItem+i).checked = true;
            annotateSyntacticFrames(i,selectedItem,practice)
        }
        if (i == 0) {
            document.getElementById("Predicate0").checked = true;
            practice_responses[i].annotation['syntacticFrames'] = "Predicate"
            document.getElementById("correctness0").innerHTML = "'big' modifies 'that', and the construction is 'that is big'"
            document.getElementById("correctness0").style.backgroundColor = "green";
            document.getElementById("btn-next-practice-1").disabled = false;
            updateProgress(0, true)
        }
    }
    else {
        document.getElementById('anno'+i).innerHTML = selection;
        if (responses[i].annotation['syntacticFrames'] != undefined) {
            let selectedItem = responses[i].annotation['syntacticFrames']
            document.getElementById(selectedItem+i).checked = true;
        }
    }
    return selection;
}

function syntacticProperties(i,practice) {
    let onclick = "'annotateSyntacticProperties("+i+", this.value,"+practice+")'";
    let fieldset = new InputSet()
    fieldset.AddItem("checkbox", "intensifier" + i, "intensifier", onclick, "intensifier (such as 'too', 'very', 'so', 'really', etc)")
    fieldset.AddItem("checkbox", "additional adjective" + i, "additional adjective", onclick, "additional adjective (such as 'red', 'painted', etc)")
    fieldset.AddItem("checkbox", "antonym present" + i, "antonym present", onclick, "antonym ('small')")

    let buttonSet = new InputSet()
    buttonSet.AddLabeledItem("radio", "basic"   + i, "sp"+i, "basic"  , onclick, "The most natural label for the noun<br>(i.e. 'shark')")
    buttonSet.AddLabeledItem("radio", "super"   + i, "sp"+i, "super"  , onclick, "Higher level categorization<br>(i.e. 'animal')")
    buttonSet.AddLabeledItem("radio", "sub"     + i, "sp"+i, "sub"    , onclick, "More specific description<br>(i.e. 'Great White')")
    buttonSet.AddLabeledItem("radio", "pronoun" + i, "sp"+i, "pronoun", onclick, "Pronoun")
    buttonSet.AddLabeledItem("radio", "no noun" + i, "sp"+i, "no noun", onclick, "No noun present")

    let selection = "<div class='ccKind' id=ccKind-"+i+"'>"
                    + fieldset.ToFieldsetHtml("The sentence contains an (could be none)")
                    + "<hr>The object described as \"big\" is referred to with..."
                    + "<br>"
                    + buttonSet.ToHtml()
                    + "</div>"
                    + "<div class='intra-anno-btn'>"
                    + "<div id='correctness"+i+"'></div>"
                    + "<button class='button' id='prev-within-anno' onclick=sentenceFunction("+i+","+practice+")>&laquo;</button>"
                    + "<button  class='button' id='within-anno' onclick=syntacticFrames("+i+","+practice+") disabled=true>&raquo;</button></div>"
    if (practice) {
        document.getElementById(practice.toString() + 'anno'+i).innerHTML = selection;
        if (practice_responses.length > 0 && practice_responses[i].annotation['syntacticProperties'] != undefined) {
            for (let j = 0; j < practice_responses[i].annotation['syntacticProperties'].length; j++) {
                let selectedItem = practice_responses[i].annotation['syntacticProperties'][j]
                document.getElementById(selectedItem+i).checked = true;
                annotateSyntacticProperties(i,selectedItem,practice)
            }
        }
        if (i == 0) {
            document.getElementById("intensifier0").checked = true;
            document.getElementById("pronoun0").checked = true;
            practice_responses[i].annotation['syntacticProperties'] = ["intensifier", "pronoun"]
            document.getElementById("correctness0").innerHTML = "'too' is an intensifier (as are 'very', 'so', etc.) and we are referencing the hat with the pronoun 'that'"
            document.getElementById("correctness0").style.backgroundColor = "green";
            document.getElementById("within-anno").disabled = false;
        }
    }
    else {
        document.getElementById('anno'+i).innerHTML = selection;
        if (responses.length > 0 && responses[i].annotation['syntacticProperties'] != undefined) {
            document.getElementById('within-anno').disabled = false;
            for (let j = 0; j < responses[i].annotation['syntacticProperties'].length; j++) {
                let selectedItem = responses[i].annotation['syntacticProperties'][j]
                document.getElementById(selectedItem+i).checked = true;
                annotateSyntacticProperties(i,selectedItem,practice)
            }
        }
    }
    return selection;
}

function sentenceFunction(i, practice) {
    let onclick = "'annotateSentenceFunction("+i+", this.value,"+practice+")'";
    let buttonSet = new InputSet()
    buttonSet.AddLabeledItem("radio", "Declarative"+i, "sentFunc"+i, "Declarative", onclick, "Statement")
    buttonSet.AddLabeledItem("radio", "Imperative"+i , "sentFunc"+i, "Imperative",  onclick, "Command")
    buttonSet.AddLabeledItem("radio", "Question"+i   , "sentFunc"+i, "Question",    onclick)
    buttonSet.AddLabeledItem("radio", "Other"+i      , "sentFunc"+i, "Other",       onclick)

    let selection = "<div class='referentKind' id='referentKind-"+i+"'>"
                    + "The sentence is a..."
                    + "<br>"
                    + buttonSet.ToHtml()
                    + "</div>"
                    + "<div class='intra-anno-btn'><div id='correctness"+i+"'></div>"
                    + "<button class='button' id='prev-within-anno' onclick=referentKind("+i+","+practice+")>&laquo;</button>"
                    + "<button class='button' id='within-anno' onclick=syntacticProperties("+i+","+practice+") disabled=true>&raquo;</button></div>"
    if (practice) {
        document.getElementById(practice.toString() +'anno'+i).innerHTML = selection;
        if (practice_responses[i].annotation['sentenceFunction'] != undefined) {
            let selectedItem = practice_responses[i].annotation['sentenceFunction']
            document.getElementById(selectedItem+i).checked = true;
            annotateSentenceFunction(i,selectedItem,practice)
        }
        if (i == 0) {
            document.getElementById('Declarative0').checked = true;
            practice_responses[i].annotation['sentenceFunction'] = "Declarative"
            document.getElementById("correctness0").innerHTML = "This is a statement."
            document.getElementById("correctness0").style.backgroundColor = "green"
            document.getElementById("within-anno").disabled = false;
        }
    }
    else {
        document.getElementById('anno'+i).innerHTML = selection;
        if (responses[i].annotation['sentenceFunction'] != undefined) {
            document.getElementById('within-anno').disabled = false;
            let selectedItem = responses[i].annotation['sentenceFunction']
            document.getElementById(selectedItem+i).checked = true;
        }
    }
    return selection;
}


function validate(index) {
    if (practice_responses[index].annotation.genericity !== undefined && practice_responses[index].annotation.category !== undefined) {
        let result = fetch('https://crowdsourcing.sinelki.com:60985/api/practice/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: "[" + JSON.stringify(practice_responses[index]) + "]"
        })
        .then(response => response.json())
        .then(function(feedback) {
            let genFeedback = feedback[0];
            let catFeedback = feedback[1];
            document.getElementById('genCorrectness-'+index).innerHTML = genFeedback[0];
            if (genFeedback[0].includes("Good job")) {
                document.getElementById('genCorrectness-'+index).style.color = "green";
            }
            else {
                document.getElementById('genCorrectness-'+index).style.color = "red";
            }
            document.getElementById('catCorrectness-'+index).innerHTML = catFeedback[0];
            if (catFeedback[0].includes("Good job")) {
                document.getElementById('catCorrectness-'+index).style.color = "green";
            }
            else {
                document.getElementById('catCorrectness-'+index).style.color = "red";
            }

            document.getElementById('practiceExplanation-'+index).innerHTML = genFeedback[1]+"<br>"+catFeedback[1];
            if (genFeedback[0].includes("Good job") && catFeedback[0].includes("Good job") ) {
                document.getElementById('btn-next-practice-'+(index+1)).disabled = false;
            }
        });
    }
}

function gotoNextPractice(index) {
    if (index == maxPracticeTrials - 1) {
        startTrial('btn-next-practice-'+maxPracticeTrials)
    }
    else {
        hideTrial(index, true)
        showTrial(index+1, true)

        if (index >= maxPracticeTrials-2) {
            document.getElementById('btn-next-practice-'+maxPracticeTrials).innerHTML = "Start Trials";
        }
        document.getElementById('nextButton').disabled = false;
    }
}


class InputSet {
    constructor() {
        this.items = []
    }

    AddItem(type, id, value, func, content) {
        this.items.push(InputSet.MakeField(type, id, value, func, "", content))
    }

    AddLabeledItem(type, id, name, value, func, content) {
        let field = InputSet.MakeField(type, id, value, func, name, content)

        if (content === undefined) {
            content = value
        }

        let fieldLabel = InputSet.MakeLabel(id, content)
        this.items.push(field + fieldLabel)
    }

    AddHtmlTag(tag) {
        this.items.push(tag)
    }

    static MakeField(type, id, value, func, name, content) {
        let field = ""
        field += "<input"
        field += " type='" + type + "'"
        field += " id='"   + id   + "'"
        if (name != "") {
            field += " name='" + name + "'"
        }
        field += " value='"  + value + "'"
        field += " onclick=" + func
        field += ">"
        if (type != "radio") {
            field += content
        }

        return field
    }

    static MakeLabel(id, content) {
        let label  = "<label"
        label += " for='" + id + "'"
        label += ">"
        label += content
        label += "</label>"

        return label
    }

    ToFieldsetHtml(legend) {
        let html = ""
        html += "<fieldset>"
        html += "<legend>" + legend + "</legend>"

        return html + this.ToHtml()
    }

    ToHtml(indented,horizontal) {
        let html = ""
        for (let i = 0; i < this.items.length; ++i) {
            if (indented) {
                html += "&emsp;&emsp;"
            }
            html += this.items[i]
            if (horizontal) {
                html += "<hr>"
            }
            else {
                html += "<br>"
            }
        }

        return html
    }
}
