# Donoud To-Do List App

Donoud is a straightforward to-do list and note-taking application built with React and Vite. It helps you keep tasks and notes together and offers quick filtering to stay organized. All data lives in your browser via **TanStack DB** (persisted to local storage), ensuring the app works even offline.

**Live demo**: [https://donude.netlify.app/](https://donude.netlify.app/)

## Technologies Used

-   **React** (with Hooks)
-   **Vite**
-   **TanStack DB**: For robust, reactive local state management of tasks, notes, and UI state (replacing Redux/Context).
-   **React-Bootstrap**: For styling and layout.
-   **Framer Motion**: For animations.

## Project Structure

The codebase follows a **feature-based modular architecture**. Instead of grouping files by technical role (`components/`, `hooks/`, etc.), code is organized by domain:

```
src/
├── app/          # App shell — root component, routing, layout
├── features/
│   ├── tasks/    # 📋 Tasks module (components, hooks, models, pages)
│   └── notes/    # 📝 Notes module (components, hooks, models, pages)
├── shared/       # 🔧 Cross-cutting code (DB, global hooks, utilities)
├── assets/       # SCSS and SVG assets
├── images/       # Raster images
└── sounds/       # Audio files
```

Each feature exposes a clean public API through a barrel `index.ts` file. For a full breakdown of every directory, conventions, and how to add new features, see **[ARCHITECTURE.md](./ARCHITECTURE.md)**.

## Features

- Create tasks: Users can easily create new tasks to organize their work.
- Edit tasks: Tasks can be edited to update their titles or details as needed.
- Add details: Users can add additional details to tasks to provide more context or information.
- Local storage: Data is stored locally using the browser's local storage, ensuring persistence across sessions.
- Note-taking capability: Users can take notes within the app to jot down thoughts, ideas, or reminders.
- Filtering: The app provides filtering options for both tasks and notes, allowing users to quickly find what they need.
- Delete tasks and notes to keep your lists tidy.
- Mark tasks as finished and keep old tasks organized by date.
- Assign categories to tasks for quick filtering and context.
- Color-code notes and edit them using a rich text editor.
- Pin important notes so they stay at the top.
- Sort notes by creation date or last update.
- Organize notes into folders for easier filtering.

## Installation

To run the app locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies by running `npm install`.
4. Start the development server by running `npm run dev`.
5. Access the app in your browser at `http://localhost:5173`.

## Usage

1. Launch the app in your browser.
2. Click on the "Add Task" button to create a new task.
3. Click on a task to edit its title or details.
4. Use the input fields and buttons provided to make changes.
5. Changes are automatically saved to local storage.
6. Use the filtering options to efficiently organize and find tasks and notes.
7. Create and manage note folders from the notes toolbar to keep related notes together.

## Android App Distribution (Capacitor)

This project is configured to package the Vite app as a native Android app with Capacitor.

1. Install dependencies:
   `npm install`
2. Build web assets and sync Capacitor:
   `npm run android:build`
3. Create Android project (first time only):
   `npm run cap:add:android`
4. Open native project in Android Studio:
   `npm run android:open`
5. In Android Studio:
   - Set app `applicationId` and version in `android/app/build.gradle`
   - Configure signing (Generate Signed Bundle / APK)
   - Build one of:
     - `app-release.apk` for direct install/testing
     - `app-release.aab` for Google Play upload

CLI alternative (from `android/`):

```bash
./gradlew assembleRelease   # APK
./gradlew bundleRelease     # AAB
```

Output files are generated under:
- `android/app/build/outputs/apk/release/`
- `android/app/build/outputs/bundle/release/`

## Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
