package com.paf.api.comment.service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    // Inject JavaMailSender into the service
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    // Send an email notification with embedded CSS
    public void sendEmail(String to, String subject, String message) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            helper.setTo(to);  // Recipient email address
            helper.setSubject(subject);  // Email subject
            helper.setText(message, true);  // Enable HTML content

            mailSender.send(mimeMessage);  // Send the email
        } catch (MessagingException e) {
            e.printStackTrace();  // Handle error in production environment properly
        }
    }

    // Send notification when someone replies to a comment with beautiful CSS
    public void sendReplyNotification(String userEmail, String commentAuthor, String commentContent) {
        String subject = "New Reply to Your Comment";
        String message = "<html><head>"
                + "<style>"
                + "body { font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; padding: 20px; }"
                + "h1 { color: #2C3E50; }"
                + "p { font-size: 16px; line-height: 1.5; }"
                + ".email-container { background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); max-width: 600px; margin: 0 auto; }"
                + ".button { background-color: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; }"
                + ".button:hover { background-color: #2980b9; }"
                + ".footer { font-size: 12px; color: #aaa; text-align: center; margin-top: 20px; }"
                + "</style>"
                + "</head><body>"
                + "<div class='email-container'>"
                + "<h1>New Reply to Your Comment</h1>"
                + "<p>Hello, <strong>" + userEmail + "</strong></p>"
                + "<p>" + commentAuthor + " has replied to your comment:</p>"
                + "<blockquote style='font-style: italic; color: #555;'>"
                + commentContent
                + "</blockquote>"
                + "<p>Check it out and join the conversation!</p>"
                + "<a href='#' class='button'>Go to Comment</a>"
                + "</div>"
                + "<div class='footer'>"
                + "<p>If you no longer wish to receive notifications, you can unsubscribe.</p>"
                + "</div>"
                + "</body></html>";

        sendEmail(userEmail, subject, message);
    }

    // Send notification when someone likes your comment with beautiful CSS
    public void sendLikeNotification(String userEmail, String commentAuthor) {
        String subject = "Your Comment Was Liked!";
        String message = "<html><head>"
                + "<style>"
                + "body { font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; padding: 20px; }"
                + "h1 { color: #2C3E50; }"
                + "p { font-size: 16px; line-height: 1.5; }"
                + ".email-container { background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); max-width: 600px; margin: 0 auto; }"
                + ".button { background-color: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; }"
                + ".button:hover { background-color: #2980b9; }"
                + ".footer { font-size: 12px; color: #aaa; text-align: center; margin-top: 20px; }"
                + "</style>"
                + "</head><body>"
                + "<div class='email-container'>"
                + "<h1>Your Comment Was Liked!</h1>"
                + "<p>Hello, <strong>" + userEmail + "</strong></p>"
                + "<p>Your comment was liked by <strong>" + commentAuthor + "</strong>.</p>"
                + "<p>Keep contributing to the discussion!</p>"
                + "<a href='#' class='button'>View Comment</a>"
                + "</div>"
                + "<div class='footer'>"
                + "<p>If you no longer wish to receive notifications, you can unsubscribe.</p>"
                + "</div>"
                + "</body></html>";

        sendEmail(userEmail, subject, message);
    }
}
