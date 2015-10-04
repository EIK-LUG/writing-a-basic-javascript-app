# writing-a-basic-javascript-app

### What is this?

NOTE: The index.php file is only there for integration with heroku.

This is an example repository that will contain
* An example simple javascript application.
* Some basic guidelines to make it.
* The commit history of making the javascript application.
    
The hope is that this can serve as an example to getting started with your own.

### The end result

![Image of app]
(https://raw.githubusercontent.com/EIK-LUG/writing-a-basic-javascript-app/master/resources/pomodoro-lite.png)

Demo on heroku: [https://pomodoro-lite.herokuapp.com/](https://pomodoro-lite.herokuapp.com/)

### How to use this repository?

* You can view the current state of the app and use the code as examples.
* You can read the guidelines here in the README to get a general idea of how it's done.
* You can view the commits on this repository to see what was done to make this app work. 

NOTE: Commits are made in very short intervals, to be more readily readable for beginners. (I suggest viewing them in split mode)

### Step 0: Get basic skills

To do this you will need:

* Tenacity (goes for programming in general)
* Basic understanding of HTML/CSS
* Some familiarity with javascript
* Good if you know how to use basic functionality in the developer tools in Google Chrome (for example). Hint: F12

### Step 1: VCS

First things first VCS.

For using GitHub and git, the best way is to create a new repo from the GitHub UI (no readme) and you will get further instructions from there.

Also more info from here [about-git-and-github](https://github.com/EIK-LUG/about-git-and-github.git) or from google :) 

### Step 2: Making the general file structure

This was done here:

* [Commit](https://github.com/EIK-LUG/writing-a-basic-javascript-app/commit/11b333be75e75ffe6eee95e22801b722e0fad275)
* [Repo state](https://github.com/EIK-LUG/writing-a-basic-javascript-app/tree/11b333be75e75ffe6eee95e22801b722e0fad275)

### Step 3: Start minimal and design your application

* Write some basic minimal HTML [Commit](https://github.com/EIK-LUG/writing-a-basic-javascript-app/commit/54ea8aea3cd9b484200f1dc815829844529eeddd)
* Write some pseudocode on paper or write functions headers to design a general structure, without implementation details. [Commit](https://github.com/EIK-LUG/writing-a-basic-javascript-app/commit/e02af2aece06fd651bbda5dc7b69af2e9bfde551)

NOTE: Don't take the design step lightly as this is going to heavily influence implementation ease later.

### Step 4: One by one, start implementing your component (functions in js) improving your design as you feel is needed.

There are multiple commits with the title "Initial implementation of ..." [Commits](https://github.com/EIK-LUG/writing-a-basic-javascript-app/commits/master)

NOTE: You don't need to focus overly much on writing beautiful code until step 6, although very bad quality will introduce bugs and make your life harder.

### Step 5: Reach a "minimal viable product"

Keep implementing until you've got something that at least kinda works while the UI/UX is either completely missing or very lacking.

[Repo state](https://github.com/EIK-LUG/writing-a-basic-javascript-app/tree/f08348a31d60d41536d2a8fca90dba2dbcf82b30)

### Step 6: Refactor the code

You've now got something working, it's time to refactor the code. Change variable names to be more succinct and clear, improve code readability and simplicity (logic wise also), maybe add better documentation etc.

### Step 7: Add a front end framework to beautify your UI

Material Design Lite (mdl) is used in this project. The projects homepage is here: [getmdl.io/](http://www.getmdl.io/)

They have their own fantastic documentation on the page, but here is also how to add I added the libraries: [Commit](https://github.com/EIK-LUG/writing-a-basic-javascript-app/commit/df7298e6c2bd8cd174149339fe735f08473e1a39)
NOTE: I forgot to add a meta tag, that was necessary for correct rendering on mobile devices, fixed it here: [Commit](https://github.com/EIK-LUG/writing-a-basic-javascript-app/commit/460ea8a9b41bd14ed5286ba087ebe8cbbf613b2d) 
This also mean that the commits between this one and adding the library would not display properly on mobile devices.

Using mdl (and many other UI frameworks) often means creating regular HTML and then adding classes to them. 
Great documentation with examples for everything can be found here [getmdl.io/components](http://www.getmdl.io/components/index.html)

NOTE: Copy pasting is completely okay. This is exactly how to get to know the framework. Copy -> Paste -> Edit

In the commits between adding the framework and finished basic simple UI demonstrate adding framework classes to make your UI better.

### Step 8: Add further functionality as desired.

You should have a minimal viable product functionality wise and a decent enough UI. Now add more functionality and improve the UI until you are content!

### Step 9: ???

???

### Step 10: Profit!

Congratulations you have written a javascript application!

### What next?

#### Host your app online. (ex. Heroku)

Heroku is very simple. Minimally you will have to make an account, then make a new project and in that project connect with your GitHub project.
NOTE: For hosting your simple javascript app on Heroku, use this method (as I did): [The one with ~107 votes](http://stackoverflow.com/questions/10551273/is-it-possible-to-upload-a-simple-html-and-javascript-file-structure-to-heroku) 

#### Convert into a mobile or desktop application

Well you can make your javascript application into a mobile (android/ios/windows phone) or desktop (windows/linux/mac) application.

You can google the tools, but for example there is:

* Web->Hybrid Mobile [inonic](http://ionicframework.com/) 
* Web->Hybrid Desktop [NodeWebkit](http://nwjs.io/)

NOTE: This mean you can run the apps without internet connectivity and you will have, thou somewhat restricted, access to the platform. (push notifications, desktop file manager, desktop bar icons etc.)

#### Put your mobile app on an app store.

ToDo
