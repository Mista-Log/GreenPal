# API and Business Logic Overview

This document summarizes the core logic of the Green Sabi application to help backend developers understand how the frontend expects to interact with the database and API.

## 1. Authentication (Simplified)

- **Mechanisms**: Currently, the frontend uses a cookie-based system.
- **Cookie Name**: `gs_auth`
- **Value**: `1` (Mock for valid session)
- **Flow**: Any user attempting to access routes `/`, `/tips`, `/goals`, `/scan` without this cookie is redirected to `/auth`.
- **Backend Requirement**: Implement a standard JWT or Session-based authentication and update the `AuthGuard.tsx` to verify this against a real API.

## 2. Farm Goals and Progress Tracking

- **Calculating Progress**:
  The frontend expects to show a progress bar calculated as:
  `(currentValue / targetValue) * 100`
- **Goal Completion**:
  A goal is considered "Completed" if its `status` is `completed`. However, it should automatically mark as completed when all milestones are `isCompleted: true`.
- **Milestone Reasoning**:
  Each milestone is not just a checkbox; it includes a `reasoning` field. This is displayed to the farmer to explain *why* the task matters (e.g., "Grains must be <14% moisture to prevent post-harvest mold").

## 3. Tips and Content Delivery

- **Featured Content**:
  Tips are categorized and certain tips are marked as `featured`. The homepage displays featured tips first.
- **Slug-based Routing**:
  The frontend uses slugs (e.g., `/tips/best-planting-time`) to retrieve content. The backend API should support lookups by slug.

## 4. Diagnosis and Activity History

- **Recent Activity**:
  This is a polymorphic list that can contain `diagnosis` results, `tip` read history, or `question` history.
- **Confidence Scores**:
  Diagnoses (AI-driven) always include a `confidence` percentage (Integer 0-100). This must be stored and returned for diagnosis-type events.

## 5. Weather Data

- **Overview**:
  Current implementation is static. The backend should ideally integrate with a weather API (like OpenWeatherMap) to provide real-time data based on the user's location.
- **Structure**:
  Returns temperature, location name, a human-readable condition (e.g., "Sunny"), and a material-design icon name.
