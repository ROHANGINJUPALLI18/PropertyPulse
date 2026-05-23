# PropertyPulse - Complete Project Documentation

## 📋 PROJECT OVERVIEW

**PropertyPulse** is a full-stack Next.js web application that helps users find rental properties and connect with property owners. It's a modern real estate listing platform with user authentication, property management, messaging, and bookmarking features.

### Key Objectives:

- Enable renters to browse and search rental properties
- Allow property owners to list and manage their properties
- Facilitate communication between renters and owners through messaging
- Provide property bookmarking and saved properties functionality
- Implement user authentication and authorization

---

## 🏗️ FOLDER STRUCTURE & ARCHITECTURE

```
property-pulse-nextjs/
├── app/                          # Next.js App Router (Server-side routing)
│   ├── page.jsx                  # Home page
│   ├── layout.jsx                # Root layout wrapper
│   ├── error.jsx                 # Error boundary component
│   ├── loading.jsx               # Loading skeleton component
│   ├── not-found.jsx             # 404 page
│   ├── globals.css               # Global styles
│   ├── actions/                  # Server Actions (backend logic)
│   │   ├── addMessage.js         # Create new message
│   │   ├── addProperty.js        # Create new property
│   │   ├── bookmarkProperty.js   # Add property to bookmarks
│   │   ├── checkBookmarkStatus.js# Check if property is bookmarked
│   │   ├── deleteProperty.js     # Remove property listing
│   │   ├── updateProperty.js     # Edit property details
│   │   ├── deleteMessage.js      # Remove message
│   │   ├── markMessageAsRead.js  # Mark message as read
│   │   └── getUnreadMessageCount.js # Fetch unread count
│   ├── api/                      # API Routes
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.js      # NextAuth authentication endpoint
│   ├── properties/               # Properties feature routes
│   │   ├── page.jsx              # All properties listing
│   │   ├── [id]/
│   │   │   ├── page.jsx          # Single property details
│   │   │   └── edit/
│   │   │       └── page.jsx      # Edit property page
│   │   ├── add/
│   │   │   └── page.jsx          # Add new property page
│   │   ├── saved/
│   │   │   └── page.jsx          # Bookmarked properties
│   │   └── search-results/
│   │       └── page.jsx          # Search results page
│   ├── messages/                 # Messages feature
│   │   └── page.jsx              # All user messages
│   └── profile/                  # User profile
│       └── page.jsx              # User profile & listings
│
├── components/                   # Reusable React Components
│   ├── Navbar.jsx                # Navigation bar (uses useSession)
│   ├── Footer.jsx                # Footer component
│   ├── AuthProvider.jsx          # SessionProvider wrapper
│   ├── PropertyCard.jsx          # Property listing card
│   ├── PropertyContactForm.jsx   # Message form (Server Action)
│   ├── PropertyAddForm.jsx       # Create property form
│   ├── PropertyEditForm.jsx      # Edit property form
│   ├── PropertyDetails.jsx       # Property information display
│   ├── PropertyImages.jsx        # Image gallery with Photoswipe
│   ├── PropertySearchForm.jsx    # Search form component
│   ├── PropertyHeaderImage.jsx   # Hero image for property
│   ├── PropertyMap.jsx           # Mapbox integration
│   ├── BookmarkButton.jsx        # Save property button
│   ├── ShareButton.jsx           # Social media share
│   ├── MessageCard.jsx           # Individual message display
│   ├── UnreadMessageCount.jsx    # Unread badge (useGlobalContext)
│   ├── ProfileProperties.jsx     # User's property listings
│   ├── HomeProperties.jsx        # Featured properties on home
│   ├── Hero.jsx                  # Hero section
│   ├── InfoBoxes.jsx             # Info boxes for renters/owners
│   ├── InfoBox.jsx               # Single info box
│   ├── Spinner.jsx               # Loading spinner
│   ├── SubmitMessageButton.jsx   # Form submit button
│   └── Pagination.jsx            # Pagination component
│
├── models/                       # Mongoose Database Schemas
│   ├── User.js                   # User schema & model
│   ├── Property.js               # Property schema & model
│   └── Message.js                # Message schema & model
│
├── config/                       # Configuration files
│   ├── database.js               # MongoDB connection logic
│   └── cloudinary.js             # Cloudinary setup
│
├── utils/                        # Utility functions
│   ├── authOptions.js            # NextAuth configuration
│   ├── getSessionUser.js         # Get current user session
│   ├── convertToObject.js        # MongoDB to JSON converter
│   └── [other utilities]
│
├── context/                      # React Context (Global State)
│   └── GlobalContext.js          # Unread message count context
│
├── assets/                       # Static assets
│   ├── images/                   # Images, logos
│   └── styles/                   # Additional stylesheets
│
├── public/                       # Public static files
│   └── images/
│       └── properties/           # Property images
│
├── _theme_files/                 # HTML template files (reference)
│   ├── *.html                    # Original HTML mockups
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── main.js
│
├── middleware.js                 # Next.js middleware (route protection)
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── postcss.config.mjs            # PostCSS configuration
├── jsconfig.json                 # JavaScript path aliases
├── package.json                  # Dependencies
├── .env                          # Environment variables (local)
└── .env.production.example       # Production env template
```

