# Overview

I built this project to get hands-on experience designing and shipping a robust backend REST API using TypeScript and Node.js. The goal was to master advanced database modeling, automated data lifecycle management, and recursive programming patterns in a real-world application.

This software is an advanced Todo management service. Beyond standard task tracking, it features a self-referencing relationship layout that allows tasks to have nested subtasks (stored as independent document references). When a user completes a task, the API automatically triggers a custom asynchronous recursive routine that cleans up the entire chain of subtasks. Additionally, it implements a native MongoDB TTL (Time-To-Live) index that automatically purges finished tasks from the database exactly 1 hour after completion to keep the collection lean.

I created this to practice building type-safe CRUD APIs with TypeScript, handling database constraints, engineering hierarchical database relations, and tackling recursive logic for deep collection tree cleanups. It fundamentally helped me understand middleware integration, custom schema indexes, strict environment configurations, and error boundaries in Express.

[Software Demo Video](https://youtu.be/YOUR_VIDEO_ID_HERE)

# Development Environment

**Tools I used to build this:**

- **VS Code** - Type-safe code editor
- **Node.js v20+** - JavaScript runtime environment
- **npm** - Node Package Manager for installing dependencies
- **HTTPie** - CLI/Desktop API testing and development tool
- **MongoDB Atlas** - Cloud hosting platform for our data cluster
- **Git / GitHub** - Source control management

**Programming language and stack:**

- **TypeScript** - Strongly typed superset of JavaScript for static analysis and type safety
- **Express.js** - Light and resilient web routing framework for the web API
- **MongoDB** - Cloud NoSQL document database used to store independent task and subtask items
- **Mongoose** - Object Data Modeling (ODM) library used to create self-referencing models, population queries, and automated database indexes

# Useful Websites

- [ExpressJS Documentation](https://expressjs.com/)
- [Mongoose Docs - Model Population](https://mongoosejs.com/docs/populate.html)
- [MongoDB Manual - Expire Data from Collections (TTL)](https://www.mongodb.com/docs/manual/core/index-ttl/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [HTTPie Documentation](https://httpie.io/docs)

# Future Work

- **User Accounts & Authentication** - Add JWT or session cookies so users can protect and see only their own todo items.
- **Deep Nesting Validation** - Add safe visual limits or error handlers to prevent infinitely recursive task loops.
- **Frontend Dashboard** - Build a clean single-page interface using React or Vue to manage tasks and visualize subtasks clearly.
- **Soft Deletes** - Replace instant data deletion with an archive or 'Trash Can' state so users can restore accidentally deleted items.
- **WebSockets / Real-Time Updates** - Send instant event pushes to connected browser clients whenever tasks change statuses or auto-expire.
- **Priority Levels & Categories** - Add tags, categories, and sorted priority weights (`High`, `Medium`, `Low`) to task objects.