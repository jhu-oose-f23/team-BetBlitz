# *Software Requirement Specification* 

## Problem Statement: 
A few sentences to describe the problem you are trying to solve, i.e., justify why this software is needed.

**In the past decade, there has been a huge rise in the number of people betting on sports. Many companies, such as FanDuel and DraftKings, have created large-scale platforms to serve as online casinos for sports bettors across the country. However, many people may not be interested in jeopardizing their money to partake in sports betting. Sports betting can potentially lead to detrimental gambling problems, which may discourage people from getting involved in sports betting. Additionally, many states still has not legalized sports betting.**

## Potential Clients: 
Who are influenced by this problem and would benefit from the proposed solution? (i.e. the potential users)

**- People who live in states where sports betting is not legal, Collegiate Athletes, Kids who are under the legal age for sports betting, People who want to enjoy sports betting without the fear of losing money**

## Proposed Solution: 
Write a few sentences that describe how a software solution will solve the problem described above.

**Our app would allow people to partake in sports betting in a fun but non-risky way. Rather than wagering real money, users can use a virtual currency to simulate sports betting. Within the app, people would join leagues, allowing them to compete with their friends to see who can make the most (fake) money. This maintains the fun and competition while alleviating the risk associated with gambling. Moreover, because the app would use a virtual currency, it would be legal in all states.**

## Functional Requirements: 
List the (functional) requirements that software needs to have in order to solve the problem stated above. List these in role-goal-benefit format. It is useful to try to group the requirements into those that are essential (must have), and those which are non-essential (but nice to have).

## Must have

- **As a user I want to be able to place fake bets on real games (moneyline) and see wins/losses, to be able to simulate the sports betting experience, test out betting strategies, and accumulate more fake money** 

- **As a user I want to compare your wins and losses to other users to see where I place among other players and see which players seem to have the best strategies**

- **As a user I want to create my own league and invite other users to join to create an environment where I can have fun with close associates and create stakes that aren’t real money by having a competition element.**

- **As a user I want to be able to view the odds of upcoming and live games to see which games would be most profitable and which ones I want to bet on.**

- **As a user I would like the odds to be updated every 3 hours so that I can view the most up to date information on games**

## Nice to have


- **Role: As a user I want to be able to place additional type of bets (prop bets, parlays, live bets, etc) to have more creative ways to make profit and be able to bet on specific events in a game, not just the winner.**

- **As a league manager I want to be able to select different league modes (weekly, last-man standing, etc) to have different ways to interact with my league to keep it exciting for the league participants**

- **As a user I want to be able to see my betting statistics on different categories (NFL bet success, etc) to see where I succeed and where I fail as a bettor so I can plan my bets better in the future.**

- **As a user I want to be able to see other users’ bets after the betting window has closed to see other betting strategies and how others bet and potentially cheer against the bets made by my league opponent.**

## Non-functional Requirements:

- **As a User without a ton of tech experience I want an exciting and easy to navigate UI with live scores to create the best experience possible and allow me to keep up with games that I have bet on**

- **As a User I want the app to be secure with user’s data to not worry about who can access my information and cause potential harm**

- **As a User I want the web app to run without failure under predefined conditions to to consistently be able to use the app with minimal downtime**

- **As a user who has seen or experienced the harmful effects of gambling addictions I want the webapp to have warnings, information, and support resources about gambling to help steer people away from real gambling sites and potentially falling into the hole that could cause severe harm to themselves.**

## Software Architecture & Technology Stack: 
Will this be a Web/desktop/mobile (all, or some other kind of) application? Would it conform to specific software architecture? What programming languages, frameworks, databases, …, will be used to develop and deploy the software?
 
- **Next.js (frontend framework)**
- **React (frontend library)**
- **TailwindCSS**
- **ShadCN (component library)**
- **Supabase (backend)**
- **Vercel (deployment)**
- **Prisma (Object relational mapping)**

## Similar Apps:
List a few similar applications to the one you are developing. Don't be eager to conclude no similar app exists! There is always something similar to what you are building! Finding those will help you to better specify your project. You must be prepared to explain how your app is different from the existing ones.

- **ESPN Fantasy Sports**
- **Draft King Sportsbook**
- **FanDuel**
