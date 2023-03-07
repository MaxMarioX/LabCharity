package pl.coderslab.charity.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import pl.coderslab.charity.repository.CategoryRepository;
import pl.coderslab.charity.repository.DonationRepository;

@RequestMapping("/donations")
@Controller
public class DonationController {

    CategoryRepository categoryRepository;

    public DonationController(CategoryRepository categoryRepository)
    {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/start")
    public String showDonationsForm(Model model)
    {
        model.addAttribute("categories", categoryRepository.findAll());

        return "donations";
    }
    @GetMapping("/confirmation")
    public String showDonationsFormConfirmation(Model model)
    {
        return "donations-confirmation";
    }

}
