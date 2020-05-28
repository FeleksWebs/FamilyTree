var MenuDiv = document.getElementById("ManuScreen");

//CLOSE INFO DIV
function CloseMenu() {
  MenuDiv.style.display = "none";
}

//DISPLAY INFO DIV
function DisplayMenu(id) {
  var split = id.split("_");
  var CapSplit = id.split(/(?=[A-Z])/);
  CurrentUserUL = split[0] + "_Children";

  var NewPartner = document.getElementById("AddPartner");
  if (id.includes("&")) {
    const GetName = id.split("&")[1].split("_")[0];
    NewPartner.innerHTML = "Change info of " + GetName;
    NewPartner.setAttribute("onClick", "changePartnerInfo()");
  } else {
    NewPartner.innerHTML = "Add Partner";
    NewPartner.setAttribute("onClick", "  addPartner()");
  }

  document.getElementById(
    "CurrentUserInfo"
  ).innerHTML = CapSplit[0].toUpperCase();
  document.getElementById("CurrentUserInfo").innerHTML = id
    .split("_DIV")[0]
    .replace("&", " & ");

  MenuDiv.style.display = "block";
  var ChangeInfoBTN = document.getElementById("ChangeInfo");
  ChangeInfoBTN.innerHTML = "Change info of " + id.split("_")[0].split("&")[0];
}
