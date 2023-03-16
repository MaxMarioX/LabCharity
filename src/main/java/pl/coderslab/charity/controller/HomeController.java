package pl.coderslab.charity.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import pl.coderslab.charity.repository.DonationRepository;
import pl.coderslab.charity.repository.InstitutionRepository;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;


@Controller
public class HomeController {

    private final DonationRepository donationRepository;

    private final InstitutionRepository institutionRepository;

    private JavaMailSender javaMailSender;

    public HomeController(JavaMailSender javaMailSender, DonationRepository donationRepository, InstitutionRepository institutionRepository)
    {
        this.javaMailSender = javaMailSender;
        this.donationRepository = donationRepository;
        this.institutionRepository = institutionRepository;
    }

    @RequestMapping("/")
    public String homeAction(Model model)
    {
        model.addAttribute("institutions", institutionRepository.findAll(Pageable.ofSize(4)).getContent());
        model.addAttribute("quantities", donationRepository.sumQuantities().orElse(0L));
        model.addAttribute("donations", donationRepository.count());

        return "index";
    }

    @PostMapping("/sendmail")
    public String sendMain(HttpServletRequest httpServletRequest)
    {
        SimpleMailMessage mailMessage = new SimpleMailMessage();

        mailMessage.setFrom("pm@mp-programs.pl");
        mailMessage.setTo("mariusz.plaskota@o2.pl");
        mailMessage.setSubject("New message from site");
        mailMessage.setText("--- New message from pomagasie.com ---" +
                            "\nName: " + httpServletRequest.getParameter("name") +
                            "\nSurname: " + httpServletRequest.getParameter("surname") +
                            "\nMessage: " + httpServletRequest.getParameter("message"));

        javaMailSender.send(mailMessage);

        return "redirect:/";
    }
}
