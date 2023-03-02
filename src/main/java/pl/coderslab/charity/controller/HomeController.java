package pl.coderslab.charity.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import pl.coderslab.charity.dao.InstitutionDao;


@Controller
public class HomeController {

    private final InstitutionDao institutionDao;

    public HomeController(InstitutionDao institutionDao)
    {
        this.institutionDao = institutionDao;
    }

    @RequestMapping("/")
    public String homeAction(Model model)
    {
        model.addAttribute("institutions", institutionDao.findAll());

        return "index";
    }
}
