# Bookmark App by Gopinath
## gopi.s.2k@gmail.com | 9150877848

# The Challenge: Building a Real-Time Bookmark Manager

First of all I'm new to Typescript, Next.js and React.js but I can understand some concepts. It was challenging to complete this task and it took time more than I expected.

I summerize those challenges I faced and resolved below

---

## Key Problems & Solutions

### 1. Maintaining User UUID in session
**Problem:** I wanted to store user's UUID in my session so that I don't need to fetch that from DB again and again for each request. Since the session was provided by Google, writing it so session.user made some errors.

**Solution:** I stored it in **JWT** provided NextAuth/JWT and used it for subsequent after login.

### 2. Rendering issues of Add Bookmark Popup
**Problem:** The adding bookmark popup was flickered and not showen up properly.

**Solution:** I identified out that was becuase of state problem and forced state to change by adding **"key"** attribute to that component.

### 3. Real time updation of UI 
**Problem:** Updating UI of one tab when data changed in server without any user interaction.

**Solution:** used **SWR** to handle caching and realtime update to page when DB gets updated

### 4. Authorization and security
**Problem:** To make bookmarks only accessible to owner.

**Solution:** In my table I stored a foreign key (UUID) of User when they insert a new bookmark. **I never gave the UUID of one user to front end** it only resides in server side. And also didn't demanded to send it as well in add,edit or delete requests. So, one can only work with their own bookmarks along.

---
## Thankyou