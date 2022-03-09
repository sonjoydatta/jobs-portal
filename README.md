# Years of Experience?

To align with what we use at Glints, we'd prefer you use React on the frontend, Node.js on the backend and Postgres as the database, with Typescript if you are confident. If you’re a frontend developer with no backend background, Firebase is always an option, but a more suitable stack will definitely earn you bonus points.

Build a simple editable profile page that represents a candidate's basic information and work experience. Minimally, the following information is required to be editable and presented:

1. Name
2. Profile picture
3. Age
4. Work experiences (the following are information required for each instance)

- Start date
- End date (allow a current position option)
- Job title
- Company
- Company logo
- Job description

Ensure that reasonable input validation and error checking are present. The page should work in offline mode too. Edits made in offline mode should be later persisted when network connection is restored.

You are free to decide on the best UIUX to both edit and present the information in a logical and consistent manner. On top of correctness, we will also factor in ease of use and general UI/UX highly in the evaluation.

# Bonus

_This is optional, and serves as additional proof points. We will consider it complete even without this functionality_

The profile should be private by default. Allow the user to determine a vanity URL for sharing, and the option to toggle which segments of the profile to be public versus private. In this case, you can choose to implement the standard suite of authorisation and authentication.

# Deployment

It'd be great if you can deploy this on the free tier of any cloud hosting platform (eg. free dyno on Heroku), so that we can easily access the application via an url.
