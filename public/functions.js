let currentUser = []

function registerUser(e) {
    e.preventDefault();

    //    let userName=document.getElementById('userName').value;
    let { userName } = e.target.elements;
    userName = userName.value;
    console.log(userName);

    let { email } = e.target.elements;
    email = email.value;
    console.log(email);

    let { password } = e.target.elements;
    password = password.value;
    console.log(password);

    let { imgUrl } = e.target.elements;
    imgUrl = imgUrl.value;
    console.log(imgUrl);

    fetch('/Register', {
        method: 'POST',
        body: JSON.stringify({ userName, email, password, imgUrl }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {

            if (data[0].success) {
                window.location.replace('/login.html');
            }
            else {
                alert("User allreasy registered..");
                // window.location.replace('/index.html');
            }
        })

}


function checkUser(event) {

    event.preventDefault();

    let { email } = event.target.elements;
    email = email.value;
    console.log(email);

    let { password } = event.target.elements;
    password = password.value;
    console.log(password);

    fetch('/checkUser', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            if (data[0].success) {
                // localStorage.setItem("userName", data[1].doc[0].userName);
                // localStorage.setItem("imgUrl", data[1].doc[0].imgUrl);
                window.location.replace('/group.html');

            }
            else {
                alert("wrong email or wrong password.. try again")
            }
        })

}


function getAllUsers() {

    //  localStorage.getItem()
    fetch('/getUsers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {

            let users = data;
            let usersArray = '';
            // console.log(data[0].doc[0].userName)
            // console.log(users[0].doc.length);

            for (let i = 0; i < users[0].doc.length; i++) {
                if (data[0].doc[i].online == false) {
                    usersArray += `<div class="userShow" style=" background: #e6e6e6; border-radius: 60px; display:flex; justify-content: space-between;  text-align: center;" ><img src="${users[0].doc[i].imgUrl}" 
                style="width: 60px; height:50px ; border-radius: 70px;  text-align: center;"></img> <div style=" margin:auto;">
                 ${users[0].doc[i].userName}</div></div>`
                }

            }
            console.log(usersArray);

            // users.forEach(user => {

            // usersArray += `<div class="userShow" ><img src="${user.imgUrl}" style="width: 150px; height:150px ; border-radius: 20px;"></img> ${data.userName}</div>`


            // })

            // console.log(usersArray);
            document.getElementById('root').innerHTML = usersArray;


        })

}


function addMeGroup() {
    window.location.replace('/addedToGroup.html');
}

function addMeToTheGroup() {


    //  localStorage.getItem()
    fetch('/getUsers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {

            let allusers = data;
            let allArray = '';
            // console.log(data[0].doc[0].userName)
            // console.log(users[0].doc.length);


            for (let i = 0; i < allusers[0].doc.length; i++) {

                allArray += `<div class="userShow" style=" background: #e6e6e6; border-radius: 60px; display:flex; justify-content: space-between;  text-align: center;" ><img src="${allusers[0].doc[i].imgUrl}" 
                style="width: 60px; height:50px ; border-radius: 70px;  text-align: center;"></img> <div style=" margin:auto;">
                 ${allusers[0].doc[i].userName}</div></div>`

                 /*
                <div class="userShow" style=" background: #e6e6e6; border-radius: 60px; display:flex; justify-content: space-between;  text-align: center;" ><img src="${users[0].doc[i].imgUrl}" 
                style="width: 60px; height:50px ; border-radius: 70px;  text-align: center;"></img> <div style=" margin:auto;">
                 ${users[0].doc[i].userName}</div></div>

                 */


            }

            console.log(allArray);

            document.getElementById('rootAdded').innerHTML = allArray;


        })

}

function callRandomNames(even) {
    event.preventDefault();

    let { groupSize } = event.target.elements;
    groupSize = groupSize.value;
    console.log(groupSize);
    fetch('/group')
        .then(res => res.json())
        .then(data => {

            let groups = [];
            data.forEach(user => {
                groups.push(user);

            });

            let myArray = randomNames(data,groupSize);
            console.log(myArray)

            let iner = '';
            myArray.forEach(item => {
                iner += `<div class="iner" style="border:6px solid black;  display:flex;"  >`
                item.forEach(person => {
                   
                    if (person != undefined) {
                        const { userName, imgUrl } = person;
                        iner+=`<div style=" background: #e6e6e6;  display:flex;text-align: center;" ><img src="${imgUrl}" 
                        style="width: 60px; height:50px ; border-radius: 70px;  text-align: center;"></img> <div style=" margin:auto;">
                                     ${userName}</div>`
                    }
                    

                     /*
                <div class="userShow" style=" background: #e6e6e6; background-size:100px   ; border-radius: 60px; display:flex; justify-content: space-between;  text-align: center;" ><img src="${users[0].doc[i].imgUrl}" 
                style="width: 60px; height:50px ; border-radius: 70px;  text-align: center;"></img> <div style=" margin:auto;">
                 ${users[0].doc[i].userName}</div></div>

                 */

                });
                iner += `</div>`


              
            });
            
            document.getElementById('rootAdded').innerHTML = iner;
           

        })



}


function randomNames(names, groupSize) {
    try {
        const groups = [];
        const lengthNames = names.length / groupSize
        let afterRandom = '';
        let iner = '';
        // console.log(names[0].userName);
        for (let j = 0; j < lengthNames; j++) {
            const newGroup = [];
            for (let i = 0; i < groupSize; i++) {
                const indexOfName = getRandomName(names);
                // if(names.userName){

                // }
                newGroup.push(names[indexOfName]);
                names.splice(indexOfName, 1);
            }

            groups.push(newGroup);
        }


        if (names.length > 0) {
            groups.push(names);
        }

        // console.log(groups);
        // console.log(groups[0])
        // console.log(groups[1])
        // console.log(groups[0][0].userName);
        //  for (let x = 0; x <lengthNames; x++) {
        //     for (let y = 0; y < groupSize; y++) {
        //      console.log(groups[x][y].userName);
        //             afterRandom += `<div><img src="${groups[0][y].imgUrl}" 
        //             style="width: 150px; height:150px ; border-radius: 20px;"></img>
        //              ${groups[0][y].userName}</div>`

        //     }

        //      iner+=` <div class="show" style=" border: 5px solid black;" ></div>`
        //      document.getElementById('inerRoot').innerHTML = afterRandom;
        // }



        // console.log(afterRandom);
        // document.getElementById('rootAdded').innerHTML = iner ;
        return (groups);
    } catch (err) {
        console.error(err);
    }
}

function getRandomName(names) {
    const arraySize = names.length;

    let indexOfName = Math.ceil(Math.random() * arraySize) - 1;

    return indexOfName;
}

// randomNames(names, 3);
