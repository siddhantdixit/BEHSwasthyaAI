# SwasthyaAssignment
 
This is a REST API built with Node.js, Express, and MongoDB. The API allows users to perform CRUD operations on Users, Blogs, and Comments.

## Getting Started
### Prerequisites
To run this project, you will need:

- Node.js (v12 or higher)
- MongoDB (v4 or higher)

### Installation

1. Clone the repository to your local machine
2. Run `npm install` to install the dependencies
3. Create a .env file and add the following environment variables:

```
DBURL=<your MongoDB URI>
```

4. Run npm run start to start the server

### Usage
The following endpoints are available:

#### Users

- `GET /users` - Get all users
- `GET /users/:userId` - Get a specific user by ID
- `POST /users` - Create a new user
- `PUT /users/:userId` - Update a specific user by ID
- `DELETE /users/:userId` - Delete a specific user by ID
- `GET /users/:userId/friends/level/:levelNo` - Get k-th level friends of a user

This endpoint allows a user to retrieve their k-th level friends. The endpoint takes in two parameters, userId and levelNo, where userId is the ID of the user and levelNo specifies the level of friends to retrieve.

The approach used to retrieve friends is Breadth-First Search (BFS) traversal. The algorithm starts by finding all the blogs where the user has commented and retrieves all users who have commented on those blogs. These users are considered first-level friends.

Next, the algorithm looks for blogs where first-level friends have commented and retrieves all users who have commented on those blogs, who are considered second-level friends. This process continues until the k-th level of friends is reached.

By using BFS, the algorithm guarantees that it first retrieves friends who are closer to the user before moving on to more distant friends. The result of this endpoint is a list of all friends of the specified level for the given user ID.

#### Blogs
- `GET /blogs` - Get all blogs
- `GET /blogs/:blogId` - Get a specific blog by ID
- `POST /blogs` - Create a new blog
- `PUT /blogs/:blogId` - Update a specific blog by ID
- `DELETE /blogs/:blogId` - Delete a specific blog by ID

#### Comments
- `GET /comments` - Get all comments
- `GET /comments/:commentId` - Get a specific comment by ID
- `POST /comments` - Create a new comment
- `PUT /comments/:commentId` - Update a specific comment by ID
- `DELETE /comments/:commentId` - Delete a specific comment by ID


### Seed Data
A sample seed.json file is provided to quickly add sample data to the database. The file contains an array of objects representing users, blogs, and comments.

To add the seed data, run the following command:

```
npm run seed
```
This will add the data to the connected MongoDB database.
