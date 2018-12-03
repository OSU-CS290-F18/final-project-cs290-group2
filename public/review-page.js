

/*
 *
 * Lines 8 - 90 == JS functionality for filter-bar
 * 
*/

function filterReviews(yearInput, reviewerInput, keywordInput) {
    var reviewArr = document.querySelectorAll(".review");
    var reviewContainer = document.getElementById("review-container");

    for(var i = 0; i < reviewArr.length; i++) {

        var onePaw = document.getElementById("rated-one");
        var twoPaw = document.getElementById("rated-two");
        var threePaw = document.getElementById("rated-three");
        var fourPaw = document.getElementById("rated-four");
        var fivePaw = document.getElementById("rated-five");
        var rating = reviewArr[i].getAttribute("data-rating");
        
        var year = reviewArr[i].getAttribute("data-date");

        var reviewer = reviewArr[i].getAttribute("data-user");

        var text = reviewArr[i].querySelector("p", "review-body").textContent;

        if(yearInput !== "") {
            if(year !== yearInput) {
                reviewContainer.removeChild(reviewArr[i]);
                continue; 
            }
        }

        if(reviewerInput !== "") {
            if(reviewer.toUpperCase() !== reviewerInput.toUpperCase()) {
                reviewContainer.removeChild(reviewArr[i]);
                continue;
            }
        }
         if(keywordInput !== "") {
            if(!(text.toLowerCase().includes(keywordInput.toLowerCase()))) {
                reviewContainer.removeChild(reviewArr[i]);
                continue;
            }
        }

        if(onePaw.checked || twoPaw.checked || threePaw.checked || fourPaw.checked || fivePaw.checked) {
            if(!onePaw.checked) {
                if(rating === "1") {
                    reviewContainer.removeChild(reviewArr[i]);
                    continue;
                }
            }
            if(!twoPaw.checked) {
                if(rating === "2") {
                    reviewContainer.removeChild(reviewArr[i]);
                    continue;
                }
            }
            if(!threePaw.checked) {
                if(rating === "3") {
                    reviewContainer.removeChild(reviewArr[i]);
                    continue;
                }
            }
            if(!fourPaw.checked) {
                if(rating === "4") {
                    reviewContainer.removeChild(reviewArr[i]);
                    continue;
                }
            }
            if(!fivePaw.checked) {
                if(rating === "5") {
                    reviewContainer.removeChild(reviewArr[i]);
                    continue;
                }
            }
        }       
    }
}

function getFilterChanges() {
    var yearInput = document.getElementById("year-field").value;
    var reviewerInput = document.getElementById("reviewer-field").value;
    var keywordInput = document.getElementById("text-field").value;
    filterReviews(yearInput, reviewerInput, keywordInput);
}

var applyChangesButton = document.getElementById("update-button");
applyChangesButton.addEventListener("click", getFilterChanges);

/*
 *
 * Lines 97- 
 * 
*/
function clearReviewFields() {
    document.getElementById("name-field").value = "";
    document.getElementById("icon-field").value = "";
    document.getElementById("review-field").value = "";
    document.getElementById("rate-one").checked = false;
    document.getElementById("rate-two").checked = false;
    document.getElementById("rate-three").checked = false;
    document.getElementById("rate-four").checked = false;
    document.getElementById("rate-five").checked = false;
}

function createReview(usernameInput, iconURLInput, textInput, yearPosted) {
    var reviewContainer = document.getElementById("review-container");

    
    var rateOne = document.getElementById('rate-one');
    var rateTwo = document.getElementById('rate-two');
    var rateThree = document.getElementById('rate-three');
    var rateFour = document.getElementById('rate-four');
    var rateFive = document.getElementById('rate-five'); 
    var rateOptionArr = [rateOne, rateTwo, rateThree, rateFour, rateFive];
    var rateInput = 0;
    for(var i = 0; i < (rateOptionArr.length); i++) {
        if(rateOptionArr[i].checked === true) {
            rateInput = rateOptionArr[i].value;
        }
    }
    console.log(rateInput);
    if(usernameInput === "") {
        usernameInput = "Anonymous"
    }   
    if(iconURLInput === "") {
        iconURLInput = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStNsFRsJIPLrA-EgsJ0SE6BRFiy6v8-kGIbpiZzYAxm6dPJtny2w";
    }
    if((textInput === "") || (rateInput === 0)) {
        alert("Review text and paw-rating required to leave a review.");
    }
    else{
        var reviewDiv = document.createElement("div");
        reviewDiv.classList.add("review");

        var headerDiv = document.createElement("div");
        headerDiv.classList.add("review-header");
        reviewDiv.appendChild(headerDiv);

        var userIconIMG = document.createElement("img");
        userIconIMG.classList.add("user-icon");
        userIconIMG.src = iconURLInput;
        headerDiv.appendChild(userIconIMG);

        var postedBy = document.createElement("span");
        postedBy.classList.add("text");
        postedBy.textContent = "Posted By: ";
        var user = document.createElement("span");
        user.classList.add("user");
        user.textContent = usernameInput;
        reviewDiv.setAttribute("data-user", usernameInput);
        postedBy.appendChild(user);
        headerDiv.appendChild(postedBy);


        var pawDiv = document.createElement("div");
        pawDiv.classList.add("paws");
        var pawOne = document.createElement("span");
        pawOne.textContent = "X";
        pawDiv.appendChild(pawOne);
        var pawTwo = document.createElement("span");
        pawTwo.textContent = "X";
        pawDiv.appendChild(pawTwo);
        var pawThree = document.createElement("span");
        pawThree.textContent = "X";
        pawDiv.appendChild(pawThree);
        var pawFour = document.createElement("span");
        pawFour.textContent = "X";
        pawDiv.appendChild(pawFour);
        var pawFive = document.createElement("span");
        pawFive.textContent = "X";
        pawDiv.appendChild(pawFive);

        var pawArr = [pawOne, pawTwo, pawThree, pawFour, pawFive];
        for(var i = 0; i < rateInput; i++) {
            pawArr[i].classList.add("checked");
        }

        reviewDiv.setAttribute('data-rating', rateInput);
        headerDiv.appendChild(pawDiv);

        var reviewBody = document.createElement("p");
        reviewBody.classList.add("review-body");
        reviewBody.textContent = textInput;
        reviewDiv.appendChild(reviewBody);

        reviewContainer.appendChild(reviewDiv);

        clearReviewFields();
    }
}

function getReviewInput() {
    var usernameInput = document.getElementById("name-field").value;
    var iconURLInput = document.getElementById("icon-field").value;
    var textInput = document.getElementById("review-field").value;

    var date = new Date();
    var yearPosted = date.getFullYear();
    createReview(usernameInput, iconURLInput, textInput, yearPosted); 
}

var submitReviewButton = document.getElementById("submit-review");
submitReviewButton.addEventListener("click", getReviewInput);