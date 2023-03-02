package pl.coderslab.charity.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import pl.coderslab.charity.dao.DonationsDao;
import pl.coderslab.charity.dao.InstitutionDao;


@Controller
public class HomeController {

    private final InstitutionDao institutionDao;
    private final DonationsDao donationsDao;

    public HomeController(InstitutionDao institutionDao, DonationsDao donationsDao)
    {
        this.institutionDao = institutionDao;
        this.donationsDao = donationsDao;
    }

    @RequestMapping("/")
    public String homeAction(Model model)
    {
        model.addAttribute("institutions", institutionDao.findAll());
        model.addAttribute("quantities", donationsDao.countQuantities());

        return "index";
    }
}
