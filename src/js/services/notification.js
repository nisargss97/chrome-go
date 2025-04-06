// Notification service for handling UI notifications
class NotificationService {
  constructor() {
    this.notification = document.getElementById("notification");
    this.messageElement = this.notification.querySelector(".notification-message");
  }

  show(message, type = 'success') {
    this.messageElement.textContent = message;
    this.notification.className = `notification ${type}`;
    this.notification.classList.add('show');
    
    setTimeout(() => {
      this.notification.classList.remove('show');
    }, 3000);
  }

  showSuccess(message) {
    this.show(message, 'success');
  }

  showError(message) {
    this.show(message, 'error');
  }
}

export default new NotificationService(); 