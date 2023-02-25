const link = document.getElementById("link")
const img = document.getElementById("img")
const delImg = document.getElementById("delImg")
const margin = document.getElementById("margin")
// const color2 = document.getElementById("color2")
const color2 = document.getElementById("color2")
const bgColor = document.getElementById("bgColor")
const dot = document.getElementById("dot")
const downloadBtn = document.getElementById("downloadBtn")

let op = {
    width: 250,
    height: 250,
    type: "png",
    data: "https://cadeals.netlify.app/",
    image: "",
    dotsOptions: {
        color: "#4267b2",
        type: "rounded",
        gradient: {
            type: "linear",
            "colorStops": [
                {
                    "offset" : 0,
                    "color":  "#000"
                },
                {
                    "offset" : 0,
                    "color":  "#000"
                }
            ]
        }
    },
    backgroundOptions: {
        color: "#e9ebee",
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 20
    }
};

// render();

link.addEventListener('keyup', e=>{
    if (e.target.value == ''){
        let displayDiv = document.getElementById("displayQr")
        displayDiv.innerHTML = `
        <img loading="lazy" decoding="async" src="images/Qr/banner.jpg" alt="video thumb" class="rounded-lg w-100">
        <button type="button" class="video-play-btn border-0 bg-primary qr-btn ">
            Your Qr Will be Seen Here
        </button>
        `;

    }else{
        op.data = e.target.value
        render()
    }
    
})

margin.addEventListener('input', e=>{
    op.imageOptions = {margin: e.target.value};
    render();
})

dot.addEventListener('change', e=>{
    op.dotsOptions.type = e.target.value;
    render()
})

// color1.addEventListener('input', e=>{
//     op.dotsOptions.gradient.colorStops[0].color = e.target.value;
//     render()
// })
color2.addEventListener('input', e=>{
    op.dotsOptions.gradient.colorStops[1].color = e.target.value;
    render()
})

bgColor.addEventListener('input', e=>{
    op.backgroundOptions.color = e.target.value;
    render()
})

var qCode;
function render(){
    qrCode = new QRCodeStyling(op);
    
    let displayDiv = document.getElementById("displayQr")
    displayDiv.innerHTML = '';
    qrCode.append(displayDiv);
}

function browse(){
    img.click();
}
img.addEventListener('change', e=>{
    let file = e.target.files[0];
    let reader = new FileReader();
    
    reader.onload = ()=>{
        console.log(reader.result)
        op.image = reader.result;
        render();
    }
    reader.readAsDataURL(file);
})
delImg.addEventListener('click', e=>{
    delete op.image;
    render()
})
downloadBtn.addEventListener('click', e=>{
    qrCode.download({ name: "cqdeQR", extension: "png" });
})
// qrCode.append(document.getElementById("canvas"));
// qrCode.download({ name: "qr", extension: "svg" });

							
