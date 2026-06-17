# Notes Manager with Tagging

## Live Demo

🔗 **Deployment Link**

https://notes-management-app-brown.vercel.app

> Replace the above URL with your deployed Vercel application link.

---

## Overview

Notes Manager is a React-based web application that helps users create, organize, search, and manage notes efficiently. The application supports tagging, categorization, sorting, pinning, exporting, and restoring deleted notes. Data is stored locally using browser Local Storage to ensure persistence across sessions.

This project was developed as part of a case study to demonstrate problem-solving skills, coding ability, and effective use of AI-assisted development tools.

---

## Features

### Core Requirements

* Create Notes
* Add Tags to Notes
* Store Notes
* Search Notes by Tag
* Display Search Results

### Additional Features Implemented

* Edit Notes
* Delete Notes
* Trash & Restore Notes
* Pin / Unpin Notes

* Category-Based Organization
  * Study
  * Work
  * Personal

* Category Filtering

* Search by:
  * Title
  * Content
  * Tags

* Sort Notes:
  * Newest First
  * Oldest First
  * A-Z
  * Z-A
  * Pinned First
* Export Notes as JSON
* Dark Mode
* Created Timestamp
* Updated Timestamp
* Character Count
* Expand / Collapse Notes
* Local Storage Persistence

---

## Technology Stack

### Frontend

* React
* TypeScript
* Vite

### UI Framework

* Material UI (MUI)

### State Management

* React Hooks

  * useState
  * useEffect

### Storage

* Browser Local Storage

---

## Application Screenshots

### Create Note

![Create Note](./screenshots/create note.png)

### Search 

![Search and Filter](./screenshots/search by tag.png)

### Notes List

![Notes List](./screenshots/notes list.png)



### Trash and Restore

![Trash](./screenshots/thrash.png)

> Create a folder named `screenshots` in the project root and place your screenshots inside it.

---

## Setup and Run Instructions

### Clone Repository

```bash
git clone <repository-url>
cd notes-app
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build Project

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Assumptions Made During Development

* Notes are stored locally in the browser.
* No user authentication is required.
* Application is designed for single-user usage.
* Export functionality is provided in JSON format.
* Internet connection is not required after loading the application.
* Local Storage is sufficient for persistence requirements.

---

## AI-Assisted Development Note

This project was developed using AI-assisted development tools to improve productivity and accelerate development.

### AI Tools Used

* ChatGPT

### How AI Helped During Development

ChatGPT was used for:

* React and TypeScript guidance
* UI enhancement suggestions
* State management implementation
* Debugging TypeScript issues
* Material UI integration support
* Feature brainstorming and improvements
* Deployment troubleshooting
* Code review and optimization suggestions

### Challenges Encountered

Several challenges were encountered during development:

* Managing multiple note-related features while maintaining a clean UI
* Implementing search functionality across title, content, and tags
* Designing a user-friendly note organization system
* Handling note restoration from trash
* Managing local storage persistence
* Resolving TypeScript and Material UI compatibility issues
* Fixing deployment-related build errors

These challenges were addressed through testing, debugging, and iterative improvements with AI-assisted guidance.

---

## Future Enhancements

* User Authentication
* Cloud Storage Integration
* Import Notes from JSON
* Rich Text Editing Support
* Note Sharing
* Multiple User Profiles
* Real-Time Synchronization
* Reminder and Notification System

---

## Project Outcome

The application successfully fulfills all required objectives:

✔ Create Notes

✔ Add Tags

✔ Store Notes

✔ Search Notes by Tags

✔ Display Search Results

Additionally, the project includes several enhancements to improve usability, organization, and user experience.

The final solution demonstrates practical React development, state management, data persistence, and effective use of AI-assisted software development tools.
