# Database Schema Design (Version 1.0)

This document provides the core entity-relationship model and schema definitions for the Green Sabi application, derived from the current frontend mock data and types.

## 1. Core Entities

### User

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `email` | String | Unique, user's email address |
| `password` | Hash | BCrypt or Argon2 hashed password |
| `name` | String | User's full name |
| `joinedYear` | String | Year user joined (default: CURRENT_YEAR) |
| `monogram` | String | Initial of the user's name |

---

---

### Tip

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | String | Primary Key (e.g., `tip_feat_001`) |
| `title` | String | Title of the tip |
| `duration_minutes` | Integer | Estimated read/watch time |
| `category` | String | Foreign Key/Enum (see `TipCategory`) |
| `image` | String | Path or URL to the thumbnail |
| `slug` | String | URL-friendly identifier |
| `is_featured` | Boolean | Whether this is a featured tip |

---

---

### FarmGoal

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | String | Primary Key |
| `user_id` | UUID | Foreign Key to `User` |
| `title` | String | Goal headline (e.g., "Maize Harvest Target") |
| `category` | Enum | Values: `Crops`, `Livestock`, `Soil Health`, `Business` |
| `currentValue` | Float | Current progress value |
| `targetValue` | Float | Target goal value |
| `unit` | String | Unit of measure (e.g., "Tons/Ha", "NGN") |
| `icon` | String | Material search icon name (e.g., `agriculture`) |
| `imageUrl` | String | Representative image URL |
| `status` | Enum | Values: `active`, `completed` |

---

---

### GoalMilestone

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | String | Primary Key |
| `goal_id` | String | Foreign Key to `FarmGoal` |
| `title` | String | Milestone description |
| `isCompleted` | Boolean | Status of completion |
| `reasoning` | Text | Explains *why* this milestone matters (UX-critical) |

---

---

### RecentActivity

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | String | Primary Key |
| `user_id` | UUID | Foreign Key to `User` |
| `type` | Enum | Values: `diagnosis`, `tip`, `question` |
| `title` | String | Event headline (e.g., "Cassava Mosaic Disease") |
| `occurred_at` | DateTime | Timestamp of the event |
| `confidence` | Integer | (Nullable) Detection confidence (0-100) |

## 2. Enums and Constants

### TipCategory

- Soil Care
- Crop Planting
- Irrigation
- Pest Control
- Weed Control
- Fertilizers
- Composting
- Crop Rotation
- Harvesting
- Organic Farming
