/*
    TO ADD COMPONENT TO HTML ADD THESE LINES:
    <script src="./title-element/page-title.js" charset="utf-8" defer></script>
    <page-title-component title="{{YOUR_PAGE_NAME}}"></page-title-component>
*/
var logoLink = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVeANtQAbfONomwJmyiXE5C1C1DryPfQXaruVsoNAtDQvOKj77"

class PageTitleComponent extends HTMLElement {
    constructor(){
        super();

        var pageTitle = this.getAttribute('title');
        this.className ="title-element";

        var img = document.createElement("img");
        img.className = "logo";
        img.setAttribute('src', logoLink);
        img.style.position = "fixed";
        img.style.marginTop = "25px";
        img.style.marginLeft = "20px";
        img.style.height = "40px";
        img.style.width = "40px";
        img.style.borderRadius = "50%";
        img.style.border = "2px solid black";
        this.appendChild(img);

        var title = document.createElement("div");
        title.className = "page-title";
        title.innerText = pageTitle;
        title.style.position = "fixed";
        title.style.fontSize = "40px";
        title.style.marginTop = "25px";
        title.style.marginLeft = "75px";
        title.style.fontFamily = "Arial";
        title.style.color = "white";

        this.appendChild(title);

        this.style.position = "fixed";
        this.style.bottom = "0";
        this.style.flexDirection = "row";
        this.style.width = "100%";
        this.style.height = "80px";
        this.style.background = "black";
    }
}
window.customElements.define('page-title-component', PageTitleComponent);