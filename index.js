const btns = document.querySelectorAll(".header li");

const subPages = {
  qualifications:
    "https://api.onedrive.com/v1.0/shares/u!aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBaTBQZzlMZlpRWWJpTnNkeG5feUdBZnd5cXJOSEE=/root?expand=children",
  experiences:
    "https://api.onedrive.com/v1.0/shares/u!aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBaTBQZzlMZlpRWWJpTnNtU2dWX2tBVDdpemIyMHc_ZT1aWjZlM2o=/root?expand=children",
  skills:
    "https://api.onedrive.com/v1.0/shares/u!aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBaTBQZzlMZlpRWWJpTnN2cXJRakhkWG5lM09hTEE_ZT11QnM2TGM=/root?expand=children",
};

let tabList = [];
for (let i = 0; i < 3; i++) tabList.push(`tab${i}`);

async function getContent(htmlName) {
  const page = await fetch(htmlName);
  const data = await page.json();
  const { "@content.downloadUrl": trueUrl } = data;
  const info = await fetch(trueUrl);
  const inner = await info.text();

  document.querySelector(".main").innerHTML = inner;
}

document.addEventListener(
  "DOMContentLoaded",
  getContent(subPages["qualifications"])
);

for (let k of btns) {
  k.addEventListener("click", (ele) => {
    tabList.forEach((e_) => {
      document.getElementById(e_).setAttribute("class", "");
    });
    ele.target.setAttribute("class", "active");
    const urlLink = subPages[ele.target.textContent.toLowerCase()];
    /*
        const res = getContent(htmlName)
        console.log(htmlName)
        console.log(res)
        */

    getContent(urlLink);
    console.log("---------------");

    fetch(urlLink)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        for (let k in res) {
        }
        const { "@content.downloadUrl": dl } = res;
        return dl;
      })
      .then((dl) => {
        fetch(dl)
          .then((res) => {
            return res.text();
          })
          .then((res) => {
            document.querySelector(".main").innerHTML = res;
          });
      })
      .catch(console.log("failed"));
  });
}
