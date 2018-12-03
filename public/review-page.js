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
        var newReviewContext = {
            "username": usernameInput,
            "URL": iconURLInput,
            "rating": rateInput,
            "year": yearPosted,
            "text": textInput
        };
        console.log(usernameInput, iconURLInput, rateInput, yearPosted, textInput);
    
        var newReviewDivHTML = Handlebars.templates.reviewPost(newReviewContext);
       
        var reviewContainer = document.getElementById("review-container");
        reviewContainer.insertAdjacentHTML('beforeend', newReviewDivHTML);

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