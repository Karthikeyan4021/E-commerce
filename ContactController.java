package com.example.contactform.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/send")
    public String sendEmail(@RequestParam String name, 
                            @RequestParam String email, 
                            @RequestParam String phone, 
                            @RequestParam String message) {

        String recipient = "karthikeyan1999rer@gmail.com"; // Default email ID
        String subject = "New Contact Form Submission";
        String body = "Name: " + name + "\nEmail: " + email + "\nPhone: " + phone + "\nMessage: " + message;

        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(recipient);
            mailMessage.setSubject(subject);
            mailMessage.setText(body);
            mailSender.send(mailMessage);
            return "Success";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}
