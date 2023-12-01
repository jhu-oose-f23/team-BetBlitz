# Code Review Deliverable

## Design
- Is the code well-designed and appropriate for your system? Think of all design principles and patterns that you've studied in this course. You may need to refactor the code.

   Yes, the code is well-designed and appropriate for the system.

## Complexity
- Could the code be made simpler? Would another developer be able to easily understand and use this code when they come across it in the future?

   Yes, the code could be made simpler, but code could always be made simpler and we believe we struck a good balance between simplicity and functionality. For example, code patterns that have been repeated we have abstracted into functions and we have made use of components and props to avoid repeating front-end code. Some of the decisions regarding complexity have been highlighted below.

## Naming
- Did the developer choose clear names for variables, classes, methods, etc.?

   Yes, all of the names for variables, classes, methods, etc. are clear and concise.

## Comments
- Are the comments clear and useful?

   Yes, part of the code review process was going back and adding comments to the code to make it more clear and useful.

## Style
- Does the code follow good programming practices?

   Yes, the code follows good programming practices.

## Documentation
- Is there documentation on how to install and run the application?

   Yes, there is a README.md file that explains how to install and run the application.

# Code Review Tasks

## Task 1: Commenting
- We added comments to the code to make it more clear and easier to understand. We had everyone work on this part of the code review process individually. Since different team members are more familiar with different parts of the codebase, we had each person review the code that they wrote and make sure it was properly commented. Then we had each person show their newly commented code to another member from the team and test to see if they could understand what the code was doing based on the comments and general code structure. This helps to ensure that the code is properly commented and easy to understand for all team members as well as anyone who might work on the project in the future.
- Contributors: All

## Task 2: Removing Duplicated API Calls on the Analytics Page

- During the review process, we realized that there was a duplicated API call to the bets table which returns the game and associated bet that was made by the user in the BetsTable file and the Analytics page. To fix this problem, we removed the API call from the BetsTable file and passed in the bets that were retrieved from the call in the analytics page as a prop to the BetsCard component which then passes in the same prop to the BetsTable component.   
- Contributors: Logan, Neil

## Task 3: Removing Duplicated Supabase Clients

- During code review we noticed that there were multiple instances of the Supabase client being created in the code. We decided to refactor the code so that there is only one instance of the Supabase client being created and then it is exported from the supabaseClient file. This ensures that there is only one instance of the Supabase client being created and used throughout the codebase.

- Contributors: Jake, Eric

## Task 4: League Password and Joining a League

- During testing of our code we noticed that when a user creates a league they do not automatically join the league. To fix this we added additionally logic that associates a user to any league that they create. We also noticed that users are able to join leagues more than once causing the number of members in the league to be incremented. To fix this we are implementing a check that a user is not already in a league before adding them to the league.
- Contributors: Cesco, Francis