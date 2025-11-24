/**
 * Legacy Firebase config - now redirects to centralized firebase.js
 * @deprecated Use firebase.js instead
 */

import { db, analytics, app } from './firebase';

// Re-export for backward compatibility
export { app, analytics, db };
export { db as default };
