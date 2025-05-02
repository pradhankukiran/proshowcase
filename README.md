# ProShowcase - Service Professional Portfolio

This project is a web application designed for service professionals to create and showcase their portfolios, connect with potential clients, and manage their online presence.

## Features

*   **User Authentication:** Secure login and registration functionality using Supabase Auth.
*   **Professional Profiles:** Create and manage detailed user profiles including name, bio, contact info, service areas, industry, specialties, and profile image.
*   **Project Showcasing:** Add and display projects with descriptions, categories, dates, locations, photos, and captions.
*   **Public Directory:** A searchable directory of public professional profiles.
*   **Directory Filtering & Sorting:** Filter profiles by industry, location, specialty, and sort results.
*   **Profile Reviews:** (Inferred from types - functionality might need verification) Allow users to leave reviews on profiles.
*   **Responsive Design:** Built with Tailwind CSS for a seamless experience across devices.

## Tech Stack

*   **Frontend:** React, TypeScript, Vite
*   **Routing:** React Router v6
*   **Styling:** Tailwind CSS
*   **UI Components:** Custom components + Lucide Icons
*   **Backend & Auth:** Supabase (Database, Auth)
*   **State Management:** React Context API (for Auth)

## Getting Started

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn
*   Supabase Account (for backend and authentication)

### Installation

1.  Clone the repository:
    ```bash
    git clone <YOUR_REPOSITORY_URL_HERE> 
    ```
2.  Navigate to the project directory:
    ```bash
    cd proshowcase 
    ```
3.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
4.  **Set up Environment Variables:**
    Create a `.env` file in the root of the project directory. Add your Supabase project URL and Anon key:
    ```env
    VITE_SUPABASE_URL=YOUR_SUPABASE_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```
    You can find these in your Supabase project settings.

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

This will start the Vite development server, typically on `http://localhost:5173`. Open this URL in your browser.

### Building for Production

```bash
npm run build
# or
yarn build
```

This command bundles the application for production deployment into the `dist` folder.

### Linting

```bash
npm run lint
# or
yarn lint
```

This command runs ESLint to check for code style and potential errors based on the configured rules.

### Previewing the Production Build

```bash
npm run preview
# or
yarn preview
```

This command serves the production build locally (from the `dist` folder) for previewing before deployment.

## Contributing

Contributions are welcome! Please follow these general guidelines:

1.  **Fork** the repository.
2.  Create a new **branch** for your feature or bug fix (`git checkout -b feature/your-feature-name`).
3.  Make your changes and **commit** them with clear messages.
4.  **Push** your changes to your fork (`git push origin feature/your-feature-name`).
5.  Create a **Pull Request** to the main repository's `main` branch.
6.  Ensure your code passes linting checks (`npm run lint`).

(Feel free to replace this with more specific contribution guidelines if you have them.)

## License

(Specify the license for your project here, e.g., MIT License)

[License Text Placeholder - e.g., MIT License]

Copyright (c) [Year] [Your Name/Organization]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. 