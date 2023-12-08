1. Revisit your original project proposal, note on what has changed, what features you have/have not delivered.

In terms of changes from our original proposal, we have our odds updated once a day rather than every 3 hours, we only display the odds of upcoming games and do not display live odds. This is because implementing more frequent or live odds updates would have required a paid version of vercel and a paid subscription to the odds API.

In terms of our league structure, we originally intended on having multiple league format options such as head-to-head, last man standing, etc. However, we ended up going with the league standing format with each league member going against each other. When we created our SRS we listed different kinds of bets as nice to have such as live bets, prop bets, and parlays. However, we were only able to implment parlay bets. The other kinds of betting could not be implemented because the odds API we used did not support them.

2. Briefly note the challenges you have had (and you have overcome/dealt with them).

Some of the challenges we faced were:
- Database schema migration and merging migrations together
    - This was a challenged we faced mainly at the beginning of the project. Since different people were working on different features and all adding stuff to the database schema, we had to figure out how to merge all the migrations together. Part of the reason this was difficult was that we were not familiar with the database migration tool we were using (Prisma), but over time we became more familiar with it and by the end of the project database migrations went smoothly.
- Working with the Supabase Frontend Client
    - The Supabase Frontend Client was a new tool that we had not used before, and it was difficult to figure out how to use it. We had to figure out how to use it to make queries. Two reasons that the supabase client was difficult to use was that it did not have the same type generation as prisma and it required some knowledge of SQL to use. This definitely slowed us down at the beginning of the project, but we became more familiar with it over time and by the end of the project we were able to use it effectively.


3. Reflect on how you would do it again if you could go back in time and start at iteration-1. You don't need a time machine to achieve this.

If we could go back in time and start at iteration-1, we would have utilized TRPC to acheive end to end type safety. We initially bootstrapped our project with TRPC, but decided to use the supabase client because we thought it would be easier to get started with and we wouldn't have to write additional routes for the backend. However, writing our own backend routes rather than using the supabase client would have been worth it because we would have had end to end type safety and developing the frontend would have been much faster.

