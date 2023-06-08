# Petopia

## **The Problem**🚫

- Many pet lovers want to adoption new pets and do not know where to start looking for them, and even if they are found after a long struggle, they do not know how to take care of them if they do not have experience in caring for them.

- Many pet owners sometimes want to find a new permanent or temporary home for their pet, so they do not want to leave it homeless and find it challenging to find new owners for their animals.
- Many pet owners want to connect with people with a common interest to share their daily experiences with pets.

## **The solution**💡

- Use technology to create a smooth and tidy system and employ its advantages in durability by creating a web application to connect pet owners, facilitate communication between them to exchange information and experiences, promote pet care, facilitate the process of adoption and find suitable products for their pets.

## **User Stories** 🐈

### **User who want to join the community** 🐕

- As a user, I want to adopt a new pet and see all the details about that pet.
- As a user, I want to communicate with pet owners and ask about pet statuses.
- As a user, I want to create an adoption show for my pets to find new owners.
- As a user, I want to open a discussion for any questions and suggestions.
- As a user, I want to comment on the discussion post.
- As a user, I want to request verification of my account as a vet.
- As a user, I can select the type of posts.
- As a user, I like to update the feed in real time.
- As a user, I want to edit and delete posts I've created.
- As a user, I would like to see my profile and edit my information.
- As a user I would like to publish a product and let the community see it.
- As a user, I want a products page to browse products.
- As a user, I want to see a post's detail page.
- As a user, I want to chat through the site's chat with other people.
- As a user, I want to see notifications on my posts or private message notifications.
- As a user, I want to be able to follow certain people who I see share the same interests as me. And I can follow their posts in a special section.
- As a user, I would expect to be able to add images for the post I'm going to add.
- As a user, I expect the ability to change the language of the site.
- As a user, I expect to find a Google Translate extension next to posts to translate them into my language.

### **User who is an administrator** :male-technologist:

- As an admin I want a table to show all posts.
- As an admin, I want a table showing all users.
- As an admin, I want charts that show some stats like the number of users, number of adoption offers, and number of doctors.
- As an admin, I want to edit and delete users.
- As an admin, I want to enable inactive users or deactivate active users.
- As a moderator, I want the authority to delete posts.
- As an admin, I can verify users who have requested to become certified vets.
- As an admin, I can modify the list of post types.
- As an administrator, I can edit the list of product types.
- As an administrator, I can add a new language to the site.

## **User Journey** ✏️

### **User who want to join the community** 🐕

As a user I can see the home page which contains all the posts with a login button and a register button on the navigation bar, after I log in I want to see the landing page which contains community posts with all types whether it's build, sale or normal post with tag A tab for follow-up posts, I can add a new post with specifying the type of this post, I can also edit and delete the post, close posts and comments on posts, the ability to change the language and communicate on chat with others and easy access to notifications, if I am a veterinarian I want a mechanism to change the name on the site as a veterinarian for By contacting the owners of the site.

### **User who is an administrator**🧑🏻‍💻

As an admin, I can log into my account, and I can see a dashboard with five options (Posts, Stats, Users, Reports, Genres, Products, and Additional Settings).

- The Posts option will display a table of all posts with the ability to delete any post.
- The statistics display all important statistics such as the number of users, the number of approval offers, and the number of doctors.
- The user's option is to provide a table of information about registered users in the community database and a search bar to browse through them all, with the ability to edit, delete, active and engage users.
- Reports will show a table adding reports
- Genres will display a table of post types with addition, modification, and deletion.
  In the additional settings, the possibility of adding a new language to the site.

## **Prototype**

[View Prototype](https://www.figma.com/file/NlrF3ibxqPrf1T4hFdjm4v/pet-website?type=design&node-id=0%3A1&t=quKD2zIStg9BO2t7-1)

---

![Petopia](https://i.imgur.com/bwRSVUn.png)

## **How to Launch App Locally** :-

- clone this repo by typing this command in the terminal:  
  `git clone https://github.com/CA-G12`

- Run `npm i` to install the packages for the app as general.

- Run `cd client` and `npm i` to install the packages for the client- React Js.

### Database Setup :clipboard:

make sure you have installed PostgreSQL and pgcli

```sql=
CREATE DATABASE {database name};
CREATE USER {user name} WITH superuser password {password}
ALTER DATABASE {database name} OWNER TO {user name};
```

- Test DB:
- Do the same as before but make sure to change the names.

* Run the following command in the database pgcli terminal  
  `\i server/database/config/build.sql`
  and the command
  `\i server/database/config/fakeData.sql`
  to add fake Data

### **Environment variables:**

Environment variables are one of the ways we keep our product safe. If you want to access our app locally you will need to add your own.

- create .env file
- add your Environment variables

```sh
DEV_DB_URL= # Your development PostgreSQL connect
DATABASE_URL= # Your production PostgreSQL connect
SECRET_TOKEN= # Your token Secret key
```

### Start the App :electric_plug:

To start the App Locally you can start the server First then start client-side or vice versa!

> To run Server, In your terminal Type:

    `npm run dev` then you should be able to go to [localhost](http://localhost:5000/)

> To run client-side, In your terminal Type:

    `cd client` => `npm start` then you will be able to run [localhost](http://localhost:3000/)

Now you can view the app live in the Browser!

You can use this email and password for testing only

- Email:`someemail@admin.com`
- Password:`password`

## **Technologies** 💻 :-

- BackEnd: **Node JS & Express JS**
- FrontEnd: **React JS & TS**
- Database: **PostgreSQL & Sequelize**
- Styling: **Tailwind CSS**
- Testing: **Jest**
- Libraries:

## **Lead Mentor**🕶️ :-

- Muhammad Abdulhadi

## **Team Members** :-

- Abdallah Abujazar
- Mohammed Salloot
- Haitham Abu Lamdi

## **Resources** :-

- [Node Js](https://nodejs.org/en/)
- [React Js](https://reactjs.org/)
- [Express](http://expressjs.com/)
- [Yup library](https://github.com/jquense/yup)