---

## 🔑 KEY TERMS & NAMING CONVENTIONS

### **File & Folder Naming**

| Pattern      | Meaning                         | Example                             |
| ------------ | ------------------------------- | ----------------------------------- |
| `page.jsx`   | Route component (displays page) | `app/properties/page.jsx`           |
| `layout.jsx` | Wrapper component for routes    | `app/layout.jsx`                    |
| `[id]`       | Dynamic route segment           | `[id]/page.jsx` → `/properties/123` |
| `[...name]`  | Catch-all route                 | `[...nextauth]` → all auth routes   |
| `.js`        | Server action/utility           | `actions/addProperty.js`            |
| `.jsx`       | React component (client/server) | `components/Navbar.jsx`             |
| `context/`   | Global state management         | React Context API                   |
| `models/`    | Database schemas                | Mongoose models                     |
| `actions/`   | Server Actions (form handlers)  | Next.js 13+ feature                 |

### **Naming Conventions**

```
Components: PascalCase (MyComponent.jsx)
Functions: camelCase (handleClick, convertToObject)
Constants: UPPER_SNAKE_CASE (MAX_FILE_SIZE)
Variables: camelCase (userId, propertyName)
Files:
  - Components: PascalCase (PropertyCard.jsx)
  - Utils: camelCase (convertToObject.js)
  - Routes: kebab-case (search-results)
```

### **Route Patterns in App Router**

```
/                           → app/page.jsx (Home)
/properties                 → app/properties/page.jsx
/properties/[id]            → app/properties/[id]/page.jsx (Dynamic)
/properties/[id]/edit       → app/properties/[id]/edit/page.jsx
/properties/add             → app/properties/add/page.jsx
/properties/saved           → app/properties/saved/page.jsx
/properties/search-results  → app/properties/search-results/page.jsx
/messages                   → app/messages/page.jsx
/profile                    → app/profile/page.jsx
/api/auth/[...nextauth]     → NextAuth endpoint
```

---

## 📚 IMPORTANT CONCEPTS & ARCHITECTURE

### **1. NEXT.JS APP ROUTER (Server-Side Routing)**

