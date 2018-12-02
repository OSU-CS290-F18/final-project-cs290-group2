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
