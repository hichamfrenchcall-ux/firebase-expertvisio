# Project Blueprint: Expert-View SaaS

## Overview

Expert-View is a SaaS platform designed for accounting firms, enabling them to conduct secure, geo-tagged video calls with their clients. The platform provides tools for recording, downloading, and managing these interactions, streamlining remote expertise and verification processes.

## Core Features & Design

### Implemented Features
*(This section will be filled as we develop the application)*

*   **Initial Project Setup:**
    *   Next.js with TypeScript.
    *   Tailwind CSS for styling.
    *   ESLint for code quality.

### Style and Design
*   **Theme:** Modern, professional, and trustworthy.
*   **Color Palette:** Primary colors will be blues and greens, conveying trust and financial stability. Accent colors will be used for calls-to-action.
*   **Typography:** Clean and readable sans-serif fonts.
*   **Layout:** Responsive and mobile-first, ensuring a seamless experience on both desktop and mobile devices.

## Development Plan: Current Request

The user wants to build a SaaS application for accounting firms with the following features:
-   Each firm gets an account.
-   Ability to send a video call link.
-   Video calls are geo-tagged.
-   Firms can download recordings.
-   Admin interface to manage firms and payments (manually).

### Additional Feature Ideas
*   Screen sharing during video calls.
*   Secure file sharing.
*   Timestamped notes during calls.
*   A dashboard with call history and analytics.
*   White-labeling for firms to use their own branding.

### Step 1: Create the Landing Page

**Goal:** Create a visually appealing and informative landing page to act as the entry point for the application.

**Plan:**
1.  **Create `blueprint.md`:** Create the blueprint file to document the project.
2.  **Update `globals.css`:** Add some base styles and a background texture.
3.  **Modify `layout.tsx`:** Update the root layout with metadata.
4.  **Create a `components` folder:** To store reusable UI components.
5.  **Create a `Header` component:** A navigation bar for the landing page.
6.  **Design the `page.tsx` (Landing Page):**
    *   **Hero Section:** A compelling headline, a brief description of the service, and a call-to-action button.
    *   **Features Section:** An overview of the key features (video calls, GPS tagging, recordings).
    *   **Footer:** With links and copyright information.
7.  **Use free icons and images:** To make the page more visually appealing.

### Step 2: Integrate Supabase and GitHub

**Goal:** Set up the backend with Supabase and initialize a GitHub repository for version control.

**Plan:**
1.  **Install Supabase CLI and initialize the project.**
2.  **Install the Supabase JS library.**
3.  **Set up environment variables for Supabase.**
4.  **Initialize a Git repository.**
5.  **Create a new repository on GitHub and push the initial code.**
