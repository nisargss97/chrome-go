# Development Guide

## Project Structure

```
src/
├── js/
│   ├── popup.js       # Popup UI logic and event handlers
│   └── background.js  # Background service worker and omnibox handling
├── css/
│   └── style.css      # Styles for the popup UI
├── assets/            # Icons and other static assets
├── popup.html         # Popup UI markup
└── manifest.json      # Extension configuration
```

## Code Organization

### popup.js
- Handles all UI interactions
- Manages shortcut CRUD operations
- Implements keyboard navigation
- Handles notifications and dialogs

### background.js
- Manages the omnibox functionality
- Handles default shortcuts
- Manages storage operations

### style.css
- Implements the dark theme
- Styles for popup UI components
- Responsive design elements
- Animation and transition styles

## Development Setup

1. Clone the repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable Developer mode
4. Click "Load unpacked" and select the `src` directory

## Code Style Guidelines

- Use ES6+ features
- Follow Chrome Extension best practices
- Use async/await for asynchronous operations
- Keep functions small and focused
- Add comments for complex logic
- Use meaningful variable names

## Adding New Features

1. Create a new branch for your feature
2. Make your changes following the code style
3. Test thoroughly in Chrome
4. Submit a pull request

## Testing

- Test all CRUD operations
- Verify keyboard navigation
- Check notifications and dialogs
- Test with different screen sizes
- Verify default shortcuts work

## Common Issues

1. **Storage Issues**
   - Clear extension data in Chrome
   - Check storage permissions in manifest

2. **UI Issues**
   - Verify CSS specificity
   - Check event listener cleanup
   - Test keyboard navigation

3. **Background Script Issues**
   - Check manifest permissions
   - Verify service worker registration
   - Test omnibox functionality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Pull Request Guidelines

- Include a description of changes
- Reference any related issues
- Ensure all tests pass
- Update documentation if needed

## Resources

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Chrome Extension Samples](https://github.com/GoogleChrome/chrome-extensions-samples)
- [Manifest V3 Documentation](https://developer.chrome.com/docs/extensions/mv3/) 