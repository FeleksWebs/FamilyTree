function SubmitParent() {
  //PARENT VALUES
  const ParentName = CapName(document.getElementById("ParentName").value);
  const ParentSurname = CapName(document.getElementById("ParentSurname").value);

  //PARENT OBJECT
  var AddParent = {};
  AddParent.Name = ParentName;
  AddParent.Surname = ParentSurname;
  AddParent.Parents = [];
  AddParent.Children = [];

  //FIND CHILD
  var selectChild = document.getElementById("FindChild");
  var NameSplit = selectChild.value.split(" ");

  //CHECK FOR SAME NAMES / SURNAMES
  var checkForDup;
  for (var i = 0; i < ListFamily.length; i++) {
    if (
      Object.entries(ListFamily)[i][1].Name == ParentName &&
      Object.entries(ListFamily)[i][1].Surname == ParentSurname
    ) {
      return alert("User already exists");
    } else {
      checkForDup = true;
    }
  }

  //CHECK IF USER ALREADY HAS 2 PARENTS
  var Child;
  if (checkForDup) {
    for (var i = 0; i < ListFamily.length; i++) {
      if (
        Object.entries(ListFamily)[i][1].Name == NameSplit[0] &&
        Object.entries(ListFamily)[i][1].Surname == NameSplit[1]
      ) {
        if (ListFamily[i].Parents.length < 2) {
          AddParent.Children.push(Object.entries(ListFamily)[i][1]);
          ListFamily[i].Parents.push(AddParent);
          ListFamily.push(AddParent);
          Child = ListFamily[i];
        } else if (ListFamily[i].Parents.length == 2) {
          return alert("Cant add more parents");
        }
      }
    }

    //ADD PARENT TO DROP DOWN
    var ParentIn_AddChild = document.createElement("option");
    var ParentIn_SearchUser = document.createElement("option");
    var ParentIn_AddParent = document.createElement("option");

    ParentIn_AddChild.text = AddParent.Name + " " + AddParent.Surname;
    ParentIn_SearchUser.text = AddParent.Name + " " + AddParent.Surname;
    ParentIn_AddParent.text = AddParent.Name + " " + AddParent.Surname;

    FindChild_ID.add(ParentIn_AddChild);
    SearchUser_ID.add(ParentIn_SearchUser);
    FindParent_ID.add(ParentIn_AddParent);
    ParentTree(Child);
  }
}