- **app/** folder: All routes defined here (no config needed)
- **page.jsx**: Each folder's main page component
- **layout.jsx**: Wrapper for routes (applies to all children)
- **Server Components (Default)**: Components run on server, no JavaScript sent to browser
- **'use client'**: Enables client-side rendering for specific components

**Example - Server Component (fetches from DB):**

```jsx
// app/properties/page.jsx (Server Component by default)
export default async function PropertiesPage() {
  const properties = await Property.find().lean();
  return (
    <div>
      {properties.map(p => (
        <div key={p._id}>{p.name}</div>
      ))}
    </div>
  );
}
```

**Example - Client Component (interactive):**

```jsx
// components/Navbar.jsx
'use client'; // This makes it client-side
import { useSession } from 'next-auth/react';
export default function Navbar() {
  const { data: session } = useSession(); // Client-side hook
  return <nav>...</nav>;
}
```

---

### **2. SERVER ACTIONS (Backend Logic)**

Server Actions are async functions marked with `'use server'` that run on the backend. They replace API routes for most use cases.

**Flow:** Form Submit → Server Action → Database Operation → Revalidation → Response

**Key Files:**

- `app/actions/addProperty.js` - Create property
- `app/actions/addMessage.js` - Send message
- `app/actions/deleteProperty.js` - Remove property
- `app/actions/markMessageAsRead.js` - Update message status

**Example - Server Action:**

```jsx
// app/actions/addMessage.js
'use server';
import connectDB from '@/config/database';
import Message from '@/models/message';

export default async function addMessage(prevState, formData) {
  await connectDB();
  const newMessage = new Message({
    sender: formData.get('sender'),
    body: formData.get('message'),
  });
  await newMessage.save();
  return { submitted: true };
}
```

**Usage in Component:**

```jsx
'use client';
import { useFormState } from 'react-dom';
import addMessage from '@/app/actions/addMessage';

export default function Form() {
  const [state, formAction] = useFormState(addMessage, {});
  return (
    <form action={formAction}>
      <textarea name='message'></textarea>
      <button type='submit'>Send</button>
    </form>
  );
}
```

---

### **3. DATABASE MODELS (Mongoose)**

**User Schema** (`models/User.js`):

```javascript
{
  email: String,
  username: String,
  image: String,
  bookmarks: [Property._id] // References to bookmarked properties
}
```

**Property Schema** (`models/Property.js`):

```javascript
{
  owner: User._id,
  name: String,
  type: String,
  description: String,
  location: {
    street, city, state, zipcode
  },
  beds: Number,
  baths: Number,
  sqft: Number,
  amenities: [String],
  images: [String], // Cloudinary URLs
  rates: {
    weekly: Number,
    monthly: Number,
    nightly: Number
  },
  seller_info: {
    name, email, phone
  },
  createdAt: Date
}
```

**Message Schema** (`models/Message.js`):

```javascript
{
  sender: User._id,
  recipient: User._id,
  property: Property._id,
  name: String,
  email: String,
  phone: String,
  body: String,
  read: Boolean (default: false),
  createdAt: Date
}
```

---

### **4. AUTHENTICATION (NextAuth.js)**

**Flow:**

1. User clicks "Login with Google"
2. Redirects to Google OAuth consent screen
3. Google redirects back to `/api/auth/callback/google`
4. NextAuth creates user in DB if new
5. Session created with user data
6. Routes protected by middleware

**Key Files:**

- `utils/authOptions.js` - Configuration
- `app/api/auth/[...nextauth]/route.js` - Auth endpoint
- `middleware.js` - Route protection
- `components/AuthProvider.jsx` - SessionProvider wrapper

**Protected Routes:**

```javascript
// middleware.js
export const config = {
  matcher: [
    '/properties/add', // Only authenticated users
    '/messages',
    '/profile',
  ],
};
```

---

### **5. GLOBAL STATE (React Context)**

**Context:** `context/GlobalContext.js`

- **Purpose:** Track unread message count across app
- **Consumer Components:**
  - `components/UnreadMessageCount.jsx` - Badge in navbar
  - `components/MessageCard.jsx` - Updates count when marking as read

**Usage:**

```jsx
'use client';
import { useGlobalContext } from '@/context/GlobalContext';

export default function Component() {
  const { unreadCount, setUnreadCount } = useGlobalContext();
  return <span>{unreadCount}</span>;
}
```

---

### **6. ENVIRONMENT VARIABLES**

**Public Variables** (accessible in browser):

```env
NEXT_PUBLIC_DOMAIN=https://property-pulse.vercel.app
NEXT_PUBLIC_API_DOMAIN=https://property-pulse.vercel.app/api
NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY=...
NEXT_PUBLIC_MAPBOX_TOKEN=...
```

**Secret Variables** (server-only):

```env
MONGODB_URI=mongodb+srv://...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
NEXTAUTH_SECRET=...
CLOUDINARY_API_KEY=...
```

---

### **7. MIDDLEWARE (Route Protection)**

**Purpose:** Protect routes that require authentication

**Flow:** Request → Middleware → Check Session → Allow/Redirect

```javascript
// middleware.js
export { default as middleware } from 'next-auth/middleware';
export const config = {
  matcher: ['/properties/add', '/messages', '/profile', '/properties/saved'],
};
```

---

### **8. FORM SUBMISSION PATTERNS**

**Pattern 1: Server Action with useFormState**

```jsx
'use client';
import { useFormState } from 'react-dom';
import addProperty from '@/app/actions/addProperty';

export default function PropertyForm() {
  const [state, formAction] = useFormState(addProperty, {});

  return (
    <form action={formAction}>
      <input name='name' required />
      <button type='submit'>Add Property</button>
    </form>
  );
}
```

**Pattern 2: Click Handler with Server Action**

```jsx
'use client';
import deleteProperty from '@/app/actions/deleteProperty';

export default function DeleteButton({ propertyId }) {
  const handleDelete = async () => {
    await deleteProperty(propertyId);
  };

  return <button onClick={handleDelete}>Delete</button>;
}
```

---

### **9. IMAGE HANDLING (Cloudinary)**

**Flow:**

1. User uploads image via form
2. Sent to Cloudinary API
3. Cloudinary returns image URL
4. URL stored in MongoDB
5. URL displayed in components

**Usage:** Photos for properties, user profile pictures

---

### **10. SEARCH & FILTERING**

**Search Implementation:**

- Form in `PropertySearchForm.jsx`
- Searches by: location, property type
- Uses MongoDB regex queries
- Results displayed in `search-results/page.jsx`

**Example Query:**

```javascript
const query = {
  $or: [{ name: /search/i }, { 'location.city': /search/i }],
};
const results = await Property.find(query);
```

---

## 🔄 DATA FLOW EXAMPLES

### **Example 1: Creating a Property**

```
1. User visits /properties/add
2. Sees PropertyAddForm component
3. Fills form, clicks "Add Property"
4. Form action calls addProperty() server action
5. Server action:
   - Connects to MongoDB
   - Creates new Property document
   - Associates with current user (owner)
   - Uploads images to Cloudinary
   - Saves image URLs
   - Revalidates /properties route cache
6. Returns success message
7. Toast notification shows
8. Redirects to /properties
```

### **Example 2: Sending a Message**

```
1. User visits /properties/[id]
2. Sees PropertyContactForm
3. Fills message form
4. Clicks "Send Message"
5. Form action calls addMessage() server action
6. Server action:
   - Validates user is logged in
   - Prevents user from messaging themselves
   - Creates Message in MongoDB
   - Revalidates /messages route
7. Success toast shown
8. Form clears or shows success state
9. Message received by property owner
10. Unread count increases (GlobalContext)
```

### **Example 3: Bookmarking a Property**

```
1. User views property at /properties/[id]
2. Clicks BookmarkButton
3. Client-side click handler calls bookmarkProperty()
4. Server action:
   - Finds current user
   - Adds property ID to bookmarks array
   - Saves user document
5. Button UI updates to show "Bookmarked"
6. User can view bookmarks at /properties/saved
```

---

## 🎨 TECHNOLOGY STACK BREAKDOWN

| Layer            | Technology               | Purpose                        |
| ---------------- | ------------------------ | ------------------------------ |
| **Frontend**     | React 19                 | UI components                  |
| **Framework**    | Next.js 16               | Server-side rendering, routing |
| **Styling**      | Tailwind CSS             | Utility-first CSS              |
| **Database**     | MongoDB                  | NoSQL database                 |
| **ORM**          | Mongoose                 | MongoDB schema & validation    |
| **Auth**         | NextAuth.js              | Google OAuth & sessions        |
| **Image Upload** | Cloudinary               | Cloud image storage            |
| **Maps**         | Mapbox, React Map GL     | Location display               |
| **Messaging**    | React Context            | Global state                   |
| **Forms**        | React DOM (useFormState) | Server actions                 |
| **UI Feedback**  | React Toastify           | Toast notifications            |
| **Icons**        | React Icons              | SVG icons                      |
| **Gallery**      | Photoswipe               | Image lightbox                 |
| **Sharing**      | React Share              | Social media share             |

---

## ✅ KEY FEATURES BREAKDOWN

| Feature           | Location                  | Technology               |
| ----------------- | ------------------------- | ------------------------ |
| **User Auth**     | `utils/authOptions.js`    | NextAuth + Google OAuth  |
| **Property CRUD** | `properties/*` routes     | Server Actions           |
| **Messaging**     | `messages/page.jsx`       | Server Actions + Context |
| **Bookmarks**     | `properties/saved`        | Server Actions + DB refs |
| **Search**        | `search-results/page.jsx` | MongoDB regex            |
| **Image Upload**  | Forms                     | Cloudinary               |
| **Maps**          | `PropertyMap.jsx`         | Mapbox GL                |
| **Unread Count**  | Navbar                    | Global Context           |
| **User Profile**  | `profile/page.jsx`        | Server component         |

---

This project demonstrates modern full-stack development with Next.js 13+ features including Server Components, Server Actions, and the App Router paradigm.
