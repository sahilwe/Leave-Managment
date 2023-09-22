# Leave-Management-Portal

How to Run:

Here are the necessary prerequisites for running the web app, such as:

1. Make sure you have the latest Node.js installed from the official website(https://nodejs.org/en/download) and npm (Node Package Manager) installed.
2. MongoDB installed and running.

Installation:

a.) Cloning the project repository from GitHub, which can be done by following steps:

1. Open the GitHub link(https://github.com/Bajrang01/Leave-Management-DEP)
2. Click on the "Code" button located near the top right of the repository page. It will display a dropdown with the cloning options.
3. In the dropdown, click on the clipboard icon next to the repository URL to copy the URL to your clipboard. The URL should be in the format https://github.com/username/repository.git.
4. Open your terminal or command prompt on your local machine.
5. Navigate to the directory where you want to clone the repository using the cd command.
6. Once you're in the desired directory, use the git clone command followed by the repository URL you copied earlier. It will create a new directory with the repository name and clone the project into it. The command will look like:		git clone https://github.com/username/repository.git
7. Press Enter to execute the command. The cloning process will start, and you'll see progress indicating 	the files being fetched from the repository.
8. After the cloning process completes, you will have the project repository cloned to your local machine. 	You  can navigate into the newly created directory using the cd command and start working with the 	project files.

b.) Navigating to the project directory in the terminal/command prompt:
c.) Running `npm install` to install the required packages:

Configurations:

1. Update the .env file in server folder, replace the database link present to your database link.
2. Above point is valid only if you have already done the MongoDB part, which we have assumed that you know, if not, then watch tutorials in youtube, it will take about 10 minutes to do this part.

Running the Application:
1. For running the client part(Frontend server): run `npm start` in terminal.

2. For running the server part(Backend server): run `Nodemon app.js` in terminal.
