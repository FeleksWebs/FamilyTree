function ChangeInfo() {
  //CHANGE USER NAME / SURNAME
  const UserName = CurrentUserUL.split("_")[0];

  var NewName = CapName(prompt("Please enter new name:", ""));
  var NewSurname = CapName(prompt("Please enter new surname:", ""));
  var NewFullName = NewName + NewSurname;
  for (var i = 0; i < AllUser.length; i++) {
    if (AllUser[i] == NewFullName) {
      return alert("User already exists");
    }
  }

  //CHECK IF INFO FITS REQUIREMENTS
  if (!NewName || !NewSurname) {
    return alert("Incorrect information \nPlease try again");
  }
  var formatTxt = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  var formatASCII = /^[\x00-\x7F]*$/;
  if (
    formatTxt.test(NewName) ||
    !formatASCII.test(NewName) ||
    formatTxt.test(NewSurname) ||
    !formatASCII.test(NewSurname)
  ) {
    return alert("Name should not include unicode characters");
  }

  //PIN POINT WHAT USER CONTAINS
  if (CurrentUserUL.includes("&")) {
    if (document.getElementById(UserName + "_UL")) {
      document.getElementById(UserName + "_UL").id =
        NewFullName + "&" + UserName.split("&")[1] + "_UL";
    }

    document.getElementById(UserName + "_DIV").id =
      NewFullName + "&" + UserName.split("&")[1] + "_DIV";

    document.getElementById(UserName + "_Children").id =
      NewFullName + "&" + UserName.split("&")[1] + "_Children";

    document.getElementById(UserName.split("&")[0] + "_span").id =
      NewFullName + "_span";

    document.getElementById(NewFullName + "_span").innerHTML =
      NewName + " " + NewSurname;

    CloseMenu();
  } else {
    //CHANGE ALL USERS ELEMENTS TO NEW DETAILS
    document.getElementById(UserName + "_DIV").id = NewFullName + "_DIV";

    document.getElementById(UserName + "_Children").id =
      NewFullName + "_Children";

    document.getElementById(UserName + "_span").id = NewFullName + "_span";

    document.getElementById(NewFullName + "_span").innerHTML =
      NewName + " " + NewSurname;

    if (document.getElementById(UserName + "_UL")) {
      document.getElementById(UserName + "_UL").id = NewFullName + "_UL";
    }

    CloseMenu();
  }

  for (var i = 0; i < AllUser.length; i++) {
    if (AllUser[i] == UserName.split("&")[0]) {
      AllUser[i] = NewFullName;
    }
  }
}

//CHANGE PARTNER INFO
function changePartnerInfo() {
  const UserName = CurrentUserUL;

  var NewName = CapName(prompt("Please enter new name:", ""));
  var NewSurname = CapName(prompt("Please enter new surname:", ""));
  var NewFullName = NewName + NewSurname;
  for (var i = 0; i < AllUser.length; i++) {
    if (AllUser[i] == NewFullName) {
      return alert("User already exists");
    }
  }

  const FirstUser = CurrentUserUL.split("&")[0];
  const SecondUser = CurrentUserUL.split("&")[1].split("_")[0];
  const CurrentUserDiv = CurrentUserUL.split("_")[0];

  //CHECKING FOR UNICODES
  if (!NewName || !NewSurname) {
    return alert("Incorrect information \nPlease try again");
  }
  var formatTxt = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  var formatASCII = /^[\x00-\x7F]*$/;
  if (
    formatTxt.test(NewName) ||
    !formatASCII.test(NewName) ||
    formatTxt.test(NewSurname) ||
    !formatASCII.test(NewSurname)
  ) {
    return alert("Name should not include unicode characters");
  }

  //PIN POINT WHAT USER CONTAINS
  if (document.getElementById(CurrentUserDiv + "_UL")) {
    var divName = UserName.split("_")[0];
    document.getElementById(CurrentUserDiv + "_UL").id =
      CurrentUserDiv.split("&")[0] + "&" + NewFullName + "_UL";
    document.getElementById(divName.split("&")[1] + "_span").innerHTML =
      NewName + " " + NewSurname;
  }
  //CHANGE ALL USERS ELEMENTS TO NEW DETAILS
  document.getElementById(CurrentUserDiv + "_DIV").id =
    FirstUser + "&" + NewFullName + "_DIV";
  document.getElementById(CurrentUserUL).id =
    FirstUser + "&" + NewFullName + "_Children";

  document.getElementById(SecondUser + "_span").innerHTML =
    NewName + " " + NewSurname;
  document.getElementById(SecondUser + "_span").id = NewFullName + "_span";
  document.getElementById("CurrentUserInfo").innerHTML = CurrentUserDiv.replace(
    "&",
    " & "
  );
  for (var i = 0; i < AllUser.length; i++) {
    if (AllUser[i] == SecondUser) {
      AllUser[i] = NewFullName;
    }
  }

  CloseMenu();
}

//Delete User
function DeleteUser() {
  const UserName = CurrentUserUL.split("_")[0];
  if (UserName.includes("&")) {
    const firstUser = UserName.split("&")[0];
    const secondUser = UserName.split("&")[0];
    AllUser.pop(firstUser);
    AllUser.pop(secondUser);
  } else {
    AllUser.pop(UserName);
  }

  if (document.getElementById(UserName + "_UL")) {
    document.getElementById(UserName + "_UL").remove();
  } else {
    document.getElementById(UserName + "_DIV").parentNode.remove();
  }
  CloseMenu();
}
