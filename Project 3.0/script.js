const btn = document.querySelector(".theme");
console.log(btn)

const page = document.documentElement;

btn.addEventListener("click", () => {
    const theme = page.getAttribute("data-theme") === "Light"
        ? "Dark"
        : "Light";
    page.setAttribute("data-theme", theme);
});