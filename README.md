# Client Side

This is the client side of the coworking project.

## Table of Contents

- [Features](#features)
- [Server Features](#server-features)
- [Getting Started](#getting-started)
- [Build](#build)
- [Preview](#preview)
- [Lint](#lint)
- [Clone the Repository](#clone-the-repository)

## Features

- **Routing**: Handled by `react-router-dom` with lazy loading for better performance.
- **State Management**: Using `zustand` for state management.
- **Forms**: Managed with `react-hook-form` and validation using `yup`.
- **OAuth**: Google OAuth integration using `@react-oauth/google`.
- **Data Fetching**: Handled by `@tanstack/react-query`.
- **Notifications**: Using `react-hot-toast` for toast notifications.
- **Error Handling**: Implemented with an `ErrorBoundary` component.
- **Styling**: Tailwind CSS for styling and `clsx` for conditional class names.

## Server Features

- **Authentication**: Handled by `passport` with strategies for GitHub and Google OAuth.
- **Database**: Using `MongoDB` with `mongoose` for data modeling.
- **Real-time Communication**: Implemented with `socket.io`.
- **Email Service**: Using `nodemailer` for sending emails.
- **File Uploads**: Managed with `multer` for handling multipart/form-data.

## Getting Started

To get started, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/esmael-Abdlkadr/coworking-client.git
   cd coworking-client
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Run the development server**:
   ```bash
   pnpm run dev
   ```

## Build

To build the project, run:

```bash
pnpm run build
```

## Preview

To preview the production build, run:

```bash
pnpm run preview
```

## Lint

To lint the project, run:

```bash
pnpm run lint
```

## Clone the Repository

To clone the repository, use the following command:

```bash
git clone https://github.com/esmael-Abdlkadr/coworking-client.git
```
