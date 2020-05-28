//List of all users
var AllUser = [];

//CAPITALISES NAMES
var CurrentUserUL;
function CapName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

//CREATE NEW USER (PART1)
function CreateNewUser() {
  var formatTxt = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  var formatASCII = /^[\x00-\x7F]*$/;

  //CHECK IF INFO FITS REQUIREMENTS
  if (document.getElementById("FamilyTreeDiv").firstChild) {
    return alert(
      "Cant add more than 1 tree \nHint: Remove the current tree to start a new one"
    );
  }
  var UN = prompt("Please enter name:", "");
  var US = prompt("Please enter surname:", "");

  if (!UN || !US) {
    return alert("Incorrect information \nPlease try again");
  } else if (
    formatTxt.test(UN) ||
    !formatASCII.test(UN) ||
    formatTxt.test(US) ||
    !formatASCII.test(US)
  ) {
    return alert("Name should not include unicode characters");
  } else if (UN.length > 10 || US.length > 10) {
    return alert("Name and surname length is 10!");
  }
  if (UN == "" || US == "") {
    return alert("Invalid information");
  }

  //FORWARD INFO TO PART2
  newTreeUser(UN, US);
}
//CREATE NEW USER (PART2)
function newTreeUser(UN, US) {
  const name = CapName(UN);
  const surname = CapName(US);
  const FullName = name + surname;

  const FamilyTree = document.getElementById("FamilyTreeDiv");
  //CREATE BEHIND THE SCENES ELEMENTS
  var UL = document.createElement("ul");
  UL.setAttribute("id", FullName + "_UL");
  var LI = document.createElement("li");
  var DIV = document.createElement("div");
  DIV.setAttribute("id", FullName + "_DIV");
  DIV.setAttribute("onclick", "DisplayMenu(this.id)");
  var span = document.createElement("span");
  span.setAttribute("id", FullName + "_span");
  var NewUl = document.createElement("ul");
  NewUl.setAttribute("id", FullName + "_Children");
  // APPEND EVERYTHING
  span.innerHTML = name + " " + surname;
  DIV.appendChild(span);
  LI.appendChild(DIV);
  LI.appendChild(NewUl);
  UL.appendChild(LI);
  FamilyTree.appendChild(UL);

  //PUSH TO ALL USERS
  AllUser.push(FullName);
}

//ADD CHILD
function AddChild() {
  var ChildName = CapName(prompt("Please enter name:", ""));
  var ChildSurname = CapName(prompt("Please enter surname:", ""));
  var Fullname = ChildName + ChildSurname;

  for (var i = 0; i < AllUser.length; i++) {
    if (AllUser[i] == Fullname) {
      return alert("User already exists");
    }
  }
  //CHECK IF INFO OK
  if (!ChildName || !ChildSurname) {
    return alert("Incorrect information \nPlease try again");
  } else if (ChildName.length > 10 || ChildSurname.length > 10) {
    return alert("Name and Surname length is 10!");
  }
  if (ChildName == "" || ChildSurname == "") {
    return alert("Invalid information");
  }

  //GET ID OF PARENT
  const ParentID = document.getElementById(CurrentUserUL);

  //CREATE BEHIND THE SCENES ELEMENTS
  var UL = document.createElement("ul");
  UL.setAttribute("id", Fullname + "_Children");
  var LI = document.createElement("li");
  var DIV = document.createElement("div");
  DIV.setAttribute("id", Fullname + "_DIV");
  DIV.setAttribute("onclick", "DisplayMenu(this.id)");
  var span = document.createElement("span");
  span.setAttribute("id", Fullname + "_span");
  span.innerHTML = ChildName + " " + ChildSurname;
  //APPEND ALL ELEMENTS
  DIV.appendChild(span);
  LI.appendChild(DIV);
  LI.appendChild(UL);
  ParentID.appendChild(LI);

  //PUSH TO ALLUSERS
  AllUser.push(Fullname);
  CloseMenu();
}

//ADD NEW PARTNER
function addPartner() {
  const split = CurrentUserUL.split("_");
  const UserName = document.getElementById(split[0] + "_DIV");

  var PartnerName = CapName(prompt("Please enter new name:", ""));
  var PartnerSurname = CapName(prompt("Please enter new surname:", ""));
  var PartnerFullname = PartnerName + PartnerSurname;

  for (var i = 0; i < AllUser.length; i++) {
    if (AllUser[i] == PartnerFullname) {
      return alert("User already exists");
    }
  }

  var span = document.createElement("span");
  span.setAttribute("id", PartnerFullname + "_span");

  // IF UL EXISTS
  if (document.getElementById(split[0] + "_UL")) {
    document.getElementById(split[0] + "_UL").id =
      split[0] + "&" + PartnerFullname + "_UL";
  }

  //APPEND AND CHANGE NAMES
  span.innerHTML = PartnerName + " " + PartnerSurname;
  UserName.appendChild(span);
  UserName.id = split[0] + "&" + PartnerFullname + "_DIV";
  var UserChildren = document.getElementById(split[0] + "_Children");
  UserChildren.id = split[0] + "&" + PartnerFullname + "_Children";
  AllUser.push(PartnerFullname);
  CloseMenu();
}
