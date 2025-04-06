// Keyboard service for handling keyboard navigation and shortcuts
class KeyboardService {
  constructor(navigationService) {
    this.navigationService = navigationService;
    this.setupKeyboardNavigation();
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', this.handleKeyPress.bind(this));
    this.setupTabNavigation();
    this.setupKeyboardHints();
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleEnter(e);
    } else if (e.key === 'Escape') {
      this.handleEscape(e);
    }
  }

  handleEnter(e) {
    const activeElement = document.activeElement;
    
    if (activeElement.id === 'save-btn' || 
        activeElement.id === 'key' || 
        activeElement.id === 'url') {
      document.getElementById('save-btn').click();
    } else if (activeElement.id === 'confirm-btn') {
      document.getElementById('confirm-btn').click();
    }
  }

  handleEscape(e) {
    const dialog = document.getElementById('confirm-dialog');
    if (dialog.style.display === 'flex') {
      document.getElementById('cancel-btn').click();
    } else if (this.navigationService.getCurrentView() !== 'home') {
      document.getElementById('back-btn').click();
    }
  }

  setupTabNavigation() {
    document.querySelectorAll('button, input, [tabindex]:not([tabindex="-1"])').forEach(element => {
      element.setAttribute('tabindex', '0');
    });
  }

  setupKeyboardHints() {
    document.querySelectorAll('button').forEach(button => {
      if (button.id === 'save-btn' || button.id === 'confirm-btn') {
        button.setAttribute('title', 'Enter');
      } else if (button.id === 'back-btn' || button.id === 'cancel-btn') {
        button.setAttribute('title', 'Esc');
      }
    });
  }
}

export default KeyboardService; 