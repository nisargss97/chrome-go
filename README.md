# Go - Chrome URL Shortcut Extension

A Chrome extension that allows you to create custom shortcuts for your frequently visited websites. Simply type your shortcut in the address bar and press Enter to navigate instantly.

## Features

### URL Shortcuts
- Create custom shortcuts for any website
- Type shortcuts directly in the address bar
- Automatic HTTPS prefix for URLs
- Edit and delete existing shortcuts
- View all shortcuts in one place

### User Interface
- Clean, modern design
- Dark theme support
- Intuitive navigation
- Responsive layout

### Keyboard Navigation
- Tab navigation between elements
- Enter key to save/confirm actions
- Escape key to cancel/close dialogs
- Keyboard shortcuts for common actions

### Notifications
- Success notifications for adding/updating shortcuts
- Confirmation dialog for deleting shortcuts
- Error notifications for invalid inputs
- Auto-dismissing notifications

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the `src` directory
5. The extension is now installed and ready to use

## Usage

### Creating a Shortcut
1. Click the extension icon in your Chrome toolbar
2. Enter a shortcut key (e.g., "yt")
3. Enter the URL (e.g., "youtube.com")
4. Click "Save" or press Enter

### Using a Shortcut
1. Click in the address bar
2. Type your shortcut (e.g., "yt")
3. Press Enter to navigate to the website

### Managing Shortcuts
- **View All**: Click "View All" to see all your shortcuts
- **Edit**: Click the edit button next to a shortcut to modify it
- **Delete**: Click the delete button and confirm to remove a shortcut

### Keyboard Shortcuts
- **Tab**: Navigate between elements
- **Enter**: Save/confirm actions
- **Escape**: Cancel/close dialogs or go back
- **Shift + Tab**: Navigate backwards between elements

## Default Shortcuts

The extension comes with some default shortcuts:
- `cal` → `https://calendar.google.com`
- `mail` → `https://mail.google.com`
- `yt` → `https://youtube.com`
- `git` → `https://github.com`

## Development

For information about contributing to this project, setting up a development environment, and understanding the codebase, please see our [Development Guide](docs/DEVELOPMENT.md).

### Project Structure
```
src/
├── js/               # JavaScript files
├── css/              # Stylesheets
├── assets/           # Static assets
├── popup.html        # Popup UI
└── manifest.json     # Extension config
```

## Contributing

We welcome contributions! Please read our [Development Guide](docs/DEVELOPMENT.md) for details on:
- Setting up your development environment
- Code style guidelines
- Testing procedures
- Submitting pull requests

## License

This project is licensed under the MIT License - see the LICENSE file for details.